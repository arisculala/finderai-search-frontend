import { Navigate, type RouteObject } from "react-router-dom";
import { paths } from "./Paths";
import GlobalLayout from "../Layouts/GlobalLayout";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import Login from "../../Features/Auth/Components/Login/Login";
import PrivateRoute from "@/Features/Auth/AuthRoute/PrivateRoute";
import PublicRoute from "@/Features/Auth/AuthRoute/PublicRoute";
import HomeDashboard from "@/Features/Admin/Home/HomeDashboard";
import UsersDashboard from "@/Features/Admin/Users/UsersDashboard";
import TenantsDashboard from "@/Features/Admin/Tenants/TenantsDashboard";
import ImportExportDashboard from "@/Features/Admin/ImportExport/ImportExportDashboard";
import AnalyticsDashboard from "@/Features/Admin/Analytics/AnalyticsDashboard";
import UserProfileDashboard from "@/Features/Admin/Users/UserProfile/UserProfileDashboard";
import DatasetsDashboard from "@/Features/Admin/Datasets/DatasetsDashboard";
import TenantDetails from "@/Features/Admin/Tenants/TenantDetails/TenantDetails";

export const routesConfig: RouteObject[] = [
	{
		element: <GlobalLayout />,
		path: "",
		children: [
			{
				element: <AuthLayout />,
				path: "",
				children: [
					{ index: true, element: <Navigate to={paths.auth.login} replace /> },
					{ path: paths.auth.login, element: <PublicRoute><Login /></PublicRoute>},
				],
			},
			{
				element: <MainLayout />,
				path: "",
				children: [
          {
						path: paths.home.root,
						element: (
								<PrivateRoute><HomeDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.profile.root,
						element: (
								<PrivateRoute><UserProfileDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.users.root,
						element: (
								<PrivateRoute><UsersDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.tenants.root,
						element: (
								<PrivateRoute><TenantsDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.tenants.details,
						element: (
								<PrivateRoute><TenantDetails /></PrivateRoute>
						),
					},
          {
						path: paths.datasets.root,
						element: (
								<PrivateRoute><DatasetsDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.importExport.root,
						element: (
								<PrivateRoute><ImportExportDashboard /></PrivateRoute>
						),
					},
          {
						path: paths.analytics.root,
						element: (
								<PrivateRoute><AnalyticsDashboard /></PrivateRoute>
						),
					},
				],
			},
		],
	},
];
