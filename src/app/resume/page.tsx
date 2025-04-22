'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDownload, FaEye, FaGraduationCap, FaCode, FaTools, FaServer, FaDesktop, FaShieldAlt, FaBook, FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaBuilding, FaCheck, FaExpandAlt, FaTimesCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { personalInfo } from '@/data/personalInfo';
import { education } from '@/data/education';
import { skills } from '@/data/skills';

// PDF Viewer Component
function PDFViewer({ pdfUrl, onClose }: { pdfUrl: string; onClose: () => void }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useAlternateViewer, setUseAlternateViewer] = useState(false);

  // Handle escape key to close the viewer
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Try alternate viewer if primary one fails
  useEffect(() => {
    if (hasError && !useAlternateViewer) {
      setUseAlternateViewer(true);
      setHasError(false);
      setIsLoading(true);
    }
  }, [hasError, useAlternateViewer]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 ${isFullscreen ? 'bg-black' : ''
      }`}>
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex flex-col ${isFullscreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-7xl max-h-[90vh]'
        }`}>
        {/* Toolbar */}
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 flex items-center justify-between rounded-t-lg">
          <div className="text-gray-800 dark:text-gray-200 font-semibold">PDF Viewer</div>
          <div className="flex items-center gap-2">
            <a
              href={pdfUrl}
              download
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              title="Download PDF"
            >
              <FaDownload className="text-gray-600 dark:text-gray-300" />
            </a>
            <button
              onClick={toggleFullscreen}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              <FaExpandAlt className="text-gray-600 dark:text-gray-300" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-colors"
              title="Close"
            >
              <FaTimesCircle className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* PDF Embed */}
        <div className={`w-full max-w-7xl flex-grow bg-gray-200 rounded-b-lg overflow-hidden ${isFullscreen ? 'rounded-none' : ''
          }`}>
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
              <FaSpinner className="animate-spin text-4xl text-primary mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading PDF...</p>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-700">
              <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-2">Failed to load the PDF</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-sm py-1 px-3"
              >
                Open in New Tab
              </a>
            </div>
          )}

          {!hasError && !useAlternateViewer && (
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setHasError(true);
              }}
            >
              <p>It appears your browser doesn't support embedded PDFs.
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  Click here to view the PDF
                </a>
              </p>
            </object>
          )}

          {!hasError && useAlternateViewer && (
            <embed
              src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`}
              type="application/pdf"
              className="w-full h-full"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function Resume() {
  const [isPdfViewerOpen, setIsPdfViewerOpen] = useState(false);

  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [contentRef, contentInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeTimelineItem, setActiveTimelineItem] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Professional experience - example data (replace with your actual experience)
  const experience = [
    {
      title: "Software Engineer & Lead of International Projects",
      company: "Nexkraft Limited",
      date: "January 2025 - Present",
      location: "Dhaka, Bangladesh",
      description: "Lead international projects, driving full-stack development with React, Angular, Laravel, and Vue, and managing scalable systems on Nginx, Ubuntu VPS etc.",
      skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Laravel", "Vue", "Tailwind CSS", "TypeScript",]
    },
    {
      title: "Associate Software Engineer",
      company: "Nexkraft Limited",
      date: "August 2023 – December 2024",
      location: "Dhaka, Bangladesh",
      description: "Collaborated with senior developers on projects like Wemarge and Smart Farm, building full-stack solutions using React, Angular, Spring Boot.",
      skills: ["Angular", "React", "Tailwind CSS", "TypeScript"]
    }


  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <section className="section-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">My Resume</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            View my professional background, skills, and education.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <motion.a
              href={personalInfo.resumeUrl}
              download
              className="btn btn-primary inline-flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload />
              <span>Download Resume</span>
            </motion.a>

            <motion.button
              onClick={() => setIsPdfViewerOpen(true)}
              className="btn btn-outline inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(79, 70, 229, 0.2)" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaEye />
              <span>View Resume</span>
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Resume Header */}
          <div className="bg-gradient-to-r from-primary to-accent text-white p-8 rounded-t-lg shadow-md dark:shadow-primary/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">{personalInfo.name}</h2>
                <p className="text-lg mt-2 text-white/90">{personalInfo.title}</p>
                <p className="mt-4 text-white/80">{personalInfo.email} • {personalInfo.location}</p>
              </div>
            </div>
          </div>

          {/* Resume Content */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-b-lg shadow-md dark:shadow-primary/10">
            {/* About Section */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                  <FaBook className="text-primary" />
                </span>
                About Me
              </h3>
              <p className="text-secondary dark:text-gray-200 leading-relaxed">
                {personalInfo.about}
              </p>
            </div>

            {/* Experience Timeline Section */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                  <FaBriefcase className="text-primary" />
                </span>
                Experience
              </h3>

              <div className="relative">
                {/* Vertical timeline line */}
                <div className="absolute left-0 md:left-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent transform md:-translate-x-1/2"></div>

                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative mb-10 md:clear-both ${index % 2 === 0 ? 'md:float-left md:text-right md:pr-10' : 'md:float-right md:text-left md:pl-10'} md:w-1/2`}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-0 md:left-auto md:right-0 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-primary rounded-full transform translate-x-[-10px] md:translate-x-1/2 z-10 "></div>

                    {/* Content box */}
                    <motion.div
                      className="bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md border-l-4 border-primary hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="text-lg font-semibold text-primary">{exp.title}</h4>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <FaBuilding />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <FaCalendarAlt />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt />
                        <span>{exp.location}</span>
                      </div>
                      <p className="mt-3 text-gray-700 dark:text-gray-200 text-justify">{exp.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs px-2 py-1 rounded-full bg-[#0A0A23] text-primary dark:[#0A0A23] dark:text-primary/90"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}

                <div className="clear-both"></div>
              </div>
            </div>

            {/* Education Timeline Section */}
            {/* <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                  <FaGraduationCap className="text-primary" />
                </span>
                Education
              </h3>
              
              <div className="relative" ref={timelineRef}>
                <div className="absolute left-6 top-0 h-full w-1 bg-gradient-to-b from-primary via-accent to-info"></div>
                
                {education.map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative pl-16 mb-10"
                    onMouseEnter={() => setActiveTimelineItem(index)}
                    onMouseLeave={() => setActiveTimelineItem(null)}
                  >

                    <motion.div 
                      className="absolute left-0 flex flex-col items-center z-10"
                      animate={{ scale: activeTimelineItem === index ? 1.1 : 1 }}
                    >
                      <div className={`w-12 h-12 flex items-center justify-center rounded-full ${
                        activeTimelineItem === index 
                          ? 'bg-primary text-white' 
                          : 'bg-white dark:bg-gray-700 text-primary'
                      } shadow-md border-2 border-primary transition-colors duration-300`}>
                        <FaGraduationCap size={20} />
                      </div>
                      <div className="relative z-10 mt-1">
                        <span className="text-xs font-semibold bg-white dark:bg-gray-800 border border-primary/20 text-primary px-3 py-1 rounded-full shadow-sm">
                          {item.year.split('–')[0]}
                        </span>
                      </div>
                    </motion.div>
                    
                
                    <motion.div 
                      className={`bg-white dark:bg-gray-700 p-5 rounded-lg shadow-md transition-all duration-300 ${
                        activeTimelineItem === index ? 'shadow-lg border-l-4 border-primary transform -translate-y-1' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h4 className="text-lg font-semibold text-secondary dark:text-gray-100">{item.degree}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{item.institution}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-2">
                        <span className="bg-primary/10 dark:bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                          {item.focus}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{item.year}</span>
                      </div>
                      <p className="mt-3 text-gray-600 dark:text-gray-300 text-sm">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div> */}

            {/* Skills Section */}
            <div className="mb-10">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                <span className="bg-primary/10 dark:bg-primary/20 p-2 rounded-full">
                  <FaCode className="text-primary" />
                </span>
                Technical Skills
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Languages */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent dark:border-gray-600/30">
                  <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-gray-100 flex items-center gap-2">
                    <FaCode className="text-primary" />
                    Languages & Databases
                  </h4>
                  <div className="space-y-3">
                    {skills.languages.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full"
                            style={{ width: `100%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-200 min-w-[80px]">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent dark:border-gray-600/30">
                  <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-gray-100 flex items-center gap-2">
                    <FaCode className="text-primary" />
                    Frameworks
                  </h4>
                  <div className="space-y-3">
                    {skills.frameworks.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-warning to-accent h-2.5 rounded-full"
                            style={{ width: `100%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-200 min-w-[80px]">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tools */}
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent dark:border-gray-600/30">
                  <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-gray-100 flex items-center gap-2">
                    <FaTools className="text-accent" />
                    Tools & Software
                  </h4>
                  <div className="space-y-3">
                    {skills.tools.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-accent to-primary h-2.5 rounded-full"
                            style={{
                              width: `100%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-200 min-w-[80px]">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-transparent dark:border-gray-600/30">
                  <h4 className="text-lg font-semibold mb-4 text-secondary dark:text-gray-100 flex items-center gap-2">
                    <FaServer className="text-info" />
                    Platforms & Services
                  </h4>
                  <div className="space-y-3">
                    {skills.platforms.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                          <div
                            className="bg-gradient-to-r from-info to-primary h-2.5 rounded-full"
                            style={{
                              width: `100%`
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-200 min-w-[80px]">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Currently Learning */}
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-primary/90 flex items-center gap-2">
                <FaBook className="text-primary" />
                Currently Learning
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.currentlyLearning.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 shadow-sm rounded-lg px-4 py-3 text-center hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-transparent dark:border-gray-600/30"
                  >
                    <span className="text-gray-700 dark:text-gray-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />

      {/* PDF Viewer */}
      {isPdfViewerOpen && (
        <PDFViewer
          pdfUrl={personalInfo.resumeUrl}
          onClose={() => setIsPdfViewerOpen(false)}
        />
      )}
    </main>
  );
}
