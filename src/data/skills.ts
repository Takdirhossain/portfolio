interface Skill {
  name: string;
  icon?: string;
  level?: string;
}

interface SkillsData {
  languages: Skill[];
  tools: Skill[];
  platforms: Skill[];
  hacking: Skill[];
  os: Skill[];
  currentlyLearning: string[];
  frameworks : Skill[];
}

export const skills: SkillsData = {
  languages : [
    { name: "HTML", icon: "c", level: "40%" },
    { name: "CSS", icon: "markdown", level: "70%" },
    { name: "JAVASCRIPT", icon: "html5", level: "75%" },
    { name: "TYPESCRIPT", icon: "css3", level: "60%" },
    { name: "PHP", icon: "javascript", level: "45%" },
    { name: "MYSQL", icon: "markdown", level: "70%" },
    { name: "MONGODB", icon: "markdown", level: "70%" },
    { name: "POSTGRESQL", icon: "markdown", level: "70%" },
    { name: "SQLITE", icon: "markdown", level: "70%" },
  ],
  frameworks : [
    { name: "ANGULAR", icon: "javascript", level: "45%" },
    { name: "REACT", icon: "c", level: "40%" },
    { name: "NEXTJS", icon: "c", level: "40%" },
    { name: "VUE", icon: "markdown", level: "70%" },
    { name: "LARAVEL", icon: "markdown", level: "70%" },
    { name: "NODEJS", icon: "javascript", level: "45%" },
    { name: "EXPRESSJS", icon: "markdown", level: "70%" },
    { name: "LARAVEL", icon: "markdown", level: "70%" },

  ],
  tools: [
    { name: "GIT", icon: "git", level: "55%" },
    { name: "VS CODE", icon: "vscode", level: "75%" },
    { name: "CURSOR", icon: "vscode", level: "75%" },
    { name: "SLACK", icon: "linux", level: "50%" },
    { name: "FIGMA", icon: "figma", level: "40%" },
    { name: "CANVA", icon: "canva", level: "70%" }
  ],
  platforms: [
    { name: "GitHub", icon: "github", level: "60%" },
    { name: "Vercel", icon: "vercel", level: "45%" },
    { name: "Firebase", icon: "firebase", level: "40%" },
    { name: "Netlify", icon: "netlify", level: "45%" }
  ],
  hacking: [
    { name: "Fluxion", level: "55%" },
    { name: "Airgeddon", level: "50%" },
    { name: "Wifite", level: "60%" },
    { name: "Wifiphisher", level: "45%" },
    { name: "Aircrack-ng", level: "65%" }
  ],
  os: [
    { name: "Windows", icon: "windows", level: "90%" },
    { name: "Linux", icon: "linux", level: "75%" },
    { name: "Ubuntu", icon: "ubuntu", level: "50%" },
    { name: "Zorin OS", icon: "linux", level: "45%" },
    { name: "Android", icon: "android", level: "85%" }
  ],
  currentlyLearning: [
    "Advanced React, Angular, Node, Laravel.....",
    "Cloud Computing with AWS, Azure, and Google Cloud",
    "Advanced Server Management and DevOps",
    "Large Language Models and AI",
    "CI/CD with Docker and Git",
    "Database Optimization Techniques",
    
  ]
};
