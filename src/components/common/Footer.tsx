
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-india-saffron font-bold text-xl mr-1">Startup</span>
              <span className="text-white font-bold text-xl">Nexus</span>
              <span className="text-india-green font-bold text-xs ml-1">India</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Connecting visionary startup founders with forward-thinking investors to drive innovation and growth in India.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Startups</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=startup" className="text-gray-300 hover:text-white">
                  Register Your Startup
                </Link>
              </li>
              <li>
                <Link to="/startup/host" className="text-gray-300 hover:text-white">
                  Host Your Startup
                </Link>
              </li>
              <li>
                <Link to="/startup/dashboard" className="text-gray-300 hover:text-white">
                  Startup Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Investors</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/register?role=investor" className="text-gray-300 hover:text-white">
                  Register as Investor
                </Link>
              </li>
              <li>
                <Link to="/investor/startups" className="text-gray-300 hover:text-white">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link to="/investor/investments" className="text-gray-300 hover:text-white">
                  Manage Investments
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Make in India Initiative
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Investment Guide
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-base text-gray-400">
            &copy; 2023 Startup Nexus India. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
