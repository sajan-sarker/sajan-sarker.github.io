import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ActivitiesSection from './components/ActivitiesSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ImageModal from './components/ImageModal';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useCursorGlow } from './hooks/useCursorGlow';

export default function App() {
  const [modalSrc, setModalSrc] = useState(null);

  // Global interactive hooks (run after every render to pick up new elements)
  useReveal();
  useScrollSpy();
  useCursorGlow();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <ProjectsSection />
        <SkillsSection />
        <ActivitiesSection />
        <CertificationsSection onImageClick={setModalSrc} />
        <ContactSection />
      </main>
      <Footer />
      <ImageModal src={modalSrc} onClose={() => setModalSrc(null)} />
    </>
  );
}
