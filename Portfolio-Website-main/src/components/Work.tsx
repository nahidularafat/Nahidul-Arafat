import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
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
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!projects || projects.length === 0) return;

    // Give DOM time to paint all work-box elements fully
    const timer = setTimeout(() => {
      // Clean up any previous instance
      tlRef.current?.kill();
      triggerRef.current?.kill();
      ScrollTrigger.getById("work")?.kill();

      // Only run horizontal scroll on desktop
      if (window.innerWidth <= 1024) return;

      const boxes = document.getElementsByClassName("work-box");
      if (!boxes.length) return;

      const container = document.querySelector(".work-container");
      const flex = document.querySelector(".work-flex") as HTMLElement;
      if (!container || !flex) return;

      // Reset position
      gsap.set(flex, { x: 0 });

      const getTranslateX = () => {
        const boxes = document.getElementsByClassName("work-box");
        if (!boxes.length) return 0;
        const rectLeft = container.getBoundingClientRect().left;
        const boxRect = boxes[0].getBoundingClientRect();
        const parentWidth = flex.getBoundingClientRect().width;
        const padding = parseInt(window.getComputedStyle(boxes[0]).padding) / 2;
        return Math.max(0, boxRect.width * boxes.length - (rectLeft + parentWidth) + padding);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 1,
          pin: true,
          id: "work",
          invalidateOnRefresh: true,
        },
      });

      tl.to(flex, {
        x: () => -getTranslateX(),
        ease: "none",
      });

      tlRef.current = tl;
      triggerRef.current = tl.scrollTrigger!;

      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      tlRef.current?.kill();
      triggerRef.current?.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, [projects]);

  const displayProjects = projects ? projects.slice(0, 5) : [];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header">
          <h2>
            My <span>Work</span>
          </h2>
        </div>

        <div className="work-flex">
          {loading && [1, 2, 3, 4].map((i) => <WorkSkeleton key={i} />)}

          {error && (
            <div className="api-error">Failed to load projects. ({error})</div>
          )}

          {displayProjects.map((project) => (
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

          {projects && (
            <div className="work-box view-all-box">
              <div className="view-all-content">
                <h3>Want to see more projects?</h3>
                <p>
                  I have worked on {projects.length}+ projects ranging from
                  corporate websites to AI tools. Check them all out!
                </p>
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
