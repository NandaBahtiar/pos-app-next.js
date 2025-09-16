'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { User } from '@supabase/supabase-js';

// Definisikan tipe untuk profil pengguna berdasarkan skema Prisma Anda
interface Profile {
  id: string;
  name: string;
  role: 'ADMIN' | 'CASHIER';
  status: 'PENDING' | 'ACTIVE' | 'INACTIVE';
}

interface UserContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
}

// Buat context dengan nilai default
const UserContext = createContext<UserContextType | undefined>(undefined);

// Buat Provider Component
export function UserProvider({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndProfile = async (currentUser: User | null) => {
      setUser(currentUser);
      if (currentUser) {
        // Ambil profil dari tabel 'profiles'
        console.log(`UserContext: Fetching profile for user ${currentUser.id}`);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', currentUser.id)
          .single();

        if (error) {
          console.error('UserContext: Error fetching profile:', error.message);
          setProfile(null);
        } else if (data) {
          console.log('UserContext: Profile found:', data);
          setProfile(data as Profile);
        } else {
          console.warn('UserContext: No profile found for this user.');
          setProfile(null);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    // Dapatkan pengguna saat ini saat komponen dimuat
    supabase.auth.getUser().then(({ data: { user } }) => {
      fetchUserAndProfile(user);
    });

    // Dengarkan perubahan status autentikasi (login/logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      fetchUserAndProfile(session?.user ?? null);
    });

    // Bersihkan listener saat komponen di-unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const value = { user, profile, loading };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// Buat custom hook untuk menggunakan context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
