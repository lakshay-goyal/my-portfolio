const skillIcon = (slug) => `https://skillicons.dev/icons?i=${slug}&theme=dark`;
const simpleIcon = (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
const iconifyIcon = (icon, color = "6ee7b7") => `https://api.iconify.design/${icon}.svg?color=%23${color}`;

const stackItems = [
  {
    label: "MERN Stack",
    imageUrl: skillIcon("react"),
  },
  {
    label: "NextJS",
    imageUrl: skillIcon("nextjs"),
  },
  {
    label: "Turborepo",
    imageUrl: "https://imgs.search.brave.com/LA7z4ttLva03V1dNIppC_NHIGxJlfd4AwMvJN9qtmLw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzY1LzIvdHVyYm9y/ZXBvLWljb24tbG9n/by1wbmdfc2Vla2xv/Z28tNjUzMjA1LnBu/Zw",
  },
  {
    label: "React-Native",
    imageUrl: skillIcon("react"),
  },
  {
    label: "Expo",
    imageUrl: "https://images.seeklogo.com/logo-png/45/1/expo-go-app-logo-png_seeklogo-457073.png",
  },
  {
    label: "PostgresDB",
    imageUrl: skillIcon("postgres"),
  },
  {
    label: "Git",
    imageUrl: skillIcon("git"),
  },
  {
    label: "CI/CD",
    imageUrl: skillIcon("githubactions"),
  },
  {
    label: "Ubuntu",
    imageUrl: skillIcon("ubuntu"),
  },
  {
    label: "Docker",
    imageUrl: skillIcon("docker"),
  },
  {
    label: "Kubernetes",
    imageUrl: skillIcon("kubernetes"),
  },
  {
    label: "Redis",
    imageUrl: skillIcon("redis"),
  },
  {
    label: "AWS",
    imageUrl: skillIcon("aws"),
  },
    {
    label: "Python",
    imageUrl: skillIcon("python"),
  },
  {
    label: "Langchain",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShzp30XASXzPGrU2z1yjrI5WUriI-Iz2N1jw&s",
  },
  {
    label: "RAG",
    imageUrl: iconifyIcon("carbon:ibm-watson-discovery"),
  },
  {
    label: "MCP",
    imageUrl: simpleIcon("modelcontextprotocol"),
    imageClassName: "brightness-0 invert",
  },
];

export default stackItems;
