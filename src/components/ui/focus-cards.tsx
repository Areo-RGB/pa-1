"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: any;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
      if (hovered === index && videoRef.current && card.videoSrc) {
        videoRef.current.play().catch(error => console.error("Error playing video:", error));
      } else if (videoRef.current) {
        videoRef.current.pause();
        if (videoRef.current.currentTime > 0) {
          videoRef.current.currentTime = 0;
        }
      }
    }, [hovered, index, card.videoSrc]);

    return (
      <div
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-[#1e2839] overflow-hidden h-60 md:h-80 w-full transition-all duration-300 ease-out shadow-md",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
          hovered === index && "scale-[1.02] shadow-xl"
        )}
      >
        {/* Card container with proper sizing */}
        <div className="absolute inset-0 w-full h-full">
          {card.videoSrc ? (
            <>
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={card.src}
                  alt={card.title}
                  className={cn(
                    "w-full h-full object-cover object-center transition-opacity duration-500 z-10",
                    hovered === index ? "opacity-0" : "opacity-100"
                  )}
                />
              </div>
              <div className="absolute inset-0 w-full h-full">
                <video
                  ref={videoRef}
                  src={card.videoSrc}
                  muted
                  playsInline
                  loop
                  className={cn(
                    "w-full h-full object-cover object-center transition-opacity duration-500 z-10",
                    hovered === index ? "opacity-100" : "opacity-0"
                  )}
                />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <img
                src={card.src}
                alt={card.title}
                className="w-full h-full object-cover object-center z-10"
              />
            </div>
          )}
          
          {/* Card overlay for title */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end py-8 px-6 transition-opacity duration-300 z-20",
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="text-xl md:text-2xl font-medium text-white drop-shadow-md">
              {card.title}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

interface Card {
  title: string;
  src: string;
  videoSrc: string;
}

interface FocusCardsProps {
  cards: Card[];
  className?: string;  // Make className optional
}

export function FocusCards({ cards, className }: FocusCardsProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full bg-transparent ${className || ''}`}>
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
