import { Link } from 'react-router-dom';
import { fr } from '../../locales/fr';

const Footer = () => {
    return (
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0 flex items-center gap-3">
              <img
                src="/assets/images/lnkd_profile_picture-01.jpg"
                alt={fr.smarthub_tunis_logo}
                className="h-12 w-12 rounded-full object-cover shadow-md border-2 border-orange-400"
              />
              <div>
                <span className="text-primary-600 text-lg font-bold font-serif">SmartHub Tunis</span>
                <p className="text-gray-500 text-sm mt-1">{fr.connecting_intelligent_people}</p>
              </div>
            </div>

            <div className="flex space-x-6">
              <Link to="/curriculum" className="text-gray-500 hover:text-gray-700">
                {fr.curriculum}
              </Link>
              <Link to="/evaluation" className="text-gray-500 hover:text-gray-700">
                {fr.evaluation}
              </Link>
              <Link to="/plan" className="text-gray-500 hover:text-gray-700">
                {fr.plan}
              </Link>
              <a href="#" className="text-gray-500 hover:text-gray-700">
                {fr.contact}
              </a>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} SmartHub Tunis. {fr.all_rights_reserved}</p>
          </div>
        </div>
      </footer>
    )
  }

  export default Footer