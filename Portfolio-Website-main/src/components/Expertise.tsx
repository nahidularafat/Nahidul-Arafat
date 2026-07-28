import "./styles/Expertise.css";
import { useApi } from "../hooks/useApi";
import { getExpertiseItems } from "../services/api";

const Expertise = () => {
  const { data: items, loading } = useApi(getExpertiseItems);

  return (
    <div className="expertise-section section-container" id="expertise">
      <div className="expertise-container">
        <h2>
          My <span>Expertise</span>
        </h2>

        <div className="expertise-content">
          <div className="wire-container">
            <div className="wire"></div>
            <div className="light"></div>
          </div>

          <div className="expertise-box">
            {loading &&
              [1, 2, 3, 4].map((i) => (
                <div className="expertise-item" key={i}>
                  <div className="skeleton-block" style={{ height: 22, width: "60%", marginBottom: 8, borderRadius: 4 }} />
                  <div className="skeleton-block" style={{ height: 14, width: "80%", borderRadius: 4 }} />
                </div>
              ))}

            {items &&
              items.map((item) => (
                <div className="expertise-item" key={item.id}>
                  <h3>{item.title}</h3>
                  <p>{item.skills}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expertise;
