"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaImage, FaVideo, FaExternalLinkAlt } from "react-icons/fa";

type MediaType = "image" | "video";

interface MediaItem {
  id: string;
  type: MediaType;
  alt: string;
  href?: string;
  category?: string;
  featured?: boolean;
  content?: React.ReactNode;
}

interface ImageMedia extends MediaItem {
  type: "image";
  src: string;
}

interface VideoMedia extends MediaItem {
  type: "video";
  videoId: string;
  thumbnail?: string;
}

type Media = ImageMedia | VideoMedia;

interface Card {
  id: number;
  content: React.ReactNode;
  className?: string;
  thumbnail: string;
}

interface LayoutGridProps {
  cards: Card[];
}

export const LayoutGrid = ({ cards }: LayoutGridProps) => {
  const [selected, setSelected] = React.useState<Card | null>(null);
  const [lastSelected, setLastSelected] = React.useState<Card | null>(null);

  const handleClick = (card: Card) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="h-full w-full p-4 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
      {cards.map((card, i) => (
        <div key={card.id} className={cn(card.className, "relative")}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              "relative overflow-hidden rounded-lg cursor-pointer",
              selected?.id === card.id
                ? "ring-2 ring-neutral-200/50"
                : "ring-1 ring-neutral-200/20"
            )}
            layoutId={`card-${card.id}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative h-[300px] w-full">
              <Image
                src={card.thumbnail}
                alt={`Card ${card.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={i < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-4">
              {card.content}
            </div>
          </motion.div>
        </div>
      ))}

      {/* Modal */}
      {selected && (
        <motion.div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={handleOutsideClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative max-w-4xl w-full bg-neutral-900 rounded-lg overflow-hidden"
            layoutId={`card-${selected.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] w-full">
              <Image
                src={selected.thumbnail}
                alt={`Selected card ${selected.id}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 left-0 p-8">
              {selected.content}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

const MediaThumbnail = ({ item }: { item: Media }) => {
  if (item.type === "image") {
    return (
      <motion.div
        layoutId={`image-${item.id}-container`}
        className="absolute inset-0 h-full w-full"
      >
        <div className="absolute top-2 right-2 z-20">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <FaImage className="mr-1" size={10} />
            Photo
          </span>
        </div>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-lg font-medium">{item.alt}</h3>
            {item.category && (
              <span className="text-sm text-gray-300 capitalize">{item.category}</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  } else if (item.type === "video") {
    return (
      <motion.div
        layoutId={`video-${item.id}-container`}
        className="absolute inset-0 h-full w-full"
      >
        <div className="absolute top-2 right-2 z-20">
          <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center">
            <FaVideo className="mr-1" size={10} />
            Video
          </span>
        </div>
        {item.thumbnail ? (
          <Image
            src={item.thumbnail}
            alt={item.alt}
            fill
            className="object-cover object-center"
          />
        ) : (
          <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
            <FaVideo className="text-white text-4xl" />
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <div className="ml-1 w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white border-b-[8px] border-b-transparent"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-100">
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h3 className="text-lg font-medium">{item.alt}</h3>
            {item.category && (
              <span className="text-sm text-gray-300 capitalize">{item.category}</span>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
  return null;
};

const SelectedMedia = ({ selected }: { selected: Media | null }) => {
  if (!selected) return null;

  if (selected.type === "image") {
    return (
      <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
        />
        <motion.div
          layoutId={`content-${selected.id}`}
          className="relative px-8 pb-4 z-[70]"
        >
          <div>
            <p className="font-bold md:text-4xl text-xl text-white">
              {selected.alt}
            </p>
            {selected.category && (
              <p className="font-normal text-sm text-gray-300 mt-2 capitalize">
                {selected.category}
              </p>
            )}
            {selected.href && (
              <a
                href={selected.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-blue-400 hover:text-blue-300"
              >
                View source <FaExternalLinkAlt className="ml-1" size={12} />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    );
  } else if (selected.type === "video") {
    return (
      <div className="bg-transparent h-full w-full flex flex-col justify-center items-center rounded-lg shadow-2xl relative z-[60]">
        <div className="w-full h-full max-w-3xl">
          <YouTubeComponent videoId={selected.videoId} />
        </div>
        <motion.div
          layoutId={`content-${selected.id}`}
          className="relative px-8 pb-4 z-[70] w-full max-w-3xl mt-4"
        >
          <div>
            <p className="font-bold md:text-2xl text-xl text-white">
              {selected.alt}
            </p>
            {selected.category && (
              <p className="font-normal text-sm text-gray-300 mt-2 capitalize">
                {selected.category}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
};

// YouTube component for embedding videos
const YouTubeComponent = ({ videoId }: { videoId: string }) => {
  return (
    <div className="aspect-video w-full">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full rounded-lg"
      ></iframe>
    </div>
  );
};