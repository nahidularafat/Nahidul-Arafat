import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useApi } from "../hooks/useApi";
import { getProjects } from "../services/api";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const WorkSkeleton = () => (
  <div className="work-box work-skeleton">
    <div className="skeleton-title-row">
      <div className="skeleton-block skeleton-num" />
      <div className="skeleton-block skeleton-title" />
    </div>
    <div className="skeleton-block skeleton-line" />
    <div className="skeleton-block skeleton-line short" />
    <div className="skeleton-block skeleton-image" />
  </div>
);

const Work = () => {
  const { data: projects, loading, error } = useApi(getProjects);

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 1025px)", () => {
        let translateX = 0;
        const box = document.getElementsByClassName("work-box");
        if (!box.length) return;

        const rectLeft = document
          .querySelector(".work-container")!
          .getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth =
          box[0].parentElement!.getBoundingClientRect().width;
        let padding =
          parseInt(window.getComputedStyle(box[0]).padding) / 2;

        translateX =
          rect.width * box.length - (rectLeft + parentWidth) + padding;

        let timeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".work-section",
            start: "top top",
            end: `+=${translateX}`,
            scrub: true,
            pin: true,
            id: "work",
          },
        });

        timeline.to(".work-flex", { x: -translateX, ease: "none" });

        return () => {
          timeline.kill();
          ScrollTrigger.getById("work")?.kill();
        };
      });
    });

    return () => ctx.revert();
  }, [projects]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
        </div>

        <div className="work-flex">
          {loading &&
            [1, 2, 3, 4].map((i) => <WorkSkeleton key={i} />)}

          {error && (
            <div className="api-error">
              Failed to load projects. ({error})
            </div>
          )}

          {projects &&
            projects.slice(0, 5).map((project) => (
              <div className="work-box" key={project.id}>
                <div className="work-info">
                  <div className="work-title">
                    <h3>{project.number}</h3>
                    <div>
                      <h4>{project.title}</h4>
                      <p>{project.category}</p>
                    </div>
                  </div>
                  <h4>Tools and features</h4>
                  <p>{project.tools}</p>
                  <ul>
                    {project.bullets.map((bullet) => (
                      <li key={bullet.id}>{bullet.text}</li>
                    ))}
                  </ul>
                </div>
                <WorkImage
                  image={project.image_url}
                  alt={project.title}
                  link={project.link}
                />
              </div>
            ))}
            
          {projects && projects.length > 5 && (
            <div className="work-box view-all-box">
              <div className="view-all-content">
                <h3>More Projects</h3>
                <p>I have worked on {projects.length}+ projects ranging from corporate websites to AI tools.</p>
                <Link to="/projects" className="view-all-btn">
                  View All Projects
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Work;
