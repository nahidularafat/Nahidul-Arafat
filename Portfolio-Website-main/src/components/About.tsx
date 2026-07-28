import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/About.css";
import { useApi } from "../hooks/useApi";
import { getAboutSkills } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const bottomDotRef = useRef<HTMLDivElement>(null);

  const { data: skills, loading } = useApi(getAboutSkills);

  useEffect(() => {
    if (!skills || skills.length === 0) return;

    let ctx = gsap.context(() => {
      // ── Animate timeline line on scroll ──────────────────────────────────
      if (firstDotRef.current && bottomDotRef.current && lineRef.current) {
        const firstRect = firstDotRef.current.getBoundingClientRect();
        const lastRect  = bottomDotRef.current.getBoundingClientRect();
        const distance  = lastRect.top - firstRect.top;
        gsap.set(lineRef.current, { height: distance });
      }

      ScrollTrigger.create({
        trigger: firstDotRef.current,
        start: "center center",
        endTrigger: bottomDotRef.current,
        end: "center center",
        scrub: 1,
        animation: gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none" }
        ),
        onUpdate: (self) => {
          if (self.progress > 0.95) {
            bottomDotRef.current?.classList.add("active");
          } else {
            bottomDotRef.current?.classList.remove("active");
          }
        },
      });
    });

    return () => ctx.revert();
  }, [skills]);

  if (loading) {
    return (
      <div className="about-section section-container" id="about">
        {/* spacer for fixed character */}
        <div className="about-character-col" />
        <div className="about-container">
          <h2 className="about-title">Expertise</h2>
          <div className="about-timeline-group">
            {[1, 2, 3].map((i) => (
              <div className="about-info-box" key={i}>
                <div className="about-dot" />
                <div className="about-category">
                  <div
                    className="skeleton-block"
                    style={{ height: 24, width: "60%", borderRadius: 6 }}
                  />
                </div>
                <div className="about-details">
                  <div
                    className="skeleton-block"
                    style={{ height: 16, width: "90%", borderRadius: 4, marginTop: 8 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="about-section section-container" id="about">
      {/* ── Left column: empty space so the fixed 3D character is visible ── */}
      <div className="about-character-col" />

      {/* ── Right column: title + timeline ─────────────────────────────── */}
      <div className="about-container">
        <h2 className="about-title">Expertise</h2>

        <div className="about-timeline-group">
          {/* Animated progress line */}
          <div className="about-timeline-line" ref={lineRef} />

          {skills &&
            skills.map((skill, index) => {
              const isFirst = index === 0;
              const isLast  = index === skills.length - 1;
              return (
                <div className="about-info-box" key={skill.id}>
                  {/* Dot on the left edge of the content column */}
                  <div
                    className={`about-dot${isLast ? " bottom-dot" : ""}`}
                    ref={
                      isFirst ? firstDotRef : isLast ? bottomDotRef : undefined
                    }
                  />
                  <div className="about-category">
                    <h3>{skill.title}</h3>
                  </div>
                  <div className="about-details">
                    <p>{skill.description}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default About;
