"use client";

const experiences = [
  {
    company: "Berrylabs",
    period: "May 10, 2025 - Present",
    role: "FrontEnd Developer",
    responsibilities: [
      "I am working in a modern ERP software using React.js, designed for the RMG sector in Bangladesh and international markets.",
      "A powerful and reliable ERP platform built with modern frontend technologies.",
      "Working in dedicated modules for HRM, SCM, PLM, AIS, and AI-driven systems.",
      "Easy maintenance and seamless management across all business operations.",
      "Enhanced productivity through automation and smart workflows.",
      "A user-friendly experience tailored to the unique needs of RMG businesses. Scalable solutions suitable for both local and global organizations.",
    ],
  },
  {
    company: "Gain Solutions Ltd",
    period: "Dec 3, 2023 - April 20, 2025",
    role: "Frontend Developer",
    responsibilities: [
      "Developed and implemented REST API and GraphQL for HRM solutions.",
      "Designed and built business logic functionalities for HRM leave modules.",
      "Worked in SASS based application Payrun and Easydesk.",
      "Created responsive, cross-browser UI components using Tailwind CSS and modern JavaScript frameworks.",
      "Built reusable UI components to streamline development.",
    ],
  },
  {
    company: "Rubytech",
    period: "Feb 26, 2023 - Oct 29, 2023",
    role: "Web Developer",
    responsibilities: [
      "Have Implemented Django REST API’s in React and React Typescript Projects.",
      "Have Create React JS, Next JS, React Typescript Responsive and cross browser Websites",
      "Worked on multiple company and institutional websites.",
      "Deployed React Projects In cPanel, fixed bugs.",
      "Optimized web applications for performance and usability.",
      "Have made software wireframe and done requirement analysis for the projects.",
    ],
  },
];

export default function Experience() {
  return (
    <div
      id="experience"
      className="h-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-px w-12 bg-lime-500"></div>
            <span className="text-lime-400 font-medium">Experience</span>
            <div className="h-px w-12 bg-lime-500"></div>
          </div>
          <div className="">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Exploring Creativity to Shape a{" "}
              <span className="text-lime-400">Better Future.</span>
            </h2>
            <p className="text-gray-300 text-sm md:text-md tracking-wider font-medium my-6">
              I’ve spent the last few years building scalable, high-quality
              interfaces for SaaS products — from API integrations to reusable
              components and optimized user flows. I bring both technical depth
              and a product-focused mindset to every project.
            </p>
          </div>
        </div>
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div key={index} className="flex gap-6">
              <div className="w-64 flex-shrink-0">
                <h3 className="md:text-lg text-sm tracking-wider font-semibold text-white mb-1">
                  {exp.company}
                </h3>
                <p className="text-white md:text-md text-sm font-medium">
                  {exp.period}
                </p>
              </div>
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-4 h-4 bg-lime-500 rounded-full mt-1"></div>
                {index < experiences.length - 1 && (
                  <div className="w-0.5 h-full bg-lime-500 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-2">
                <h3 className="md:text-xl text-sm tracking-wider font-semibold text-white mb-3">
                  {exp.role}
                </h3>
                <div className="space-y-2">
                  {exp.responsibilities.map((resp, idx) => (
                    <p
                      key={idx}
                      className="text-white text-md tracking-wider font-medium leading-relaxed"
                    >
                      - {resp}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
