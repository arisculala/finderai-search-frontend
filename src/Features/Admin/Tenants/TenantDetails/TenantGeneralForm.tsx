'use client';

import { useState } from "react";
import type { Tenant } from "@/Services/tenant/tenant.types";
import { updateTenant } from "@/Services/tenant/tenantService";
import toast from "react-hot-toast";

interface TenantGeneralFormProps {
  tenant: Tenant;
  onSuccess?: () => void;
}

export default function TenantGeneralForm({ tenant, onSuccess }: TenantGeneralFormProps) {
  const [name, setName] = useState(tenant.name);
  const [description, setDescription] = useState(tenant.description);
  const [isActive, setIsActive] = useState(tenant.active);
  const [loading, setLoading] = useState(false);

  const handleTenantUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateTenant(tenant._id.toString(), {
        name,
        description,
        active: isActive,
      });
      toast.success("Tenant updated successfully.");
      if (onSuccess) onSuccess();
    } catch (e) {
      console.error("Failed to update tenant details.", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleTenantUpdate} className="bg-white dark:bg-gray-800 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
          />
        </div>

        {/* Active Checkbox */}
        <div className="flex items-center gap-2 mt-6 sm:mt-0">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600 dark:bg-gray-700"
          />
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
        </div>

        {/* Description Field (left column only) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white"
          />
        </div>

        {/* Empty right column */}
        <div></div>

        {/* Created By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created By</label>
          <p className="mt-1 font-semibold text-sm text-gray-900 dark:text-white">
            {tenant.createdBy?.username || "-"}
          </p>
        </div>

        {/* Created Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created Date</label>
          <p className="mt-1 font-semibold text-sm text-gray-900 dark:text-white">
            {tenant.createdDate ? new Date(tenant.createdDate).toLocaleString() : "-"}
          </p>
        </div>

        {/* Updated By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Updated By</label>
          <p className="mt-1 font-semibold text-sm text-gray-900 dark:text-white">
            {tenant.updatedBy?.username || "-"}
          </p>
        </div>

        {/* Updated Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Updated Date</label>
          <p className="mt-1 font-semibold text-sm text-gray-900 dark:text-white">
            {tenant.updatedDate ? new Date(tenant.updatedDate).toLocaleString() : "-"}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-6 flex flex-wrap gap-4">
        <button
          type="submit"
          disabled={loading}
          className={`rounded-md px-4 py-2 text-sm font-semibold text-white ${
            loading ? "bg-green-400" : "bg-green-600 hover:bg-green-500"
          }`}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
