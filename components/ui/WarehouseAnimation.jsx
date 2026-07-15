"use client";

import { motion } from "framer-motion";

export default function WarehouseAnimation() {
  return (
    <div className="relative w-full h-[420px] flex items-start justify-end pr-4 pt-4">
      
      <motion.img
        src="/isometric-warehouse.png"
        alt="Warehouse"
        className="w-[380px] md:w-[440px] lg:w-[520px] object-contain"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}