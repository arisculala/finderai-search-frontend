'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { createUser } from '@/Services/user/userService';
import type { User } from '@/Services/user/user.types';

type CreateUserInput = Omit<User, '_id' | 'roles' | 'createDate' | 'updatedDate' | 'createdBy' | 'updatedBy'>;

interface NewUserFormModalProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function NewUserFormModal({ onCancel, onSuccess }: NewUserFormModalProps) {
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'user',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    active: true,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, phoneNumber, firstName, lastName } = newUser;

    // Basic required field check
    if (!username || !email || !phoneNumber || !firstName || !lastName) {
      setError('All fields are required.');
      return;
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(username)) {
      setError('Username must be a valid email.');
      return;
    }

    // Phone number validation: allow 8-15 digits, optional +, no letters
    if (!/^\+?\d{8,15}$/.test(phoneNumber)) {
      setError('Phone number must be valid (8–15 digits, optional +).');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createUser({
        ...newUser,
        phoneNumber: Number(newUser.phoneNumber),
      } as CreateUserInput);

      toast.success('Successfully created user.');

      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (e) {
      console.error('Failed to create user.', e);
      toast.error('Failed to create user.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-w-[400px] max-w-xl mx-auto space-y-6 bg-transparent p-6 dark:bg-transparent"
    >
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Create New User
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {[
        ['Username (Email)', 'username', 'email'],
        ['Email', 'email', 'email'],
        ['First Name', 'firstName', 'text'],
        ['Last Name', 'lastName', 'text'],
        ['Phone Number', 'phoneNumber', 'tel'],
      ].map(([label, name, type]) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={newUser[name as keyof typeof newUser] as string}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      ))}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
        >
          <option value="user">User</option>
          <option value="superAdmin">Super Admin</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="active"
          checked={newUser.active}
          onChange={handleChange}
          className="form-checkbox h-4 w-4 text-blue-600"
        />
        <label className="text-sm text-gray-700 dark:text-gray-300">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="cursor-pointer rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`cursor-pointer rounded-md ${
            loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-500'
          } px-4 py-2 text-sm font-semibold text-white dark:bg-green-500 dark:hover:bg-green-400`}
        >
          {loading ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
