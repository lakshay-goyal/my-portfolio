import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Smartphone, Brain, Shield } from 'lucide-react';
import MajorProjects from './MajorProjects';
import Loading from './Loading';

const categories = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Dynamic web applications and responsive websites.',
    icon: Code,
    category: 'web',
    accent: 'text-blue-500',
    bg: 'bg-blue-200',
    border: 'hover:border-blue-400',
  },
  {
    id: 2,
    title: 'App Development',
    description: 'Cross-platform and native mobile applications.',
    icon: Smartphone,
    category: 'app',
    accent: 'text-teal-500',
    bg: 'bg-teal-200',
    border: 'hover:border-teal-400',
  },
  {
    id: 3,
    title: 'AI & Machine Learning',
    description: 'AI-powered and data-driven intelligent solutions.',
    icon: Brain,
    category: 'ai',
    accent: 'text-pink-500',
    bg: 'bg-pink-200',
    border: 'hover:border-pink-400',
  },
  {
    id: 4,
    title: 'Blockchain Development',
    description: 'Decentralized apps and smart contract solutions.',
    icon: Shield,
    category: 'blockchain',
    accent: 'text-yellow-500',
    bg: 'bg-yellow-200',
    border: 'hover:border-yellow-400',
  },
];

const Projects = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);
  if (loading) return <Loading />;

  const handleProjectClick = (category) => {
    navigate(`/projects/${category}`);
  };

  return <MajorProjects />;
};

export default Projects;