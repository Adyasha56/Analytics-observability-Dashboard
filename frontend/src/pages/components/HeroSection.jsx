import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="hero" style={{
      backgroundImage: 'url(/bgimage.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 0 }} />
      
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-violet-500 drop-shadow-lg">
          Product Analytics Dashboard
        </h1>
        <p className="text-lg md:text-xl text-white
        -700 mb-8 drop-shadow-md">
          Track user engagement, feature clicks, and analytics in real-time
        </p>
        
        <div className="space-y-4 md:space-y-0 md:space-x-4 flex flex-col md:flex-row justify-center items-center">
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
