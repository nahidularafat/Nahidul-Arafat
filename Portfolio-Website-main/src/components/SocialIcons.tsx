import {
  FaGithub,
  FaLinkedinIn,
  FaCode,
} from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";
import { useApi } from "../hooks/useApi";
import { getSocialLinks, getProfile } from "../services/api";
import type { ReactElement } from "react";

// Map icon_name string → actual icon component
const iconMap: Record<string, ReactElement> = {
  FaGithub: <FaGithub />,
  FaLinkedinIn: <FaLinkedinIn />,
  FaCode: <FaCode />,
};

const SocialIcons = () => {
  const { data: links } = useApi(getSocialLinks);
  const { data: profile } = useApi(getProfile);

  useEffect(() => {
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const spans = social.querySelectorAll("span");
    if (!spans.length) return;

    spans.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;
      if (!link) return;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);
        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      return () => {
        elem.removeEventListener("mousemove", onMouseMove);
      };
    });
  }, [links]);

  const activeLinks = links?.filter((l) => l.is_active) ?? [];

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        {activeLinks.map((link) => (
          <span key={link.id}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {iconMap[link.icon_name] ?? <FaGithub />}
            </a>
          </span>
        ))}
        {/* Fallback while loading */}
        {!links && (
          <>
            <span>
              <a href="https://github.com/nahidularafat" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
            </span>
            <span>
              <a href="https://www.linkedin.com/in/nahidul-arafat-9ab8332ba" target="_blank" rel="noreferrer">
                <FaLinkedinIn />
              </a>
            </span>
          </>
        )}
      </div>
      <a
        className="resume-button"
        href={profile?.resume_url ?? "/resume.pdf"}
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
