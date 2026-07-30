import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";
import { useApi } from "../hooks/useApi";
import { useLoading } from "../context/LoadingProvider";
import "./styles/AllProjects.css";
import { FaArrowLeft } from "react-icons/fa";

const AllProjects = () => {
  const { data: projects, loading, error } = useApi(getProjects);
  const { setIsLoading } = useLoading();

  useEffect(() => {
    setIsLoading(false);
    window.scrollTo(0, 0);
  }, [setIsLoading]);

  return (
    <div className="all-projects-page">
      <div className="all-projects-container section-container">
        <div className="all-projects-header">
          <Link to="/" className="back-link">
            <FaArrowLeft /> Back to Home
          </Link>
          <h2>All <span>Projects</span></h2>
          <p>A complete list of my past work and projects.</p>
        </div>

        {loading && <div className="all-projects-loading">Loading projects...</div>}
        {error && <div className="all-projects-error">Failed to load projects. ({error})</div>}

        <div className="all-projects-grid">
          {projects &&
            projects.map((project) => (
              <div className="all-projects-card" key={project.id}>
                <div className="all-projects-image">
                  <img 
                    src={project.image_url.includes("/media/projects/") ? "/projects/" + project.image_url.split("/media/projects/")[1] : project.image_url} 
                    alt={project.title} 
                  />
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="all-projects-link">
                      View Project
                    </a>
                  )}
                </div>
                <div className="all-projects-info">
                  <div className="all-projects-title">
                    <span>{project.number}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="all-projects-category">{project.category}</p>
                  <p className="all-projects-tools"><strong>Tools:</strong> {project.tools}</p>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li key={bullet.id}>{bullet.text}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AllProjects;
