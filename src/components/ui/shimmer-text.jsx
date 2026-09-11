"use client";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";

function TextShimmerComponent({
  children,
  as: Component = "p",
  className,
  duration = 2,
  spread = 2,
}) {
  const MotionComponent = motion.create
    ? motion.create(Component)
    : motion(Component);

  const dynamicSpread = useMemo(() => {
    return typeof children === "string" ? children.length * spread : 20 * spread;
  }, [children, spread]);

  return (
    <MotionComponent
      animate={{ backgroundPosition: "0% center" }}
      className={cn(
        "relative inline-block bg-[length:250%_100%,auto] bg-clip-text",
        "text-transparent [--base-color:#a1a1aa] [--base-gradient-color:#ffffff]",
        "[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]",
        "dark:[--base-color:#a1a1aa] dark:[--base-gradient-color:#ffffff] dark:[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))]",
        className
      )}
      initial={{ backgroundPosition: "100% center" }}
      style={{
        "--spread": `${dynamicSpread}px`,
        backgroundImage:
          "var(--bg), linear-gradient(var(--base-color), var(--base-color))",
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration,
        ease: "linear",
      }}
    >
      {children}
    </MotionComponent>
  );
}

export const TextShimmer = React.memo(TextShimmerComponent);
