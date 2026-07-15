import { motion } from "framer-motion";

export default function IsometricFactoryIllustration({ className = "" }) {
  return (
    <motion.div
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 820 620"
        className="w-full h-auto"
        role="img"
        focusable="false"
        initial={{ y: 0 }}
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <defs>
          <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="rgb(15 23 42)" stopOpacity="1" />
            <stop offset="1" stopColor="rgb(2 6 23)" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="floor" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgb(30 41 59)" stopOpacity="0.7" />
            <stop offset="1" stopColor="rgb(15 23 42)" stopOpacity="0.7" />
          </linearGradient>
          <linearGradient id="accent" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="rgb(251 146 60)" />
            <stop offset="1" stopColor="rgb(249 115 22)" />
          </linearGradient>
          <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="rgba(0,0,0,0.55)" />
          </filter>
          <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* soft background card */}
        <path
          d="M90 210 L420 70 L740 210 L410 360 Z"
          fill="url(#bg)"
          opacity="0.55"
        />

        {/* isometric floor */}
        <path
          d="M110 265 L410 130 L710 265 L410 400 Z"
          fill="url(#floor)"
          stroke="rgba(148,163,184,0.16)"
        />
        <path
          d="M180 295 L410 190 L640 295 L410 400 Z"
          fill="rgba(2,6,23,0.35)"
        />

        {/* warehouse block */}
        <g filter="url(#softShadow)">
          {/* left wall */}
          <path
            d="M255 165 L410 95 L410 245 L255 315 Z"
            fill="rgba(30,41,59,0.95)"
            stroke="rgba(148,163,184,0.18)"
          />
          {/* right wall */}
          <path
            d="M410 95 L565 165 L565 315 L410 245 Z"
            fill="rgba(15,23,42,0.95)"
            stroke="rgba(148,163,184,0.18)"
          />
          {/* roof */}
          <path
            d="M255 165 L410 95 L565 165 L410 235 Z"
            fill="rgba(51,65,85,0.95)"
            stroke="rgba(148,163,184,0.18)"
          />

          {/* door opening */}
          <path
            d="M445 235 L520 275 L520 315 L445 275 Z"
            fill="rgba(2,6,23,0.8)"
            stroke="rgba(148,163,184,0.14)"
          />

          {/* rapid door curtain */}
          <motion.path
            d="M447 236 L518 274 L518 300 L447 262 Z"
            fill="url(#accent)"
            opacity="0.9"
            animate={{ opacity: [0.85, 0.98, 0.85] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            filter="url(#glow)"
          />
        </g>

        {/* conveyor / pathway */}
        <g opacity="0.95">
          <path
            d="M260 340 L410 270 L560 340 L410 410 Z"
            fill="rgba(15,23,42,0.65)"
            stroke="rgba(148,163,184,0.16)"
          />
          <path
            d="M305 350 L410 295 L515 350 L410 405 Z"
            fill="rgba(2,6,23,0.35)"
          />
        </g>

        {/* pallets / product blocks */}
        {[
          { x: 245, y: 315 },
          { x: 310, y: 345 },
          { x: 505, y: 345 },
          { x: 570, y: 315 },
        ].map((b, idx) => (
          <g key={idx} opacity="0.95">
            <path
              d={`M${b.x} ${b.y} L${b.x + 38} ${b.y - 20} L${b.x + 78} ${b.y} L${b.x + 40} ${b.y + 22} Z`}
              fill="rgba(51,65,85,0.92)"
              stroke="rgba(148,163,184,0.18)"
            />
            <path
              d={`M${b.x + 40} ${b.y + 22} L${b.x + 78} ${b.y} L${b.x + 78} ${b.y + 40} L${b.x + 40} ${b.y + 62} Z`}
              fill="rgba(15,23,42,0.92)"
              stroke="rgba(148,163,184,0.14)"
            />
            <path
              d={`M${b.x} ${b.y} L${b.x + 40} ${b.y + 22} L${b.x + 40} ${b.y + 62} L${b.x} ${b.y + 40} Z`}
              fill="rgba(30,41,59,0.92)"
              stroke="rgba(148,163,184,0.14)"
            />
            {idx === 1 ? (
              <path
                d={`M${b.x + 18} ${b.y + 8} L${b.x + 34} ${b.y} L${b.x + 58} ${b.y + 12} L${b.x + 42} ${b.y + 20} Z`}
                fill="rgba(249,115,22,0.55)"
              />
            ) : null}
          </g>
        ))}

        {/* small UI-ish signal dots */}
        <g opacity="0.7">
          <circle cx="660" cy="240" r="4" fill="rgb(249 115 22)" />
          <circle cx="680" cy="252" r="3" fill="rgba(251,146,60,0.8)" />
          <circle cx="700" cy="265" r="2.5" fill="rgba(148,163,184,0.6)" />
        </g>
      </motion.svg>
    </motion.div>
  );
}

