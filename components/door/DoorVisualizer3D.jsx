import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { FlipHorizontal, Maximize2, Minimize2, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";
import {
  CURTAIN_PALETTE,
  curtainMaterialFromHex,
  darkenHex,
  hexToRgb,
  lightenHex,
  rgbaFromHex,
} from "@/lib/doorColors";

/** Steel housing / guides (reference CGI style). */
const FRAME_FACE = "#c5ced9";
const FRAME_EDGE = "#8b95a8";
const HOOD_TOP = "#dce4ee";
const HOOD_FACE = "#aeb9ca";
const SAFETY_YELLOW = "#facc15";
const SAFETY_YELLOW_EDGE = "#ca8a04";
const CONTROL_BOX = "#f1f5f9";
const CONTROL_BOX_SIDE = "#cbd5e1";

/** Near-dimetric (~22.5°) — reads straighter / less diagonal than π/7 */
const ISO_AXON_ANGLE = Math.PI / 8;

const ENV_THEMES = {
  ambient: {
    wallTop: "#1e2d3d",
    wallLeft: "#152233",
    wallRight: "#1a2a38",
    label: "Ambient Warehouse",
  },
  cold: {
    wallTop: "#0f2a3d",
    wallLeft: "#0a1e2e",
    wallRight: "#0d2436",
    label: "Cold / Freezer",
  },
  high_traffic: {
    wallTop: "#1a1535",
    wallLeft: "#120f28",
    wallRight: "#171230",
    label: "High Traffic",
  },
  external: {
    wallTop: "#162016",
    wallLeft: "#0f170f",
    wallRight: "#131c13",
    label: "External / Exposed",
  },
};

const WALL_STYLES = {
  warehouse: { wallTop: "#233244", wallLeft: "#1a2738", wallRight: "#1d2d3f", label: "Warehouse" },
  concrete: { wallTop: "#6b7280", wallLeft: "#4b5563", wallRight: "#525d6c", label: "Concrete" },
  cleanroom: { wallTop: "#d8e5f2", wallLeft: "#c2d3e6", wallRight: "#c9d9ea", label: "Cleanroom" },
  brick: { wallTop: "#7a5248", wallLeft: "#5c3c34", wallRight: "#66433a", label: "Brick" },
};

/** Isometric floor quad + spotlight — keyed by floorStyle */
const FLOOR_PRESETS = {
  light: {
    grad0: "#e8ecf4",
    grad1: "#cbd5e6",
    gridAlpha: 0.064,
    spotlight0: "rgba(255,255,255,0.42)",
    spotlight1: "rgba(148,163,184,0.12)",
  },
  dark: {
    grad0: "#0a0f1a",
    grad1: "#07090f",
    gridAlpha: 0.12,
    spotlight0: null,
    spotlight1: null,
  },
};

/**
 * Isometric rapid-door preview (canvas). UX patterns aligned with public industrial door configurators
 * (live dimensions, curtain travel, alternate viewing angle, fullscreen preview — e.g. Union Industries, UK roller designers).
 *
 * @param {object} props
 * @param {number} props.width - opening width (mm)
 * @param {number} props.height - opening height (mm)
 * @param {string} props.env
 * @param {"left"|"right"} [props.controlSide] - motor / control box side
 * @param {keyof CURTAIN_PALETTE} [props.curtainColor]
 * @param {number} [props.canvasWidth]
 * @param {number} [props.canvasHeight]
 * @param {boolean} [props.embedControls] - open button + dimension chips under canvas
 * @param {boolean} [props.viewFlip] - mirror isometric view (compare drive side / clearance like competitor “rotate” previews)
 * @param {(flip: boolean) => void} [props.onViewFlipChange] - if set, shows flip control as controlled
 * @param {number} [props.defaultOpenPct] - initial curtain position 0–100 (e.g. from shared URL)
 * @param {number} [props.defaultViewZoom] - initial wheel zoom (1 = baseline fit); larger fills more of the canvas
 * @param {number} [props.defaultViewYaw] - initial orbit yaw (rad)
 * @param {"light"|"dark"} [props.floorStyle] - floor slab gradient under the door
 * @param {boolean} [props.showAdvancedControls] - curtain slider, fullscreen, reset (default true on full configurator)
 */
export default function DoorVisualizer3D({
  width,
  height,
  env,
  controlSide = "left",
  curtainColor = "blue",
  canvasWidth = 340,
  canvasHeight = 280,
  embedControls = true,
  viewFlip = false,
  onViewFlipChange,
  defaultOpenPct = 0,
  defaultViewZoom = 1.28,
  /** Prior 210° view + 180° → 30° (π/6); frontal-ish orbit in (−π, π] */
  defaultViewYaw = Math.PI / 6,
  showAdvancedControls = true,
  showWall = true,
  wallStyle = "cleanroom",
  floorStyle = "light",
  wallTintHex = "",
  doorImageSrc = "/Door_Image_3D.jpg",
  /** Raster mode only for portrait/landscape product stills; wide logo banners are auto-rejected. */
  useDoorImage = false,
}) {
  const canvasRef = useRef(null);
  const interactionRef = useRef(null);
  const containerRef = useRef(null);
  const animRef = useRef(null);
  const targetOpenRef = useRef(0);
  const [targetOpen, setTargetOpen] = useState(() => Math.min(1, Math.max(0, defaultOpenPct / 100)));
  const [openPct, setOpenPct] = useState(0);
  const stateRef = useRef({ openPct: 0 });
  const [imgFailed, setImgFailed] = useState(false);
  const [imgCandidateIdx, setImgCandidateIdx] = useState(0);
  const imageRef = useRef(null);
  /** Only real door assets — never fall back to hero/warehouse art when image mode is on. */
  const imageCandidates = useMemo(() => {
    const list = [doorImageSrc, "/Door_Image_3D.jpg"];
    const seen = new Set();
    return list.filter((u) => typeof u === "string" && u.length > 0 && !seen.has(u) && seen.add(u));
  }, [doorImageSrc]);
  const [viewZoom, setViewZoom] = useState(() => defaultViewZoom);
  const [viewYaw, setViewYaw] = useState(() => defaultViewYaw);
  const dragRef = useRef({ active: false, x: 0 });
  const zoomRef = useRef(defaultViewZoom);
  const yawRef = useRef(defaultViewYaw);

  const [fsDims, setFsDims] = useState(null);
  const [fullscreenUi, setFullscreenUi] = useState(false);
  const effW = fsDims?.w ?? canvasWidth;
  const effH = fsDims?.h ?? canvasHeight;

  const theme = ENV_THEMES[env] || ENV_THEMES.ambient;
  const accentHex = CURTAIN_PALETTE[curtainColor] || CURTAIN_PALETTE.blue;
  const mat = curtainMaterialFromHex(accentHex);

  const VIEW_FLIP = viewFlip ? -1 : 1;

  const curtainKeyRef = useRef(curtainColor);
  const ctrlSideRef = useRef(controlSide);
  const envKeyRef = useRef(env);
  const wallShowRef = useRef(showWall);
  const wallStyleRef = useRef(wallStyle);
  const wallTintRef = useRef(wallTintHex);
  const floorStyleRef = useRef(floorStyle);
  curtainKeyRef.current = curtainColor;
  ctrlSideRef.current = controlSide;
  envKeyRef.current = env;
  wallShowRef.current = showWall;
  wallStyleRef.current = wallStyle;
  wallTintRef.current = wallTintHex;
  floorStyleRef.current = floorStyle;
  zoomRef.current = viewZoom;
  yawRef.current = viewYaw;

  useEffect(() => {
    targetOpenRef.current = targetOpen;
  }, [targetOpen]);

  useEffect(() => {
    setImgFailed(false);
    setImgCandidateIdx(0);
  }, [doorImageSrc, useDoorImage]);

  useEffect(() => {
    if (!useDoorImage) return;
    const idx = Math.min(imgCandidateIdx, imageCandidates.length - 1);
    const src = imageCandidates[idx];
    if (!src) {
      setImgFailed(true);
      return;
    }
    let cancelled = false;
    const img = new Image();
    /** Reject logo strips and ultra-panoramic files (e.g. 1042×25x “ROOOV” banners) so we fall back to the vector door. */
    const maxAspect = 2.35;
    img.onload = () => {
      if (cancelled) return;
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      if (h > 0) {
        const ar = w / h;
        if (ar > maxAspect || ar < 1 / maxAspect) {
          if (idx < imageCandidates.length - 1) setImgCandidateIdx((i) => i + 1);
          else setImgFailed(true);
          return;
        }
      }
      imageRef.current = img;
      setImgFailed(false);
    };
    img.onerror = () => {
      if (cancelled) return;
      if (idx < imageCandidates.length - 1) setImgCandidateIdx((i) => i + 1);
      else setImgFailed(true);
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [useDoorImage, imgCandidateIdx, imageCandidates]);

  /** Reset curtain travel when opening size or environment changes (matches supplier tools). */
  useEffect(() => {
    setTargetOpen(0);
    targetOpenRef.current = 0;
    stateRef.current.openPct = 0;
  }, [width, height, env]);

  const syncFullscreenDims = useCallback(() => {
    const el = containerRef.current;
    const active = !!el && document.fullscreenElement === el;
    setFullscreenUi(active);
    if (active) {
      setFsDims({
        w: Math.max(520, Math.min(window.innerWidth - 48, 1200)),
        h: Math.max(360, Math.min(window.innerHeight - 160, 900)),
      });
    } else {
      setFsDims(null);
    }
  }, []);

  useEffect(() => {
    const onFs = () => syncFullscreenDims();
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("resize", onFs);
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("resize", onFs);
    };
  }, [syncFullscreenDims]);

  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        syncFullscreenDims();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      /* ignore */
    }
  }, [syncFullscreenDims]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        setTargetOpen((t) => (t > 0.05 ? 0 : 1));
      }
    },
    [setTargetOpen]
  );

  useEffect(() => {
    if (!useDoorImage || imgFailed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    let rafId;
    let frameCount = 0;
    const drawImageScene = () => {
      ctx.clearRect(0, 0, W, H);

      const speed = 0.025;
      const tgt = targetOpenRef.current;
      if (Math.abs(stateRef.current.openPct - tgt) > 0.005) {
        stateRef.current.openPct += (tgt - stateRef.current.openPct) * speed * 3;
      } else {
        stateRef.current.openPct = tgt;
      }
      const op = stateRef.current.openPct;
      frameCount += 1;
      if (frameCount % 8 === 0) setOpenPct(op);

      if (showWall) {
        const wallTheme = wallTintHex
          ? {
              wallTop: lightenHex(wallTintHex, 0.08),
              wallLeft: darkenHex(wallTintHex, 0.22),
              wallRight: darkenHex(wallTintHex, 0.14),
            }
          : {
              wallTop: "#e8eef5",
              wallLeft: "#dce6f2",
              wallRight: "#dde8f4",
            };
        const wallGrad = ctx.createLinearGradient(0, 0, W, H);
        wallGrad.addColorStop(0, wallTheme.wallLeft);
        wallGrad.addColorStop(0.5, wallTheme.wallTop);
        wallGrad.addColorStop(1, wallTheme.wallRight);
        ctx.fillStyle = wallGrad;
        ctx.fillRect(0, 0, W, H);
      }

      const img = imageRef.current;
      if (img) {
        /* Tighter margins so the door fills more of the preview by default (zoom prop scales on top). */
        const fit = Math.min((W * 0.98) / img.width, (H * 0.92) / img.height);
        const dw = img.width * fit * viewZoom;
        const dh = img.height * fit * viewZoom;

        ctx.save();
        ctx.translate(W / 2, H / 2 + 8);
        const yaw = viewYaw;
        const sx = Math.max(0.08, Math.abs(Math.cos(yaw)));
        const perspectiveY = 1 - Math.min(0.18, Math.abs(Math.sin(yaw)) * 0.12);
        ctx.scale(sx, perspectiveY);
        if (Math.cos(yaw) < 0) ctx.scale(-1, 1);
        if (controlSide === "right") ctx.scale(-1, 1);

        /* Approximate curtain roll-up: translate bitmap upward as opening increases */
        ctx.translate(0, -op * dh * 0.26);

        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);

        // Curtain tint region (normalized to image mode) so color selection updates live.
        const curtainHex = CURTAIN_PALETTE[curtainColor] || CURTAIN_PALETTE.blue;
        const rx = -dw * 0.30;
        const ry = -dh * 0.31;
        const rw = dw * 0.60;
        const rh = dh * 0.70;
        ctx.save();
        ctx.beginPath();
        ctx.rect(rx, ry, rw, rh);
        ctx.clip();
        ctx.globalCompositeOperation = "source-atop";
        ctx.globalAlpha = 0.36;
        ctx.fillStyle = curtainHex;
        ctx.fillRect(-dw / 2, -dh / 2, dw, dh);
        ctx.globalCompositeOperation = "multiply";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = curtainHex;
        ctx.fillRect(-dw / 2, -dh / 2, dw, dh);
        ctx.restore();

        ctx.restore();
      }

      rafId = requestAnimationFrame(drawImageScene);
    };

    drawImageScene();
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    useDoorImage,
    imgFailed,
    effW,
    effH,
    showWall,
    wallTintHex,
    viewZoom,
    viewYaw,
    controlSide,
    curtainColor,
  ]);

  useEffect(() => {
    if (useDoorImage && !imgFailed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    const ISO_SCALE = 30;
    const CX = W / 2 + 8;
    const CY = H / 2 + 20;

    const iso = (x, y, z) => {
      const yaw = yawRef.current;
      const cx = (x - 1.8) * Math.cos(yaw) - (y - 2.4) * Math.sin(yaw) + 1.8;
      const cy = (x - 1.8) * Math.sin(yaw) + (y - 2.4) * Math.cos(yaw) + 2.4;
      const scale = ISO_SCALE * zoomRef.current;
      return {
        x: CX + VIEW_FLIP * (cx - cy) * Math.cos(ISO_AXON_ANGLE) * scale,
        y: CY + (cx + cy) * Math.sin(ISO_AXON_ANGLE) * scale - z * scale * 0.88,
      };
    };

    const maxIsoW = 4.5;
    const maxIsoH = 4.0;
    const aspect = width / height;
    let dW = Math.min(maxIsoW, maxIsoH * aspect);
    let dH = dW / aspect;
    if (dH > maxIsoH) {
      dH = maxIsoH;
      dW = dH * aspect;
    }

    const wallX = 1;
    const doorY0 = 1;
    const doorY1 = doorY0 + dW;
    const doorZ0 = 0;
    const doorZ1 = dH;

    const WALL_W = dW + 1.4;
    const WALL_H = dH + 0.8;
    const WALL_D = 1.6;
    const wallY0 = doorY0 - 0.7;
    const slatCount = Math.max(8, Math.round(dH * 14));

    let frameCount = 0;

    function addAlpha(hex, alpha) {
      const { r, g, b } = hexToRgb(hex);
      return `rgba(${r},${g},${b},${alpha})`;
    }

    function drawPoly(points, fillStyle, strokeStyle, lineWidth = 0) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
      ctx.closePath();
      if (fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.fill();
      }
      if (strokeStyle && lineWidth > 0) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
    }

    function drawLine(p1, p2, color, lw) {
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = lw;
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      const envTheme = ENV_THEMES[envKeyRef.current] || ENV_THEMES.ambient;
      const wallBase = WALL_STYLES[wallStyleRef.current] || WALL_STYLES.cleanroom;
      const tint = wallTintRef.current;
      const wallTheme = tint
        ? {
            wallTop: lightenHex(tint, 0.08),
            wallLeft: darkenHex(tint, 0.22),
            wallRight: darkenHex(tint, 0.14),
            label: "Custom wall",
          }
        : wallBase || envTheme;
      const ck = curtainKeyRef.current;
      const curtainHex = CURTAIN_PALETTE[ck] || CURTAIN_PALETTE.blue;
      const material = curtainMaterialFromHex(curtainHex);
      const accent = material.accent;
      const ctrl = ctrlSideRef.current;
      const drumNearY = ctrl === "left" ? doorY0 - 0.05 : doorY1 + 0.05;
      const highlightY = ctrl === "left" ? doorY0 : doorY1;

      const targetPct = targetOpenRef.current;
      const speed = 0.025;
      if (Math.abs(stateRef.current.openPct - targetPct) > 0.005) {
        stateRef.current.openPct += (targetPct - stateRef.current.openPct) * speed * 3;
      } else {
        stateRef.current.openPct = targetPct;
      }
      const op = stateRef.current.openPct;

      frameCount += 1;
      if (frameCount % 8 === 0) setOpenPct(op);

      const gp = [
        iso(wallX - 0.5, wallY0 - 0.5, 0),
        iso(wallX + 0.8, wallY0 - 0.5, 0),
        iso(wallX + 0.8, wallY0 + WALL_W + 0.5, 0),
        iso(wallX - 0.5, wallY0 + WALL_W + 0.5, 0),
      ];
      const floorPreset = FLOOR_PRESETS[floorStyleRef.current] || FLOOR_PRESETS.light;
      const groundGrad = ctx.createLinearGradient(gp[0].x, gp[0].y, gp[2].x, gp[2].y);
      groundGrad.addColorStop(0, floorPreset.grad0);
      groundGrad.addColorStop(1, floorPreset.grad1);
      drawPoly(gp, groundGrad, null);

      ctx.globalAlpha = floorPreset.gridAlpha;
      for (let gi = 0; gi <= 6; gi += 0.5) {
        const p1 = iso(wallX - 0.5, wallY0 - 0.5 + gi * 0.3, 0);
        const p2 = iso(wallX + 0.8, wallY0 - 0.5 + gi * 0.3, 0);
        drawLine(p1, p2, accent, 0.5);
      }
      ctx.globalAlpha = 1;

      if (wallShowRef.current) {
        const wTop = [
          iso(wallX, wallY0, WALL_H),
          iso(wallX + WALL_D, wallY0, WALL_H),
          iso(wallX + WALL_D, wallY0 + WALL_W, WALL_H),
          iso(wallX, wallY0 + WALL_W, WALL_H),
        ];
        drawPoly(wTop, wallTheme.wallTop, addAlpha(accent, 0.15), 0.5);

        const wRight = [
          iso(wallX, wallY0, WALL_H),
          iso(wallX, wallY0 + WALL_W, WALL_H),
          iso(wallX, wallY0 + WALL_W, 0),
          iso(wallX, wallY0, 0),
        ];
        drawPoly(wRight, wallTheme.wallRight, null);

        const wLeft = [
          iso(wallX, wallY0, WALL_H),
          iso(wallX + WALL_D, wallY0, WALL_H),
          iso(wallX + WALL_D, wallY0, 0),
          iso(wallX, wallY0, 0),
        ];
        drawPoly(wLeft, wallTheme.wallLeft, null);
      }

      /* Side guides / tracks — metallic vertical housings */
      const gzTop = doorZ1 + 0.36;
      const gThick = 0.085;
      const leftGuideFace = [
        iso(wallX + 0.02, doorY0 - gThick, doorZ0),
        iso(wallX + 0.02, doorY0, doorZ0),
        iso(wallX + 0.02, doorY0, gzTop),
        iso(wallX + 0.02, doorY0 - gThick, gzTop),
      ];
      drawPoly(leftGuideFace, FRAME_FACE, FRAME_EDGE, 0.6);
      const leftGuideTop = [
        iso(wallX + 0.02, doorY0 - gThick, gzTop),
        iso(wallX + 0.02, doorY0, gzTop),
        iso(wallX + 0.22, doorY0, gzTop),
        iso(wallX + 0.22, doorY0 - gThick, gzTop),
      ];
      drawPoly(leftGuideTop, lightenHex(HOOD_TOP, 0.08), FRAME_EDGE, 0.45);

      const rightGuideFace = [
        iso(wallX + 0.02, doorY1, doorZ0),
        iso(wallX + 0.02, doorY1 + gThick, doorZ0),
        iso(wallX + 0.02, doorY1 + gThick, gzTop),
        iso(wallX + 0.02, doorY1, gzTop),
      ];
      drawPoly(rightGuideFace, FRAME_FACE, FRAME_EDGE, 0.6);
      const rightGuideTop = [
        iso(wallX + 0.02, doorY1, gzTop),
        iso(wallX + 0.02, doorY1 + gThick, gzTop),
        iso(wallX + 0.22, doorY1 + gThick, gzTop),
        iso(wallX + 0.22, doorY1, gzTop),
      ];
      drawPoly(rightGuideTop, lightenHex(HOOD_TOP, 0.08), FRAME_EDGE, 0.45);

      /* Hood / barrel casing — wider on drive side */
      const hoodZ0 = doorZ1;
      const hoodZ1 = doorZ1 + 0.48;
      const hoodY0 = ctrl === "left" ? doorY0 - 0.36 : doorY0;
      const hoodY1 = ctrl === "left" ? doorY1 : doorY1 + 0.36;
      const hoodD = WALL_D * 0.92;
      const hoodTopFace = [
        iso(wallX, hoodY0, hoodZ1),
        iso(wallX, hoodY1, hoodZ1),
        iso(wallX + hoodD, hoodY1, hoodZ1),
        iso(wallX + hoodD, hoodY0, hoodZ1),
      ];
      drawPoly(hoodTopFace, HOOD_TOP, addAlpha(accent, 0.2), 0.55);
      const hoodFrontFace = [
        iso(wallX + hoodD, hoodY0, hoodZ0),
        iso(wallX + hoodD, hoodY1, hoodZ0),
        iso(wallX + hoodD, hoodY1, hoodZ1),
        iso(wallX + hoodD, hoodY0, hoodZ1),
      ];
      drawPoly(hoodFrontFace, HOOD_FACE, FRAME_EDGE, 0.65);

      const dVoid = [
        iso(wallX, doorY0, doorZ1),
        iso(wallX, doorY1, doorZ1),
        iso(wallX, doorY1, doorZ0),
        iso(wallX, doorY0, doorZ0),
      ];
      drawPoly(dVoid, "#020409", null);

      const drumH = 0.22;
      const drum = [
        iso(wallX - 0.08, drumNearY, doorZ1),
        iso(wallX + 0.4, drumNearY, doorZ1),
        iso(wallX + 0.4, drumNearY, doorZ1 + drumH),
        iso(wallX - 0.08, drumNearY, doorZ1 + drumH),
      ];
      drawPoly(drum, "#0f1a28", addAlpha(accent, 0.55), 0.7);
      const drumFace = [
        iso(wallX - 0.08, doorY0 - 0.05, doorZ1),
        iso(wallX - 0.08, doorY1 + 0.05, doorZ1),
        iso(wallX - 0.08, doorY1 + 0.05, doorZ1 + drumH),
        iso(wallX - 0.08, doorY0 - 0.05, doorZ1 + drumH),
      ];
      drawPoly(drumFace, darkenHex("#0f1a28", 0.05), addAlpha(accent, 0.45), 0.7);

      const visH = dH * (1 - op * 0.97);
      const curtainBottom = doorZ1 - visH;
      const curtainTop = doorZ1;

      if (visH > 0.01) {
        const doorFace = [
          iso(wallX, doorY0, curtainTop),
          iso(wallX, doorY1, curtainTop),
          iso(wallX, doorY1, curtainBottom),
          iso(wallX, doorY0, curtainBottom),
        ];

        const dfp1 = iso(wallX, doorY0, curtainTop);
        const dfp2 = iso(wallX, doorY1, curtainBottom);
        const dGrad = ctx.createLinearGradient(dfp1.x, dfp1.y, dfp2.x, dfp2.y);
        dGrad.addColorStop(0, material.face);
        dGrad.addColorStop(0.5, material.side);
        dGrad.addColorStop(1, material.face);
        drawPoly(doorFace, dGrad, addAlpha(accent, 0.45), 1);

        const doorTopFace = [
          iso(wallX, doorY0, curtainTop),
          iso(wallX + 0.15, doorY0, curtainTop),
          iso(wallX + 0.15, doorY1, curtainTop),
          iso(wallX, doorY1, curtainTop),
        ];
        drawPoly(doorTopFace, material.top, addAlpha(accent, 0.35), 0.5);

        /* Horizontal reinforcement ribs */
        ctx.globalAlpha = 0.92;
        const ribCol = material.rib || darkenHex(accent, 0.38);
        for (let si = 1; si < slatCount; si++) {
          const sz = curtainBottom + (si / slatCount) * visH;
          const sp1 = iso(wallX, doorY0 + 0.02, sz);
          const sp2 = iso(wallX, doorY1 - 0.02, sz);
          drawLine(sp1, sp2, ribCol, 1.1);
        }
        ctx.globalAlpha = 1;

        /* 2×2 vision panels — neutral glazing */
        if (visH > dH * 0.26) {
          const winY0 = doorY0 + dW * 0.26;
          const winY1 = doorY1 - dW * 0.26;
          const winZ0 = curtainBottom + visH * 0.44;
          const winZ1 = curtainBottom + visH * 0.64;
          const midY = (winY0 + winY1) / 2;
          const midZ = (winZ0 + winZ1) / 2;
          const mullion = material.windowFrame || "rgba(52,62,78,0.9)";
          const cells = [
            [winY0, midY, midZ, winZ1],
            [midY, winY1, midZ, winZ1],
            [winY0, midY, winZ0, midZ],
            [midY, winY1, winZ0, midZ],
          ];
          for (const [y0, y1, z0, z1] of cells) {
            const cell = [
              iso(wallX, y0, z1),
              iso(wallX, y1, z1),
              iso(wallX, y1, z0),
              iso(wallX, y0, z0),
            ];
            drawPoly(cell, material.window, mullion, 0.75);
            drawPoly(
              [
                iso(wallX, y0 + (y1 - y0) * 0.15, z1 - (z1 - z0) * 0.12),
                iso(wallX, y0 + (y1 - y0) * 0.45, z1 - (z1 - z0) * 0.12),
                iso(wallX, y0 + (y1 - y0) * 0.35, z0 + (z1 - z0) * 0.22),
                iso(wallX, y0 + (y1 - y0) * 0.08, z0 + (z1 - z0) * 0.22),
              ],
              material.windowInner || "rgba(255,255,255,0.12)",
              null
            );
          }
          drawLine(iso(wallX, midY, winZ0), iso(wallX, midY, winZ1), mullion, 1.4);
          drawLine(iso(wallX, winY0, midZ), iso(wallX, winY1, midZ), mullion, 1.4);
        }

        /* Bottom safety / photocell edge — high-vis yellow */
        const barH = Math.max(0.038, Math.min(visH * 0.065, dH * 0.09));
        const barZ0 = curtainBottom;
        const barZ1 = curtainBottom + barH;
        const safetyFace = [
          iso(wallX, doorY0 + 0.04, barZ1),
          iso(wallX, doorY1 - 0.04, barZ1),
          iso(wallX, doorY1 - 0.04, barZ0),
          iso(wallX, doorY0 + 0.04, barZ0),
        ];
        drawPoly(safetyFace, SAFETY_YELLOW, SAFETY_YELLOW_EDGE, 1);
        const safetyTop = [
          iso(wallX, doorY0 + 0.04, barZ1),
          iso(wallX + 0.12, doorY0 + 0.04, barZ1),
          iso(wallX + 0.12, doorY1 - 0.04, barZ1),
          iso(wallX, doorY1 - 0.04, barZ1),
        ];
        drawPoly(safetyTop, lightenHex(SAFETY_YELLOW, 0.15), SAFETY_YELLOW_EDGE, 0.55);

        ctx.globalAlpha = 0.2;
        const edgeTop = iso(wallX, highlightY, curtainTop);
        const edgeBot = iso(wallX, highlightY, curtainBottom);
        ctx.beginPath();
        ctx.moveTo(edgeTop.x, edgeTop.y);
        ctx.lineTo(edgeBot.x, edgeBot.y);
        ctx.strokeStyle = "rgba(255,255,255,0.85)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.globalAlpha = 1;

        const glowPt = iso(wallX, (doorY0 + doorY1) / 2, curtainBottom);
        const radGrad = ctx.createRadialGradient(glowPt.x, glowPt.y, 0, glowPt.x, glowPt.y, 34);
        radGrad.addColorStop(0, material.accentGlow);
        radGrad.addColorStop(1, "transparent");
        ctx.fillStyle = radGrad;
        ctx.fillRect(glowPt.x - 34, glowPt.y - 16, 68, 32);
      }

      drawLine(iso(wallX, doorY0, doorZ0), iso(wallX, doorY0, doorZ1), addAlpha(accent, 0.65), 1.2);
      drawLine(iso(wallX, doorY1, doorZ0), iso(wallX, doorY1, doorZ1), addAlpha(accent, 0.65), 1.2);
      drawLine(iso(wallX, doorY0, doorZ0), iso(wallX, doorY1, doorZ0), addAlpha(accent, 0.35), 0.8);

      /* Wall-mounted drive control enclosure + cable (drive side) */
      const ctrlNow = ctrlSideRef.current;
      const motorAttachY = ctrlNow === "left" ? doorY0 - 0.5 : doorY1 + 0.5;
      const boxZc = doorZ1 * 0.34;
      const bx = wallX + 0.46;
      const bw = 0.16;
      const bh = 0.22;
      const bd = 0.1;
      const boxFront = [
        iso(bx, motorAttachY - bw / 2, boxZc),
        iso(bx, motorAttachY + bw / 2, boxZc),
        iso(bx, motorAttachY + bw / 2, boxZc + bh),
        iso(bx, motorAttachY - bw / 2, boxZc + bh),
      ];
      drawPoly(boxFront, CONTROL_BOX, FRAME_EDGE, 0.85);
      const boxSide = [
        iso(bx, motorAttachY + bw / 2, boxZc),
        iso(bx + bd, motorAttachY + bw / 2, boxZc),
        iso(bx + bd, motorAttachY + bw / 2, boxZc + bh),
        iso(bx, motorAttachY + bw / 2, boxZc + bh),
      ];
      drawPoly(boxSide, CONTROL_BOX_SIDE, FRAME_EDGE, 0.55);
      const estop = iso(bx, motorAttachY - bw * 0.05, boxZc + bh * 0.42);
      ctx.beginPath();
      ctx.arc(estop.x, estop.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#dc2626";
      ctx.fill();
      ctx.strokeStyle = "#7f1d1d";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(estop.x + 14, estop.y + 2, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = "#1e293b";
      ctx.fill();
      const cableStart = iso(bx, motorAttachY, boxZc + 0.02);
      const cableEnd = iso(
        wallX + 0.08,
        ctrlNow === "left" ? doorY0 - 0.04 : doorY1 + 0.04,
        doorZ1 - 0.12
      );
      ctx.strokeStyle = "rgba(226,232,240,0.85)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cableStart.x, cableStart.y);
      ctx.quadraticCurveTo(cableStart.x - 18, cableStart.y + 22, cableEnd.x, cableEnd.y);
      ctx.stroke();

      const dimOffset = 0.3;
      const wa1 = iso(wallX - dimOffset, doorY0, 0.1);
      const wa2 = iso(wallX - dimOffset, doorY1, 0.1);
      ctx.globalAlpha = 0.85;
      drawLine(wa1, wa2, accent, 1);
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(wa1.x, wa1.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(wa2.x, wa2.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      const wMid = iso(wallX - dimOffset - 0.2, (doorY0 + doorY1) / 2, 0.1);
      ctx.globalAlpha = 0.95;
      ctx.font = "bold 11px monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${(width / 1000).toFixed(2)}m`, wMid.x, wMid.y + 4);

      const ha1 = iso(wallX, doorY1 + dimOffset, doorZ0);
      const ha2 = iso(wallX, doorY1 + dimOffset, doorZ1);
      drawLine(ha1, ha2, accent, 1);
      ctx.beginPath();
      ctx.arc(ha1.x, ha1.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ha2.x, ha2.y, 2.5, 0, Math.PI * 2);
      ctx.fill();
      const hMid = iso(wallX, doorY1 + dimOffset + 0.3, (doorZ0 + doorZ1) / 2);
      ctx.fillText(`${(height / 1000).toFixed(2)}m`, hMid.x, hMid.y + 4);
      ctx.globalAlpha = 1;

      const floorPt = iso(wallX, (doorY0 + doorY1) / 2, 0);
      const fp = FLOOR_PRESETS[floorStyleRef.current] || FLOOR_PRESETS.light;
      const flGrad = ctx.createRadialGradient(floorPt.x, floorPt.y + 8, 0, floorPt.x, floorPt.y + 8, 52);
      if (fp.spotlight0) {
        flGrad.addColorStop(0, fp.spotlight0);
        flGrad.addColorStop(0.55, fp.spotlight1 ?? "transparent");
        flGrad.addColorStop(1, "transparent");
      } else {
        flGrad.addColorStop(0, rgbaFromHex(accent, 0.22));
        flGrad.addColorStop(1, "transparent");
      }
      ctx.fillStyle = flGrad;
      ctx.fillRect(floorPt.x - 56, floorPt.y - 14, 112, 34);

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [width, height, effW, effH, VIEW_FLIP, useDoorImage, imgFailed]);

  const onPointerDownPreview = (e) => {
    dragRef.current = { active: true, x: e.clientX };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const onPointerMovePreview = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.x;
    dragRef.current.x = e.clientX;
    setViewYaw((y) => {
      const next = y + dx * 0.006;
      if (next > Math.PI) return next - Math.PI * 2;
      if (next < -Math.PI) return next + Math.PI * 2;
      return next;
    });
  };

  const onPointerUpPreview = (e) => {
    dragRef.current.active = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    const el = interactionRef.current;
    if (!el) return;
    const blockScrollWheel = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      const delta = ev.deltaY > 0 ? -0.08 : 0.08;
      setViewZoom((z) => Math.min(2.35, Math.max(0.52, z + delta)));
    };
    el.addEventListener("wheel", blockScrollWheel, { passive: false });
    return () => el.removeEventListener("wheel", blockScrollWheel);
  }, []);

  const envThemeNow = ENV_THEMES[env] || ENV_THEMES.ambient;
  const wallBaseNow = WALL_STYLES[wallStyle] || WALL_STYLES.cleanroom;
  const wallThemeNow = wallTintHex
    ? {
        wallTop: lightenHex(wallTintHex, 0.08),
        wallLeft: darkenHex(wallTintHex, 0.22),
        wallRight: darkenHex(wallTintHex, 0.14),
        label: "Custom wall",
      }
    : wallBaseNow || envThemeNow;
  return (
    <div className="flex flex-col items-center gap-3 select-none w-full">
      <div
        ref={containerRef}
        className={`relative w-full max-w-full flex justify-center rounded-xl ${fullscreenUi ? "bg-slate-950 p-4" : ""}`}
      >
        <canvas
          ref={(el) => {
            canvasRef.current = el;
            interactionRef.current = el;
          }}
          width={effW}
          height={effH}
          role="img"
          aria-label={
            useDoorImage && !imgFailed
              ? `Door preview image, opening ${(width / 1000).toFixed(2)} by ${(height / 1000).toFixed(2)} metres. Drag to rotate and mouse wheel to zoom.`
              : `Rapid roller door preview, opening ${(width / 1000).toFixed(2)} by ${(height / 1000).toFixed(2)} metres. Press Space to toggle open and closed.`
          }
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={onPointerDownPreview}
          onPointerMove={onPointerMovePreview}
          onPointerUp={onPointerUpPreview}
          onPointerCancel={onPointerUpPreview}
          className={`rounded-xl max-w-full h-auto w-full shadow-lg outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500/60 ${
            fullscreenUi ? "shadow-black/40 focus:ring-offset-slate-900" : "shadow-slate-900/10 focus:ring-offset-white"
          }`}
          style={{
            background: fullscreenUi ? "transparent" : "#eef2f7",
            maxHeight: "min(70vh, 520px)",
            cursor: dragRef.current.active ? "grabbing" : "grab",
            touchAction: "none",
            overscrollBehavior: "contain",
          }}
        />
        <div
          className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[0.65rem] font-bold font-mono tracking-wide"
          style={{
            background: "rgba(15,23,42,0.92)",
            border: `1px solid ${mat.accent}55`,
            color: mat.accent,
          }}
        >
          LIVE PREVIEW
        </div>
        {openPct > 0.02 && (
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[0.65rem] font-bold font-mono"
            style={{
              background: "rgba(15,23,42,0.92)",
              border: `1px solid ${mat.accent}55`,
              color: mat.accent,
            }}
          >
            {Math.round(openPct * 100)}% OPEN
          </div>
        )}

        {showAdvancedControls && (
          <div className="absolute top-12 right-3 flex flex-col gap-1.5">
            <button
              type="button"
              onClick={toggleFullscreen}
              className="p-2 rounded-lg bg-slate-900/90 border border-slate-600/80 text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
              title={fullscreenUi ? "Exit fullscreen" : "Fullscreen preview"}
              aria-label={fullscreenUi ? "Exit fullscreen" : "Fullscreen preview"}
            >
              {fullscreenUi ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            {onViewFlipChange && (
              <button
                type="button"
                onClick={() => onViewFlipChange(!viewFlip)}
                className={`p-2 rounded-lg border transition-colors ${
                  viewFlip
                    ? "bg-orange-600/25 border-orange-500/60 text-orange-200"
                    : "bg-slate-900/90 border-slate-600/80 text-slate-200 hover:bg-slate-800"
                }`}
                title="Flip viewing angle (compare drive side)"
                aria-label="Flip viewing angle"
              >
                <FlipHorizontal className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex justify-center pointer-events-none md:pointer-events-auto">
          <span className="text-[0.65rem] font-mono px-2 py-1 rounded bg-black/50 text-white/90 max-w-[95%] text-center">
            Drive / control: <strong className="text-white">{controlSide === "left" ? "Left" : "Right"}</strong>
            {viewFlip && <span className="text-white/70"> · view flipped</span>}
            {" · "}
            Curtain: <strong style={{ color: mat.accent }}>{curtainColor}</strong>
          </span>
        </div>
      </div>

      {embedControls && (
        <>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setTargetOpen((t) => (t > 0.05 ? 0 : 1))}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
              style={{
                background: targetOpen > 0.05 ? rgbaFromHex(accentHex, 0.15) : "rgba(30,41,59,0.9)",
                border: `1px solid ${rgbaFromHex(accentHex, 0.55)}`,
                color: mat.accent,
              }}
            >
              <motion.span
                animate={{ rotate: targetOpen > 0.05 ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}
              >
                ↑
              </motion.span>
              {targetOpen > 0.05 ? "Close" : "Open"} curtain
            </button>

            {showAdvancedControls && (
              <button
                type="button"
                onClick={() => {
                  setTargetOpen(0);
                  targetOpenRef.current = 0;
                  stateRef.current.openPct = 0;
                  setViewZoom(defaultViewZoom);
                  setViewYaw(defaultViewYaw);
                }}
                className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border border-slate-600 text-slate-300 bg-slate-800/80 hover:bg-slate-700 transition-colors"
                title="Reset curtain, zoom, and rotation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            )}

            <span
              className="text-xs font-semibold px-3 py-2 rounded-lg border"
              style={{
                color: mat.accent,
                borderColor: rgbaFromHex(accentHex, 0.35),
                background: rgbaFromHex(accentHex, 0.08),
              }}
            >
              {showWall ? wallThemeNow.label : theme.label}
            </span>
          </div>

          {showAdvancedControls && (
            <div className="w-full max-w-md px-1 space-y-1">
              <div className="flex items-center justify-between text-[0.7rem] text-slate-500">
                <span className="inline-flex items-center gap-1"><ZoomOut className="w-3.5 h-3.5" /> Zoom</span>
                <span className="font-mono text-slate-800 inline-flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  {Math.round(viewZoom * 100)}%
                </span>
              </div>
              <div className="flex justify-between text-[0.7rem] font-semibold text-slate-500 uppercase tracking-wider">
                <span>Curtain position</span>
                <span className="font-mono text-slate-900">{Math.round(targetOpen * 100)}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={Math.round(targetOpen * 100)}
                onChange={(e) => {
                  const v = Number(e.target.value) / 100;
                  setTargetOpen(v);
                  targetOpenRef.current = v;
                }}
                style={{ accentColor: accentHex }}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200"
                aria-label="Curtain open position percentage"
              />
              <p className="text-[0.65rem] text-slate-500 text-center">
                Mouse wheel zooms, drag rotates, and partial opening helps assess travel and clearance.
              </p>
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-3 text-xs font-mono text-slate-300">
            <span style={{ color: mat.accent }} className="opacity-90">
              W: <strong className="text-white">{(width / 1000).toFixed(2)}m</strong>
            </span>
            <span className="opacity-40">×</span>
            <span style={{ color: mat.accent }} className="opacity-90">
              H: <strong className="text-white">{(height / 1000).toFixed(2)}m</strong>
            </span>
            <span className="opacity-40">·</span>
            <span className="opacity-90">{((width / 1000) * (height / 1000)).toFixed(1)}m²</span>
            <span className="opacity-40">·</span>
            <span className="opacity-70 text-slate-500">
              {width.toLocaleString()}×{height.toLocaleString()} mm
            </span>
          </div>

          <p className="text-[0.65rem] text-slate-500 text-center max-w-lg leading-relaxed px-2">
            Illustrative isometric preview — not certified for shop drawings. Dimensions follow your inputs; final headroom and
            guides confirmed at quote stage (industry-standard disclaimer).
          </p>
        </>
      )}
    </div>
  );
}
