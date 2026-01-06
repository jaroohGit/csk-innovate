'use client';
import { useState, useEffect } from 'react';
import { useViewport } from '@/hooks/useViewport';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const viewport = useViewport();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navHeight = viewport.isFoldCover ? 'h-16' : viewport.isFoldInner ? 'h-18' : viewport.isMobile ? 'h-20' : 'h-24';
  const padding = viewport.isFoldCover ? 'px-4' : viewport.isFoldInner ? 'px-6' : viewport.isMobile ? 'px-6' : 'px-8 lg:px-12';

  return (
    <>
      {/* Backdrop Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-lg border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className={`w-full md:max-w-7xl md:mx-auto ${padding}`}>
        <div className={`flex items-center justify-between ${navHeight}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center group">
              <img src="/logo.svg" alt="CSK INNOVATE" className="h-10 fold:h-12 w-auto transition-transform group-hover:scale-105" />
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <a href="#solutions" className="px-4 py-2 text-gray-300 hover:text-accent transition-colors">
              Solutions
            </a>
            <a href="#use-cases" className="px-4 py-2 text-gray-300 hover:text-accent transition-colors">
              Use Cases
            </a>
            <a href="#blog" className="px-4 py-2 text-gray-300 hover:text-accent transition-colors">
              Blog
            </a>
            <a href="#contact" className="px-4 py-2 text-gray-300 hover:text-accent transition-colors">
              Contact
            </a>
            <div className="ml-4">
              <button className="px-6 py-2.5 bg-accent text-white rounded-full hover:bg-accent/90 transition-all">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 animate-fade-in bg-background/95 backdrop-blur-xl border-t border-white/10 shadow-2xl">
            <div className="flex flex-col space-y-2 px-4">
              <a 
                href="#solutions" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-accent transition-all"
              >
                Solutions
              </a>
              <a 
                href="#use-cases" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-accent transition-all"
              >
                Use Cases
              </a>
              <a 
                href="#blog" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-accent transition-all"
              >
                Blog
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-gray-300 hover:text-accent transition-all"
              >
                Contact
              </a>
              <div className="pt-4">
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-6 py-3 bg-accent text-white rounded-full hover:bg-accent/90 transition-all"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}