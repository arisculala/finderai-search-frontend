import { Navigate, type RouteObject } from "react-router-dom";
import { paths } from "./Paths";
import GlobalLayout from "../Layouts/GlobalLayout";
import AuthLayout from "../Layouts/Auth/AuthLayout";
import MainLayout from "../Layouts/MainLayout";
import Login from "../../Features/Auth/Components/Login/Login";
import BotsDashboard from "@/Features/Bots/BotsDashboard";
import PrivateRoute from "@/Features/Auth/AuthRoute/PrivateRoute";
import PublicRoute from "@/Features/Auth/AuthRoute/PublicRoute";
import HomeDashboard from "@/Features/Home/HomeDashboard";
import UsersDashboard from "@/Features/Users/UsersDashboard";
import TenantsDashboard from "@/Features/Tenants/TenantsDashboard";
import ImportExportDashboard from "@/Features/ImportExport/ImportExportDashboard";
import AnalyticsDashboard from "@/Features/Analytics/AnalyticsDashboard";

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
						path: paths.bots.root,
						element: (
								<PrivateRoute><BotsDashboard /></PrivateRoute>
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
