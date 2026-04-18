
import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./projectDetails.css";

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

export default function MediaSlider({ video, images }) {
    const slides = [
        ...(video ? [{ type: "video", src: video }] : []),
        ...images.map((src) => ({ type: "image", src })),
    ];

    const [current, setCurrent] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        if (current === 0 && videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.playbackRate = 2;
            videoRef.current.play().catch(() => { });
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [current]);

    const go = (idx) => {
        const total = slides.length;
        setCurrent((idx + total) % total);
    };

    const slide = slides[current];

    return (
        <div>
            <div className="slider-wrap">
                {slide.type === "video" ? (
                    <video
                        ref={videoRef}
                        key={slide.src}
                        className="slide-video"
                        src={slide.src}
                        controls
                        muted
                        loop
                        playsInline
                    />
                ) : (
                    <img
                        key={slide.src + current}
                        className="slide-image active"
                        src={slide.src}
                        alt={`slide-${current}`}
                    />
                )}

                <span className="slide-counter">{current + 1} / {slides.length}</span>

                {slides.length > 1 && (
                    <>
                        <button className="slider-arrow left" onClick={() => go(current - 1)}>
                            <ArrowLeft />
                        </button>
                        <button className="slider-arrow right" onClick={() => go(current + 1)}>
                            <ArrowRight />
                        </button>
                    </>
                )}

                <div className="slider-dots">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            className={`dot ${i === current ? "active" : ""}`}
                            onClick={() => go(i)}
                        />
                    ))}
                </div>
            </div>

            <div className="thumb-strip">
                {slides.map((s, i) => (
                    <div
                        key={i}
                        className={`thumb ${i === current ? "active" : ""}`}
                        onClick={() => go(i)}
                    >
                        {s.type === "video" ? (
                            <div className="thumb-video-label"><PlayIcon /></div>
                        ) : (
                            <img src={s.src} alt={`thumb-${i}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}