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

  async function requestOtp(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const r = await fetch('/api/scholarship/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, mode })
      });

      const d = await r.json();
      if (!r.ok) throw new Error(d.message);

      setSent(true);
      setMsg('Kode akses telah dikirim ke email Anda.');
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Gagal mengirim kode.');
    } finally {
      setLoading(false);
    }
  }

  async function verify(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const r = await fetch('/api/scholarship/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const d = await r.json();
      if (!r.ok) throw new Error(d.message);

      router.push('/beasiswa/dashboard');
      router.refresh();
    } catch (e) {
      setMsg(e instanceof Error ? e.message : 'Kode tidak valid.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-card scholarship-auth scholarship-auth-premium">
      <div className="auth-tabs">
        <button
          className={mode === 'login' ? 'active' : ''}
          onClick={() => {
            setMode('login');
            setSent(false);
            setMsg('');
          }}
          type="button"
        >
          Masuk
        </button>

        <button
          className={mode === 'register' ? 'active' : ''}
          onClick={() => {
            setMode('register');
            setSent(false);
            setMsg('');
          }}
          type="button"
        >
          Daftar Akun
        </button>
      </div>

      <h2>{sent ? 'Cek email Anda' : mode === 'login' ? 'Masuk ke Portal Beasiswa' : 'Daftar Akun Baru'}</h2>

      <p>
        {sent
          ? `Masukkan kode 6 digit yang dikirim ke ${email}.`
          : 'Portal menggunakan kode akses email, jadi Anda tidak perlu mengingat password baru.'}
      </p>

      {!sent ? (
        <form onSubmit={requestOtp}>
          {mode === 'register' && (
            <div className="field">
              <label>Nama lengkap</label>
              <input
                className="input"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Sesuai KTM"
              />
            </div>
          )}

          <div className="field">
            <label>Email terdaftar</label>
            <input
              className="input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@email.com"
            />
          </div>

          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Mengirim...' : mode === 'login' ? 'Kirim kode masuk →' : 'Daftar & kirim kode →'}
          </button>
        </form>
      ) : (
        <form onSubmit={verify}>
          <div className="field">
            <label>Kode 6 digit</label>
            <input
              className="input otp-input"
              inputMode="numeric"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="000000"
            />
          </div>

          <button className="btn btn-primary btn-block" disabled={loading || code.length !== 6}>
            {loading ? 'Memverifikasi...' : 'Masuk ke portal →'}
          </button>

          <button
            type="button"
            className="text-button"
            onClick={() => {
              setSent(false);
              setCode('');
            }}
          >
            Kirim ulang / ganti email
          </button>
        </form>
      )}

      {msg && <div className="notice notice-info">{msg}</div>}
    </div>
  );
}
