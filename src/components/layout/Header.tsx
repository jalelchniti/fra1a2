import { Link } from 'react-router-dom';
import { fr } from '../../locales/fr';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <button
              className="md:hidden mr-2 p-2 rounded-md text-gray-600 hover:bg-gray-100"
              onClick={toggleSidebar}
              aria-label={fr.toggle_sidebar}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img
                src={`${baseUrl}assets/images/lnkd_profile_picture-01.jpg`}
                alt={fr.smarthub_tunis_logo}
                className="h-12 w-12 rounded-full object-cover shadow-md border-2 border-orange-400"
              />
              <span className="text-primary-600 text-2xl font-bold font-serif">
                SmartHub Tunis
              </span>
            </Link>
          </div>

          {/* Navigation for larger screens */}
          <nav className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.home}
            </Link>
            <Link
              to="/vocabulary"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.vocabulary}
            </Link>
            <Link
              to="/grammar"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.grammar}
            </Link>
            <Link
              to="/speaking"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.speaking}
            </Link>
            <Link
              to="/reading"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.reading}
            </Link>
            <Link
              to="/listening"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.listening}
            </Link>
            <Link
              to="/evaluation"
              className="text-gray-700 hover:text-primary-600 px-3 py-2 font-medium"
            >
              {fr.evaluation}
            </Link>
          </nav>

          {/* Profile dropdown */}
          <div className="flex items-center">
            <Link
              to="/curriculum"
              className="bg-primary-50 text-primary-700 hover:bg-primary-100 px-4 py-2 rounded-md font-medium"
            >
              {fr.curriculum}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
