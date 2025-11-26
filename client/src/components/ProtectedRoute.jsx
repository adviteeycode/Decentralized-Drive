import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  const { user, initializing } = useAuth();

  if (initializing) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        <p className="text-lg font-semibold">Loading your workspace...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.emailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <div className="rounded-2xl bg-gray-800 p-8 text-center shadow-2xl">
          <h2 className="text-2xl font-semibold">Verify your email</h2>
          <p className="mt-3 text-sm text-gray-300">
            We sent a verification link to <span className="font-semibold">{user.email}</span>. Please confirm your account and log back in.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
