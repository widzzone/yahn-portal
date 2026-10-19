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

const launchCoverage = [
  {
    source: 'IPB University',
    title: 'Yayasan Andi Hakim Nasoetion Diresmikan, Perluas Akses Pendidikan dan Wariskan Nilai Keilmuan',
    image: '/launch-yahn/ipb.jpg',
  },
  {
    source: 'PanganNews',
    title: 'Pendidikan Untuk Semua Dari Yayasan Andi Hakim Nasoetion',
    image: '/launch-yahn/pangannews.jpg',
  },
  {
    source: 'RadarSuara',
    title: 'Pendidikan untuk Semua dari Yayasan Andi Hakim Nasoetion',
    image: '/launch-yahn/radarsuara.jpg',
  },
  {
    source: 'ANTARA',
    title: 'Yayasan Andi Hakim Nasoetion akan membawa berkah untuk semua',
    image: '/launch-yahn/antara.jpg',
  },
];

const tabs = [
  { id: 'tujuan', label: 'Tujuan & Kegiatan', no: '01' },
  { id: 'nilai', label: 'Nilai AHN', no: '02' },
  { id: 'komunitas', label: 'Sustainable Community', no: '03' },
  { id: 'struktur', label: 'Struktur Organisasi', no: '04' },
  { id: 'peluncuran', label: 'Peluncuran Yayasan', no: '05' },
] as const;

type TabId = (typeof tabs)[number]['id'];

export function AboutCompactTabs() {
  const [active, setActive] = useState<TabId>('tujuan');

  return (
    <section className="about16-profile-section" id="profil-yahn">
      <div className="container">
        <div className="about16-profile-head refined">
          <div>
            <span className="about16-eyebrow">Profil Yayasan</span>
            <h2>Kenali YAHN dalam satu tampilan.</h2>
          </div>
          <div className="about16-profile-note">
            <span>Tujuan</span><i />
            <span>Nilai</span><i />
            <span>Komunitas</span><i />
            <span>Tata Kelola</span><i />
            <span>Peluncuran</span>
          </div>
        </div>

        <div className="about16-tabs refined" role="tablist" aria-label="Informasi Yayasan">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active === tab.id}
              className={active === tab.id ? 'active' : ''}
              onClick={() => setActive(tab.id)}
            >
              <small>{tab.no}</small>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="about16-panel refined" role="tabpanel">
          {active === 'tujuan' && (
            <div className="about16-purpose-panel refined">
              <div className="about16-purpose-main refined">
                <div className="about16-purpose-topline">
                  <span className="about16-panel-kicker">Tujuan Yayasan</span>
                  <small>Fokus Utama</small>
                </div>
                <h3>Membangun manusia berbudaya dan bermartabat melalui akses pendidikan.</h3>
                <p>
                  Yayasan Andi Hakim Nasoetion berkontribusi membuka peluang akses ke pendidikan
                  tinggi melalui kegiatan sosial kemanusiaan, termasuk penghimpunan dan penyaluran
                  donasi kepada mahasiswa yang membutuhkan.
                </p>
                <div className="about16-purpose-tags">
                  <span>Akses Pendidikan</span>
                  <span>Talenta</span>
                  <span>Kepedulian</span>
                </div>
              </div>

              <div className="about16-activity-wrap">
                <div className="about16-activity-heading">
                  <div><strong>5 kegiatan utama</strong><span>Pelaksanaan tujuan Yayasan</span></div>
                  <b>01—05</b>
                </div>
                <div className="about16-activity-list refined">
                  {activities.map((item, index) => (
                    <article key={item} className={index === 0 ? 'featured' : ''}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <p>{item}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          )}

          {active === 'nilai' && (
            <div className="about16-values-panel refined">
              <div className="about16-panel-intro refined">
                <span className="about16-panel-kicker">YAHN Values</span>
                <h3>Tiga nilai yang menjaga arah setiap program.</h3>
                <p>
                  Nilai AHN menghubungkan pengembangan talenta, pemerataan akses pendidikan, dan
                  keberlanjutan dukungan.
                </p>
              </div>
              <div className="about16-value-grid refined">
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
            <div className="about17-community-panel">
              <div className="about17-community-copy">
                <div className="about17-community-label">
                  <span>Sustainable Community</span>
                  <i aria-hidden="true" />
                </div>
                <h3>Satu nilai, tiga bagian komunitas yang saling menguatkan.</h3>
                <p>
                  Ekosistem YAHN mempertemukan alumni, penerima manfaat, dan para Sahabat YAHN agar
                  dukungan pendidikan tumbuh menjadi jejaring yang berkesinambungan.
                </p>

                <div className="about17-community-roles">
                  <article>
                    <div className="about17-role-icon alumni" aria-hidden="true">🎓</div>
                    <strong>Alumni</strong>
                    <span>Meneruskan nilai dan pengalaman.</span>
                  </article>
                  <article>
                    <div className="about17-role-icon awardee" aria-hidden="true">🌱</div>
                    <strong>Penerima Beasiswa</strong>
                    <span>Belajar, berkembang, dan bertumbuh.</span>
                  </article>
                  <article>
                    <div className="about17-role-icon supporter" aria-hidden="true">●●●</div>
                    <strong>Sahabat YAHN</strong>
                    <span>Menggerakkan keberlanjutan dukungan.</span>
                  </article>
                </div>
              </div>

              <div className="about17-community-visual" aria-label="Diagram Sustainable Community YAHN">
                <div className="about17-watermark" aria-hidden="true" />
                <div className="about17-ring" aria-hidden="true" />
                <div className="about17-core">
                  <div className="about17-logo-mark" aria-hidden="true" />
                  <small>Yayasan</small>
                  <strong>Nilai AHN</strong>
                </div>

                <div className="about17-node about17-node-top">
                  <span>Alumni</span>
                  <i aria-hidden="true" />
                </div>
                <div className="about17-node about17-node-left">
                  <span>Penerima<br />Beasiswa</span>
                  <i aria-hidden="true" />
                </div>
                <div className="about17-node about17-node-right">
                  <span>Sahabat<br />YAHN</span>
                  <i aria-hidden="true" />
                </div>
              </div>
            </div>
          )}

          {active === 'struktur' && (
            <div className="about19-governance">
              <div className="about19-governance-summary">
                <div className="about19-governance-copy">
                  <span>Tata Kelola Yayasan</span>
                  <h3>Struktur yang jelas, peran yang saling menguatkan.</h3>
                  <p>Pembina memberi arah, Pengurus menjalankan organisasi, dan Pengawas menjaga tata kelola Yayasan tetap berjalan dengan baik.</p>
                </div>
                <div className="about19-governance-flow" aria-label="Alur tata kelola Yayasan">
                  <div><b>01</b><strong>Pembina</strong><small>Arah & kebijakan</small></div>
                  <i aria-hidden="true">→</i>
                  <div className="active"><b>02</b><strong>Pengurus</strong><small>Pelaksana organisasi</small></div>
                  <i aria-hidden="true">→</i>
                  <div><b>03</b><strong>Pengawas</strong><small>Pengawasan</small></div>
                </div>
              </div>

              <div className="about19-org-grid">
                <article className="about19-org-card warm">
                  <header>
                    <div className="about19-title"><span>01</span><div><small>Pengarah Yayasan</small><h4>Pembina</h4></div></div>
                    <em>5 orang</em>
                  </header>
                  <div className="about19-chair"><span>Ketua</span><strong>Agus Buono</strong></div>
                  <div className="about19-members">
                    <small>Anggota</small>
                    <div className="about19-name-grid">
                      <b>Amini Nasoetion</b><b>Asep Saefuddin</b><b>Lis Hendriani</b><b>Marlina Nasoetion</b>
                    </div>
                  </div>
                </article>

                <article className="about19-org-card primary">
                  <header>
                    <div className="about19-title"><span>02</span><div><small>Pelaksana Organisasi</small><h4>Pengurus</h4></div></div>
                    <em>9 orang</em>
                  </header>
                  <div className="about19-executives">
                    <div><span>Ketua</span><strong>Amir Toha</strong></div>
                    <div><span>Wakil Ketua</span><strong>Sandi Noorzaman</strong></div>
                    <div><span>Sekretaris</span><strong>Sutriyati</strong></div>
                    <div><span>Bendahara</span><strong>Pimpi Rachmavirani</strong></div>
                  </div>
                  <div className="about19-members">
                    <small>Anggota Pengurus</small>
                    <div className="about19-name-grid compact">
                      <b>Paras Sujiwo</b><b>Intan Juwita</b><b>Utami Dyah Safitri</b><b>Bagus Sartono</b><b>Nizwar H Nasoetion</b>
                    </div>
                  </div>
                </article>

                <article className="about19-org-card soft">
                  <header>
                    <div className="about19-title"><span>03</span><div><small>Fungsi Pengawasan</small><h4>Pengawas</h4></div></div>
                    <em>7 orang</em>
                  </header>
                  <div className="about19-chair"><span>Ketua</span><strong>Etih Sudarnika</strong></div>
                  <div className="about19-members">
                    <small>Anggota</small>
                    <div className="about19-name-grid">
                      <b>Satrio Wiseno</b><b>Wahyu Handayani</b><b>Parihutan Sinaga</b><b>Fitria Virgantari</b><b>Anang Kurnia</b><b>Andini Nauli Nasoetion</b>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          )}

          {active === 'peluncuran' && (
            <div className="about20-launch">
              <div className="about20-event-card">
                <div className="about20-event-photo">
                  <img src="/launch-yahn/peluncuran-main.jpg" alt="Peluncuran Yayasan Andi Hakim Nasoetion di IPB University" />
                  <div className="about20-date-badge">
                    <strong>21</strong>
                    <span>Desember<br />2025</span>
                  </div>
                  <div className="about20-photo-label">Peluncuran Yayasan Andi Hakim Nasoetion</div>
                </div>
                <div className="about20-event-meta">
                  <div><small>Lokasi</small><strong>Auditorium Andi Hakim Nasoetion</strong></div>
                  <div><small>Kampus</small><strong>IPB University, Darmaga</strong></div>
                </div>
              </div>

              <div className="about20-launch-copy">
                <span className="about20-kicker">Peluncuran Yayasan</span>
                <h3>Awal perjalanan YAHN untuk memperluas akses pendidikan.</h3>
                <p>
                  Yayasan Andi Hakim Nasoetion diluncurkan pada 21 Desember 2025 di Auditorium Andi Hakim Nasoetion, Kampus IPB University, Darmaga. Momen ini menjadi penanda dimulainya perjalanan Yayasan dalam memperluas akses pendidikan, menumbuhkan talenta, dan meneruskan nilai-nilai Prof. Dr. Ir. Andi Hakim Nasoetion.
                </p>

                <div className="about20-launch-highlights">
                  <div><b>21 Des 2025</b><span>Tanggal Peluncuran</span></div>
                  <div><b>IPB University</b><span>Lokasi Peluncuran</span></div>
                  <div><b>4 Liputan</b><span>Dokumentasi Media</span></div>
                </div>

                <div className="about20-coverage-head">
                  <div><small>Liputan Peluncuran</small><strong>Publikasi yang mendokumentasikan momen peresmian.</strong></div>
                  <span>Media Coverage</span>
                </div>
                <div className="about20-coverage-grid">
                  {launchCoverage.map((item) => (
                    <a key={item.source} href={item.image} target="_blank" rel="noreferrer" className="about20-coverage-card">
                      <img src={item.image} alt={`Liputan ${item.source} tentang peluncuran YAHN`} />
                      <div>
                        <small>{item.source}</small>
                        <strong>{item.title}</strong>
                        <span>Lihat dokumentasi →</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
