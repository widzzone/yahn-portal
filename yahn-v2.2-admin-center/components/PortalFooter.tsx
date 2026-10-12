import Link from 'next/link';

type PortalMode = 'student' | 'supporter';

export function PortalFooter({ mode }: { mode: PortalMode }) {
  const student = mode === 'student';
  return (
    <footer className="footer persona-footer">
      <div className="container persona-footer-grid">
        <div>
          <div className="brand footer-brand footer-brand-real">
            <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" className="footer-logo-image" />
            <span>
              Yayasan Andi Hakim Nasoetion
              <small>{student ? 'Portal Mahasiswa' : 'Portal Sahabat YAHN'}</small>
            </span>
          </div>
          <p>{student
            ? 'Informasi program, pendaftaran, dan perjalanan seleksi Beasiswa YAHN.'
            : 'Ruang berbagi, dukungan bulanan, Kakak Asuh, dan perjalanan dampak pendidikan.'}</p>
        </div>
        <div className="footer-links">
          <strong>{student ? 'Mahasiswa' : 'Sahabat YAHN'}</strong>
          {student ? <>
            <Link href="/beasiswa">Program Beasiswa</Link>
            <Link href="/beasiswa/portal">Masuk / Daftar</Link>
            <Link href="/beasiswa/dashboard">Riwayat & Status</Link>
          </> : <>
            <Link href="/donasi">Cara Berbagi</Link>
            <Link href="/donasi/bulanan">Dukungan Bulanan</Link>
            <Link href="/kakak-asuh">Kakak Asuh</Link>
          </>}
        </div>
        <div className="footer-links">
          <strong>Bantuan</strong>
          <a href="mailto:yayasan.andihakim@gmail.com">Hubungi YAHN</a>
          <Link href="/">Ganti Portal</Link>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 Yayasan Andi Hakim Nasoetion</span>
        <span>Jl. Achmad Adnawijaya No.191, Bogor</span>
      </div>
    </footer>
  );
}
