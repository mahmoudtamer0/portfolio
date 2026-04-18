import { Link } from "react-router-dom";
import "./projectCard.css"
import { useState, useRef } from "react";

export default function ProjectCard({ project }) {
    const [hovered, setHovered] = useState(false);
    const videoRef = useRef(null);

    const handleMouseEnter = async () => {
        setHovered(true);

        if (videoRef.current) {
            try {
                videoRef.current.playbackRate = 3;
                await videoRef.current.play();
            } catch (err) {
                console.log("Video play failed:", err);
            }
        }
    };

    const handleMouseLeave = () => {
        setHovered(false);

        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.playbackRate = 1;
        }
    };


    return (
        <Link to={`/projects/${project._id}`}
            className="project-card"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="card-img-wrap">
                {project.video && !hovered && (
                    <div className={`hover-hint ${hovered ? "hide-hint" : "show-hint"}`}>
                        Hold to preview
                    </div>
                )}
                {project.image && (
                    <img
                        src={project.image}
                        alt={project.title}
                        className={`card-media card-img ${hovered && project.video ? "hide" : "show"
                            }`}
                    />
                )}

                {project.video && (
                    <video
                        ref={videoRef}
                        src={project.video}
                        className={`card-media card-video ${hovered ? "show" : "hide"
                            }`}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                    />
                )}

                {project.stack && (
                    <span className="card-category-tag">
                        {project.stack}
                    </span>
                )}
            </div>

            <div className="card-body-custom">
                <h3 className="card-title-custom">{project.title}</h3>

                <div className="card-tech-list">
                    {project.tech?.slice(0, 4).map((t) => (
                        <span key={t} className="tech-tag">
                            {t}
                        </span>
                    ))}
                </div>

                <p className="card-description">
                    {project.shortDescription}
                </p>

                <div className="card-actions">
                    {project.liveDemo ? (
                        <a
                            href={project.liveDemo}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-card btn-live"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            Live
                        </a>
                    ) : (
                        <span className="btn-card btn-disabled">Live</span>
                    )}

                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="btn-card"
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            GitHub
                        </a>
                    )}

                    <Link to={`/projects/${project._id}`} className="btn-card">Details</Link>
                </div>
            </div>
        </Link>
    );
}