// app/admin/projects/page.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Project {
  id: number;
  title: string;
  year: number;
  description: string;
  url: string;
  content_type: 'gradient' | 'image';
  background_color: string;
  image_url: string;
}

type ContentType = 'gradient' | 'image';

export default function AdminProjects() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    year: new Date().getFullYear(),
    description: '',
    url: '',
    content_type: 'gradient' as ContentType,
    background_color: 'cyan-emerald',
    image_url: ''
  });

  // Fetch existing projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects');
        if (response.ok) {
          const data = await response.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProjects();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("Submitting form data:", formData);
    
    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error response:", errorData);
        alert(`Failed to add project: ${errorData.details || errorData.error || 'Unknown error'}`);
        return;
      }
      
      const newProject = await response.json();
      console.log("Successfully created project:", newProject);
      
      // Update projects list
      setProjects(prevProjects => [...prevProjects, newProject]);
      
      alert('Project added successfully!');
      // Reset form
      setFormData({
        title: '',
        year: new Date().getFullYear(),
        description: '',
        url: '',
        content_type: 'gradient',
        background_color: 'cyan-emerald',
        image_url: ''
      });
    } catch (error) {
      console.error('Error adding project:', error);
      alert(`Error adding project: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Project</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">URL</label>
          <input
            type="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div>
          <label className="block mb-1">Content Type</label>
          <select
            name="content_type"
            value={formData.content_type}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="gradient">Gradient</option>
            <option value="image">Image</option>
          </select>
        </div>
        
        {formData.content_type === ('gradient' as ContentType) && (
          <div>
            <label className="block mb-1">Background Style</label>
            <select
              name="background_color"
              value={formData.background_color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="cyan-emerald">Cyan to Emerald</option>
              <option value="pink-indigo">Pink to Indigo</option>
              <option value="orange-yellow">Orange to Yellow</option>
            </select>
          </div>
        )}
        
        {formData.content_type === ('image' as ContentType) && (
          <div>
            <label className="block mb-1">Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        )}
        
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Project
        </button>
      </form>
    </div>
  );
}