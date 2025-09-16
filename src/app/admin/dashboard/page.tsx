'use client';

import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';

export default function AdminDashboardPage() {
  const { profile, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <main className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="mt-4 text-lg">
            Selamat datang, <span className="font-semibold">{profile?.name}</span>!
          </p>
          <p>Ini adalah halaman yang hanya bisa diakses oleh pengguna dengan peran ADMIN.</p>
        </div>
      </main>
    </div>
  );
}
