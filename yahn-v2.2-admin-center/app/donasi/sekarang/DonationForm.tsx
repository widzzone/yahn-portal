'use client';

import { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const presets = [50000, 100000, 250000, 500000, 1000000];
const MAX_PROOF_SIZE = 3 * 1024 * 1024;
const ALLOWED_PROOF_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
const fmt = (v: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(v || 0);

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error('Bukti pembayaran gagal dibaca.'));
    reader.readAsDataURL(file);
  });
}

function fileSize(value: number) {
  if (value < 1024 * 1024) return `${Math.max(1, Math.round(value / 1024))} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

export default function DonationForm({
  initialAmount = 100000,
  initialMethod = 'QRIS',
}: {
  initialAmount?: number;
  initialMethod?: 'QRIS' | 'Transfer Bank';
}) {
  const router = useRouter();
  const [amount, setAmount] = useState(initialAmount);
  const [custom, setCustom] = useState('');
  const [method, setMethod] = useState<'QRIS' | 'Transfer Bank'>(initialMethod);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [proof, setProof] = useState<File | null>(null);

  const bank = process.env.NEXT_PUBLIC_DONATION_BANK || 'Bank BRI';
  const account = process.env.NEXT_PUBLIC_DONATION_ACCOUNT || '038701004655566';
  const accountName = process.env.NEXT_PUBLIC_DONATION_ACCOUNT_NAME || 'Yayasan Andi Hakim Nasoetion';
  const qris = '/qris-yahn.jpeg';

  const finalAmount = useMemo(() => (custom ? Number(custom) || 0 : amount), [custom, amount]);
  const proofRequired = method === 'Transfer Bank';

  async function copyAccount() {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  }

  function onProofChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null;
    setStatus('');
    if (!file) {
      setProof(null);
      return;
    }
    if (!ALLOWED_PROOF_TYPES.includes(file.type)) {
      event.target.value = '';
      setProof(null);
      setStatus('Format bukti pembayaran harus JPG, PNG, WEBP, atau PDF.');
      return;
    }
    if (file.size > MAX_PROOF_SIZE) {
      event.target.value = '';
      setProof(null);
      setStatus('Ukuran bukti pembayaran maksimal 3 MB.');
      return;
    }
    setProof(file);
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('');
    if (proofRequired && !proof) {
      setStatus('Untuk transfer bank, mohon upload bukti pembayaran terlebih dahulu.');
      return;
    }

    setLoading(true);
    const form = new FormData(e.currentTarget);

    try {
      const proofPayload = proof
        ? {
            name: proof.name,
            mimeType: proof.type,
            size: proof.size,
            base64: await fileToBase64(proof),
          }
        : undefined;

      const r = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          email: form.get('email'),
          whatsapp: form.get('whatsapp'),
          amount: finalAmount,
          method,
          anonymous: form.get('anonymous') === 'on',
          proof: proofPayload,
        }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.message || 'Gagal menyimpan.');

      const qs = new URLSearchParams({
        donationId: String(d.donationId || ''),
        amount: String(finalAmount),
        method,
        proof: d.proofUrl ? 'uploaded' : 'none',
      });
      router.push(`/donasi/terima-kasih?${qs.toString()}`);
    } catch (error) {
      setStatus(error instanceof Error ? error.message : 'Terjadi kesalahan.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="donation24-shell" onSubmit={submit}>
      <div className="donation24-main">
        <div className="donation24-intro">
          <span className="pill">Tanpa akun</span>
          <h2>Terima kasih sudah memilih ikut menjaga masa depan pendidikan.</h2>
          <p>
            Tentukan nominal, lakukan pembayaran, lalu kirim konfirmasi singkat. Bukti pembayaran
            membantu tim YAHN melakukan verifikasi dengan lebih cepat.
          </p>
        </div>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>1</b>
            <div>
              <strong>Pilih nominal dukungan</strong>
              <span>Mulai dari Rp10.000, sesuaikan dengan kenyamanan Anda.</span>
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
            <input
              className="input"
              type="number"
              min="10000"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Contoh: 750000"
            />
          </div>
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>2</b>
            <div>
              <strong>Lakukan pembayaran</strong>
              <span>Gunakan kanal pembayaran resmi YAHN.</span>
            </div>
          </div>

          <div className="donation24-payment-tabs compact-tabs">
            <button type="button" className={method === 'QRIS' ? 'active' : ''} onClick={() => setMethod('QRIS')}>
              QRIS
            </button>
            <button
              type="button"
              className={method === 'Transfer Bank' ? 'active' : ''}
              onClick={() => setMethod('Transfer Bank')}
            >
              Transfer
            </button>
          </div>

          {method === 'QRIS' ? (
            <div className="donation24-pay-panel donation24-qris-panel premium-pay-card">
              <div className="qris donation24-qris-box">
                <img src={qris} alt="QRIS Yayasan Andi Hakim Nasoetion" />
              </div>
              <div className="donation24-pay-copy">
                <span className="pill">QRIS resmi</span>
                <h3>Scan QRIS Yayasan Andi Hakim Nasoetion</h3>
                <p>
                  Gunakan aplikasi bank atau dompet digital Anda, lalu masukkan nominal{' '}
                  <b>{fmt(finalAmount)}</b>.
                </p>
                <div className="payment-note-inline">Atas nama: <strong>Yayasan Andi Hakim Nasoetion</strong></div>
              </div>
            </div>
          ) : (
            <div className="donation24-pay-panel donation24-transfer-panel premium-pay-card">
              <div className="donation24-bank-logo-wrap">
                <img src="/logo-yahn.png" alt="Logo YAHN" className="donation24-bank-logo" />
              </div>
              <div className="donation24-pay-copy">
                <span className="pill">Transfer resmi</span>
                <h3>{bank}</h3>
                <div className="donation24-account-row">
                  <strong>{account}</strong>
                  <button type="button" onClick={copyAccount}>
                    {copied ? 'Tersalin ✓' : 'Salin'}
                  </button>
                </div>
                <p>
                  a.n. <b>{accountName}</b>
                  <br />
                  Mohon transfer sesuai nominal <b>{fmt(finalAmount)}</b> agar lebih mudah diverifikasi.
                </p>
              </div>
            </div>
          )}
        </section>

        <section className="donation24-step">
          <div className="donation24-step-head">
            <b>3</b>
            <div>
              <strong>Konfirmasi pembayaran</strong>
              <span>Lengkapi data singkat dan lampirkan bukti pembayaran.</span>
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
            <label>
              WhatsApp <span style={{ fontWeight: 500, textTransform: 'none' }}>(opsional)</span>
            </label>
            <input className="input" name="whatsapp" placeholder="08xxxxxxxxxx" />
          </div>

          <div className={`proof11-upload ${proof ? 'has-file' : ''}`}>
            <div className="proof11-upload-head">
              <div>
                <span className="proof11-icon">↥</span>
                <div>
                  <strong>Upload bukti pembayaran</strong>
                  <p>{proofRequired ? 'Wajib untuk transfer bank.' : 'Opsional untuk QRIS, tetapi membantu mempercepat verifikasi.'}</p>
                </div>
              </div>
              <span className={`proof11-badge ${proofRequired ? 'required' : ''}`}>{proofRequired ? 'Wajib' : 'Opsional'}</span>
            </div>

            {!proof ? (
              <label className="proof11-picker">
                <input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={onProofChange} />
                <span>Pilih JPG, PNG, WEBP, atau PDF</span>
                <small>Maksimal 3 MB</small>
              </label>
            ) : (
              <div className="proof11-file">
                <div className="proof11-file-icon">✓</div>
                <div>
                  <strong>{proof.name}</strong>
                  <span>{fileSize(proof.size)}</span>
                </div>
                <button type="button" onClick={() => setProof(null)}>Hapus</button>
              </div>
            )}
          </div>

          <label className="check-single donation24-check">
            <input type="checkbox" name="anonymous" />
            <span>Saya ingin nama saya ditampilkan sebagai anonim pada laporan publik.</span>
          </label>
        </section>

        <div className="donation24-submit-wrap">
          <button
            className="btn btn-accent btn-block donation24-confirm-btn"
            disabled={loading || finalAmount < 10000 || (proofRequired && !proof)}
          >
            {loading ? 'Mengunggah & menyimpan...' : 'Kirim konfirmasi pembayaran →'}
          </button>
          <div className="form-security donation24-security">
            🔒 Bukti pembayaran tersimpan di Google Drive YAHN dan hanya digunakan untuk proses verifikasi.
          </div>
          {status && <div className="notice notice-warn">{status}</div>}
        </div>
      </div>

      <aside className="donation24-side">
        <div className="donation24-summary-card">
          <div className="donation24-summary-head">
            <span className="pill">Ringkasan</span>
            <h3>Dukungan Anda</h3>
          </div>
          <div className="donation24-summary-amount">{fmt(finalAmount)}</div>
          <div className="donation24-summary-list">
            <div><span>Metode</span><strong>{method}</strong></div>
            <div><span>Bukti</span><strong>{proof ? 'Siap diupload ✓' : proofRequired ? 'Belum dilampirkan' : 'Opsional'}</strong></div>
            <div><span>Status</span><strong>Menunggu verifikasi</strong></div>
          </div>
          <div className="donation24-summary-note">
            Setelah konfirmasi dikirim, tim YAHN akan mencocokkan nominal dan bukti dengan transaksi pada kanal pembayaran resmi.
          </div>
        </div>

        <div className="donation24-help-card">
          <strong>Perlu bantuan?</strong>
          <p>Hubungi tim YAHN apabila mengalami kendala pembayaran atau upload bukti.</p>
          <a href="mailto:yayasan.andihakim@gmail.com?subject=Pertanyaan%20Donasi%20YAHN">yayasan.andihakim@gmail.com</a>
        </div>
      </aside>
    </form>
  );
}
