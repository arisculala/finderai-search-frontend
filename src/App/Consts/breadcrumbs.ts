import { paths } from "../Routes/Paths";

export interface BreadCrumbItem {
  path: string;
  label: string;
}

export const BREADCRUMBS: Record<string, BreadCrumbItem[]> = {
  HOME: [{ path: paths.home.root, label: "Home" }],
  USERS: [
    { path: paths.home.root, label: "Home" },
    { path: paths.users.root, label: "Users" },
  ],
  TENANTS: [
    { path: paths.home.root, label: "Home" },
    { path: paths.tenants.root, label: "Tenants" },
  ],
  IMPORT_EXPORT: [
    { path: paths.home.root, label: "Home" },
    { path: paths.importExport.root, label: "Import/Export" },
  ],
  ANALYTICS: [
    { path: paths.home.root, label: "Home" },
    { path: paths.analytics.root, label: "Analytics" },
  ],
};
