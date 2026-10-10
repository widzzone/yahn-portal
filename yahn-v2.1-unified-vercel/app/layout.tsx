import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YAHN | Pendidikan Bertumbuh Bersama',
  description: 'Portal terpadu Yayasan Andi Hakim Nasoetion untuk beasiswa, donasi, dan program Kakak Asuh.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
