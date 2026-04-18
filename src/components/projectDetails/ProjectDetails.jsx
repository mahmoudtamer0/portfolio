import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import "./projectDetails.css";
import MediaSlider from "./MediaSlider";
import { useNavigate } from "react-router-dom";


const ArrowLeft = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
);
const ArrowRight = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
);
const ExternalIcon = () => (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24">
        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42L17.59 5H14V3zm-1 2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8h-2v8H5V7h8V5z" />
    </svg>
);
const GithubIcon = () => (
    <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
);
const PlayIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

// ─── SLIDER ───────────────────────────────────────────────────────────────


// ─── MAIN PAGE ────────────────────────────────────────────────────────────
export default function ProjectDetails({ projectId, onBack }) {
    const navigate = useNavigate();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/projects/${id}`
                );

                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.message || "Failed to fetch project");
                }

                setProject(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id]);

    // ── loading
    if (loading)
        return (
            <div className="state-wrap">
                <div className="spinner" />
            </div>
        );

    // ── error
    if (error)
        return (
            <div className="state-wrap">
                <p style={{ color: "red" }}>Failed to load project: {error}</p>
            </div>
        );

    return (
        <>

            <div className="container" style={{ maxWidth: 1140 }}>

                {/* ── PAGE HEADER ───────────────────────── */}
                <div className="pd-header">
                    <button className="back-btn reveal-up d1" onClick={() => navigate(-1)}>
                        <ArrowLeft /> Back to Projects
                    </button>

                    <div className="mt-4 reveal-up d2">
                        <span className="stack-tag">{project.stack}</span>
                        <h1 className="pd-title">{project.title}</h1>
                        <p className="pd-short-desc">{project.shortDescription}</p>

                        <div className="header-links">
                            {project.liveDemo && (
                                <a href={project.liveDemo} target="_blank" rel="noreferrer" className="link-btn link-btn-primary">
                                    <ExternalIcon /> Live Demo
                                </a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noreferrer" className="link-btn link-btn-secondary">
                                    <GithubIcon /> View on GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── MAIN LAYOUT ───────────────────────── */}
                <div className="row g-4 pb-5">

                    {/* LEFT — slider + description */}
                    <div className="col-lg-8">

                        {/* Slider */}
                        <div className="reveal-up d3">
                            <MediaSlider video={project.video} images={project.images} />
                        </div>

                        {/* Full Description */}
                        <div className="full-desc-section reveal-up d4">
                            <div className="info-card-title">About the Project</div>
                            <p className="full-desc-text" style={{ marginTop: "1rem" }}>
                                {project.fullDescription}
                            </p>
                        </div>
                    </div>

                    {/* RIGHT — sidebar */}
                    <div className="col-lg-4 reveal-up d5">

                        {/* Tech Stack */}
                        <div className="info-card">
                            <div className="info-card-title">Tech Stack</div>
                            <div className="tech-badges">
                                {project.tech.map((t) => (
                                    <span key={t} className="tech-badge">{t}</span>
                                ))}
                            </div>
                        </div>

                        {/* Features */}
                        <div className="info-card">
                            <div className="info-card-title">Key Features</div>
                            <div>
                                {project.features.map((f, i) => (
                                    <div key={i} className="feature-item">
                                        <span className="feature-dot" />
                                        <span>{f}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="info-card">
                            <div className="info-card-title">Quick Links</div>
                            <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
                                {project.liveDemo && (
                                    <a href={project.liveDemo} target="_blank" rel="noreferrer"
                                        className="link-btn link-btn-primary" style={{ justifyContent: "center" }}>
                                        <ExternalIcon /> Open Live Demo
                                    </a>
                                )}
                                {project.github && (
                                    <a href={project.github} target="_blank" rel="noreferrer"
                                        className="link-btn link-btn-secondary" style={{ justifyContent: "center" }}>
                                        <GithubIcon /> Source Code
                                    </a>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}