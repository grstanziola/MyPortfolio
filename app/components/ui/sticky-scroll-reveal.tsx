// app/components/ui/sticky-scroll-reveal.tsx
"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    id: number;
    title: string | React.ReactNode;
    description: string | React.ReactNode;
    year?: number;
    techStack?: string[];
    projectUrl?: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  return (
    <div className="relative w-full">
      {/* Vertical navigation dots on the left side */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col space-y-3 sm:left-6 md:left-8 lg:left-12">
        {content.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              // Calculate the position to scroll to
              const position = (index / cardLength) * (ref.current?.scrollHeight || 0);
              ref.current?.scrollTo({
                top: position,
                behavior: 'smooth'
              });
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              activeCard === index 
              ? "bg-black dark:bg-white scale-125" 
              : "bg-gray-300 dark:bg-gray-600 scale-100 hover:bg-gray-400 dark:hover:bg-gray-500"
            )}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
      
      <div 
        ref={ref}
        className="relative h-[85vh] overflow-y-auto no-scrollbar w-full"
      >
        {content.map((item, index) => (
          <div 
            key={item.id} 
            className="min-h-screen w-full flex items-center py-16"
          >
            <div className="w-full max-w-[624px] mx-auto px-6 sm:px-4 md:px-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left column - Text content */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeCard === index ? 1 : 0.3,
                    y: activeCard === index ? 0 : 20
                  }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4 max-w-xl ml-4 sm:ml-6 md:ml-8 lg:ml-0"
                >
                  {item.year && (
                    <div className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      Integrated Knowledge
                    </div>
                  )}
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">
                    {item.title}
                  </h2>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                    {item.description}
                  </div>
                  
                  {/* Tech stack labels */}
                  {item.techStack && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {/* Project link button */}
                  {item.projectUrl && (
                    <div className="pt-4">
                      <Link 
                        href={item.projectUrl}
                        className="inline-flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-md text-sm font-medium transition-colors hover:bg-gray-800 dark:hover:bg-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Learn More
                        <svg 
                          className="ml-2 h-4 w-4" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M14 5l7 7m0 0l-7 7m7-7H3" 
                          />
                        </svg>
                      </Link>
                    </div>
                  )}
                </motion.div>
                
                {/* Right column - Image/Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ 
                    opacity: activeCard === index ? 1 : 0,
                    scale: activeCard === index ? 1 : 0.95,
                    display: activeCard === index ? 'block' : 'none'
                  }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "w-full aspect-square",
                    contentClassName
                  )}
                >
                  {item.content}
                </motion.div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};