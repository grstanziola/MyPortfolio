import React, { useState } from 'react';
import { client } from '../sanity/lib/client';
import { extractVscoImageId, getVscoImageUrl, isValidVscoUrl } from '../utils/vsco';

interface VSCOUploadProps {
  onUploadComplete: () => void;
}

export function VSCOUpload({ onUploadComplete }: VSCOUploadProps) {
  const [vscoUrl, setVscoUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('nature');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);

    try {
      if (!isValidVscoUrl(vscoUrl)) {
        throw new Error('Invalid VSCO URL. Please provide a valid VSCO image URL.');
      }

      const imageId = extractVscoImageId(vscoUrl);
      if (!imageId) {
        throw new Error('Could not extract image ID from VSCO URL.');
      }

      const imageUrl = getVscoImageUrl(imageId);
      if (!imageUrl) {
        throw new Error('Could not generate image URL.');
      }

      // First, create an asset in Sanity
      const asset = await client.assets.upload('image', await fetch(imageUrl).then(r => r.blob()), {
        filename: `vsco-${imageId}.jpg`,
      });

      // Then create the photo document
      const doc = {
        _type: 'photo',
        title,
        description,
        category,
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id
          }
        },
        order: 0, // You might want to implement a way to determine the order
      };

      await client.create(doc);
      setVscoUrl('');
      setTitle('');
      setDescription('');
      onUploadComplete();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Upload VSCO Image</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="vscoUrl" className="block text-sm font-medium text-gray-700">
            VSCO Image URL
          </label>
          <input
            type="url"
            id="vscoUrl"
            value={vscoUrl}
            onChange={(e) => setVscoUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
            placeholder="https://vsco.co/..."
            required
          />
        </div>

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-neutral-500 focus:ring-neutral-500"
          >
            <option value="nature">Nature</option>
            <option value="architecture">Architecture</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium ${
            isUploading
              ? 'bg-neutral-400 cursor-not-allowed'
              : 'bg-neutral-800 hover:bg-neutral-700'
          }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </form>
    </div>
  );
} 