
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Dapatkan sesi pengguna
  const { data: { session } } = await supabase.auth.getSession();

  // Jika tidak ada sesi (belum login), biarkan saja
  // Halaman login/register akan menangani ini
  if (!session) {
    return res;
  }

  // Dapatkan profil pengguna dari database
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  // --- LOGGING DIAGNOSTIK ---
  console.log('--- Middleware Check ---');
  console.log('User ID:', session.user.id);
  console.log('Path:', req.nextUrl.pathname);
  console.log('Fetched Profile:', profile);
  if (error) {
    console.error('Middleware Profile Fetch Error:', error.message);
  }
  console.log('------------------------');
  // --- AKHIR LOGGING ---

  // Jika pengguna mencoba mengakses rute admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Jika profil tidak ada atau perannya bukan ADMIN, alihkan ke halaman utama
    if (!profile || profile.role !== 'ADMIN') {
      console.log('Redirecting: Not an admin or no profile.');
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  return res;
}

// Konfigurasi matcher untuk menentukan rute mana yang akan dijalankan oleh middleware
export const config = {
  matcher: [
    /*
     * Cocokkan semua rute kecuali untuk:
     * - file di dalam /public (seperti gambar)
     * - _next/static (file statis Next.js)
     * - _next/image (optimasi gambar Next.js)
     * - favicon.ico (file ikon)
     * - / (halaman utama/login)
     * - /auth (halaman callback auth)
     */
    '/((?!_next/static|_next/image|favicon.ico|auth|$).*)',
  ],
};
