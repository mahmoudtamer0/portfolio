import cvFile from "../../assets/MahmoudTamer_Fullstack.pdf";

import "./cvBtn.css";

export default function FloatingCVButton() {
  return (
    <>
      <a
        href={cvFile}
        download="Mahmoud_Tamer_CV.pdf"
        className="floating-cv-btn"
        title="Download CV"
      >
        <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
        </svg>
        Download CV
      </a>
    </>
  );
}