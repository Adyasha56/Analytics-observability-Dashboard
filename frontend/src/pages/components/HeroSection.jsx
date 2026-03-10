import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-[500px] flex items-center justify-center py-20 overflow-hidden" id="hero">
      <img 
        src="/bgimage.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10 bg-white/40 rounded-lg py-8 px-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-purple">
          Product Analytics Dashboard
        </h1>
        <p className="text-base md:text-lg text-gray-600 mb-6">
          Track user engagement, feature clicks, and analytics in real-time
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4">
          <Link 
            to="/register" 
            className="inline-block btn-primary"
          >
            Get Started
          </Link>
          <Link 
            to="/login" 
            className="inline-block btn-secondary"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}
