import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase, ChevronRight, Building2, Shield, Monitor, Users, UserCircle, LogOut } from 'lucide-react';
import { NavItem, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  user?: User | null;
  onLogout?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', id: 'home' },
  { label: 'Services', id: 'services' },
  { label: 'Contact', id: 'contact' },
];

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-4' : 'bg-white py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer group" 
              onClick={() => onNavigate('home')}
            >
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-700 transition-colors">
                <Building2 className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight leading-none">BEBEST</h1>
                <p className="text-xs text-slate-500 font-medium tracking-widest uppercase">Group</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`text-sm font-semibold transition-colors ${
                    activePage === item.id 
                      ? 'text-blue-700' 
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              {user ? (
                 <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                    <button 
                      onClick={() => onNavigate('portal')}
                      className="flex items-center text-sm font-semibold text-slate-900 hover:text-blue-700 transition-colors"
                    >
                      <UserCircle className="w-5 h-5 mr-2" />
                      Dashboard
                    </button>
                    {onLogout && (
                      <button 
                        onClick={onLogout}
                        className="text-sm font-semibold text-slate-500 hover:text-red-600 transition-colors"
                        title="Logout"
                      >
                        <LogOut className="w-5 h-5" />
                      </button>
                    )}
                 </div>
              ) : (
                <button 
                  onClick={() => onNavigate('portal')}
                  className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center"
                >
                  Client Portal <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-900 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-4 flex flex-col space-y-4 border-t border-slate-100 h-screen">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-base font-medium py-2 ${
                  activePage === item.id ? 'text-blue-700' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="border-t border-slate-100 pt-4 mt-2">
              {user ? (
                <>
                  <div className="flex items-center mb-4 text-slate-900 font-semibold">
                    <UserCircle className="w-5 h-5 mr-2" /> {user.name}
                  </div>
                  <button 
                    onClick={() => {
                      onNavigate('portal');
                      setIsMenuOpen(false);
                    }}
                    className="bg-blue-600 text-white w-full py-3 rounded-lg text-center font-medium mb-3"
                  >
                    Go to Dashboard
                  </button>
                  {onLogout && (
                    <button 
                      onClick={() => {
                        onLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full py-3 rounded-lg text-center font-medium text-red-600 bg-red-50 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  )}
                </>
              ) : (
                <button 
                    onClick={() => {
                      onNavigate('portal');
                      setIsMenuOpen(false);
                    }}
                    className="bg-slate-900 text-white w-full py-3 rounded-lg text-center font-medium"
                  >
                    Login / Sign Up
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-white text-xl font-bold mb-4">Bebest Group</h2>
            <p className="max-w-md text-slate-400">
              Your trusted partner in Employment, Insurance, Management, and IT solutions. 
              Bridging the gap between complexity and execution.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Employment Agency</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Insurance Agency</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Management Services</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">IT Solutions</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-white transition-colors">Enterprise Services</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>No.27, 1st Flr, Airport Mall</li>
              <li>Berakas, BB2713</li>
              <li>contact@bebestgroup.com</li>
              <li>8111786</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Bebest Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
};