'use client';

import { useUser } from '@/context/UserContext';
import Navbar from '@/components/Navbar';
import { LoadingOverlay } from "@/components/ui/loading-overlay";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { profile, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Jika loading selesai dan tidak ada profil (belum login), arahkan ke /login
    if (!loading && !profile) {
      router.replace('/login');
    }
  }, [loading, profile, router]);

  // Selama loading atau jika sudah login, tampilkan UI yang sesuai
  if (loading || !profile) {
    // Tampilkan loading overlay saat memeriksa sesi atau saat proses redirect
    return <LoadingOverlay isActive={true} />;
  }

  // Tampilan jika sudah login (Dashboard Kasir)
  return (
    <div>
      <Navbar />
      <main className="p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Selamat Datang di Aplikasi POS</h1>
          <p className="mt-4 text-lg">
            Anda login sebagai <span className="font-semibold">{profile.name}</span> ({profile.role}).
          </p>
          <div className="mt-8 p-6 bg-gray-100 rounded-lg">
            <h2 className="text-2xl font-bold">Halaman Kasir</h2>
            <p className="mt-2">Ini adalah area utama untuk operasi kasir.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
