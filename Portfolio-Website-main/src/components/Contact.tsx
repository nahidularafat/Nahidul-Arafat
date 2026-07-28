import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";
import { useApi } from "../hooks/useApi";
import { getProfile, getSocialLinks } from "../services/api";
import { FaLinkedinIn } from "react-icons/fa6";

const Contact = () => {
  const { data: profile } = useApi(getProfile);
  const { data: socialLinks } = useApi(getSocialLinks);

  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <div className="contact-header">
          <h3>Contact</h3>
          <a
            href={profile?.linkedin_url ?? "https://www.linkedin.com/in/nahidul-arafat-9ab8332ba"}
            target="_blank"
            rel="noreferrer"
            className="contact-hire-btn"
            data-cursor="disable"
          >
            <FaLinkedinIn />
            <span>Hire Me</span>
            <MdArrowOutward className="contact-hire-arrow" />
          </a>
        </div>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Email</h4>
            <p>
              <a
                href={`mailto:${profile?.email ?? "nahidularaf@gmail.com"}`}
                data-cursor="disable"
              >
                {profile?.email ?? "nahidularaf@gmail.com"}
              </a>
            </p>
            <h4>Phone</h4>
            <p>
              <a
                href={`tel:${profile?.phone?.replace(/\s/g, "") ?? "+8801974337424"}`}
                data-cursor="disable"
              >
                {profile?.phone ?? "+880 1974-337424"}
              </a>
            </p>
          </div>

          <div className="contact-box">
            <h4>Social</h4>
            {socialLinks
              ? socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="disable"
                    className="contact-social"
                  >
                    {link.label} <MdArrowOutward />
                  </a>
                ))
              : // Fallback while loading
                ["Github", "Linkedin", "Codeforces", "CodeChef"].map((l) => (
                  <a key={l} href="#" className="contact-social" data-cursor="disable">
                    {l} <MdArrowOutward />
                  </a>
                ))}
          </div>

          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by{" "}
              <span>{profile?.name ?? "Nahidul Arafat"}</span>
            </h2>
            <h5>
              <MdCopyright /> {profile?.copyright_year ?? "2025"}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
