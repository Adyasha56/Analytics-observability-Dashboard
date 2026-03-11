export default function LandingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-gray-800 pt-8">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-violet-600 to-violet-500 rounded-lg p-2">
            </div>
            <span className="text-lg font-semibold">Analytics Platform</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Analytics Dashboard. All rights reserved.
          </p>

          {/* Stats */}
          <div className="flex gap-6 text-sm text-gray-400">
            <div className="text-center">
              <p className="font-semibold text-white">150+</p>
              <p>Interactions</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-white">8</p>
              <p>Features Tracked</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-white">100%</p>
              <p>Secure</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}