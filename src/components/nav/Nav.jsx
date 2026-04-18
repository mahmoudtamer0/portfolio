import React from 'react'

import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';

const Nav = () => {
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
        <nav ref={navRef} className="portfolio-nav d-flex align-items-center justify-content-between">
            <Link to="/" className="nav-brand">Mahmoud Tamer</Link>
            <div className="nav-links d-none d-md-flex">
                <a href="#about">About</a>
                <a href="#projects">Projects</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
    )
}

export default Nav