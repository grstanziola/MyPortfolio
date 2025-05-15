import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.linkedin} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <h1 className="mb-4 text-2xl font-medium">
        Data Alchemist & Creative Developer
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I transform complex data into digital gold through code, visualization, and a touch of creative magic.
        </p>
        
        <h3 className="mb-3 text-xl font-medium">What I Do:</h3>
        <ul className="list-disc pl-2 mb-2">
          <li>Craft pixel-perfect front-end experiences with React, Next.js & Tailwind CSS</li>
          <li>Extract actionable insights from complex datasets using Python, SQL & Power BI</li>
          <li>Build scalable, cloud-native solutions leveraging AWS technologies</li>
          <li>Turn business requirements into elegant, user-centered digital solutions</li>
        </ul>
        
        <h3 className="mb-3 text-xl font-medium">My Superpower:</h3>
        <p>
          Translating between technical and non-technical worlds. I speak both fluent code and human.
        </p>
        
        <h4 className="mb-3 text-xl font-medium">By The Numbers:</h4>
        <ul className="list-disc pl-2 mb-2">
          <li>1.5+ years professional experience</li>
          <li>Computer Science & Management graduate</li>
          <li>3 programming languages mastered</li>
          <li>24/7 problem-solving mindset</li>
        </ul>
        
        <p>
          Panama-based <span>🇵🇦</span> , globally-minded. Available for remote collaboration and on-site projects.
        </p>
        <p className="text-sm font-light">
          <a href="/projects">View My Portfolio</a> | 
          <a href="/resume.pdf" target="_blank">Download Resume</a> | 
          <a href="/contact">Let's Connect</a>
        </p>
        <p><i>Currently accepting new freelance projects and full-time opportunities</i></p>
      </div>
    </section>
  );
}
