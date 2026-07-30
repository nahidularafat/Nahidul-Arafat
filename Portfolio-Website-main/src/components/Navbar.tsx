import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import "./styles/Navbar.css";
import { useApi } from "../hooks/useApi";
import { getProfile } from "../services/api";
import { useLoading } from "../context/LoadingProvider";
import { initialFX } from "./utils/initialFX";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger);
export let smoother: ScrollSmoother;

const Navbar = () => {
  const { data: profile } = useApi(getProfile);
  const { isLoading } = useLoading();

  const email = profile?.email || "nahidularaf@gmail.com";
  const resumeUrl = profile?.resume_url || "/resume.pdf";

  useEffect(() => {
    smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.7,
      speed: 1.7,
      effects: true,
      autoResize: true,
      ignoreMobileResize: true,
    });

    if (isLoading) {
      smoother.scrollTop(0);
      smoother.paused(true);
    } else {
      initialFX();
    }

    let links = document.querySelectorAll(".header ul a[data-href]");
    links.forEach((elem) => {
      let element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          e.preventDefault();
          let elem = e.currentTarget as HTMLAnchorElement;
          let section = elem.getAttribute("data-href");
          if (section) smoother.scrollTo(section, true, "top top");
        }
      });
    });
    window.addEventListener("resize", () => {
      ScrollSmoother.refresh(true);
    });
  }, []);

  return (
    <>
      <div className="header">
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <img
            src={profile?.profile_image ? (profile.profile_image.includes("/media/profile/") ? "/profile/" + profile.profile_image.split("/media/profile/")[1] : profile.profile_image) : "https://github.com/nahidularafat.png"}
            alt="Profile"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              border: "2px solid #A855F7",
              objectFit: "cover",
            }}
          />
          <a href="/#" className="navbar-title" data-cursor="disable">
            ARAFAT
          </a>
        </div>
        <a
          href={`mailto:${email}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {email}
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="EXPERTISE" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
          <li>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="nav-resume-btn"
              data-cursor="disable"
              style={{
                display: "inline-block",
                marginLeft: "10px",
                padding: "6px 18px",
                border: "1px solid #A855F7",
                borderRadius: "30px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "1px",
                transition: "0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#A855F7";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              RESUME
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
