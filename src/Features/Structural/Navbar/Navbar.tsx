import ThemeSwitcherButton from '@/Features/Components/ThemeSwitcher/ThemeSwitcherButton';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { useAuth } from '@/Context/AuthContext';
import { UserIcon } from '@heroicons/react/24/outline';
import { getFullName } from '../../../Utils/getUser';

export default function Navbar() {
  const { logout } = useAuth();

  const handProfileClicked = async () => {
    console.log("Profile clicked.")
	};

  const handSettingsClicked = async () => {
    console.log("Settings clicked.")
	};

  return (
    <header className="flex items-center justify-end border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex items-center space-x-6 relative">
        <ThemeSwitcherButton collapsed={true} />
        <Menu as="div" className="relative ml-3">
          <div>
            <MenuButton className="cursor-pointer flex items-center gap-1 rounded-full px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
              <UserIcon className="h-5 w-5 text-gray-700 dark:text-gray-200" />
              <span className="text-sm text-gray-800 dark:text-gray-100 font-medium">
                {getFullName() || 'User'}
              </span>
            </MenuButton>
          </div>
          <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-700 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handProfileClicked()}
                  className={`cursor-pointer block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Profile
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => handSettingsClicked()}
                  className={`cursor-pointer block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Settings
                </button>
              )}
            </MenuItem>
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={() => logout()}
                  className={`cursor-pointer block w-full px-4 py-2 text-left text-sm ${
                    active ? 'bg-gray-100 dark:bg-gray-600' : 'text-gray-700 dark:text-gray-200'
                  }`}
                >
                  Sign out
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
