import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import LandingNavbar from '../pages/components/LandingNavbar';
import HeroSection from '../pages/components/HeroSection';
import AboutSection from '../pages/components/AboutSection';
import FaqSection from '../pages/components/FaqSection';
import LandingFooter from '../pages/components/LandingFooter';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <LandingNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* FAQ Section */}
      <FaqSection />

      {/* Footer */}
      <LandingFooter />
    </div>
  );
}