import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../projects/ListProjects"
import ListProjects from "../projects/ListProjects";

// ===================== DATA =====================
const skills = [
    { name: "Node.js", color: "#3c873a" },
    { name: "React.js", color: "#61dafb" },
    { name: "Express.js", color: "#000000" },
    { name: "MongoDB", color: "#4db33d" },
    { name: "PostgreSQL", color: "#336791" },
    { name: "REST APIs", color: "#F5C518" },
    { name: "JWT Auth", color: "#d63384" },
    { name: "Docker", color: "#2496ed" },
    { name: "Git", color: "#f34f29" },
    { name: "TypeScript", color: "#3178c6" },
    { name: "Tailwind", color: "#38bdf8" },
    { name: "Socket.io", color: "#010101" },
];

// const projects = [
//     {
//         id: 1,
//         title: "E-Commerce Platform",
//         category: "Fullstack",
//         description:
//             "Full-featured e-commerce app with product management, cart system, secure checkout, and admin dashboard. Built for performance and scalability.",
//         tech: ["Node.js", "React.js", "MongoDB", "Stripe"],
//         github: "#",
//         live: "#",
//         image: null,
//     },
//     {
//         id: 2,
//         title: "Chat Application",
//         category: "Fullstack",
//         description:
//             "Real-time chat app supporting private & group rooms, file sharing, and online presence tracking using WebSockets.",
//         tech: ["Node.js", "Socket.io", "React.js", "MongoDB"],
//         github: "#",
//         live: null,
//         image: null,
//     },
//     {
//         id: 3,
//         title: "REST API Service",
//         category: "Backend",
//         description:
//             "Scalable RESTful API with full JWT authentication, role-based access control, rate limiting, and Swagger documentation.",
//         tech: ["Node.js", "Express.js", "PostgreSQL", "Docker"],
//         github: "#",
//         live: null,
//         image: null,
//     },
//     {
//         id: 4,
//         title: "Portfolio Dashboard",
//         category: "Frontend",
//         description:
//             "Interactive analytics dashboard with charts, dark mode, and responsive layout. Consumes real data from a custom backend.",
//         tech: ["React.js", "TypeScript", "Tailwind", "REST APIs"],
//         github: "#",
//         live: "#",
//         image: null,
//     },
//     {
//         id: 5,
//         title: "Auth Microservice",
//         category: "Backend",
//         description:
//             "Standalone authentication microservice with OAuth2, refresh tokens, and email verification. Plug-and-play for any Node.js app.",
//         tech: ["Node.js", "JWT Auth", "PostgreSQL", "Docker"],
//         github: "#",
//         live: null,
//         image: null,
//     },
//     {
//         id: 6,
//         title: "UI Component Library",
//         category: "Frontend",
//         description:
//             "Reusable, accessible React component library with Storybook docs. Covers forms, modals, toasts, and layout primitives.",
//         tech: ["React.js", "TypeScript", "Tailwind", "Storybook"],
//         github: "#",
//         live: "#",
//         image: null,
//     },
// ];

const CATEGORIES = ["All", "Fullstack", "Backend", "Frontend"];

// ===================== STYLES =====================
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --yellow: #F5C518;
    --dark:   #1a1a1a;
    --gray:   #6b7280;
    --light-bg: #f4f4f6;
    --card-bg:  #ffffff;
    --border:   #e5e7eb;
  }

  /* ===== SHARED ===== */
  .section-label {
    color: var(--yellow);
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 0.6rem;
  }

  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
    color: var(--dark);
    letter-spacing: -1px;
    line-height: 1.1;
  }

  /* ===== SCROLL REVEAL ===== */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-40px);
    transition: opacity 0.65s ease, transform 0.65s ease;
  }
  .reveal-left.visible {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-delay-1 { transition-delay: 0.1s; }
  .reveal-delay-2 { transition-delay: 0.2s; }
  .reveal-delay-3 { transition-delay: 0.3s; }
  .reveal-delay-4 { transition-delay: 0.4s; }

  /* ===== ABOUT ===== */
  #about {
    padding: 7rem 0 6rem;
    background: var(--light-bg);
    position: relative;
    overflow: hidden;
  }

  #about::before {
    content: 'ABOUT';
    position: absolute;
    right: -1rem;
    top: 50%;
    transform: translateY(-50%) rotate(90deg);
    font-family: 'Playfair Display', serif;
    font-size: 9rem;
    font-weight: 900;
    color: rgba(0,0,0,0.03);
    letter-spacing: -4px;
    pointer-events: none;
    white-space: nowrap;
  }

  .about-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 1.05rem;
    font-weight: 300;
    color: var(--gray);
    line-height: 1.85;
    max-width: 560px;
  }

  .about-text strong {
    color: var(--dark);
    font-weight: 500;
  }

  /* Skills grid */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    margin-top: 2.5rem;
  }

  .skill-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    padding: 0.45rem 1rem;
    border-radius: 50px;
    font-size: 0.82rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    background: #fff;
    border: 1.5px solid var(--border);
    color: var(--dark);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    cursor: default;
  }

  .skill-badge:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0,0,0,0.09);
  }

  .skill-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  /* About divider */
  .about-divider {
    width: 50px;
    height: 3px;
    background: var(--yellow);
    border-radius: 2px;
    margin: 1.2rem 0 1.8rem;
  }

  /* ===== PROJECTS ===== */
  #projects {
    padding: 7rem 0 6rem;
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  #projects::before {
    content: 'WORK';
    position: absolute;
    left: -1rem;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
    font-family: 'Playfair Display', serif;
    font-size: 9rem;
    font-weight: 900;
    color: rgba(0,0,0,0.025);
    letter-spacing: -4px;
    pointer-events: none;
    white-space: nowrap;
  }

  /* Filter pills */
  .filter-pills {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }

  .filter-pill {
    padding: 0.4rem 1.2rem;
    border-radius: 50px;
    font-size: 0.82rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    border: 1.5px solid var(--border);
    background: transparent;
    color: var(--gray);
    cursor: pointer;
    transition: all 0.22s ease;
  }

  .filter-pill:hover {
    border-color: var(--dark);
    color: var(--dark);
  }

  .filter-pill.active {
    background: var(--yellow);
    border-color: var(--yellow);
    color: var(--dark);
    font-weight: 700;
  }

  /* Project card */
  .project-card {
    background: var(--card-bg);
    border: 1.5px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .project-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  }

  .card-img-wrap {
    position: relative;
    height: 180px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    overflow: hidden;
    flex-shrink: 0;
  }

  .card-img-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    color: rgba(245, 197, 24, 0.15);
    letter-spacing: -2px;
    user-select: none;
  }

  .card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  .project-card:hover .card-img-wrap img {
    transform: scale(1.05);
  }

  .card-category-tag {
    position: absolute;
    top: 12px;
    left: 12px;
    background: var(--yellow);
    color: var(--dark);
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.25rem 0.7rem;
    border-radius: 50px;
  }

  .card-body-custom {
    padding: 1.4rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .card-title-custom {
    font-family: 'Playfair Display', serif;
    font-size: 1.2rem;
    font-weight: 700;
    color: var(--dark);
    margin-bottom: 0.6rem;
    letter-spacing: -0.3px;
  }

  .card-tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.9rem;
  }

  .tech-tag {
    font-size: 0.7rem;
    font-weight: 500;
    font-family: 'DM Sans', sans-serif;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    background: #f4f4f6;
    color: var(--gray);
    border: 1px solid var(--border);
  }

  .card-description {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 300;
    color: var(--gray);
    line-height: 1.7;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 1.2rem;
  }

  .card-actions {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-top: auto;
  }

  .btn-card {
    font-family: 'DM Sans', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.4rem 0.9rem;
    border-radius: 8px;
    border: 1.5px solid var(--border);
    background: transparent;
    color: var(--dark);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .btn-card:hover {
    background: var(--dark);
    border-color: var(--dark);
    color: #fff;
  }

  .btn-card.btn-live {
    background: var(--yellow);
    border-color: var(--yellow);
    color: var(--dark);
  }

  .btn-card.btn-live:hover {
    background: var(--dark);
    border-color: var(--dark);
    color: var(--yellow);
  }

  .btn-card.btn-disabled {
    opacity: 0.35;
    pointer-events: none;
  }

  /* Cards grid animation */
  .cards-grid .col {
    transition: opacity 0.35s ease, transform 0.35s ease;
  }

  .cards-grid .col.hide {
    opacity: 0;
    transform: scale(0.95);
    pointer-events: none;
  }

  @media (max-width: 768px) {
    #about::before, #projects::before { display: none; }
    .about-text { font-size: 0.95rem; }
  }
`;

function useScrollReveal() {
    useEffect(() => {
        const els = document.querySelectorAll(".reveal, .reveal-left");
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.15 }
        );
        els.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);
}


function AboutSection() {
    return (
        <section id="about">
            <div className="container">
                <div className="row align-items-start">
                    <div className="col-lg-5 mb-5 mb-lg-0">
                        <span className="section-label reveal">Who I Am</span>
                        <h2 className="section-title reveal reveal-delay-1">About Me</h2>
                        <div className="about-divider reveal reveal-delay-2" />
                        <p className="about-text reveal reveal-delay-3">
                            I'm <strong>Mahmoud Tamer</strong>, a Fullstack Developer focused on{" "}
                            <strong>Node.js</strong> and <strong>React.js</strong>. I build
                            things that live on the internet — clean APIs, scalable backends,
                            and interfaces people actually enjoy using.
                            <br /><br />
                            I care about writing code that's readable, maintainable, and ships
                            on time. Whether it's designing a database schema or fine-tuning a
                            UI animation, I stay hands-on across the entire stack.
                        </p>
                    </div>

                    <div className="col-lg-6 offset-lg-1">
                        <span className="section-label reveal">Tech Stack</span>
                        <h3 className="reveal reveal-delay-1" style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 400,
                            color: "var(--gray)",
                            marginBottom: 0,
                        }}>
                            Tools & technologies I work with daily
                        </h3>
                        <div className="skills-grid">
                            {skills.map((s, i) => (
                                <span
                                    key={s.name}
                                    className={`skill-badge reveal reveal-delay-${Math.min((i % 4) + 1, 4)}`}
                                >
                                    <span className="skill-dot" style={{ background: s.color }} />
                                    {s.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default function AboutProjects() {
    useScrollReveal();
    return (
        <>
            <style>{styles}</style>
            <AboutSection />
            <ListProjects />
        </>
    );
}