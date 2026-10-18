import { useCallback, useState } from 'react';
import data from './data/data.json';
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
import BackToTop from './components/BackToTop';
import { useReveal } from './hooks/useReveal';
import { useScrollSpy } from './hooks/useScrollSpy';
import { useCursorGlow } from './hooks/useCursorGlow';

export default function App() {
  const [modalIndex, setModalIndex] = useState(null);
  const certCount = data.certifications.length;

  const closeModal = useCallback(() => setModalIndex(null), []);
  const navigateModal = useCallback(
    (step) => setModalIndex((i) => (i === null ? i : (i + step + certCount) % certCount)),
    [certCount]
  );

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
        <CertificationsSection onImageClick={setModalIndex} />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <ImageModal
        items={data.certifications}
        index={modalIndex}
        onClose={closeModal}
        onNavigate={navigateModal}
      />
    </>
  );
}
