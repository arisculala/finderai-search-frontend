import type { ReactNode } from 'react';

interface MainContentProps {
  children: ReactNode;
}

export default function MainContent({ children }: MainContentProps) {
  return (
    <main className="flex-1 overflow-y-auto p-6">
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-12 text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {children}
      </div>
    </main>
  );
}
