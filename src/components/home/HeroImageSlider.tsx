"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface HeroImageSliderProps {
  images: string[];
  alt?: string;
  sizes?: string;
  className?: string;
  imageClassName?: string;
  intervalMs?: number;
  fadeDurationMs?: number;
}

export default function HeroImageSlider({
  images,
  alt = "Treqo Modern Digital Marketing - Practical Training",
  sizes = "(min-width: 1536px) 720px, (min-width: 1280px) 660px, (min-width: 1024px) 580px, 100vw",
  className = "relative h-full w-full",
  imageClassName = "object-contain object-right drop-shadow-[0_20px_45px_rgba(59,13,59,0.15)] select-none",
  intervalMs = 2000,
  fadeDurationMs = 700,
}: HeroImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Preload all slider images so crossfade transitions never stutter or flash blank
  useEffect(() => {
    if (typeof window === "undefined" || !images.length) return;
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Rotate images every 2 seconds in a continuous loop
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [images.length, intervalMs]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      {images.map((src, index) => {
        const isActive = index === currentIndex;
        return (
          <div
            key={src + "-" + index}
            className="absolute inset-0 will-change-[opacity]"
            style={{
              opacity: isActive ? 1 : 0,
              zIndex: isActive ? 10 : 0,
              transition: `opacity ${fadeDurationMs}ms ease-in-out`,
              pointerEvents: isActive ? "auto" : "none",
            }}
            aria-hidden={!isActive}
          >
            <Image
              src={src}
              alt={`${alt} - Slide ${index + 1}`}
              fill
              priority={index === 0 || index === 1}
              sizes={sizes}
              className={imageClassName}
            />
          </div>
        );
      })}
    </div>
  );
}
