// File: src/app/login/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignIn = async () => {
        setError(null);

        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError('Email atau password salah. Silakan coba lagi.');
            return;
        }

        if (authData.user) {
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('role, status')
                .eq('id', authData.user.id)
                .single();

            if (profileError || !profileData) {
                setError('Profil pengguna tidak ditemukan. Hubungi admin.');
                await supabase.auth.signOut();
                return;
            }

            if (profileData.status !== 'ACTIVE') {
                let statusMessage = 'Akun Anda tidak aktif.';
                if (profileData.status === 'PENDING') {
                    statusMessage = 'Akun Anda sedang menunggu persetujuan dari Admin.';
                } else if (profileData.status === 'INACTIVE') {
                    statusMessage = 'Akun Anda telah dinonaktifkan.';
                }
                setError(statusMessage);
                await supabase.auth.signOut();
                return;
            }

            if (profileData.role === 'ADMIN') {
                router.push('/admin/dashboard'); // Ganti dengan halaman admin Anda
            } else {
                router.push('/');
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
                    <p className="mt-2 text-sm text-gray-600">Silakan masuk ke akun Anda.</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="nama@email.com" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                </div>
                {error && <p className="text-sm text-center text-red-500">{error}</p>}
                <Button onClick={handleSignIn} className="w-full">Masuk</Button>
                <div className="text-sm text-center text-gray-600">
                    Belum punya akun? <a href="/register" className="font-medium text-indigo-600 hover:underline">Daftar di sini</a>
                </div>
            </div>
        </div>
    );
}