"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { TypewriterEffect } from "./typewriter-effect";

// Add CSS for glow effects and animations
const customStyles = `
  .glow-effect {
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5), 0 0 15px rgba(6, 182, 212, 0.3);
  }
  .glow-timeline {
    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5), 0 0 20px rgba(6, 182, 212, 0.3);
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 1s ease-out forwards;
  }
`;

interface TimelineEntry {
  title: React.ReactNode;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const adjustedHeight = Math.min(rect.height, data.length * 400 + 200);
      setHeight(adjustedHeight);
    }
  }, [ref, data.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 5%", "end 95%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className={`w-full min-h-screen bg-gradient-to-b from-white to-blue-50 dark:from-neutral-950 dark:to-blue-950/20 font-sans md:px-10 overflow-y-auto`}
      ref={containerRef}
    >
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="max-w-7xl w-full mx-auto pt-12 pb-4 md:pt-20 md:pb-10 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-center justify-center text-center mb-10 md:mb-16 pt-6 md:pt-10">
          <TypewriterEffect
            words={[
              { text: "Finley" },
              { text: "Passen", className: "text-blue-500" }
            ]}
            className="text-3xl md:text-6xl mb-4 md:mb-6 font-bold"
            cursorClassName="bg-cyan-500"
          />
          <div className="flex items-center justify-center w-full mb-8 opacity-0 animate-fadeIn" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blue-300 dark:to-blue-700"></div>
            <div className="mx-2">
              <div className="w-3 h-3 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 glow-effect"></div>
            </div>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blue-300 dark:to-blue-700"></div>
          </div>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20 px-4 md:px-8 lg:px-10">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-28 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-20 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-12 absolute left-3 md:left-3 w-12 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30 border border-blue-100 dark:border-blue-900">
                <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-500 glow-effect border border-blue-200 dark:border-blue-800" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-400">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full transform transition-all duration-500 hover:scale-[1.01]">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                {item.title}
              </h3>
              <div className="hover:shadow-xl transition-all duration-300 mb-10 md:mb-20">
                {item.content}{" "}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: data.length > 1 ? height + "px" : "50vh",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[3px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-blue-200 dark:via-blue-800 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[3px] bg-gradient-to-t from-cyan-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full glow-timeline"
          />
        </div>
      </div>
    </div>
  );
};
