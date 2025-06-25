// components/UpdatePasswordForm.tsx
import ContentModal from '@/Features/Components/ContentModal/ContentModal';
import { PencilIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import UpdatePasswordFormModal from './UpdatePasswordFormModal';

export default function UpdatePasswordForm() {
  const [isPasswordUpdateModalOpen, setIsPasswordUpdateModalOpen] = useState(false);
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
        A secure password helps protect your account.
      </p>
      <div className="flex justify-between items-center">
        <p className="text-gray-800 dark:text-white">••••••••••••</p>
        <button
          onClick={() => setIsPasswordUpdateModalOpen(true)}
          className="cursor-pointer inline-flex items-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-500 dark:bg-gray-500 dark:hover:bg-gray-400"
        >
          <PencilIcon className="h-4 w-4 mr-1" />
          Update
        </button>
      </div>

      <ContentModal
              open={isPasswordUpdateModalOpen}
              onClose={() => setIsPasswordUpdateModalOpen(false)}
              title="Update Password"
              confirmText="Update"
              cancelText="Cancel"
              hideFooter={true}
              hideTitle={true}
            >
              <UpdatePasswordFormModal onCancel={() => setIsPasswordUpdateModalOpen(false)} />
            </ContentModal>
    </div>
  );
}
