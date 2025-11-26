import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <>
      <div className="bg" />
      <div className="bg bg2" />
      <div className="bg bg3" />
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <Outlet />
      </div>
    </>
  );
};

export default AuthLayout;
