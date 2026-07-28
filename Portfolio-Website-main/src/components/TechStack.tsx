import { useEffect, useRef, useState } from "react";
import "./styles/TechStack.css";
import { useApi } from "../hooks/useApi";
import { getTechCategories, getStats } from "../services/api";
import type { Tech } from "../services/api";

const TechStack = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const { data: categories, loading: catLoading } = useApi(getTechCategories);
  const { data: stats, loading: statLoading } = useApi(getStats);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Build flat list and diamond grid from API data
  const allTechs: Tech[] = categories
    ? categories.flatMap((cat) => cat.techs)
    : [];
  const totalTechs = allTechs.length;

  const rowCounts = [2, 4, 6, 8, 6, 4, 2];
  const diamondGrid: Tech[][] = [];
  let currentIndex = 0;
  for (const count of rowCounts) {
    diamondGrid.push(allTechs.slice(currentIndex, currentIndex + count));
    currentIndex += count;
  }

  const loading = catLoading || statLoading;

  return (
    <section
      className={`techstack-section ${visible ? "ts-visible" : ""}`}
      ref={sectionRef}
      id="techstack"
    >
      {/* Quantum Data Core Background */}
      <div className="quantum-core-bg">
        <div className="qc-ambient-glow" />
        <div className="qc-ring qc-ring-1" />
        <div className="qc-ring qc-ring-2" />
        <div className="qc-ring qc-ring-3" />
        <div className="qc-data-ring" />
        <div className="qc-core-sphere" />
        <div className="qc-particle qc-particle-1" />
        <div className="qc-particle qc-particle-2" />
        <div className="qc-particle qc-particle-3" />
      </div>

      {/* Header */}
      <div className="ts-header">
        <p className="ts-subtitle">MY ARSENAL</p>
        <h2 className="ts-title">
          TECH <span className="ts-title-accent">STACK</span>
        </h2>
        <div className="ts-title-line" />
        <p className="ts-desc">
          Technologies I use to craft world-class digital experiences
        </p>
      </div>

      {/* Diamond Grid */}
      <div className="ts-diamond-container">
        {loading
          ? // Skeleton rows
            rowCounts.map((count, ri) => (
              <div className="ts-diamond-row" key={ri}>
                {Array.from({ length: count }).map((_, ci) => (
                  <div
                    className="ts-badge"
                    key={ci}
                    style={{ opacity: 0.3 }}
                  >
                    <div className="ts-badge-inner">
                      <div
                        className="skeleton-block"
                        style={{ width: 36, height: 36, borderRadius: "50%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ))
          : diamondGrid.map((row, rowIdx) => (
              <div className="ts-diamond-row" key={rowIdx}>
                {row.map((tech, colIdx) => {
                  const key = `${rowIdx}-${colIdx}`;
                  const isHovered = hoveredIdx === key;
                  return (
                    <div
                      className={`ts-badge ${isHovered ? "ts-badge-hovered" : ""}`}
                      key={key}
                      style={
                        { "--glow-color": tech.color } as React.CSSProperties
                      }
                      onMouseEnter={() => setHoveredIdx(key)}
                      onMouseLeave={() => setHoveredIdx(null)}
                    >
                      <div className="ts-badge-inner">
                        <img
                          src={tech.icon_url}
                          alt={tech.name}
                          className="ts-badge-icon"
                          loading="lazy"
                        />
                        <span className="ts-badge-label">{tech.name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
      </div>

      {/* Bottom stats bar */}
      <div className="ts-stats">
        {loading ? (
          <>
            <div className="ts-stat">
              <span className="ts-stat-num">{totalTechs}+</span>
              <span className="ts-stat-label">Technologies</span>
            </div>
            <div className="ts-stat-divider" />
            <div className="ts-stat">
              <span className="ts-stat-num">500+</span>
              <span className="ts-stat-label">Problems Solved</span>
            </div>
            <div className="ts-stat-divider" />
            <div className="ts-stat">
              <span className="ts-stat-num">10+</span>
              <span className="ts-stat-label">Projects Built</span>
            </div>
          </>
        ) : (
          stats?.map((stat, i) => (
            <div key={stat.id} style={{ display: "contents" }}>
              {i > 0 && <div className="ts-stat-divider" />}
              <div className="ts-stat">
                <span className="ts-stat-num">{stat.value}</span>
                <span className="ts-stat-label">{stat.label}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TechStack;
