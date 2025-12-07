"use client";

import { useEffect, useRef } from "react";

const LOOP_START = 1.0; // seconds – after the initial “appear” animation
const LOOP_END = 7.0;   // seconds – before the fade / reset

export default function AboutHeroVideoLayer() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      // Start inside the clean loop region
      video.currentTime = LOOP_START;
      video.play().catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (video.currentTime >= LOOP_END) {
        // Jump back to start of clean loop region
        video.currentTime = LOOP_START;
        // play() is usually not needed, but we call it just in case
        video.play().catch(() => {});
      }
    };

    video.addEventListener("loadedmetadata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="
          absolute inset-0
          h-full w-full
          object-cover
          object-[60%_50%]
          scale-[1.4]
        "
        autoPlay
        muted
        playsInline
        preload="metadata"
        // DO NOT set `loop` – we control the loop manually
      >
        <source src="/videos/about-orb-loop.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
