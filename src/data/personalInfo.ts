interface SocialLink {
  name: string;
  url: string;
}

interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  about: string;
  details: string[];
  socialLinks: SocialLink[];
  resumeUrl: string;
  profileImage: string;
  aboutDetails: string;
}

export const personalInfo: PersonalInfo = {
  name: "Takdir Hossain",
  title: "Software Engineer | Versatile Developer | Scalable Architecture | Server-Side Expertise",
  email: "takdirhossain35@gmail.com",
  location: "Bangladesh",
  about: "Software Engineer with over 2 years at Nexkraft Limited, leading international projects and building dynamic solutions like ICT Olympiad Bangladesh and Alarabisc using React, Angular, Laravel, and more.",
  aboutDetails : "I'm a passionate Software Engineer with two years of experience at Nexkraft Limited, where I lead international projects and craft innovative web solutions. Specializing in technologies like React, Angular, Laravel, Vue, Nginx, and Ubuntu VPS servers, I’ve delivered impactful projects, including the ICT Olympiad Bangladesh, Alarabisc (a Kuwait-based platform), and systems for event and football club management. My focus is on building seamless, user-centric applications that solve real-world problems. Whether it's architecting robust backends or designing dynamic frontends, I thrive on turning ideas into reality with clean code and creative solutions. Let’s build something extraordinary together!" ,
  details: [
    "🌱 Focused  on mastering Cloud DevOps and Large Language Models to build scalable, AI-powered solutions.",
    "🎯 Dream: I aspire to be a Cloud DevOps Engineer, revolutionizing AI by mastering scalable systems and Large Language Models.",
    "✍️ Love to build full-stack solutions, blending frontend, backend, database design, and server ops to create seamless applications"
  ],
  socialLinks: [
    { name: "Facebook", url: "https://www.facebook.com/takdir.hossain.332" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/takdir-hossain" },
    { name: "Instagram", url: "https://www.instagram.com/takdirhossainjs" },
    { name: "Twitter", url: "https://x.com/takdirhossain09" },
    { name: "GitHub", url: "https://github.com/Takdirhossain" }
  ],
  resumeUrl: "/assets/resume.pdf",
  profileImage: "/assets/profile.jpg"
};
