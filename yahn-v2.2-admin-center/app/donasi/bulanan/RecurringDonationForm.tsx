'use client';

import { FormEvent, useMemo, useState } from 'react';

const MIN_MONTHLY = 1_000_000;
const presets = [1_000_000, 2_500_000, 5_000_000, 10_000_000];
const fmt = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v || 0);

export default function RecurringDonationForm({ initialAmount = MIN_MONTHLY, initialDay = 5 }: { initialAmount?: number; initialDay?: number }) {
  const safeInitial = Math.max(MIN_MONTHLY, initialAmount || MIN_MONTHLY);
  const [amount, setAmount] = useState(safeInitial);
  const [custom, setCustom] = useState('');
  const [day, setDay] = useState(initialDay);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const finalAmount = useMemo(() => (custom ? Number(custom) || 0 : amount), [custom, amount]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');
    setSuccess(false);
    if (finalAmount < MIN_MONTHLY) {
      setMessage('Komitmen bulanan dimulai dari Rp1.000.000.');
      return;
    }

    setLoading(true);
    const form = new FormData(e.currentTarget);
    try {
      const response = await fetch('/api/recurring', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          whatsapp: form.get('whatsapp'),
          amount: finalAmount,
          reminderDay: day,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Gagal menyimpan komitmen.');
      setSuccess(true);
      setMessage(data.message || 'Komitmen bulanan berhasil disimpan.');
      (e.currentTarget as HTMLFormElement).reset();
      setCustom('');
      setAmount(safeInitial);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal menyimpan komitmen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="donation24-shell recurring26-shell recurring121-shell" onSubmit={submit}>
      <div className="donation24-main recurring26-main">
        <div className="donation24-intro">
          <span className="pill">Dukungan bulanan</span>
          <h2>Bangun komitmen yang konsisten, tanpa proses yang rumit.</h2>
          <p>
            Pilih nominal mulai Rp1.000.000 per bulan dan tentukan kapan Anda ingin menerima pengingat.
          </p>
        </div>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>1</b>
            <div>
              <strong>Pilih nominal bulanan</strong>
              <span>Komitmen bulanan dimulai dari Rp1.000.000.</span>
            </div>
          </div>
          <div className="amounts donation121-monthly-amounts">
            {presets.map((v) => (
              <button
                type="button"
                key={v}
                className={`amount ${!custom && amount === v ? 'active' : ''}`}
                onClick={() => {
                  setAmount(v);
                  setCustom('');
                }}
              >
                {fmt(v)}
              </button>
            ))}
          </div>
          <div className="field donation24-custom-field">
            <label>Nominal lainnya</label>
            <input
              className="input"
              type="number"
              min={MIN_MONTHLY}
              step="50000"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Minimal 1000000"
            />
            {custom && Number(custom) < MIN_MONTHLY && <small className="field-error">Minimal dukungan bulanan Rp1.000.000.</small>}
          </div>
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>2</b>
            <div>
              <strong>Pilih tanggal pengingat</strong>
              <span>Pilih tanggal yang paling sesuai dengan ritme bulanan Anda.</span>
            </div>
          </div>
          <div className="recurring26-days">
            {[1, 5, 10, 15, 20, 25].map((d) => (
              <button key={d} type="button" className={`amount ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>
                Tgl {d}
              </button>
            ))}
          </div>
          <div className="recurring26-tip">Pengingat bulan berjalan dapat dihentikan setelah pembayaran terverifikasi.</div>
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>3</b>
            <div>
              <strong>Lengkapi kontak</strong>
              <span>Email dan WhatsApp digunakan untuk pengingat serta informasi status dukungan.</span>
            </div>
          </div>
          <div className="form-row donation24-form-row">
            <div className="field">
              <label>Nama lengkap</label>
              <input className="input" name="name" required placeholder="Nama lengkap" />
            </div>
            <div className="field">
              <label>Email aktif</label>
              <input className="input" name="email" type="email" required placeholder="nama@email.com" />
            </div>
          </div>
          <div className="field">
            <label>WhatsApp aktif</label>
            <input className="input" name="whatsapp" required placeholder="08xxxxxxxxxx" />
          </div>
        </section>

        <div className="donation24-submit-wrap">
          <button className="btn btn-accent btn-block donation24-confirm-btn" disabled={loading || finalAmount < MIN_MONTHLY}>
            {loading ? 'Menyimpan komitmen...' : 'Simpan dukungan bulanan →'}
          </button>
          {message && <div className={`notice ${success ? 'notice-ok' : 'notice-warn'}`}>{message}</div>}
        </div>
      </div>

      <aside className="donation24-side recurring26-side">
        <div className="donation24-summary-card">
          <div className="donation24-summary-head">
            <span className="pill">Ringkasan komitmen</span>
            <h3>Dukungan bulanan Anda</h3>
          </div>
          <div className="donation24-summary-amount">{fmt(finalAmount)}</div>
          <div className="donation24-summary-list">
            <div><span>Minimum program</span><strong>Rp1.000.000</strong></div>
            <div><span>Pengingat</span><strong>Setiap tanggal {day}</strong></div>
            <div><span>Portal</span><strong>Portal Sahabat YAHN</strong></div>
          </div>
          <div className="donation24-summary-note">
            Setelah komitmen tersimpan, riwayat dukungan dapat dipantau melalui Portal Sahabat.
          </div>
        </div>
      </aside>
    </form>
  );
}
