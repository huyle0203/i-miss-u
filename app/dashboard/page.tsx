import React from 'react';
import Dashboard from '@/components/Dashboard';
import Main from '@/components/Main';
import Login from '@/components/Login';
import { useAuth } from '@/context/AuthContext';
import Loading from '@/components/Loading';

export const metadata = {
    title: "I Miss U - Dashboard",
};

export default function DashboardPage() {
  

  return (
    <Main>
      <Dashboard />
    </Main>
  );
}