'use client'

import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import MultiSelectTextField from "@/Features/Components/SelectTextField/MultiSelectTextField";
import { addTenantToUsers, getTenantExcludeUsers } from "@/Services/tenant/tenantService";
import type { Tenant } from "@/Services/tenant/tenant.types";

interface AddTenantUserModalProps {
  tenant: Tenant;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export default function AddTenantUserModal({ tenant, onCancel, onSuccess }: AddTenantUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [newTenantUsers, setNewTenantUsers] = useState([] as string[]);

  const [userOptions, setUserOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const fetchTenantExcludeUsers = async () => {
      try {
        const tenantExcludedUsers = await getTenantExcludeUsers(tenant._id.toString());
        const mapped = tenantExcludedUsers.map((user) => ({
          label: `${user.firstName} ${user.lastName} (${user.username})`,
          value: user._id?.toString() ?? '',
        }));
        setUserOptions(mapped);
      } catch (e) {
        console.log('Failed to load tenants', e);
      }
    };
    fetchTenantExcludeUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await addTenantToUsers(tenant._id.toString(), newTenantUsers);
    toast.success('Successfully added tenant user(s).');
    if (onSuccess) onSuccess();
    if (onCancel) onCancel();
  } catch (e) {
    console.error('Failed to add tenant user(s).', e);
    toast.error('Failed to add tenant user(s).');
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
        Add User
      </h2>
      <div className="flex items-center space-x-2">
        <MultiSelectTextField
          label="Select user(s)"
          data={userOptions}
          onChange={(selected) => {
            const selectedValues = selected.map((s) => s.value);
              setNewTenantUsers(selectedValues);
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
