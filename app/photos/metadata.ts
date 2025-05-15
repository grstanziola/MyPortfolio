import type { Metadata } from "next";
import { metaData } from "@/config";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "Explore a collection of stunning photos and videos showcasing photography, travel experiences, and creative projects.",
  openGraph: {
    title: "Media Gallery | " + metaData.title,
    description: "Explore a collection of stunning photos and videos showcasing photography, travel experiences, and creative projects.",
    images: [metaData.ogImage],
    url: `${metaData.baseUrl}/photos`,
    siteName: metaData.title,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Media Gallery | " + metaData.title,
    description: "Explore a collection of stunning photos and videos showcasing photography, travel experiences, and creative projects.",
    images: [metaData.ogImage],
  },
  alternates: {
    canonical: `${metaData.baseUrl}/photos`,
  },
};