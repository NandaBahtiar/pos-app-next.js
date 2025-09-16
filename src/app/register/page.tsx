// File: src/app/register/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleSignUp = async () => {
        setMessage('');
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                // Kirim nama sebagai metadata, trigger akan menggunakannya
                data: {
                    name: name
                }
            }
        });

        if (error) {
            setMessage('Gagal mendaftar: ' + error.message);
        } else {
            setMessage('Pendaftaran berhasil! Silakan verifikasi di email.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Buat Akun Baru</h1>
                    <p className="mt-2 text-sm text-gray-600">Pendaftaran Anda memerlukan persetujuan Admin.</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <Label htmlFor="name">Nama Lengkap</Label>
                        <Input id="name" type="text" name="name" placeholder="Nama Anda" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="nama@email.com" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" type="password" name="password" placeholder="Minimal 6 karakter" onChange={(e) => setPassword(e.target.value)} value={password} required />
                    </div>
                </div>
                {message && <p className="text-sm text-center text-gray-600">{message}</p>}
                <Button onClick={handleSignUp} className="w-full">Daftar</Button>
                <div className="text-sm text-center text-gray-600">
                    Sudah punya akun? <a href="/login" className="font-medium text-indigo-600 hover:underline">Masuk di sini</a>
                </div>
            </div>
        </div>
    );
}