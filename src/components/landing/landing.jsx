import { useEffect, useRef } from "react";
// ✅ ضع صورتك في نفس الفولدر وغير الاسم هنا
import profileImg from "../../assets/588610953_4115306032066648_6373363123451178713_n (1).jpg";
// لو عندك CV فايل ضعه هنا وغير الاسم
import cvFile from "../../assets/MahmoudTamer_Fullstack.pdf";

import "./landing.css"


export default function HeroSection() {
    const navRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (navRef.current) {
                navRef.current.classList.toggle("scrolled", window.scrollY > 30);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>

            {/* ===== HERO ===== */}
            <section className="hero-section">
                <div className="hero-blob" />

                <div className="container">
                    <div className="row align-items-center">

                        {/* Left: Text */}
                        <div className="col-lg-6 hero-content">
                            <span className="job-label fade-up">Fullstack Developer</span>

                            <h1 className="hero-title fade-up">
                                Hello, my name<br />is Mahmoud Tamer
                            </h1>

                            <p className="hero-sub fade-up">
                                Node.js &amp; React.js developer passionate about building
                                clean, scalable web applications — from back-end APIs to
                                polished front-end experiences.
                            </p>

                            {/* Social Icons */}
                            <div className="social-icons fade-up">
                                <a
                                    href="https://linkedin.com/in/your-profile"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-icon"
                                    title="LinkedIn"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.984V9h3.105v1.561h.045c.432-.82 1.49-1.683 3.067-1.683 3.28 0 3.885 2.16 3.885 4.969v6.605zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zm1.553 13.019H3.783V9h3.107v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://wa.me/201000000000"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-icon"
                                    title="WhatsApp"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                                    </svg>
                                </a>

                                <a
                                    href="https://github.com/your-username"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="social-icon"
                                    title="GitHub"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>

                                <a
                                    href="mailto:your@email.com"
                                    className="social-icon"
                                    title="Email"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
                                    </svg>
                                </a>
                            </div>

                            {/* Download CV Button */}
                            <div className="fade-up">
                                <a href={cvFile} download="Mahmoud_Tamer_CV.pdf" className="btn-download">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
                                    </svg>
                                    Download CV
                                </a>
                            </div>
                        </div>

                        {/* Right: Photo */}
                        <div className="col-lg-6 hero-image-wrap">
                            <div className="profile-blob-wrap hero-img-fadein">
                                <div className="profile-blob-bg" />
                                <img
                                    src={profileImg}
                                    alt="Mahmoud Tamer"
                                    className="profile-img"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    );
}