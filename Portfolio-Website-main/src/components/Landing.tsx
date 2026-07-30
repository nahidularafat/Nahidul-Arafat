import { PropsWithChildren } from "react";
import "./styles/Landing.css";
import { useApi } from "../hooks/useApi";
import { getProfile } from "../services/api";

const Landing = ({ children }: PropsWithChildren) => {
  const { data: profile } = useApi(getProfile);

  const firstName = profile?.first_name ?? "NAHIDUL";
  const lastName = profile?.last_name ?? "ARAFAT";
  const tagline = profile?.tagline ?? "A Passionate";
  const roleLine1 = profile?.role_line1 ?? "FULL STACK";
  const roleLine2 = profile?.role_line2 ?? "ENGINEER";

  return (
    <>
      <div className="landing-section" id="landingDiv">
        {/* Cyber Grid Background */}
        <div className="cyber-grid"></div>
        <div className="cyber-horizon"></div>

        {/* Floating Holographic Geometry */}
        <div className="floating-geometry">
          <div className="geo-shape geo-1"></div>
          <div className="geo-shape geo-2"></div>
          <div className="geo-shape geo-3"></div>
          <div className="geo-shape geo-4"></div>
          <div className="geo-shape geo-5"></div>
          <div className="geo-shape geo-6"></div>
        </div>

        {/* Aesthetic Wind Effect */}
        <div className="aesthetic-wind">
          <div className="wind-trail"></div>
          <div className="wind-trail"></div>
          <div className="wind-trail"></div>
          <div className="wind-trail"></div>
        </div>

        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hello! I'm</h2>
            <h1>
              {firstName}
              <br />
              <span>{lastName}</span>
            </h1>
          </div>
          <div className="landing-info">
            <h3 className="hero-line-1">{tagline}</h3>
            <h2 className="hero-line-2">{roleLine1}</h2>
            <h2 className="hero-line-3">{roleLine2}</h2>
          </div>

          <div className="mobile-profile-wrapper">
            <img
              src={profile?.profile_image ? (profile.profile_image.includes("/media/profile/") ? "/profile/" + profile.profile_image.split("/media/profile/")[1] : profile.profile_image) : "https://github.com/nahidularafat.png"}
              alt={profile?.name ?? "Nahidul Arafat"}
              className="mobile-profile-pic"
            />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default Landing;
