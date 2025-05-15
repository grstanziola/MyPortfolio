"use client";
import React from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export default function PortfolioGrid() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">My Portfolio</h2>
        <LayoutGrid items={portfolioItems} />
      </div>
    </section>
  );
}

// Sample portfolio items
const portfolioItems = [
  {
    id: "project1",
    type: "image" as const,
    src: "/images/project1.jpg", // Replace with your image path
    alt: "E-commerce Website",
    category: "web development",
    featured: true,
    href: "https://example.com/project1", // Replace with your project URL
  },
  {
    id: "project2",
    type: "image" as const,
    src: "/images/project2.jpg", // Replace with your image path
    alt: "Mobile App UI Design",
    category: "ui/ux design",
    featured: false,
    href: "https://example.com/project2", // Replace with your project URL
  },
  {
    id: "project3",
    type: "video" as const,
    videoId: "dQw4w9WgXcQ", // Replace with your YouTube video ID
    thumbnail: "/images/project3-thumbnail.jpg", // Replace with your thumbnail
    alt: "Project Demo Video",
    category: "mobile development",
    featured: false,
  },
  {
    id: "project4",
    type: "image" as const,
    src: "/images/project4.jpg", // Replace with your image path
    alt: "Dashboard Design",
    category: "web application",
    featured: true,
    href: "https://example.com/project4", // Replace with your project URL
  },
];