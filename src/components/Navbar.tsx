'use client';

import Link from 'next/link';
import { useUser } from '@/context/UserContext';
import LogoutButton from './LogoutButton'; // Kita sudah buat ini sebelumnya

export default function Navbar() {
  const { profile, loading } = useUser();

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="text-lg font-bold">
        <Link href="/">POS App</Link>
      </div>
      <div className="flex items-center space-x-4">
        {!loading && profile && (
          <>
            <span>Halo, {profile.name}!</span>
            {/* Tampilkan link ini hanya jika pengguna adalah ADMIN */}
            {profile.role === 'ADMIN' && (
              <Link href="/admin/dashboard" className="text-blue-600 hover:underline">
                Admin Dashboard
              </Link>
            )}
            <LogoutButton />
          </>
        )}
        {!loading && !profile && (
          <Link href="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
