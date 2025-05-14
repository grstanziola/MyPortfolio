// app/projects/page.tsx
import { Metadata } from "next";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Pool } from 'pg';

export const metadata: Metadata = {
  title: "Projects",
  description: "My Portfolio Projects",
};

// This ensures the page is dynamically rendered with fresh data
export const dynamic = 'force-dynamic';

async function getProjects() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });

  try {
    const result = await pool.query('SELECT * FROM projects ORDER BY year DESC');
    return result.rows;
  } catch (error) {
    console.error('Database error:', error);
    return [];
  }
}

export default async function Projects() {
  const projects = await getProjects();
  
  // Transform projects data to match the StickyScroll content format
  const content = projects.map(project => {
    let gradientClass = "bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))]";
    
    if (project.background_color === 'pink-indigo') {
      gradientClass = "bg-[linear-gradient(to_bottom_right,var(--pink-500),var(--indigo-500))]";
    } else if (project.background_color === 'orange-yellow') {
      gradientClass = "bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))]";
    }
    
    return {
      title: project.title,
      description: project.description,
      content: project.content_type === 'image' ? (
        <div className="flex h-full w-full items-center justify-center text-white">
          <img
            src={project.image_url}
            className="h-full w-full object-cover"
            alt={project.title}
          />
        </div>
      ) : (
        <div className={`flex h-full w-full items-center justify-center ${gradientClass} text-white`}>
          <div className="text-lg font-semibold">{project.title}</div>
        </div>
      ),
    };
  });

  return (
    <section className="w-full">
      <h1 className="mb-8 text-2xl font-medium px-4">Projects</h1>
      
      {content.length > 0 ? (
        <div className="w-full">
          <StickyScroll content={content} />
        </div>
      ) : (
        <p className="text-center py-10">No projects found</p>
      )}
    </section>
  );
}