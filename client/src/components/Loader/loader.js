
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      {/* Subtle background animation */}
      <div className="bg-animation">
        <div className="floating-orb orb-1"></div>
        <div className="floating-orb orb-2"></div>
        <div className="floating-orb orb-3"></div>
      </div>

      {/* Main loader container */}
      <div className="modern-loader">
        {/* Outer progress circle */}
        <div className="progress-circle outer-circle">
          <div className="progress-ring">
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="rgba(255, 193, 7, 0.15)"
                strokeWidth="4"
              />
              <circle
                cx="100"
                cy="100"
                r="85"
                fill="none"
                stroke="#ffc107"
                strokeWidth="4"
                strokeLinecap="round"
                className="progress-bar"
              />
            </svg>
          </div>
        </div>

        {/* Middle progress circle */}
        <div className="progress-circle middle-circle">
          <div className="progress-ring">
            <svg width="140" height="140" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="rgba(255, 152, 0, 0.15)"
                strokeWidth="3"
              />
              <circle
                cx="70"
                cy="70"
                r="60"
                fill="none"
                stroke="#ff9800"
                strokeWidth="3"
                strokeLinecap="round"
                className="progress-bar"
              />
            </svg>
          </div>
        </div>

        {/* Inner circle with branding */}
        <div className="brand-circle">
          <div className="brand-content">
            <div className="brand-icon">
              <img src="/favicon.png" alt="TrendHora" className="favicon-logo" />
            </div>
            <div className="brand-name">
              <span className="letter">T</span>
              <span className="letter">r</span>
              <span className="letter">e</span>
              <span className="letter">n</span>
              <span className="letter">d</span>
              <span className="letter highlight">H</span>
              <span className="letter">o</span>
              <span className="letter">r</span>
              <span className="letter">a</span>
            </div>
          </div>
          
          {/* Inner progress indicator */}
          <div className="inner-progress">
            <div className="progress-dots">
              <div className="dot dot-1"></div>
              <div className="dot dot-2"></div>
              <div className="dot dot-3"></div>
              <div className="dot dot-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div className="loading-text">
        <span>Loading your experience</span>
        <div className="text-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
