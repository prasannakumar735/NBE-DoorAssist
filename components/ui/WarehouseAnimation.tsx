"use client";

import { motion } from "framer-motion";

export default function WarehouseAnimation() {
  return (
    <div className="relative w-full h-[420px] flex items-start justify-end pr-4 pt-4">

      {/* Base Image */}
      <img
        src="/isometric-warehouse.png"
        alt="Warehouse"
        className="w-[380px] md:w-[440px] lg:w-[520px] object-contain"
      />

      {/* Door 1 (left dock) */}
      <motion.div
        className="absolute bg-[#FC8347] rounded-sm shadow-sm"
        style={{
          bottom: "135px",
          right: "240px",
          width: "42px",
          height: "60px",
          transformOrigin: "top",
        }}
        animate={{ scaleY: [1, 0.15, 1] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Door 2 (middle dock) */}
      <motion.div
        className="absolute bg-[#FC8347] rounded-sm shadow-sm"
        style={{
          bottom: "135px",
          right: "180px",
          width: "42px",
          height: "60px",
          transformOrigin: "top",
        }}
        animate={{ scaleY: [1, 0.15, 1] }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cold Storage Door */}
      <motion.div
        className="absolute bg-[#FC8347] rounded-sm shadow-sm"
        style={{
          bottom: "95px",
          right: "95px",
          width: "48px",
          height: "65px",
          transformOrigin: "top",
        }}
        animate={{ scaleY: [1, 0.2, 1] }}
        transition={{
          duration: 4,
          delay: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}