
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="wrapper">
        {[...Array(8)].map((_, i) => (
          <span key={i} className={`circle circle-${i + 1}`}></span>
        ))}
      </div>

    </div>
  );
};

export default Loader;
