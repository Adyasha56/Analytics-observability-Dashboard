import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative py-20 px-6 overflow-hidden" style={{
      backgroundImage: 'url(/bgimage.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20" style={{ zIndex: 0 }} />

      <div className="max-w-6xl mx-auto text-center relative" style={{ zIndex: 1 }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-8">
          <Sparkles className="w-5 h-5 text-violet-600" />
          <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold">
            Interactive Analytics Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Visualize Your
          <span className="bg-gradient-to-r from-violet-600 to-amber-600 bg-clip-text text-transparent">
            {' '}Product Usage
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
          Track user interactions in real-time. The dashboard visualizes its own usage, creating a
          self-referential analytics experience that tells the story of how your users engage.
        </p>

        {/* Key Features List */}
        <div className="grid md:grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="text-2xl">📊</span>
            <span className="font-medium">Interactive Charts</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="text-2xl">🔐</span>
            <span className="font-medium">Secure Auth</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <span className="text-2xl">⚡</span>
            <span className="font-medium">Real-time Data</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/dashboard"
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-lg hover:shadow-xl transition-all font-semibold text-lg flex items-center gap-2 group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="#about"
            className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-800 rounded-lg hover:border-violet-600 hover:text-violet-600 transition-all font-semibold text-lg"
          >
            Learn More
          </a>
        </div>

        {/* Hero Image Placeholder */}
        <div className="mt-16 relative">
          <div className="bg-gradient-to-br from-violet-100 to-amber-100 rounded-2xl p-8 shadow-2xl border border-white">
            <div className="bg-white rounded-xl p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gradient-to-r from-violet-200 to-amber-200 rounded-lg w-3/4 mx-auto" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-gradient-to-br from-violet-100 to-violet-50 rounded-lg" />
                  <div className="h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-lg" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Card 1 */}
          <div className="absolute -left-4 top-1/3 bg-white p-4 rounded-lg shadow-lg hidden lg:block animate-float">
            <p className="text-sm font-semibold text-gray-900">150+ Interactions</p>
            <p className="text-xs text-gray-600">Real-time tracking</p>
          </div>

          {/* Floating Card 2 */}
          <div className="absolute -right-4 bottom-1/4 bg-white p-4 rounded-lg shadow-lg hidden lg:block">
            <p className="text-sm font-semibold text-gray-900">8 Features</p>
            <p className="text-xs text-gray-600">Being tracked</p>
          </div>
        </div>
      </div>
    </section>
  );
}