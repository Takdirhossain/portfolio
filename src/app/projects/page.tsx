'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaLink, FaGithub, FaYoutube, FaExternalLinkAlt, FaCertificate } from 'react-icons/fa';
import Footer from '@/components/Footer';
import { projects } from '@/data/projects';
import Link from 'next/link';

// Import or define the Project interface
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink?: string;
  featured: boolean;
  date: string;
}

// Define the ProjectCardProps interface
interface ProjectCardProps {
  project: Project;
  index: number;
  delay?: number;
}

export default function Projects() {
  const [headerRef, headerInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [featuredRef, featuredInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [otherRef, otherInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const ProjectCard = ({ project, index, delay = 0 }: ProjectCardProps) => {
    const [cardRef, cardInView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    const getIcon = (url: string) => {
      if (url.includes('youtube')) return <FaYoutube size={18} />;
      if (url.includes('github')) return <FaGithub size={18} />;
      return <FaExternalLinkAlt size={16} />;
    };

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        className="project-card card card-light dark:card-dark overflow-hidden h-full"
      >
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            className="transition-transform duration-500 hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
          
          {/* Tags on image */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag, i) => (
              <span 
                key={i} 
                className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-secondary dark:text-light">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm md:text-base line-clamp-3">{project.description}</p>
          
          <div className="flex gap-3 mt-auto">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary flex-1 inline-flex items-center justify-center gap-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {getIcon(project.link)}
              <span>View Project</span>
            </motion.a>
            
            {project.githubLink && (
              <motion.a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-2 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 inline-flex items-center justify-center"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                aria-label="View GitHub repository"
              >
                <FaGithub size={20} />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <main className="min-h-screen flex flex-col">
      <section className="section-container">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="section-title gradient-text">My Projects</h1>
          <p className="text-lg max-w-3xl mx-auto text-secondary dark:text-light">
            A showcase of my work, including GitHub repositories, personal projects, and educational content.
          </p>
        </motion.div>
        
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <motion.h2
              ref={featuredRef}
              initial={{ opacity: 0, y: 20 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="section-subtitle text-center mb-8"
            >
              Featured Projects
            </motion.h2>
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={featuredInView ? "visible" : "hidden"}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
             {[
              {
                title: "KE-FAS Event Management System",
                description: "A comprehensive event management system enabling organizers to create and manage events, users to securely purchase tickets, and administrators to earn commissions through a streamlined revenue model.",
                image: "/assets/projects/kefas.png",
                tags: ["React", "Laravel", "Socket.io", "Tailwind", "MySQL", "Ubuntu"],
                link: "https://ke-fas.fr/"
              },
              {
                title: "ICT Olympiad Bangladesh",
                description: "A platform for organizing and managing ICT Olympiad Bangladesh, including registration, scoring, examination, and results management etc.",
                image: "/assets/projects/ict.png",
                tags: ["Laravel", "Bootstrap", "MySQL"],
                link: "https://www.ictolympiadbangladesh.com"
              },
              {
                title: "We Merge ",
                description: "A subscription-based image editing platform where users upload images post-purchase, admins assign tasks to vendors, and edited images are delivered back to users through a managed workflow.",
                image: "/assets/projects/wemerge.png",
                tags: ["Angular", "NgBootstrap", "RxJS", "Spring Boot"],
                link: "https://www.wemerge.photos/"
              },
              {
                title: "PropVator ",
                description: "A Next.js application that displays prop firm pricing and referral links to help users compare and purchase trading evaluations easily.",
                image: "/assets/projects/propvator.png",
                tags: ["NextJS", "Tailwind"],
                link: "https://propvator.com/"
              }
            ].map((certificate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => window.location.href = '/showcase'}
              >
                <div className="relative h-56 w-full overflow-hidden group">
                  <div className="image-scroll-wrapper">
                    <Image
                      src={certificate.image}
                      alt={certificate.title}
                      width={500}
                      height={1000}
                      className="w-full h-auto"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <div className="text-white mt-auto flex gap-2">
                      {certificate.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="px-2 py-1 gap-2 bg-primary/80 text-white text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>



                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white truncate">{certificate.title}</h3>
                      <p className="text-gray-600 text-sm mt-4 dark:text-gray-300 mb-4">{certificate.description}</p>
                      <div className='flex gap-2'>
                        {certificate.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 gap-2 bg-primary/80 text-white text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-center bg-primary/10 dark:bg-primary/20 rounded-full p-1 shrink-0 ml-2">
                      <FaCertificate className="text-primary" size={16} />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">

                  </p>
                  <Link href={certificate.link}>
                    <motion.button
                      className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                        <FaLink   className="text-[#DF3D5A]" size={16} /> <span> View Project</span>
                    </motion.button>
                  </Link>
                </div>
  
              </motion.div>
            ))}
            </motion.div>
          </div>
        )}
        
        {/* Project Timeline Section */}
        {/* <div className="mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="section-subtitle text-center mb-8"
          >
            My Journey
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center max-w-2xl mx-auto mb-16 text-secondary dark:text-gray-300"
          >
            Explore my development journey through time. Each project represents a significant milestone in my 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold"> growth as a developer</span>.
          </motion.p>
          
          <div className="relative">
      
            <motion.div 
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-accent to-primary/50 rounded-full"
            ></motion.div>
            
   
            <div className="space-y-0">
              {projects
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((project, index) => {
                  const isEven = index % 2 === 0;
  
                  const getProjectIcon = () => {
                    const tags = project.tags.map(tag => tag.toLowerCase());
                    if (tags.some(tag => tag.includes('react') || tag.includes('next'))) {
                      return '⚛️';
                    } else if (tags.some(tag => tag.includes('python'))) {
                      return '🐍';
                    } else if (tags.some(tag => tag.includes('security') || tag.includes('penetration'))) {
                      return '🔒';
                    } else if (tags.some(tag => tag.includes('mobile') || tag.includes('android'))) {
                      return '📱';
                    } else if (tags.some(tag => tag.includes('content') || tag.includes('youtube'))) {
                      return '🎬';
                    } else if (tags.some(tag => tag.includes('network'))) {
                      return '🌐';
                    } else {
                      return '💻';
                    }
                  };
                  
                  return (
                    <motion.div 
                      key={project.title}
                      className={`relative flex items-center ${isEven ? 'justify-start' : 'justify-end'} mb-20`}
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                
                      <motion.div 
                        className="absolute left-1/2 transform -translate-x-1/2 z-10"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 + index * 0.1 }}
                      >
                        <div className="w-10 h-10 rounded-full border-4 border-white dark:border-dark bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg">
                          <span role="img" aria-label="project icon" className="text-lg">
                            {getProjectIcon()}
                          </span>
                        </div>
                      </motion.div>
                      
                    
                      <motion.div 
                        className={`absolute top-1/2 ${isEven ? 'left-[51%]' : 'right-[51%]'} h-0.5 ${isEven ? 'bg-gradient-to-r from-transparent to-primary' : 'bg-gradient-to-l from-transparent to-primary'}`}
                        style={{ width: '7%' }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                      ></motion.div>
                      
                     
                      <motion.div 
                        className={`w-5/12 p-6 rounded-xl backdrop-blur-sm 
                          ${isEven 
                            ? 'mr-auto text-right' 
                            : 'ml-auto text-left'} 
                          shadow-lg hover:shadow-xl transition-all duration-300
                          bg-white/90 dark:bg-gray-800/90 
                          hover:bg-white dark:hover:bg-gray-800 
                          border border-gray-200 dark:border-gray-700 
                          hover:-translate-y-1`}
                        whileHover={{ scale: 1.02 }}
                      >
                       
                        <div 
                          className={`absolute top-0 ${isEven ? '-right-12' : '-left-12'} 
                            bg-gradient-to-r ${isEven ? 'from-accent to-primary' : 'from-primary to-accent'} 
                            text-white text-sm font-semibold py-1 px-4 rounded-full -mt-4 shadow-md`}
                        >
                          {new Date(project.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short'
                          })}
                        </div>
                        
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-bold text-secondary dark:text-light">{project.title}</h3>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.slice(0, 3).map((tag, i) => (
                            <span 
                              key={i} 
                              className={`px-2 py-1 text-xs font-medium rounded-full 
                                ${i % 3 === 0 ? 'bg-primary/10 text-primary dark:bg-primary/20' : 
                                i % 3 === 1 ? 'bg-accent/10 text-accent dark:bg-accent/20' : 
                                'bg-info/10 text-info dark:bg-info/20'}`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <div className={`flex gap-3 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary btn-sm inline-flex items-center justify-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            View Project
                          </motion.a>
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </div> */}
        
       

      </section>
      
      <Footer />
    </main>
  );
}
