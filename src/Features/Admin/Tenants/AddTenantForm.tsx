'use client'

import { useState } from "react";

interface AddTenantFormProps {
  onSubmit: (tenant: { name: string; description: string; active: boolean }) => void;
  onCancel: () => void;
}

export default function AddTenantForm({ onSubmit, onCancel }: AddTenantFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [active, setActive] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, description, active });
    setName('');
    setDescription('');
    setActive(true);
  };

  return (
    <form onSubmit={handleSubmit} className="min-w-[400px] max-w-xl mx-auto space-y-6 bg-white p-6 rounded-md shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Add Tenant</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="active"
          type="checkbox"
          checked={active}
          onChange={() => setActive(!active)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">
          Active
        </label>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-gray-100 px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-100 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
