import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  HomeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { paths } from "@/App/Routes/Paths";
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const navigation = [
  { name: 'Home', icon: HomeIcon, path: paths.home.root },
  { name: 'Users', icon: UserGroupIcon, path: paths.users.root },
  { name: 'Tenants', icon: BuildingOffice2Icon, path: paths.tenants.root },
  { name: 'Datasets', icon: DocumentTextIcon, path: paths.datasets.root },
  { name: 'Import/Export', icon: ArrowUpTrayIcon, path: paths.importExport.root },
  { name: 'Analytics', icon: ChartBarIcon, path: paths.analytics.root },
];

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-md"
      >
        {isOpen ? (
          <XMarkIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        ) : (
          <Bars3Icon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-20 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center p-4">
          <img src="/finderai.svg" className="h-8 w-8 mb-6" alt="FinderAI Logo" />

          <nav className="space-y-4">
            {navigation.map((item) => {
              const isActive = location.pathname.startsWith(item.path);

              return (
                <div key={item.name} className="group relative flex justify-center">
                  <a
                    href={item.path}
                    className={`flex flex-col items-center justify-center rounded-md p-2 text-xs font-medium transition-colors
                      ${isActive
                        ? 'bg-gray-200 text-indigo-600 dark:bg-gray-700 dark:text-white'
                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                  >
                    <item.icon className={`h-6 w-6 ${isActive ? 'text-indigo-600' : 'text-gray-500 dark:text-gray-400'}`} />
                  </a>

                  {/* Hover Text */}
                  <div className="absolute left-16 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 transition-all bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg z-10">
                    {item.name}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
