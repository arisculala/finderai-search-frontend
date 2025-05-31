import {
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  BuildingOffice2Icon,
  ArrowUpTrayIcon,
} from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { paths } from "@/App/Routes/Paths";

const options = [
  {
    title: 'Manage Users',
    description: 'Add new users and manage user access.',
    icon: UserPlusIcon,
    bgColor: 'bg-green-500',
    path: `${paths.users.root}`,
  },
  {
    title: 'Manage Tenants',
    description: 'Organize and manage tenants across your platform.',
    icon: BuildingOffice2Icon,
    bgColor: 'bg-yellow-500',
    path: `${paths.tenants.root}`,
  },
  {
    title: 'Manage Bots',
    description: 'Build and manage intelligent bots for your users.',
    icon: ChatBubbleLeftRightIcon,
    bgColor: 'bg-blue-500',
    path: `${paths.bots.root}`,
  },
  {
    title: 'Import / Export',
    description: 'Easily backup or migrate your data.',
    icon: ArrowUpTrayIcon,
    bgColor: 'bg-pink-500',
    path: `${paths.importExport.root}`,
  },
  {
    title: 'Analytics',
    description: 'Track usage, engagement, and performance.',
    icon: ChartBarIcon,
    bgColor: 'bg-purple-500',
    path: `${paths.analytics.root}`,
  },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
        FinderAI Chat Admin
      </h2>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
        FinderAI Chat Admin allows you to manage bots, users, and tenants, analyze engagement, and streamline your chat infrastructure.
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {options.map((option) => (
          <button
            key={option.title}
            onClick={() => navigate(option.path)}
            className="cursor-pointer flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-left transition"
          >
            <div className={`flex items-center justify-center w-12 h-12 rounded-md ${option.bgColor}`}>
              <option.icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {option.title} →
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
