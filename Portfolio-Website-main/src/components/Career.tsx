import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles/Career.css";
import { useApi } from "../hooks/useApi";
import { getCareer } from "../services/api";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const lineRef = useRef<HTMLDivElement>(null);
  const firstDotRef = useRef<HTMLDivElement>(null);
  const bottomDotRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLDivElement>(null);

  const { data: entries, loading } = useApi(getCareer);

  useEffect(() => {
    if (!entries || entries.length === 0) return;

    let ctx = gsap.context(() => {
      if (firstDotRef.current && bottomDotRef.current && lineRef.current) {
        const firstRect = firstDotRef.current.getBoundingClientRect();
        const lastRect = bottomDotRef.current.getBoundingClientRect();
        const distance = lastRect.top - firstRect.top;
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
  }, [entries]);

  if (loading) {
    return (
      <div className="career-section section-container" id="career">
        <div className="career-container">
          <h2>
            My career <span>&</span>
            <br />
            experience
          </h2>
          <div className="career-info">
            {[1, 2, 3].map((i) => (
              <div className="career-info-box has-timeline" key={i}>
                <div className="career-dot" />
                <div className="skeleton-block" style={{ height: 20, width: "40%", marginBottom: 8, borderRadius: 4 }} />
                <div className="skeleton-block" style={{ height: 14, width: "80%", borderRadius: 4 }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const regularEntries = entries?.filter((e) => e.entry_type !== "achievements") ?? [];
  const achievementsEntry = entries?.find((e) => e.entry_type === "achievements");

  return (
    <div className="career-section section-container" id="career">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br />
          experience
        </h2>
        <div className="career-info">
          <div
            className="career-timeline-group"
            ref={groupRef}
            style={{ position: "relative" }}
          >
            <div className="career-timeline-line" ref={lineRef}></div>

            {regularEntries.map((entry, index) => (
              <div className="career-info-box has-timeline" key={entry.id}>
                <div
                  className="career-dot"
                  ref={index === 0 ? firstDotRef : undefined}
                />
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{entry.title}</h4>
                    <h5>
                      {entry.org_url ? (
                        <a href={entry.org_url} target="_blank" rel="noreferrer">
                          {entry.organization}
                        </a>
                      ) : (
                        entry.organization
                      )}
                    </h5>
                  </div>
                  <h3>{entry.period}</h3>
                </div>
                {entry.description && <p>{entry.description}</p>}
              </div>
            ))}

            {achievementsEntry && (
              <div
                className="career-info-box career-achievements-box has-timeline"
                style={{ marginTop: "0px" }}
              >
                <div className="career-dot" />
                <div
                  className="career-dot bottom-dot"
                  ref={bottomDotRef}
                  style={{ top: "auto", bottom: "15px" }}
                />
                <div className="career-info-in">
                  <div className="career-role">
                    <h4>{achievementsEntry.title}</h4>
                    <h5>{achievementsEntry.organization}</h5>
                  </div>
                </div>
                <div
                  className="career-achievements-list"
                  style={{
                    fontSize: "16px",
                    fontWeight: "300",
                    lineHeight: "1.6",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  <ul
                    style={{
                      margin: 0,
                      paddingLeft: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {achievementsEntry.achievements.map((a) => (
                      <li key={a.id}>
                        <strong style={{ color: "#fff", fontWeight: "600" }}>
                          {a.highlight}
                        </strong>
                        {a.description ? ` — ${a.description}` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
