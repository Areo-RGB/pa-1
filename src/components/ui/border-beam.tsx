"use client";

import { cn } from "@/lib/utils";
import { motion, MotionStyle, Transition } from "motion/react";

interface BorderBeamProps {
  /**
   * The size of the border beam.
   */
  size?: number;
  /**
   * The duration of the border beam.
   */
  duration?: number;
  /**
   * The delay of the border beam.
   */
  delay?: number;
  /**
   * The color of the border beam from.
   */
  colorFrom?: string;
  /**
   * The color of the border beam to.
   */
  colorTo?: string;
  /**
   * The motion transition of the border beam.
   */
  transition?: Transition;
  /**
   * The class name of the border beam.
   */
  className?: string;
  /**
   * The style of the border beam.
   */
  style?: React.CSSProperties;
  /**
   * Whether to reverse the animation direction.
   */
  reverse?: boolean;
  /**
   * The initial offset position (0-100).
   */
  initialOffset?: number;
}

export const BorderBeam = ({
  className,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
}: BorderBeamProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <motion.div
        className={cn(
          "absolute h-full w-full",
          className,
        )}
        style={
          {
            "--color-from": colorFrom,
            "--color-to": colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ translateX: reverse ? "100%" : "-100%", translateY: "-100%" }}
        animate={{ 
          translateX: reverse ? "-100%" : "100%", 
          translateY: "100%" 
        }}
        transition={{
          repeat: Infinity,
          duration,
          delay,
          ease: "linear",
          ...transition,
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-from)] to-[var(--color-to)]"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[var(--color-to)] to-[var(--color-from)]"></div>
        <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-gradient-to-b from-[var(--color-from)] to-[var(--color-to)]"></div>
        <div className="absolute top-0 bottom-0 right-0 w-[3px] bg-gradient-to-b from-[var(--color-to)] to-[var(--color-from)]"></div>
      </motion.div>
    </div>
  );
}; 