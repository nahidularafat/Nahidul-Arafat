import { useState } from "react";
import { MdArrowOutward } from "react-icons/md";

interface Props {
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const FALLBACK = "/images/placeholder.webp";

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [errored, setErrored] = useState(false);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  // When image URL changes (e.g. after API fetch), reset state
  const src = props.image || FALLBACK;

  const handleError = () => {
    if (!errored) {
      setErrored(true);
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link || undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img
          src={errored ? FALLBACK : src}
          alt={props.alt || "Project screenshot"}
          onError={handleError}
          loading="lazy"
        />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
