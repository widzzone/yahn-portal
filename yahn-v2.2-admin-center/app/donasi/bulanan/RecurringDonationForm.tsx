'use client';

import { FormEvent, useMemo, useState } from 'react';

const presets = [50000, 100000, 250000, 500000, 1000000];
const fmt = (v: number) =>
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v || 0);

export default function RecurringDonationForm({ initialAmount = 100000, initialDay = 5 }: { initialAmount?: number; initialDay?: number }) {
  const [amount, setAmount] = useState(initialAmount);
  const [custom, setCustom] = useState('');
  const [day, setDay] = useState(initialDay);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const finalAmount = useMemo(() => (custom ? Number(custom) || 0 : amount), [custom, amount]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);
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
      setAmount(initialAmount);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Gagal menyimpan komitmen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="donation24-shell recurring26-shell" onSubmit={submit}>
      <div className="donation24-main recurring26-main">
        <div className="donation24-intro">
          <span className="pill">Dukungan bulanan</span>
          <h2>Jadikan kebaikan sebagai kebiasaan yang ringan dan konsisten.</h2>
          <p>
            Tentukan nominal dan tanggal pengingat. Tim YAHN akan mencatat komitmen Anda dan
            membantu mengingatkan setiap bulan.
          </p>
        </div>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>1</b>
            <div>
              <strong>Pilih nominal bulanan</strong>
              <span>Nominal dapat diperbarui kemudian jika kebutuhan berubah.</span>
            </div>
          </div>
          <div className="amounts donation24-amounts">
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
            <input className="input" type="number" min="10000" value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="Contoh: 150000" />
          </div>
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>2</b>
            <div>
              <strong>Pilih tanggal pengingat</strong>
              <span>Pengingat dikirim ringan dan tidak mengganggu.</span>
            </div>
          </div>
          <div className="recurring26-days">
            {[1, 5, 10, 15, 20, 25].map((d) => (
              <button key={d} type="button" className={`amount ${day === d ? 'active' : ''}`} onClick={() => setDay(d)}>
                Tgl {d}
              </button>
            ))}
          </div>
          <div className="recurring26-tip">Pengingat akan berhenti untuk bulan berjalan setelah pembayaran terverifikasi.</div>
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>3</b>
            <div>
              <strong>Lengkapi data singkat</strong>
              <span>Data ini dipakai untuk pencatatan komitmen dan pengiriman pengingat.</span>
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
            <label>WhatsApp (opsional)</label>
            <input className="input" name="whatsapp" placeholder="08xxxxxxxxxx" />
          </div>
        </section>

        <div className="donation24-submit-wrap">
          <button className="btn btn-accent btn-block donation24-confirm-btn" disabled={loading || finalAmount < 10000}>
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
            <div><span>Pengingat</span><strong>Setiap tanggal {day}</strong></div>
            <div><span>Status</span><strong>Aktif setelah tersimpan</strong></div>
            <div><span>Portal</span><strong>Dapat dipantau di Portal Sahabat</strong></div>
          </div>
          <div className="donation24-summary-note">
            Setelah komitmen tersimpan, Anda dapat melakukan pembayaran tiap bulan melalui kanal resmi YAHN dan memantau histori dukungan dari portal.
          </div>
        </div>
        <div className="donation24-help-card recurring26-how">
          <strong>Alur singkat</strong>
          <ul className="recurring26-steps">
            <li>Pilih nominal bulanan.</li>
            <li>Tentukan tanggal pengingat.</li>
            <li>Simpan komitmen dan tunggu pengingat pertama.</li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
