interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  githubLink?: string; // Optional GitHub link
  featured: boolean;
  date: string; // Date in format like "2023-05-15" or "2022-Q3"
}

export const projects: Project[] = [


  {
    title: "Joined Nexkraft as Associate Software Engineer",
    description: "Began my professional career at Nexkraft Limited, collaborating with senior developers on projects like Wemarge and Smart-Farming using React, spring-boot, and Angular.",
    image: "/assets/projects/satellite-dish.jpg",
    tags: ["Spring-boot", "Angular", "Node.js", "Mysql"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/wifi-tools",
    featured: true,
    date: "2023-08-23"
  },
  {
    title: "Delivered Impactful Projects as Associate",
    description: "Contributed to high-profile platforms like ICT Olympiad Bangladesh and Alarabisc, honing skills in full-stack development and server management with Nginx and Ubuntu VPS.",
    image: "/assets/projects/satellite-dish.jpg",
    tags: ["React", "Laravel", "VueJS", "Node.js"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/wifi-tools",
    featured: true,
    date: "2024-12-01"
  },
  {
    title: "Promoted to Software Engineer & Leading Internal Projects",
    description: "Elevated to Software Engineer and Lead of International Projects, driving end-to-end development and leading global teams to deliver scalable, user-centric solutions.",
    image: "/assets/projects/satellite-dish.jpg",
    tags: ["NextJS", "Vps", "Nginx", "Devops"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/wifi-tools",
    featured: true,
    date: "2025-01-01"
  },

  {
    title: "Enrolled in Programming Hero MERN Stack Program",
    description: "Joined Programming Hero intensive MERN stack course, mastering MongoDB, Express.js, React, and Node.js to build a strong foundation in full-stack development.",
    image: "/assets/projects/laptop-gradient.jpg",
    tags: ["HTML", "CSS", "JavaScript", "React"],
    link: "#",
    githubLink: "https://github.com/arnnikislam/my-portfolio",
    featured: true,
    date: "2022-07-10"
  },

];
