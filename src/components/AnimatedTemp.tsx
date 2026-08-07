import { AnimatePresence, motion } from "motion/react";
import type { Unit } from "../lib/units";
import { inUnit } from "../lib/units";

export default function AnimatedTemp({
  value,
  unit,
  label,
}: {
  value: number;
  unit: Unit;
  label?: string;
}) {
  return (
    <AnimatePresence initial={false} mode="popLayout">
      <motion.span
        key={unit}
        className="inline-block whitespace-nowrap"
        initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {Math.round(inUnit(value, unit))}
        {label}
      </motion.span>
    </AnimatePresence>
  );
}
