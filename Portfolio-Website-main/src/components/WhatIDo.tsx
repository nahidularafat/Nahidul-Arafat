import { useEffect, useRef } from "react";
import "./styles/WhatIDo.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useApi } from "../hooks/useApi";
import { getExpertiseAreas } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

function handleClick(container: HTMLDivElement) {
  container.classList.toggle("what-content-active");
  container.classList.remove("what-sibling");
  if (container.parentElement) {
    const siblings = Array.from(container.parentElement.children);
    siblings.forEach((sibling) => {
      if (sibling !== container) {
        sibling.classList.remove("what-content-active");
        sibling.classList.toggle("what-sibling");
      }
    });
  }
}

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([]);
  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el;
  };

  const { data: areas, loading } = useApi(getExpertiseAreas);

  useEffect(() => {
    if (!areas || areas.length === 0) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#whatido",
        start: "top 60%",
        end: "bottom 20%",
        onEnter: () => {
          gsap.to(".character-model", {
            left: "15%",
            duration: 1.2,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(".character-model", {
            left: "20%",
            duration: 1.2,
            ease: "power3.out",
          });
        },
      });
    });

    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach((container) => {
        if (container) {
          container.classList.remove("what-noTouch");
          container.addEventListener("click", () => handleClick(container));
        }
      });
    }

    return () => {
      ctx.revert();
      containerRef.current.forEach((container) => {
        if (container) {
          container.removeEventListener("click", () => handleClick(container));
        }
      });
    };
  }, [areas]);

  return (
    <div className="whatIDO" id="whatido">
      {/* Empty Left Column for 3D Character */}
      <div className="what-character-column"></div>

      {/* Heading Column */}
      <div className="what-heading-column">
        <h2 className="title">
          W<span className="hat-h2">HAT</span>
          <div>
            I<span className="do-h2"> DO</span>
          </div>
        </h2>
      </div>

      {/* Accordion Column */}
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {loading &&
            [1, 2, 3].map((i) => (
              <div className="what-content what-noTouch" key={i}>
                <div className="what-border1">
                  <svg height="100%">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>
                </div>
                <div className="what-corner"></div>
                <div className="what-content-in">
                  <div className="skeleton-block" style={{ height: 28, width: "40%", borderRadius: 6 }} />
                </div>
              </div>
            ))}

          {areas &&
            areas.map((area, index) => (
              <div
                className="what-content what-noTouch"
                key={area.id}
                ref={(el) => setRef(el, index)}
              >
                <div className="what-border1">
                  <svg height="100%">
                    {index === 0 && (
                      <line x1="0" y1="0" x2="100%" y2="0" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                    )}
                    <line x1="0" y1="100%" x2="100%" y2="100%" stroke="white" strokeWidth="2" strokeDasharray="6,6" />
                  </svg>
                </div>
                <div className="what-corner"></div>
                <div className="what-content-in">
                  <h3>{area.title}</h3>
                  <h4>{area.subtitle}</h4>
                  <p>{area.description}</p>
                  <h5>Skillset &amp; tools</h5>
                  <div className="what-content-flex">
                    {area.tags_list.map((tag) => (
                      <div className="what-tags" key={tag}>
                        {tag}
                      </div>
                    ))}
                  </div>
                  <div className="what-arrow"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
