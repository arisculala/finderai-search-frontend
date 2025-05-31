import { useState } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  FolderIcon,
  CalendarIcon,
  DocumentDuplicateIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import ThemeSwitcherButton from '@/Features/Components/ThemeSwitcher/ThemeSwitcherButton';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon },
  { name: 'Team', icon: UserGroupIcon },
  { name: 'Projects', icon: FolderIcon },
  { name: 'Calendar', icon: CalendarIcon },
  { name: 'Documents', icon: DocumentDuplicateIcon },
  { name: 'Reports', icon: ChartPieIcon },
];

const tabs = ['Overview', 'Activity', 'Settings'];

export default function BotDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="flex w-64 flex-col border-r border-gray-200 bg-white p-4">
        <div className="flex items-center space-x-2 px-2">
          <img src="/finderai.svg" className="h-8 w-8" alt="Logo" />
        </div>
        <nav className="mt-10 space-y-1">
          {navigation.map((item) => (
            <a
              key={item.name}
              href="#"
              className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              <item.icon className="mr-3 h-6 w-6 text-indigo-500" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-200 pt-4">
          <a
            href="#"
            className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            <Cog6ToothIcon className="mr-3 h-6 w-6 text-gray-400" />
            Settings
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Nav */}
        <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>
          <div className="flex items-center space-x-6">
            <ThemeSwitcherButton collapsed={true}/>
            <div className="flex items-center space-x-2">
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Tom Cook"
              />
              <span className="text-sm font-medium text-gray-700">Tom Cook</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Tab Navigation */}
          <div className="mb-4 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap border-b-2 px-1 pb-2 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-gray-400">
            {activeTab === 'Overview' && <p>This is the Overview tab content.</p>}
            {activeTab === 'Activity' && <p>This is the Activity tab content.</p>}
            {activeTab === 'Settings' && <p>This is the Settings tab content.</p>}
          </div>
        </main>
      </div>
    </div>
  );
}
