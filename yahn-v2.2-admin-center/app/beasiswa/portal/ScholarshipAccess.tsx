'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ScholarshipAccess() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  function changeMode(nextMode: 'login' | 'register') {
    setMode(nextMode);
    setSent(false);
    setCode('');
    setMsg('');
  }

  async function requestOtp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await fetch('/api/scholarship/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, mode }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal mengirim kode akses.');

      setSent(true);
      setMsg('Kode akses telah dikirim ke email Anda.');
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Gagal mengirim kode akses.');
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const response = await fetch('/api/scholarship/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Kode akses tidak valid.');

      router.push('/beasiswa/dashboard');
      router.refresh();
    } catch (error) {
      setMsg(error instanceof Error ? error.message : 'Kode akses tidak valid.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="scholarship-login-card">
      <div className="scholarship-auth-tabs" role="tablist" aria-label="Pilihan akses portal beasiswa">
        <button
          type="button"
          className={mode === 'login' ? 'active' : ''}
          onClick={() => changeMode('login')}
        >
          Masuk
        </button>
        <button
          type="button"
          className={mode === 'register' ? 'active' : ''}
          onClick={() => changeMode('register')}
        >
          Daftar Akun
        </button>
      </div>

      <div className="scholarship-login-heading">
        <span className="scholarship-login-eyebrow">Portal Beasiswa YAHN</span>
        <h2>
          {sent
            ? 'Cek email Anda'
            : mode === 'login'
              ? 'Masuk ke Portal Beasiswa'
              : 'Buat Akun Peserta'}
        </h2>
        <p>
          {sent
            ? `Masukkan kode 6 digit yang kami kirim ke ${email}.`
            : mode === 'login'
              ? 'Gunakan email terdaftar untuk menerima kode akses sekali pakai.'
              : 'Daftarkan nama dan email aktif untuk memulai proses pendaftaran beasiswa.'}
        </p>
      </div>

      {!sent ? (
        <form className="scholarship-access-form" onSubmit={requestOtp}>
          {mode === 'register' && (
            <label className="scholarship-field">
              <span>Nama Lengkap</span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sesuai KTM"
                autoComplete="name"
              />
            </label>
          )}

          <label className="scholarship-field">
            <span>{mode === 'login' ? 'Email Terdaftar' : 'Email Aktif'}</span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
              autoComplete="email"
            />
          </label>

          <button className="scholarship-primary-button" disabled={loading}>
            {loading
              ? 'Mengirim kode...'
              : mode === 'login'
                ? 'Kirim Kode Masuk →'
                : 'Daftar & Kirim Kode →'}
          </button>
        </form>
      ) : (
        <form className="scholarship-access-form" onSubmit={verify}>
          <label className="scholarship-field">
            <span>Kode 6 Digit</span>
            <input
              className="scholarship-otp-input"
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
              autoComplete="one-time-code"
            />
          </label>

          <button className="scholarship-primary-button" disabled={loading || code.length !== 6}>
            {loading ? 'Memverifikasi...' : 'Masuk ke Portal →'}
          </button>

          <button
            type="button"
            className="scholarship-secondary-button"
            onClick={() => {
              setSent(false);
              setCode('');
              setMsg('');
            }}
          >
            Kirim ulang / ganti email
          </button>
        </form>
      )}

      {msg && <div className="scholarship-form-message">{msg}</div>}

      <div className="scholarship-security-note">
        <span aria-hidden="true">✓</span>
        Akses portal dilindungi dengan kode verifikasi melalui email.
      </div>
    </div>
  );
}
