import { useState, useEffect } from 'react';
import MajorProjects from './MajorProjects';
import Loading from './Loading';
import RouteShell from './RouteShell';

const Projects = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loading />;
  return (
    <RouteShell
      eyebrow="project index"
      title="Projects"
      description="A compact index of shipped experiments, UI builds, full-stack apps, and learning projects."
    >
      <MajorProjects />
    </RouteShell>
  );
};

export default Projects;
