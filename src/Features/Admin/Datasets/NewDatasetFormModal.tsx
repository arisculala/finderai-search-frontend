'use client'

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { createDataset } from '@/Services/dataset/datasetService';
import MultiSelectTextField from "@/Features/Components/SelectTextField/MultiSelectTextField";
import { getTenants } from "@/Services/tenant/tenantService";
import SingleSelectTextField from "@/Features/Components/SelectTextField/SingleSelectTextField";

interface NewDatasetFormModalProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function NewDatasetFormModal({ onCancel, onSuccess }: NewDatasetFormModalProps) {
  const [newDataset, setNewDataset] = useState({
    name: '',
    description: '',
    ownerTenantId: '',
    sharedWithTenants: [] as string[],
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [tenantOptions, setTenantOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const tenants = await getTenants();
        const mapped = tenants.map((tenant) => ({
          label: tenant.name,
          value: tenant._id?.toString() ?? '',
        }));
        setTenantOptions(mapped);
      } catch (e) {
        console.log('Failed to load tenants', e);
      }
    };
    fetchTenants();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setNewDataset((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, ownerTenantId, sharedWithTenants } = newDataset;

    // Basic required field check
    if (!name || !description || !ownerTenantId) {
      setError('All fields are required.');
      return;
    }

    // Check if ownerTenantId is in sharedWithTenants
    if (sharedWithTenants.includes(ownerTenantId)) {
      setError('Owner tenant should not be in shared tenants.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await createDataset(newDataset);
      toast.success('Successfully created dataset.');
      if (onSuccess) onSuccess();
      if (onCancel) onCancel();
    } catch (e) {
      console.error('Failed to create dataset.', e);
      toast.error('Failed to create dataset.');
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
        Create New Dataset
      </h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      {[
        ['Dataset Name', 'name', 'text'],
        ['Description', 'description', 'textarea'],
      ].map(([label, name, type]) => (
        <div key={name}>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
          <input
            type={type}
            name={name}
            value={newDataset[name as keyof typeof newDataset] as string}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <SingleSelectTextField
          label="Select Dataset Owner Tenant"
          data={tenantOptions}
          value={tenantOptions.find((o) => o.value === newDataset.ownerTenantId.toString())}
          onChange={(selected) =>
            setNewDataset((prev) => ({
              ...prev,
              ownerTenantId: selected?.value || '',
            }))
          }
        />
      </div>

      <div className="flex items-center space-x-2">
        <MultiSelectTextField
          label="Shared to Other Tenant"
          data={tenantOptions}
          onChange={(selected) => {
            const selectedValues = selected.map((s) => s.value);
              setNewDataset((prev) => ({
                ...prev,
                sharedWithTenants: selectedValues,
              }));
          }}
          />
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
