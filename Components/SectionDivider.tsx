"use client";

import React from 'react';
import { motion } from 'framer-motion';

type SectionDividerProps = {
  bgColor: string;
  flip?: boolean;
};

export default function SectionDivider({ bgColor, flip = false }: SectionDividerProps) {
  return (
    <div className={`relative ${bgColor} ${flip ? '-mt-1' : '-mb-1'}`}>
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="w-full h-12 md:h-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.8 }}
      >
        <motion.path
          d={flip ? "M0 0 H 1440 V 100 C 1181.33 33.3333 711.5 0 0 100 Z" : "M0 100 H 1440 V 0 C 1181.33 66.6667 711.5 100 0 0 Z"}
          className="fill-current text-white"
        />
      </motion.svg>
    </div>
  );
}