export default function LandingFooter() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-3 text-sm">Product Analytics</h4>
            <p className="text-gray-400 text-xs">Track user engagement and feature adoption.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-sm">Quick Links</h4>
            <ul className="text-gray-400 space-y-1 text-xs">
              <li><a href="#about" className="hover:text-white">About</a></li>
              <li><a href="#faq" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-3 text-sm">Contact</h4>
            <p className="text-gray-400 text-xs">support@analytics.com</p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-xs">
          <p>&copy; 2024 Product Analytics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
