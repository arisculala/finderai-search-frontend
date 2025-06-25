'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import type { ReactNode } from 'react'

interface ContentModalProps {
  open: boolean
  onClose: () => void
  onConfirm?: () => void
  title?: string
  children?: ReactNode
  confirmText?: string
  cancelText?: string
  renderFooter?: () => ReactNode
  hideFooter?: boolean
  hideTitle?: boolean
}

export default function ContentModal({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  children,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  renderFooter,
  hideFooter = false,
  hideTitle = false,
}: ContentModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80" />

      <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto p-4">
        <DialogPanel className="relative w-full max-w-fit transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all dark:bg-gray-800">
          <div className="w-full p-6 dark:bg-gray-800">
            {(!hideTitle && title) && (
              <DialogTitle as="h3" className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                {title}
              </DialogTitle>
            )}
            <div className="text-sm text-gray-700 dark:text-gray-300">{children}</div>
          </div>


          {!hideFooter && (
            <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse dark:bg-gray-700">
              {renderFooter ? (
                renderFooter()
              ) : (
                <>
                  <button
                    type="button"
                    onClick={onConfirm}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto dark:bg-red-700 dark:hover:bg-red-600"
                  >
                    {confirmText}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto dark:bg-gray-600 dark:text-gray-100 dark:ring-gray-500 dark:hover:bg-gray-500"
                  >
                    {cancelText}
                  </button>
                </>
              )}
            </div>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
