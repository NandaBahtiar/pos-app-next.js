'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function AuthCallbackPage() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 text-center bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">Verifikasi Email Berhasil!</h1>
        <p className="text-gray-600">
          Terima kasih telah memverifikasi alamat email Anda.
        </p>
        <p className="text-gray-600">
          Akun Anda sekarang sedang menunggu persetujuan akhir dari administrator. Anda akan mendapatkan notifikasi lebih lanjut setelah akun Anda diaktifkan.
        </p>
        <Button onClick={handleGoToLogin} className="w-full">
          Kembali ke Halaman Login
        </Button>
      </div>
    </div>
  );
}
