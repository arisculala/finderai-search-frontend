import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import { paths } from "@/App/Routes/Paths";

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
	const { isAuthenticated, loading, hydrated } = useAuth();

	// Wait until auth is hydrated and not loading
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

	if (!isAuthenticated) {
		return <Navigate to={paths.auth.login} replace />;
	}

	return children;
};

export default PrivateRoute;
