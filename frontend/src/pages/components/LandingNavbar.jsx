import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-purple">InsightBoard</div>
          
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#about" className="text-gray-700 hover:text-purple text-sm">About</a>
            <a href="#faq" className="text-gray-700 hover:text-purple text-sm">FAQ</a>
            <Link to="/login" className="text-gray-700 hover:text-purple text-sm font-medium">Login</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a href="#about" className="block text-gray-700 hover:text-purple text-sm">About</a>
            <a href="#faq" className="block text-gray-700 hover:text-purple text-sm">FAQ</a>
            <Link to="/login" className="block text-gray-700 hover:text-purple text-sm font-medium">Login</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
