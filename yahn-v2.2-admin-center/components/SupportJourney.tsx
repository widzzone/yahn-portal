'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

type Mode = 'once' | 'monthly' | 'sponsor';

const presets = [50000, 100000, 250000, 500000];
const rupiah = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value || 0);

const options: Array<{
  id: Mode;
  icon: string;
  kicker: string;
  title: string;
  subtitle: string;
  bestFor: string;
  points: string[];
  cta: string;
}> = [
  {
    id: 'once',
    icon: '♡',
    kicker: 'Fleksibel',
    title: 'Berbagi Hari Ini',
    subtitle: 'Berikan dukungan kapan pun Anda ingin, tanpa komitmen rutin.',
    bestFor: 'Cocok untuk Anda yang ingin membantu secara spontan.',
    points: ['Mulai Rp10.000', 'Tanpa membuat akun', 'QRIS atau transfer'],
    cta: 'Pilih dukungan sekali',
  },
  {
    id: 'monthly',
    icon: '↻',
    kicker: 'Konsisten',
    title: 'Hadir Setiap Bulan',
    subtitle: 'Jadikan kepedulian sebagai kebiasaan kecil yang terus memberi dampak.',
    bestFor: 'Cocok untuk Anda yang ingin hadir secara konsisten.',
    points: ['Nominal fleksibel', 'Pilih tanggal pengingat', 'Riwayat dukungan tersimpan'],
    cta: 'Pilih dukungan bulanan',
  },
  {
    id: 'sponsor',
    icon: '✦',
    kicker: 'Paling personal',
    title: 'Temani Satu Perjalanan',
    subtitle: 'Kenali satu penerima dan dampingi kebutuhan pendidikannya lebih dekat.',
    bestFor: 'Cocok untuk Anda yang ingin mengikuti satu perjalanan secara personal.',
    points: ['Pilih penerima', 'Fokus UKT / living cost', 'Ikuti perkembangan'],
    cta: 'Pilih Kakak Asuh',
  },
];

export function SupportJourney() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>('once');
  const [amount, setAmount] = useState(100000);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState<'QRIS' | 'Transfer Bank'>('QRIS');
  const [day, setDay] = useState(5);
  const finalAmount = useMemo(() => (custom ? Number(custom) || 0 : amount), [custom, amount]);

  function chooseAmount(value: number) {
    setAmount(value);
    setCustom('');
  }

  function proceed() {
    if (mode === 'sponsor') {
      router.push('/kakak-asuh');
      return;
    }
    if (finalAmount < 10000) return;
    if (mode === 'monthly') {
      router.push(`/donasi/bulanan?amount=${finalAmount}&day=${day}`);
      return;
    }
    router.push(`/donasi/sekarang?amount=${finalAmount}&method=${encodeURIComponent(method)}`);
  }

  return (
    <div className="support10-wrap" id="cara-berbagi">
      <div className="support10-cards">
        {options.map((option) => {
          const active = mode === option.id;
          return (
            <button
              type="button"
              key={option.id}
              className={`support10-card support10-card-${option.id} ${active ? 'active' : ''}`}
              onClick={() => setMode(option.id)}
              aria-pressed={active}
            >
              <div className="support10-card-top">
                <span className="support10-icon">{option.icon}</span>
                <span className="support10-kicker">{option.kicker}</span>
              </div>
              <h3>{option.title}</h3>
              <p>{option.subtitle}</p>
              <ul>
                {option.points.map((point) => <li key={point}>✓ {point}</li>)}
              </ul>
              <div className="support10-bestfor">{option.bestFor}</div>
              <div className="support10-card-cta">
                <span>{option.cta}</span>
                <b>→</b>
              </div>
            </button>
          );
        })}
      </div>

      <div className={`support10-action support10-action-${mode}`}>
        {mode === 'sponsor' ? (
          <>
            <div className="support10-action-copy">
              <span className="support10-action-label">Kakak Asuh</span>
              <h3>Mulai dari mengenal satu perjalanan.</h3>
              <p>
                Lihat profil penerima yang telah dipublikasikan YAHN, pahami kebutuhan UKT atau living cost,
                lalu pilih bentuk pendampingan yang paling sesuai.
              </p>
            </div>
            <div className="support10-action-side sponsor">
              <div className="support10-sponsor-badges">
                <span>Profil terkurasi</span>
                <span>Dukungan lebih personal</span>
                <span>Update perkembangan</span>
              </div>
              <button type="button" className="support10-primary" onClick={proceed}>
                Temui calon adik asuh →
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="support10-action-copy">
              <span className="support10-action-label">{mode === 'monthly' ? 'Dukungan Bulanan' : 'Dukungan Sekali'}</span>
              <h3>{mode === 'monthly' ? 'Tentukan ritme yang nyaman.' : 'Mulai dari nominal yang nyaman.'}</h3>
              <p>
                {mode === 'monthly'
                  ? 'Pilih nominal dan tanggal pengingat. Komitmen dapat diperbarui kemudian.'
                  : 'Pilih nominal, kemudian tentukan apakah Anda ingin menggunakan QRIS atau transfer.'}
              </p>
            </div>

            <div className="support10-action-side">
              <div className="support10-amounts">
                {presets.map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={!custom && amount === value ? 'active' : ''}
                    onClick={() => chooseAmount(value)}
                  >
                    {rupiah(value).replace(',00', '')}
                  </button>
                ))}
              </div>

              <div className="support10-custom">
                <span>Rp</span>
                <input
                  type="number"
                  min="10000"
                  inputMode="numeric"
                  value={custom}
                  onChange={(event) => setCustom(event.target.value)}
                  placeholder="Nominal lainnya"
                />
              </div>

              {mode === 'monthly' ? (
                <div className="support10-monthly-row">
                  <span>Ingatkan saya setiap tanggal</span>
                  <select value={day} onChange={(event) => setDay(Number(event.target.value))}>
                    {[1, 5, 10, 15, 20, 25, 28].map((date) => <option key={date} value={date}>{date}</option>)}
                  </select>
                </div>
              ) : (
                <div className="support10-methods">
                  <button type="button" className={method === 'QRIS' ? 'active' : ''} onClick={() => setMethod('QRIS')}>QRIS</button>
                  <button type="button" className={method === 'Transfer Bank' ? 'active' : ''} onClick={() => setMethod('Transfer Bank')}>Transfer</button>
                </div>
              )}

              <div className="support10-summary">
                <span>{mode === 'monthly' ? 'Komitmen bulanan' : 'Dukungan pilihan Anda'}</span>
                <strong>{rupiah(finalAmount)}</strong>
              </div>

              <button type="button" className="support10-primary" onClick={proceed} disabled={finalAmount < 10000}>
                {mode === 'monthly' ? 'Lanjutkan dukungan bulanan →' : 'Lanjutkan berbagi →'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
