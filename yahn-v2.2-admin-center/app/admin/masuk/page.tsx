import Link from 'next/link';
import AdminLogin from './AdminLogin';

export default function AdminLoginPage(){
  return <main className="admin25-login-page">
    <div className="admin25-login-shell">
      <section className="admin25-login-copy">
        <Link href="/" className="admin25-brand"><img src="/logo-yahn.png" alt="Logo YAHN"/><div><b>YAHN Admin Center</b><span>Beasiswa & Donatur</span></div></Link>
        <div><p className="eyebrow eyebrow-light">Administrator Access</p><h1>Satu ruang kendali untuk seluruh operasional YAHN.</h1><p>Kelola seleksi mahasiswa, wawancara, penerima, donasi, CRM, Kakak Asuh, dan impact update dari satu dashboard terpadu.</p></div>
        <div className="admin25-module-grid"><span>◎ Seleksi Beasiswa</span><span>◈ Donasi & CRM</span><span>♡ Kakak Asuh</span><span>✦ Impact Update</span></div>
        <div className="admin-security-note">🔐 Akses hanya untuk akun dengan role <b>admin</b> pada database YAHN.</div>
      </section>
      <AdminLogin/>
    </div>
  </main>;
}
