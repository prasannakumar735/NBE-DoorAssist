import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";

const MotionLink = motion(Link);

export function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticButton({ href, to, children, className = "", dark = false, type = "button", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20 });
  const springY = useSpring(y, { stiffness: 280, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const classes = `inline-flex items-center justify-center px-8 py-4 font-display text-[0.7rem] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 ${
    dark
      ? "bg-ink text-white hover:bg-accent"
      : "bg-white text-ink hover:bg-accent hover:text-white"
  } ${className}`;

  const shared = {
    ref,
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: classes,
    onClick,
  };

  if (to) {
    return (
      <MotionLink {...shared} to={to}>
        {children}
      </MotionLink>
    );
  }

  if (href) {
    return (
      <motion.a {...shared} href={href}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...shared} type={type}>
      {children}
    </motion.button>
  );
}

export function SectionLabel({ children }) {
  return (
    <p className="font-display text-[0.68rem] font-semibold tracking-[0.28em] uppercase text-accent">
      {children}
    </p>
  );
}
