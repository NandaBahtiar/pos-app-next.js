'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogoutButton() {
    const router = useRouter();
    const supabase = createClientComponentClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login'); // Arahkan ke halaman login setelah logout
        router.refresh(); // Refresh halaman untuk memperbarui status sesi
    };

    return (
        <Button onClick={handleLogout} variant="destructive">
            Logout
        </Button>
    );
}
