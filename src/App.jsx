import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HeroSection from './components/landing/landing'
import AboutProjects from './components/about/about'
import ProjectDetails from './components/projectDetails/ProjectDetails'
import CVBtn from './components/cvBtn/CvBtn'
import Nav from './components/nav/Nav'
import ContactSection from './components/contact/Contact'
import Footer from './components/footer/Footer'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    if (localStorage.getItem("owner")) return;

    let id = localStorage.getItem("vid");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("vid", id);
    }

    const params = new URLSearchParams(location.search);

    fetch(`${import.meta.env.VITE_API_URL}/visitors/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        visitorId: id,
        referrer: document.referrer || null,
        source: params.get("ref"),
        language: navigator.language,
        screen: `${screen.width}x${screen.height}`,
      }),
    }).catch(() => { });
  }, []);

  return (
    <>
      <CVBtn />
      <Router>
        <Routes>

          <Route path='/' element={<>
            <Nav />
            <HeroSection />
            <AboutProjects />
            <ContactSection />
            <Footer />
          </>} />

          <Route path='/projects/:id' element={
            <>
              <Nav />
              <ProjectDetails />
              <Footer />
            </>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
