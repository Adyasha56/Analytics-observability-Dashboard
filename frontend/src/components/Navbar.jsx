import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-6">
          {user && (
            <>
              <div className="flex items-center gap-2">
                <div className="bg-violet-100 text-violet-700 rounded-full p-3 w-10 h-10 flex items-center justify-center">
                  <span className="font-bold text-sm">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-800">{user.username}</p>
                  {user.age && <p className="text-xs text-gray-500">{user.age} years old</p>}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}