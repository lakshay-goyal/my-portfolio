import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Smartphone, Brain, Shield } from 'lucide-react';
import MajorProjects from './MajorProjects';
import Loading from './Loading';

const iconMap = { Code, Smartphone, Brain, Shield };

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