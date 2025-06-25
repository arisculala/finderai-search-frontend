import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginCredentials } from "@/Services/auth/auth.types";
import { useAuth } from "@/Context/AuthContext";
import { paths } from "@/App/Routes/Paths";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { login } = useAuth();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const credentials: LoginCredentials = {
			username,
			password,
		};

		try {
			await login(credentials);
			navigate(paths.home.root);
		} catch(e) {
      console.error("Failed to login.", e);
		} finally {
			setLoading(false);
		}
	};

  return (
    <div className="flex min-h-full items-center justify-center bg-white dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl dark:bg-gray-800">
        {/* Login Form Content */}
        <div className="text-center">
          <img
            alt="FinderAI"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900 dark:text-gray-200"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="email"
              autoComplete="username"
              required
              className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400"
              placeholder="you@example.com"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-gray-200"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="mt-2 block w-full rounded-md border-0 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-gray-700 dark:text-white dark:ring-gray-600 dark:placeholder:text-gray-400"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors duration-300 ${
                loading
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }`}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;