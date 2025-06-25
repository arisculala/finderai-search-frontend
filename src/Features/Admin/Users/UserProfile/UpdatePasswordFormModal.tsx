'use client';

import { useState } from "react";
import toast from "react-hot-toast";
import { updateUserPassword } from "@/Services/user/userService";
import { getStoredUserId } from "@/Utils/getUser";

interface UpdatePasswordFormModalProps {
  onCancel?: () => void;
}

export default function UpdatePasswordFormModal({ onCancel }: UpdatePasswordFormModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await updateUserPassword(getStoredUserId(), currentPassword, newPassword);
      toast.success("Password updated successfully.");
      setNewPassword('');
      setConfirmPassword('');
      if (onCancel) onCancel();
    } catch (e) {
      console.error("Failed to update password.", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-[400px] max-w-xl mx-auto space-y-6 bg-transparent p-6 dark:bg-transparent"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Update Password</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`rounded-md ${
            loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-500'
          } px-4 py-2 text-sm font-semibold text-white dark:bg-green-500 dark:hover:bg-green-400`}
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
  );
}
