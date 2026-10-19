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
  { id: 'tujuan', label: 'Tujuan & Kegiatan', no: '01' },
  { id: 'nilai', label: 'Nilai AHN', no: '02' },
  { id: 'komunitas', label: 'Sustainable Community', no: '03' },
  { id: 'struktur', label: 'Struktur Organisasi', no: '04' },
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
            <span>Tata Kelola</span>
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
            <div className="about18-org-panel">
              <article className="about18-org-card warm">
                <header className="about18-org-header">
                  <span className="about18-org-no">01</span>
                  <div><small>Pengarah Yayasan</small><h3>Pembina</h3></div>
                </header>
                <div className="about18-leader"><span>Ketua</span><strong>Agus Buono</strong></div>
                <div className="about18-member-section">
                  <span>Anggota</span>
                  <div className="about18-member-chips">
                    <b>Amini Nasoetion</b><b>Asep Saefuddin</b><b>Lis Hendriani</b><b>Marlina Nasoetion</b>
                  </div>
                </div>
              </article>

              <article className="about18-org-card primary">
                <header className="about18-org-header">
                  <span className="about18-org-no">02</span>
                  <div><small>Pelaksana Organisasi</small><h3>Pengurus</h3></div>
                </header>
                <div className="about18-executive-grid">
                  <div><span>Ketua</span><strong>Amir Toha</strong></div>
                  <div><span>Wakil Ketua</span><strong>Sandi Noorzaman</strong></div>
                  <div><span>Sekretaris</span><strong>Sutriyati</strong></div>
                  <div><span>Bendahara</span><strong>Pimpi Rachmavirani</strong></div>
                </div>
                <div className="about18-member-section">
                  <span>Anggota Pengurus</span>
                  <div className="about18-member-chips">
                    <b>Paras Sujiwo</b><b>Intan Juwita</b><b>Utami Dyah Safitri</b><b>Bagus Sartono</b><b>Nizwar H Nasoetion</b>
                  </div>
                </div>
              </article>

              <article className="about18-org-card soft">
                <header className="about18-org-header">
                  <span className="about18-org-no">03</span>
                  <div><small>Fungsi Pengawasan</small><h3>Pengawas</h3></div>
                </header>
                <div className="about18-leader"><span>Ketua</span><strong>Etih Sudarnika</strong></div>
                <div className="about18-member-section">
                  <span>Anggota</span>
                  <div className="about18-member-chips">
                    <b>Satrio Wiseno</b><b>Wahyu Handayani</b><b>Parihutan Sinaga</b><b>Fitria Virgantari</b><b>Anang Kurnia</b><b>Andini Nauli Nasoetion</b>
                  </div>
                </div>
              </article>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
