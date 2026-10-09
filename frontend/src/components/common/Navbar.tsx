import React, { useState } from 'react';
import { PROJECT_NAME, PROJECT_SUBTITLE, NAVIGATION_LINKS } from '../../config/projectConfig';
import { Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-auraCream/95 backdrop-blur-xl border-b border-auraBorder transition-all py-2.5 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[84px] sm:min-h-[96px]">
          
          {/* Official AURA Logo & Brand Title */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3.5 sm:space-x-5 cursor-pointer group py-1 flex-shrink-0"
          >
            {/* Prominent Cropped AURA Logo Graphic (No text underneath) */}
            <div className="flex items-center justify-center p-1.5 rounded-2xl bg-white border border-auraBorder shadow-sm group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
              <img 
                src="/aura-logo-cropped.png" 
                alt="AURA Symbol" 
                className="h-14 w-auto sm:h-16 md:h-20 object-contain" 
              />
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-auraDarkGreen-800 font-sans group-hover:text-auraGreen-700 transition-colors">
                  {PROJECT_NAME}
                </span>
                <span className="text-[10px] font-mono font-bold bg-auraGreen-100 text-auraGreen-800 px-2 py-0.5 rounded-md uppercase border border-auraGreen-200">
                  Green Fleet Platform
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-auraDarkGreen-700 font-bold tracking-wide truncate max-w-[190px] sm:max-w-xs md:max-w-sm">
                {PROJECT_SUBTITLE}
              </p>
            </div>
          </div>

          {/* 2-Line Quick-Jump Navbar Links (5 in Line 1, 4 in Line 2) */}
          <nav className="hidden xl:flex flex-col space-y-2 bg-white/95 p-2.5 rounded-2xl border border-auraBorder shadow-xs ml-4 sm:ml-6 my-auto flex-shrink-0">
            {/* Line 1: 5 Navigation Functions */}
            <div className="flex items-center space-x-2">
              {NAVIGATION_LINKS.slice(0, 5).map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-auraGreen-700 text-white shadow-md scale-[1.03]'
                        : 'text-auraDarkGreen-800 hover:text-auraGreen-700 hover:bg-auraCream'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            {/* Line 2: 4 Navigation Functions */}
            <div className="flex items-center space-x-2">
              {NAVIGATION_LINKS.slice(5, 9).map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? 'bg-auraGreen-700 text-white shadow-md scale-[1.03]'
                        : 'text-auraDarkGreen-800 hover:text-auraGreen-700 hover:bg-auraCream'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Quick Action Button to Report */}
          <div className="hidden sm:flex items-center space-x-3 ml-3 flex-shrink-0">
            <button
              onClick={() => onNavigate('reports')}
              className="flex items-center space-x-2 px-4.5 py-3 rounded-xl bg-auraGreen-700 hover:bg-auraGreen-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-95 group"
            >
              <span>Decision Report</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center space-x-2 flex-shrink-0">
            <button
              onClick={() => onNavigate('reports')}
              className="px-3.5 py-2 rounded-lg bg-auraGreen-700 text-white text-xs font-extrabold"
            >
              Report
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-auraDarkGreen-800 hover:bg-white border border-auraBorder"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-auraBorder bg-auraCream px-4 pt-4 pb-6 space-y-2.5 animate-fadeIn">
          {NAVIGATION_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-4.5 py-3.5 rounded-xl font-extrabold text-sm transition-all ${
                activeSection === link.id
                  ? 'bg-auraGreen-700 text-white shadow-sm'
                  : 'text-auraDarkGreen-800 hover:bg-white border border-transparent hover:border-auraBorder'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

