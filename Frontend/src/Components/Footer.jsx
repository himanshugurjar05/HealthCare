import React from "react";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, Clock, Heart, Shield, Link } from "lucide-react";
// import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-blue-900 to-gray-900">
      {/* Decorative top wave */}
      <div className="w-full overflow-hidden">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 50C840 40 960 20 1080 20C1200 20 1320 40 1380 50L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="currentColor" className="text-gray-100" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">HealthCare</h2>
            </div>
            <p className="text-blue-100/80 leading-relaxed">
              Empowering healthcare through innovative management solutions. 
              Dedicated to excellence in patient care and medical service delivery.
            </p>
            <div className="flex items-center space-x-4">
              <SocialIcon icon={Facebook} />
              <SocialIcon icon={Twitter} />
              <SocialIcon icon={Instagram} />
              <SocialIcon icon={Linkedin} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4">
              {['About Us', 'Our Services', 'Find a Doctor', 'Book Appointment'].map((link) => (
                <li key={link}>
                  <li className="text-blue-100/80 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>{link}</span>
                  </li>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Contact Us</h3>
            <ul className="space-y-4">
              <li>
                <li className="text-blue-100/80 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+1 (123) 456-7890</span>
                </li>
              </li>
              <li>
                <a href="himanshu.gurjar7999@gmail.com" className="text-blue-100/80 hover:text-blue-300 transition-colors duration-200 flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>himanshu.gurjar7999@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start space-x-2 text-blue-100/80">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>123 Medical Street, Health City, HC 54321, United States</span>
              </li>
              <li className="flex items-center space-x-2 text-blue-100/80">
                <Clock className="w-4 h-4" />
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white">Newsletter</h3>
            <p className="text-blue-100/80">Stay updated with our latest news and updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-blue-900/50 border border-blue-800 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 border-t border-blue-800/30">
          <p className="text-center text-blue-100/60">
            © {new Date().getFullYear()} HealthCare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon: Icon }) => (
  <a
    href="#"
    className="w-8 h-8 rounded-full bg-blue-800/30 flex items-center justify-center hover:bg-blue-500 transition-colors duration-200"
  >
    <Icon className="w-4 h-4 text-white" />
  </a>
);

export default Footer;