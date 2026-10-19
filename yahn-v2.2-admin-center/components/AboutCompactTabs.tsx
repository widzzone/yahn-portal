'use client';

import { useState } from 'react';

const activities = [
  'Melestarikan dan menyebarluaskan nilai-nilai Prof. Dr. Ir. Andi Hakim Nasoetion terkait perluasan akses pendidikan bagi anak-anak berpotensi dan tidak mampu di seluruh pelosok Indonesia.',
  'Menghimpun dan menyalurkan bantuan sosial kepada mahasiswa.',
  'Memberikan beasiswa atau bantuan pendidikan kepada mahasiswa yang tidak mampu.',
  'Melakukan kerja sama dengan lembaga lain dalam bidang sosial kemanusiaan.',
  'Mengembangkan dana kekayaan Yayasan melalui usaha-usaha produktif.',
];

const values = [
  {
    no: '01',
    title: 'Nurturing Talents',
    subtitle: 'Menumbuhkan potensi',
    text: 'Mengenali bakat-bakat berkualitas dan memberikan prioritas kepada siswa atau mahasiswa berprestasi.',
    icon: '✦',
  },
  {
    no: '02',
    title: 'Education for All',
    subtitle: 'Memperluas akses pendidikan',
    text: 'Membantu siswa atau mahasiswa yang membutuhkan serta membuka kesempatan belajar hingga ke pelosok negeri.',
    icon: '◉',
  },
  {
    no: '03',
    title: 'Community of Care',
    subtitle: 'Menghubungkan kepedulian',
    text: 'Menghimpun komunitas yang peduli dan memfasilitasi penghimpunan serta penyaluran dana secara berkesinambungan.',
    icon: '♡',
  },
];

const tabs = [
  { id: 'tujuan', label: 'Tujuan & Kegiatan' },
  { id: 'nilai', label: 'Nilai AHN' },
  { id: 'komunitas', label: 'Sustainable Community' },
  { id: 'struktur', label: 'Struktur Organisasi' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function AboutCompactTabs() {
  const [active, setActive] = useState<TabId>('tujuan');

  return (
    <section className="about16-profile-section" id="profil-yahn">
      <div className="container">
        <div className="about16-profile-head">
          <div>
            <span className="about16-eyebrow">Mengenal YAHN</span>
            <h2>Satu profil, seluruh informasi utama.</h2>
          </div>
          <p>
            Pilih bagian yang ingin Anda lihat. Informasi lengkap tetap tersedia tanpa membuat
            halaman menjadi terlalu panjang.
          </p>
        </div>

        <div className="about16-tabs" role="tablist" aria-label="Informasi Yayasan">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={active === tab.id ? 'active' : ''}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="about16-panel" role="tabpanel">
          {active === 'tujuan' && (
            <div className="about16-purpose-panel">
              <div className="about16-purpose-main">
                <span className="about16-panel-kicker">Tujuan Yayasan</span>
                <h3>Membangun manusia berbudaya dan bermartabat melalui akses pendidikan.</h3>
                <p>
                  Tujuan Yayasan Andi Hakim Nasoetion adalah untuk berkontribusi membangun manusia
                  berbudaya dan bermartabat melalui pembukaan peluang akses ke pendidikan tinggi
                  dengan melaksanakan kegiatan sosial kemanusiaan, termasuk penghimpunan dan
                  penyaluran donasi kepada mahasiswa yang membutuhkan.
                </p>
              </div>
              <div className="about16-activity-list">
                {activities.map((item, index) => (
                  <article key={item}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {active === 'nilai' && (
            <div className="about16-values-panel">
              <div className="about16-panel-intro">
                <span className="about16-panel-kicker">YAHN Values</span>
                <h3>Nilai yang menjaga arah setiap program.</h3>
                <p>
                  Nilai AHN menghubungkan pengembangan talenta, pemerataan akses pendidikan, dan
                  keberlanjutan dukungan.
                </p>
              </div>
              <div className="about16-value-grid">
                {values.map((value) => (
                  <article key={value.title}>
                    <div className="about16-value-meta"><span>{value.icon}</span><small>{value.no}</small></div>
                    <em>{value.subtitle}</em>
                    <h4>{value.title}</h4>
                    <p>{value.text}</p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {active === 'komunitas' && (
            <div className="about16-community-panel">
              <div className="about16-community-copy">
                <span className="about16-panel-kicker">Sustainable Community</span>
                <h3>Satu nilai, tiga bagian komunitas yang saling menguatkan.</h3>
                <p>
                  Ekosistem YAHN mempertemukan penerima manfaat, alumni, dan para Sahabat YAHN agar
                  dukungan pendidikan tumbuh menjadi jejaring yang berkesinambungan.
                </p>
                <div className="about16-community-cards">
                  <div><strong>Alumni</strong><span>Meneruskan nilai dan pengalaman.</span></div>
                  <div><strong>Penerima Beasiswa</strong><span>Belajar, berkembang, dan bertumbuh.</span></div>
                  <div><strong>Sahabat YAHN</strong><span>Menggerakkan keberlanjutan dukungan.</span></div>
                </div>
              </div>
              <div className="about16-community-visual" aria-label="Ekosistem YAHN">
                <div className="about16-ring" />
                <div className="about16-core"><img src="/logo-yahn.png" alt="Logo YAHN" /><strong>Nilai AHN</strong></div>
                <div className="about16-node about16-node-top">Alumni</div>
                <div className="about16-node about16-node-left">Penerima<br />Beasiswa</div>
                <div className="about16-node about16-node-right">Sahabat<br />YAHN</div>
              </div>
            </div>
          )}

          {active === 'struktur' && (
            <div className="about16-org-panel">
              <article className="about16-org-card warm">
                <div className="about16-org-title"><span>01</span><h3>Pembina</h3></div>
                <dl>
                  <div><dt>Ketua</dt><dd>Agus Buono</dd></div>
                  <div><dt>Anggota</dt><dd>Amini Nasoetion<br />Asep Saefuddin<br />Lis Hendriani<br />Marlina Nasoetion</dd></div>
                </dl>
              </article>

              <article className="about16-org-card brand">
                <div className="about16-org-title"><span>02</span><h3>Pengurus</h3></div>
                <dl>
                  <div><dt>Ketua</dt><dd>Amir Toha</dd></div>
                  <div><dt>Wakil Ketua</dt><dd>Sandi Noorzaman</dd></div>
                  <div><dt>Sekretaris</dt><dd>Sutriyati</dd></div>
                  <div><dt>Bendahara</dt><dd>Pimpi Rachmavirani</dd></div>
                  <div><dt>Anggota</dt><dd>Paras Sujiwo · Intan Juwita · Utami Dyah Safitri · Bagus Sartono · Nizwar H Nasoetion</dd></div>
                </dl>
              </article>

              <article className="about16-org-card soft">
                <div className="about16-org-title"><span>03</span><h3>Pengawas</h3></div>
                <dl>
                  <div><dt>Ketua</dt><dd>Etih Sudarnika</dd></div>
                  <div><dt>Anggota</dt><dd>Satrio Wiseno<br />Wahyu Handayani<br />Parihutan Sinaga<br />Fitria Virgantari<br />Anang Kurnia<br />Andini Nauli Nasoetion</dd></div>
                </dl>
              </article>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
