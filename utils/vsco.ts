/**
 * Utility functions for handling VSCO image URLs
 */

/**
 * Extracts the image ID from a VSCO URL
 * @param vscoUrl The VSCO URL (e.g., https://vsco.co/username/image/123456789)
 * @returns The image ID or null if invalid
 */
export function extractVscoImageId(vscoUrl: string): string | null {
  try {
    const url = new URL(vscoUrl);
    if (!url.hostname.includes('vsco.co')) {
      return null;
    }

    // VSCO URLs typically follow the pattern: vsco.co/username/image/123456789
    const parts = url.pathname.split('/');
    const imageIndex = parts.indexOf('image');
    if (imageIndex === -1 || imageIndex === parts.length - 1) {
      return null;
    }

    return parts[imageIndex + 1];
  } catch {
    return null;
  }
}

/**
 * Converts a VSCO image ID to a direct image URL
 * Note: This is a simplified example. VSCO's actual image URL structure may be different
 * and might require additional API calls or different URL patterns.
 * 
 * @param imageId The VSCO image ID
 * @returns A direct image URL or null if invalid
 */
export function getVscoImageUrl(imageId: string): string | null {
  if (!imageId) return null;
  
  // This is a placeholder. You'll need to implement the actual VSCO image URL structure
  // or use VSCO's API if available
  return `https://image-aws-us-west-2.vsco.co/${imageId}/image.jpg`;
}

/**
 * Validates if a URL is a valid VSCO image URL
 * @param url The URL to validate
 * @returns boolean indicating if the URL is valid
 */
export function isValidVscoUrl(url: string): boolean {
  return extractVscoImageId(url) !== null;
} 