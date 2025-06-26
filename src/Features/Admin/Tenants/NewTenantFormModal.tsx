'use client'

import { useState } from "react";
import toast from 'react-hot-toast';
import { createTenant } from '@/Services/tenant/tenantService';

interface NewTenantFormModalProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function NewTenantFormModal({ onCancel, onSuccess }: NewTenantFormModalProps) {
  const [newTenant, setNewTenant] = useState({
    name: '',
    active: true,
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNewTenant((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name } = newTenant;

    // Basic required field check
    if (!name) {
      setError('All fields are required.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createTenant(newTenant);
      toast.success('Successfully created tenant.');
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (e) {
      console.error('Failed to create tenant.', e);
      toast.error('Failed to create tenant.');
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
        Create New Tenant
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {[
        ['Tenant Name', 'name', 'text'],
      ].map(([label, name, type]) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={newTenant[name as keyof typeof newTenant] as string}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="active"
          checked={newTenant.active}
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
