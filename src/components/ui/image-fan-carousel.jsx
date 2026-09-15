"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export const hobbyImages = [
  { src: "/hobbies/puppy.jpg", title: "Golden Retriever Companion", tag: "PETS & COMPANIONSHIP" },
  { src: "/hobbies/football.jpg", title: "Football / Turf Match", tag: "SPORTS & AGILITY" },
  { src: "/hobbies/cricket.jpg", title: "Cricket Batting Practice", tag: "ATHLETIC FOCUS" },
  { src: "/hobbies/travel.jpg", title: "Varanasi Ghats & Travel", tag: "HERITAGE & DISCOVERY" },
  { src: "/hobbies/physique.jpg", title: "Gym & Physique Conditioning", tag: "DEDICATION & STRENGTH" },
  { src: "/hobbies/nature.jpg", title: "Forest Trail & Hiking", tag: "NATURE & MINDFULNESS" },
  { src: "/hobbies/fitness.jpg", title: "Fitness & Arms Workout", tag: "DISCIPLINE" },
  { src: "/hobbies/lifestyle.jpg", title: "Outdoor Garden & Architecture", tag: "LIFESTYLE & DESIGN" },
  { src: "/hobbies/design.png", title: "UI/UX Interface Design", tag: "DIGITAL CRAFT" },
];

const AUTOPLAY_INTERVAL_MS = 2800;

const springTransition = {
  type: "spring",
  stiffness: 60,
  damping: 16,
  mass: 0.7,
};

const RADIUS_MIN = 140;
const RADIUS_MAX = 340;
const RADIUS_WIDTH_RATIO = 0.55;
const PERSPECTIVE_MULTIPLIER = 2.4;
const RING_TILT_DEG = 35;

const CROSSFADE_DURATION_S = 0.45;
const CROSSFADE_EASE = [0.22, 1, 0.36, 1];

const THUMB_SIZE_CLASSES =
  "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28";

const CENTER_SIZE_CLASSES =
  "w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-84 lg:h-84";

const BUTTON_SIZE_CLASSES = "w-10 h-10 sm:w-11 sm:h-11";

const ImageLoader = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-md">
    <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
  </div>
);

export const Carousel360 = () => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(240);
  const [loadedThumbs, setLoadedThumbs] = useState(() =>
    hobbyImages.map(() => false),
  );

  const numImages = hobbyImages.length;
  const angleStep = 360 / numImages;

  const steps = Math.round(rotation / angleStep);
  const centerIndex = ((-steps % numImages) + numImages) % numImages;
  const activeItem = hobbyImages[centerIndex];

  const [prevCenterIndex, setPrevCenterIndex] = useState(centerIndex);
  const [centerLoaded, setCenterLoaded] = useState(false);
  if (centerIndex !== prevCenterIndex) {
    setPrevCenterIndex(centerIndex);
    setCenterLoaded(false);
  }

  useEffect(() => {
    const updateRadius = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setRadius(
        Math.max(RADIUS_MIN, Math.min(RADIUS_MAX, width * RADIUS_WIDTH_RATIO)),
      );
    };
    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => prev + angleStep);
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [angleStep]);

  const rotateCarousel = useCallback(
    (direction) => {
      setRotation(
        (prev) => prev + (direction === "left" ? -angleStep : angleStep),
      );
    },
    [angleStep],
  );

  const markThumbLoaded = useCallback((index) => {
    setLoadedThumbs((prev) => {
      if (prev[index]) return prev;
      const next = [...prev];
      next[index] = true;
      return next;
    });
  }, []);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-4 sm:py-8 z-20">
      <div
        ref={containerRef}
        className="relative w-[95%] max-w-[650px] aspect-[5/3] flex items-center justify-center"
      >
        {/* 3D Ring Container */}
        <div
          className="relative w-full h-full"
          style={{ perspective: radius * PERSPECTIVE_MULTIPLIER }}
        >
          {hobbyImages.map((item, index) => {
            const targetAngle = rotation + angleStep * index;
            return (
              <motion.div
                key={item.src}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: targetAngle }}
                transition={springTransition}
              >
                <motion.div
                  className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.6)] border border-white/20 bg-neutral-900 cursor-pointer pointer-events-auto"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    rotateY: -targetAngle,
                    rotateX: RING_TILT_DEG,
                    z: radius,
                  }}
                  transition={springTransition}
                  onClick={() => setRotation(-angleStep * index)}
                >
                  {!loadedThumbs[index] && <ImageLoader />}
                  <img
                    src={item.src}
                    alt={item.title}
                    onLoad={() => markThumbLoaded(index)}
                    className={`object-cover ${THUMB_SIZE_CLASSES} transition-all duration-300 ${
                      loadedThumbs[index] ? "opacity-90 hover:opacity-100 hover:scale-105" : "opacity-0"
                    }`}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Center Focus Image Card */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={centerIndex}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -15 }}
              transition={{
                duration: CROSSFADE_DURATION_S,
                ease: CROSSFADE_EASE,
              }}
              className="relative rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/30 bg-neutral-950 pointer-events-auto group"
            >
              {!centerLoaded && <ImageLoader />}
              <img
                src={activeItem.src}
                alt={activeItem.title}
                loading="lazy"
                onLoad={() => setCenterLoaded(true)}
                className={`object-cover ${CENTER_SIZE_CLASSES} transition-opacity duration-300 ${
                  centerLoaded ? "opacity-100" : "opacity-0"
                }`}
              />

              {/* Bottom Vignette & Title Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-5 text-left">
                <span className="font-sans text-[10px] text-emerald-400 font-semibold tracking-[0.18em] uppercase mb-1">
                  {activeItem.tag}
                </span>
                <h3 className="text-base sm:text-xl font-light text-white font-sans tracking-tight">
                  {activeItem.title}
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Parallel Corner Navigation Buttons (Left & Right Sides) */}
        <button
          type="button"
          aria-label="Previous image"
          onClick={() => rotateCarousel("left")}
          className={`absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30 group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-lg shadow-black/40 opacity-70 hover:opacity-100
                     transition-all duration-200 active:scale-90 cursor-pointer border border-white/10 hover:border-white/30`}
        >
          <span className="absolute inset-0 rounded-full bg-white/[0.04] backdrop-blur-md transition-all duration-200 group-hover:bg-white/15" />
          <FaArrowLeft className="relative z-10 h-3 w-3 text-neutral-400 group-hover:text-white transition-colors duration-200" />
        </button>

        <button
          type="button"
          aria-label="Next image"
          onClick={() => rotateCarousel("right")}
          className={`absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30 group relative flex items-center justify-center ${BUTTON_SIZE_CLASSES} rounded-full overflow-hidden
                     shadow-lg shadow-black/40 opacity-70 hover:opacity-100
                     transition-all duration-200 active:scale-90 cursor-pointer border border-white/10 hover:border-white/30`}
        >
          <span className="absolute inset-0 rounded-full bg-white/[0.04] backdrop-blur-md transition-all duration-200 group-hover:bg-white/15" />
          <FaArrowRight className="relative z-10 h-3 w-3 text-neutral-400 group-hover:text-white transition-colors duration-200" />
        </button>
      </div>

      {/* Centered Index Counter */}
      <div className="mt-6 z-30">
        <span className="font-sans font-medium text-[11px] text-neutral-500 uppercase tracking-[0.18em] px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.02]">
          {centerIndex + 1} / {numImages}
        </span>
      </div>
    </div>
  );
};

export default Carousel360;
