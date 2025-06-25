'use client';

import { PencilIcon } from '@heroicons/react/24/outline';
import type { User } from "@/Services/user/user.types";

interface Props {
  user: User;
}

export default function UpdateContactInfoForm({ user }: Props) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        This contact info is used for account-related communications.
      </p>

      <div className="space-y-6 text-sm text-gray-700 dark:text-gray-200">
        {/* Email */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <p className="text-gray-800 dark:text-white">{user.email}</p>
            {user.emailsent && <div className="text-green-500 text-xs mt-1">Email verified</div>}
          </div>
          <button
            onClick={() => console.log('Edit email clicked...')}
            className="cursor-pointer mt-2 sm:mt-0 sm:ml-4 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>

        {/* Phone */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <p className="text-gray-800 dark:text-white">No phone number defined</p>
            {user.textsent && <div className="text-green-500 text-xs mt-1">Phone verified</div>}
          </div>
          <button
            onClick={() => console.log('Edit phone clicked...')}
            className="cursor-pointer mt-2 sm:mt-0 sm:ml-4 inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500"
          >
            <PencilIcon className="h-4 w-4 mr-1" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
