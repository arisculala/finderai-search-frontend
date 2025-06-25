import {
  UserGroupIcon,
  BuildingOffice2Icon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { paths } from "@/App/Routes/Paths";
import { useLocation } from 'react-router-dom';

const navigation = [
  { name: 'Home', icon: HomeIcon, path: `${paths.home.root}` },
  { name: 'Users', icon: UserGroupIcon, path: `${paths.users.root}` },
  { name: 'Tenants', icon: BuildingOffice2Icon, path: `${paths.tenants.root}` },
  { name: 'Import/Export', icon: ArrowUpTrayIcon, path: `${paths.importExport.root}` },
  { name: 'Analytics', icon: ChartBarIcon, path: `${paths.analytics.root}` },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex w-64 flex-col border-r border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-2 px-2 mb-6">
        <img src="/finderai.svg" className="h-8 w-8" alt="FinderAI Logo" />
        <span className="text-lg font-semibold text-gray-800 dark:text-gray-100">FinderAI</span>
      </div>
      <nav className="mt-10 space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname.startsWith(item.path);

          return (
            <a
              key={item.name}
              href={item.path}
              className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium
                ${isActive
                  ? 'bg-gray-100 text-indigo-600 dark:bg-gray-700 dark:text-white'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              <item.icon
                className={`mr-3 h-6 w-6 ${isActive ? 'text-indigo-600' : 'text-indigo-500'}`}
              />
              {item.name}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
