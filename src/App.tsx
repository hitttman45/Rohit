import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { LiquidBackground } from './components/LiquidBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { About } from './components/About';
import { DesignFocus } from './components/DesignFocus';
import { Skills } from './components/Skills';
import { SelectedWork } from './components/SelectedWork';
import { VideoEditing } from './components/VideoEditing';
import { PosterStudioPlayground } from './components/PosterStudioPlayground';
import { Process } from './components/Process';
import { DesignPrinciples } from './components/DesignPrinciples';
import { LearningSection } from './components/LearningSection';
import { Statement } from './components/Statement';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Category, Project } from './types';
import { PROJECTS } from './data/portfolioData';

export default function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>('ALL');

  return (
    <div className="min-h-screen bg-black text-[#F5F5F7] selection:bg-[#0071E3] selection:text-white font-sans antialiased relative overflow-x-hidden">
      {/* iOS Liquid Droplets & Ambient Background */}
      <LiquidBackground />

      {/* Desktop Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main Sections */}
      <main>
        {/* 00 Hero Section */}
        <Hero />

        {/* Kinetic Design Marquee Ticker */}
        <Ticker />

        {/* 01 About Section */}
        <About />

        {/* What I Create (Design Focus / Disciplines) */}
        <DesignFocus onSelectCategory={(category) => setSelectedCategory(category)} />

        {/* 02 Tools & Skills */}
        <Skills />

        {/* 03 Selected Work Centerpiece */}
        <SelectedWork 
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
          onSelectProject={(p) => setActiveProject(p)} 
        />

        {/* 04 Video Editing Showcase Gallery */}
        <VideoEditing />

        {/* Interactive Poster & Type Studio Playground */}
        <PosterStudioPlayground />

        {/* 04 Design Workflow Process */}
        <Process />

        {/* Design Principles */}
        <DesignPrinciples />

        {/* Kinetic Design Marquee Ticker */}
        <Ticker />

        {/* Always Learning & Growth */}
        <LearningSection />

        {/* Dramatic Statement */}
        <Statement />

        {/* 05 Contact & Form */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Case Study Modal */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectProject={(p) => setActiveProject(p)}
        allProjects={PROJECTS}
      />
    </div>
  );
}
