"use client";
import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.token) {
      document.cookie = `token=${data.token}; path=/`;
      window.location.href = "/admin";
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center  from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-200 p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Admin Login
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Sign in to access the admin panel
          </p>
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Email Address
          </label>
          <input
            type="email"
            placeholder="admin@example.com"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* Button */}
        <button
          onClick={login}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white
                     hover:bg-blue-700 transition duration-200"
        >
          Sign In
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Admin Panel
        </p>
      </div>
    </div>
  );
}
