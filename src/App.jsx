import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HeroSection from './components/landing/landing'
import AboutProjects from './components/about/about'
import ProjectDetails from './components/projectDetails/ProjectDetails'
import CVBtn from './components/cvBtn/CvBtn'
import Nav from './components/nav/Nav'
import ContactSection from './components/contact/Contact'
import Footer from './components/footer/Footer'

function App() {
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
