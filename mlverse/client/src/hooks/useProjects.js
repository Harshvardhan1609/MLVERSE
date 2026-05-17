import { useState, useEffect } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';

const useProjects = () => {
  // Directly use local data to ensure visibility without network dependency
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // We keep the structure for compatibility, but data is now instant
  useEffect(() => {
    setProjects(PROJECTS_DATA);
    setLoading(false);
  }, []);

  return { projects, loading, error };
};

export default useProjects;
