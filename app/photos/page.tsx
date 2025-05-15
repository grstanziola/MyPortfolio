"use client";
import React, { useState } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";
import { motion } from "framer-motion";

// Categories for filtering
const categories = ["All", "Nature", "Architecture", "Travel"] as const;
type Category = typeof categories[number];

// Card content components with improved styling
const CardContent = ({ title, description, category }: { title: string; description: string; category: Category }) => (
  <div className="space-y-1.5">
    <h3 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-white line-clamp-2 tracking-tight">
      {title}
    </h3>
    <p className="font-normal text-xs sm:text-sm md:text-base text-neutral-200/90 line-clamp-2 leading-relaxed">
      {description}
    </p>
    <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-black/60 text-white/90 rounded-full backdrop-blur-sm">
      {category}
    </span>
  </div>
);

// Sample data with categories
const cards = [
  {
    id: 1,
    content: <CardContent 
      title="House in the woods" 
      description="A serene and tranquil retreat, this house in the woods offers a peaceful escape from the hustle and bustle of city life."
      category="Nature"
    />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1476231682828-37e571bc172f?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nature" as Category,
  },
  {
    id: 2,
    content: <CardContent 
      title="House above the clouds" 
      description="Perched high above the world, this house offers breathtaking views and a unique living experience."
      category="Architecture"
    />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1464457312035-3d7d0e0c058e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Architecture" as Category,
  },
  {
    id: 3,
    content: <CardContent 
      title="Greens all over" 
      description="A house surrounded by greenery and nature's beauty. It's the perfect place to relax and unwind."
      category="Nature"
    />,
    className: "col-span-1",
    thumbnail: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Nature" as Category,
  },
  {
    id: 4,
    content: <CardContent 
      title="Rivers are serene" 
      description="A house by the river is a place of peace and tranquility. It's the perfect place to enjoy life."
      category="Travel"
    />,
    className: "md:col-span-2",
    thumbnail: "https://images.unsplash.com/photo-1475070929565-c985b496cb9f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "Travel" as Category,
  },
];

export default function Photos() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [isLoading, setIsLoading] = useState(false);

  // Filter cards based on selected category
  const filteredCards = selectedCategory === "All" 
    ? cards 
    : cards.filter(card => card.category === selectedCategory);

  return (
    <section className="w-full">
      {/* Header and filters in a centered, narrower container */}
      <div className="max-w-2xl mx-auto px-4 mb-8">
        <h1 className="text-2xl font-medium mb-4">Gallery</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setIsLoading(true);
                setSelectedCategory(category);
                setTimeout(() => setIsLoading(false), 300);
              }}
              className={`px-3 py-1.5 text-sm font-medium rounded-full transition-colors
                ${selectedCategory === category 
                  ? 'bg-neutral-800 text-white dark:bg-neutral-200 dark:text-black' 
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {/* Full-width grid container */}
      <div className="w-full px-0 sm:px-2">
        <div className="min-h-[80vh]">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`relative h-[300px] sm:h-[400px] rounded-lg bg-neutral-200 dark:bg-neutral-800 animate-pulse
                    ${i === 0 || i === 3 ? 'md:col-span-2' : 'col-span-1'}`}
                />
              ))}
            </div>
          ) : (
            <LayoutGrid cards={filteredCards} />
          )}
        </div>
      </div>
    </section>
  );
}
