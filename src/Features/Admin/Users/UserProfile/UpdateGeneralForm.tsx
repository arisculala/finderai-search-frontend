'use client';

import toast from "react-hot-toast";
import type { User } from "@/Services/user/user.types";

interface Props {
  user: User;
}

export default function UpdateGeneralForm({ user }: Props) {

  // const handleUpdate = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   try {
  //     await 
  //     toast.success("Password updated successfully.");
  //   } catch (e) {
  //     console.error("Failed to update profile details.", e);
  //   }
  // };

  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
          <p className="mt-2 font-semibold text-sm text-gray-900 dark:text-white">{user.username}</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Active</label>
          <p className="mt-2 font-semibold text-sm">
            <span className={user.active ? "text-green-500" : "text-red-500"}>
              {user.active ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
          <input
            value={user.firstName}
            readOnly
            className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
          <input
            value={user.lastName}
            readOnly
            className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4">
        <button
          onClick={() => console.log('Update general clicked...')}
          className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
        >
          Update
        </button>
        {user.role === 'user' && (
          <button
            onClick={() => console.log('Set Active/Inactive clicked...')}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
              user.active ? "bg-red-600 hover:bg-red-500" : "bg-gray-600 hover:bg-gray-500"
            }`}
          >
            {user.active ? "Deactivate User" : "Activate User"}
          </button>
        )}
      </div>
    </div>
  );
}
