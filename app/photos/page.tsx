"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { FaPlay, FaImage, FaVideo } from "react-icons/fa";
import { YouTubeComponent } from "../components/youtube";

// Define the media types
type MediaType = "image" | "video";

// Common interface for all media items
interface MediaItem {
  id: string;
  type: MediaType;
  alt: string;
  href?: string;
  category?: string;
  featured?: boolean;
}

// Interface for image media
interface ImageMedia extends MediaItem {
  type: "image";
  src: string;
}

// Interface for video media
interface VideoMedia extends MediaItem {
  type: "video";
  videoId: string; // YouTube video ID
  thumbnail?: string; // Optional custom thumbnail
}

// Union type for all media
type Media = ImageMedia | VideoMedia;

export default function MediaGallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Sample media data - in the future, this would come from your database
  const allMedia: Media[] = [
    {
      id: "1",
      type: "image",
      src: "/photos/photo1.jpg",
      alt: "Roman columns",
      href: "https://unsplash.com/photos/people-walking-near-building-during-daytime-dFLBDQQeffU",
      category: "architecture",
      featured: true,
    },
    {
      id: "2",
      type: "image",
      src: "/photos/photo2.jpg",
      alt: "Big Ben",
      href: "https://unsplash.com/photos/big-ben-london-MdJq0zFUwrw",
      category: "landmarks",
      featured: true,
    },
    {
      id: "3",
      type: "video",
      videoId: "wXhTHyIgQ_U", // Sample YouTube ID from your existing components
      alt: "Aerial Tour of Paris",
      category: "travel",
      featured: true,
    },
    {
      id: "4",
      type: "image",
      src: "/photos/photo3.jpg",
      alt: "Sacré-Cœur Basilica",
      href: "https://unsplash.com/photos/a-view-of-the-inside-of-a-building-through-a-circular-window-Tp-3hrx88J4",
      category: "architecture",
    },
    {
      id: "5",
      type: "image",
      src: "/photos/photo4.jpg",
      alt: "Eiffel Tower",
      href: "https://unsplash.com/photos/the-eiffel-tower-towering-over-the-city-of-paris-OgPuPvPsHLM",
      category: "landmarks",
    },
    {
      id: "6",
      type: "video",
      videoId: "hDU4oiyhI0g", // Another sample YouTube ID
      alt: "London City Tour",
      category: "travel",
    },
    {
      id: "7",
      type: "image",
      src: "/photos/photo5.jpg",
      alt: "Taj Mahal",
      href: "https://unsplash.com/photos/taj-mahal-india-IPlPkWPJ2fo",
      category: "landmarks",
    },
    {
      id: "8",
      type: "image",
      src: "/photos/photo6.jpg",
      alt: "Colosseum",
      href: "https://unsplash.com/photos/brown-concrete-building-under-blue-sky-during-daytime-3cyBR1rIJmA",
      category: "architecture",
    },
    // In a real app, you would fetch these from a database
  ];

  // Categories derived from media items - fixed to handle TypeScript Set iteration
  const categorySet = new Set<string>();
  allMedia.forEach(item => {
    if (item.category) categorySet.add(item.category);
  });
  const categories = ["all", ...Array.from(categorySet)];
  
  // Media types for filtering
  const mediaTypes = [
    { id: "all", label: "All Media", icon: null },
    { id: "image", label: "Photos", icon: <FaImage className="mr-2" /> },
    { id: "video", label: "Videos", icon: <FaVideo className="mr-2" /> },
  ];

  useEffect(() => {
    // Reset loaded state when filters change
    setIsLoaded(false);
    
    // Filter media based on selected category and type
    let filteredMedia = [...allMedia];
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filteredMedia = filteredMedia.filter(item => item.category === selectedCategory);
    }
    
    // Apply type filter
    if (selectedType !== "all") {
      filteredMedia = filteredMedia.filter(item => item.type === selectedType);
    }
    
    setMedia(filteredMedia);
    
    // Add a small delay to ensure smooth animation
    setTimeout(() => {
      setIsLoaded(true);
    }, 200);
  }, [selectedCategory, selectedType]);

  // Render different media types
  const renderMediaItem = (item: Media, index: number) => {
    if (item.type === "image") {
      return renderImage(item, index);
    } else if (item.type === "video") {
      return renderVideo(item, index);
    }
    return null;
  };

  // Render an image item
  const renderImage = (item: ImageMedia, index: number) => (
    <div className="relative aspect-square w-full h-full overflow-hidden">
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        priority={index < 6}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 transition-all duration-300 group-hover:bg-opacity-30" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="font-medium">{item.alt}</h3>
        <p className="text-sm text-gray-200">{item.category}</p>
      </div>
      
      {item.href && (
        <a 
          href={item.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0"
          aria-label={`View ${item.alt}`}
        >
          <span className="sr-only">View on Unsplash</span>
        </a>
      )}
    </div>
  );

  // Render a video item
  const renderVideo = (item: VideoMedia, index: number) => (
    <div className="relative w-full h-full">
      <div className="aspect-video w-full overflow-hidden rounded-lg">
        <YouTubeComponent videoId={item.videoId} />
      </div>
      <div className="p-3">
        <h3 className="font-medium text-black dark:text-white">{item.alt}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{item.category}</p>
      </div>
    </div>
  );

  return (
    <section className="w-full">
      <h1 className="mb-6 text-2xl font-medium">Media Gallery</h1>
      
      {/* Filter controls */}
      <div className="mb-8 space-y-4">
        {/* Media type filter */}
        <div className="flex flex-wrap gap-2">
          {mediaTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-all flex items-center",
                selectedType === type.id
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {type.icon}
              {type.label}
            </button>
          ))}
        </div>
        
        {/* Category filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 text-sm rounded-md transition-all",
                selectedCategory === category
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Layout grid - different layout for videos vs images */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-max">
        {media.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className={cn(
              "group relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800",
              item.featured && item.type === "image" && "md:col-span-2 md:row-span-2",
              item.type === "video" && "md:col-span-2" // Videos take 2 columns
            )}
          >
            {renderMediaItem(item, index)}
          </motion.div>
        ))}
      </div>

      {/* Show message when no results */}
      {media.length === 0 && (
        <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-gray-600 dark:text-gray-300">No media found matching your filters.</p>
          <button 
            onClick={() => {
              setSelectedCategory("all");
              setSelectedType("all");
            }}
            className="mt-4 px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-md"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Admin info */}
      <div className="mt-12 p-6 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
        <h2 className="text-lg font-medium mb-2">Admin Information</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This gallery supports both images and videos (YouTube embeds). In the future, you'll be able to:
        </p>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-1">
          <li>Upload images directly from the admin interface</li>
          <li>Add YouTube videos by simply pasting the URL</li>
          <li>Create and manage custom categories</li>
          <li>Reorder media items with drag and drop</li>
          <li>Track view counts and engagement</li>
        </ul>
      </div>
    </section>
  );
}