import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Calendar, UserRound, Menu, X, LogIn, UserPlus } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    // { path: '/login', label: 'Login', icon: LogIn },
    // { path: '/SignUp', label: 'SignUp', icon: UserPlus },
    { path: '/h', label: 'Dashboard', icon: Home },
    { path: '/doctor', label: 'Doctors', icon: Users },
    { path: '/appointment', label: 'Appointments', icon: Calendar },
    { path: '/patient', label: 'Patients', icon: UserRound },
  ];
  
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-blue-600 font-bold text-xl">H</span>
            </div>
            <h1 className="text-white font-bold text-xl">Health Dashboard</h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 group
                    ${location.pathname === path 
                      ? 'bg-white/10 text-white' 
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
                >
                  <Icon className="w-5 h-5 transform group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <ul className="space-y-2">
              {navItems.map(({ path, label, icon: Icon }) => (
                <li key={path}>
                  <Link
                    to={path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                      ${location.pathname === path 
                        ? 'bg-white/10 text-white' 
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'}`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}