import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { paths } from "@/App/Routes/Paths";

const PublicRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const { isAuthenticated, loading, hydrated } = useAuth();

	if (!hydrated || loading) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
				<div className="flex flex-col items-center">
					<div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin" />
					<p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">Loading...</p>
				</div>
			</div>
		);
	}

	// If already logged in, redirect to the dashboard
	if (isAuthenticated) {
		return <Navigate to={paths.home.root} replace />;
	}

	return children;
};

export default PublicRoute;
