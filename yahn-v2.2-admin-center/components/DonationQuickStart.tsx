'use client';

import { useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';

const presets = [50000, 100000, 250000, 500000];
const rupiah = (value:number) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(value || 0);

export function DonationQuickStart(){
  const router = useRouter();
  const [mode,setMode] = useState<'once'|'monthly'|'sponsor'>('once');
  const [amount,setAmount] = useState(100000);
  const [custom,setCustom] = useState('');
  const [method,setMethod] = useState<'QRIS'|'Transfer Bank'>('QRIS');
  const [day,setDay] = useState(5);
  const finalAmount = useMemo(()=> custom ? Number(custom)||0 : amount,[custom,amount]);

  function chooseAmount(v:number){ setAmount(v); setCustom(''); }
  function go(){
    if(mode==='sponsor'){ router.push('/kakak-asuh'); return; }
    if(finalAmount < 10000) return;
    if(mode==='monthly'){
      router.push(`/donasi/bulanan?amount=${finalAmount}&day=${day}`);
      return;
    }
    router.push(`/donasi/sekarang?amount=${finalAmount}&method=${encodeURIComponent(method)}`);
  }

  return <div className="donation23-quick-card">
    <div className="donation23-quick-head">
      <span className="donation23-heart">♡</span>
      <div><small>MULAI BERBAGI</small><h2>Pilih cara yang nyaman</h2></div>
    </div>

    <div className="donation23-mode-tabs" role="tablist" aria-label="Pilihan donasi">
      <button type="button" className={mode==='once'?'active':''} onClick={()=>setMode('once')}>Sekali</button>
      <button type="button" className={mode==='monthly'?'active':''} onClick={()=>setMode('monthly')}>Bulanan</button>
      <button type="button" className={mode==='sponsor'?'active':''} onClick={()=>setMode('sponsor')}>Kakak Asuh</button>
    </div>

    {mode!=='sponsor' ? <>
      <div className="donation23-field-label">Pilih nominal</div>
      <div className="donation23-amount-grid">
        {presets.map(v=><button key={v} type="button" className={!custom&&amount===v?'active':''} onClick={()=>chooseAmount(v)}>{rupiah(v).replace(',00','')}</button>)}
      </div>
      <div className="donation23-custom-wrap">
        <span>Rp</span>
        <input inputMode="numeric" min="10000" type="number" value={custom} onChange={e=>setCustom(e.target.value)} placeholder="Nominal lainnya" />
      </div>

      {mode==='once' ? <div className="donation23-choice-row">
        <button type="button" className={method==='QRIS'?'active':''} onClick={()=>setMethod('QRIS')}><span>▦</span> QRIS</button>
        <button type="button" className={method==='Transfer Bank'?'active':''} onClick={()=>setMethod('Transfer Bank')}><span>▣</span> Transfer</button>
      </div> : <div className="donation23-reminder-row">
        <span>Ingatkan saya setiap tanggal</span>
        <select value={day} onChange={e=>setDay(Number(e.target.value))}>{[1,5,10,15,20,25,28].map(d=><option key={d} value={d}>{d}</option>)}</select>
      </div>}

      <div className="donation23-selected"><span>{mode==='monthly'?'Komitmen bulanan':'Donasi pilihan Anda'}</span><strong>{rupiah(finalAmount)}</strong></div>
    </> : <div className="donation23-sponsor-preview">
      <div className="donation23-sponsor-icon">✦</div>
      <div><strong>Temani satu perjalanan pendidikan</strong><p>Pilih mahasiswa penerima, lihat kebutuhan UKT atau living cost, lalu ajukan dukungan Kakak Asuh.</p></div>
    </div>}

    <button type="button" className="donation23-primary" onClick={go} disabled={mode!=='sponsor'&&finalAmount<10000}>
      {mode==='once'?'Lanjutkan donasi →':mode==='monthly'?'Jadi donatur bulanan →':'Pilih adik asuh →'}
    </button>
    <p className="donation23-safe-note">Tidak ada biaya untuk membuka portal. Donasi satu kali tidak mewajibkan akun.</p>
  </div>;
}
