import type { BreadCrumbItem } from '@/App/Consts/breadcrumbs';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbsProps {
  breadcrumbs: BreadCrumbItem[] | null | undefined;
}

export default function Breadcrumbs({ breadcrumbs }: BreadcrumbsProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null; // Do not render anything if breadcrumbs is null or empty
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, idx) => (
          <div key={idx} className="flex items-center">
            {idx > 0 && (
              <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mx-2" />
            )}
            {idx < breadcrumbs.length - 1 ? (
              <a href={crumb.path} className="text-indigo-600 hover:underline dark:text-indigo-400">
                {crumb.label}
              </a>
            ) : (
              <span className="text-gray-500 dark:text-gray-400">{crumb.label}</span>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
