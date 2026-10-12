import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YAHN | Pendidikan Bertumbuh Bersama',
  description: 'Portal Yayasan Andi Hakim Nasoetion dengan ruang khusus Mahasiswa, Sahabat YAHN, dan Admin Center.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
