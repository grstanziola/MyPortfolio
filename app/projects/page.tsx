// app/projects/page.tsx
import { Metadata } from "next";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "My Portfolio Projects",
};

export default function Projects() {
  // Sample projects data (will be replaced with database fetch)
  const projects = [
    {
      id: 1,
      title: "Support your users with popular topics",
      description: "Statistics show that people browsing your webpage who receive live assistance with a chat widget are more likely to make a purchase.",
      year: 2023,
      image: "/photos/photo1.jpg",
      projectUrl: "https://example.com/portfolio",
      customContent: true
    },
    {
      id: 2,
      title: "Increase conversion with personalization",
      description: "Customers are 40% more likely to spend more than planned when they identify the shopping experience as highly personalized to their needs.",
      year: 2022,
      image: "/photos/photo2.jpg",
      projectUrl: "https://example.com/ecommerce",
      customContent: false
    },
    {
      id: 3,
      title: "Streamline your workflow with automation",
      description: "Teams that implement automated workflows see a 27% increase in productivity and report higher job satisfaction across team members.",
      year: 2021,
      image: "/photos/photo3.jpg",
      projectUrl: "https://example.com/taskapp",
      customContent: false
    },
    {
      id: 4,
      title: "Design systems that scale",
      description: "Companies with established design systems report 50% faster product development cycles and improved consistency across all products.",
      year: 2023,
      image: "/photos/photo4.jpg",
      projectUrl: "https://example.com/design",
      customContent: false
    },
    {
      id: 5,
      title: "AI-Powered Analytics Dashboard",
      description: "Real-time data visualization and analytics platform that leverages machine learning to provide actionable insights and predictive analytics.",
      year: 2024,
      image: "/photos/photo5.jpg",
      projectUrl: "https://example.com/analytics",
      customContent: false
    },
    {
      id: 6,
      title: "Cloud-Native Microservices",
      description: "Scalable microservices architecture implementing event-driven design patterns and container orchestration for high availability.",
      year: 2024,
      image: "/photos/photo6.jpg",
      projectUrl: "https://example.com/microservices",
      customContent: false
    }
  ];
  
  // Transform projects data to match the StickyScroll content format
  const content = projects.map(project => {
    // Create the content based on whether it's a custom component or regular image
    const projectContent = project.customContent ? (
      // Custom widget content for the first project (similar to your reference image)
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-900/30 dark:to-indigo-900/30">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-xs p-5">
            <div className="mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <svg className="h-full w-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Mary Coyle</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Online</div>
                </div>
                <div className="ml-auto">
                  <button className="h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <svg className="h-3 w-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-xs text-gray-600 dark:text-gray-300">Williamsburg, VA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-blue-500 dark:text-blue-400">acme.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      // Standard image content for other projects
      <div className="relative h-full w-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
    );
    
    return {
      id: project.id,
      title: project.title,
      description: project.description,
      year: project.year,
      projectUrl: project.projectUrl,
      content: projectContent
    };
  });

  return (
    <section className="w-full overflow-hidden">
      <StickyScroll content={content} />
    </section>
  );
}