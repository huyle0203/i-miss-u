import React from 'react';
import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';
import Login from '@/components/Login';
export const metadata = {
    title: "I Miss U - Dashboard",
};

export default function DashboardPage() {
  const isAuthenticated = true;

  let children = (
    <Login />
  );
  // Dashboard protected by authentication
  if (isAuthenticated) {
    children = (
      <Dashboard />
    );
  }

  return (
    <Main>
      {children}
    </Main>
  );
}