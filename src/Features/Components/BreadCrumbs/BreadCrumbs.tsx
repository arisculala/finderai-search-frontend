import type { BreadCrumbItem } from '@/App/Consts/breadcrumbs';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

interface BreadcrumbsProps {
  breadcrumbs: BreadCrumbItem[] | null | undefined;
  lastItem?: string;
}

export default function Breadcrumbs({ breadcrumbs, lastItem }: BreadcrumbsProps) {
  if (!breadcrumbs || breadcrumbs.length === 0) {
    return null; // Do not render anything if breadcrumbs is null or empty
  }

  return (
    <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
      <nav className="flex items-center space-x-2" aria-label="Breadcrumb">
        {breadcrumbs.map((crumb, idx) => {
          const isLast = idx === breadcrumbs.length - 1;

          return (
            <div key={idx} className="flex items-center">
              {idx > 0 && (
                <ChevronRightIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mx-2" />
              )}

              {isLast ? (
                <span className="text-gray-500 dark:text-gray-400">
                  {lastItem || crumb.label}
                </span>
              ) : (
                <a
                  href={crumb.path}
                  className="text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  {crumb.label}
                </a>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
