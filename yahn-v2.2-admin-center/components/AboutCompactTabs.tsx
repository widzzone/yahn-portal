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
            <div className="about16-community-panel refined">
              <div className="about16-community-copy refined">
                <span className="about16-panel-kicker">Sustainable Community</span>
                <h3>Satu nilai, tiga bagian komunitas yang saling menguatkan.</h3>
                <p>
                  Ekosistem YAHN mempertemukan penerima manfaat, alumni, dan para Sahabat YAHN agar
                  dukungan pendidikan tumbuh menjadi jejaring yang berkesinambungan.
                </p>
                <div className="about16-community-cards refined">
                  <div><strong>Alumni</strong><span>Meneruskan nilai dan pengalaman.</span></div>
                  <div><strong>Penerima Beasiswa</strong><span>Belajar, berkembang, dan bertumbuh.</span></div>
                  <div><strong>Sahabat YAHN</strong><span>Menggerakkan keberlanjutan dukungan.</span></div>
                </div>
              </div>
              <div className="about16-community-visual refined" aria-label="Ekosistem YAHN">
                <div className="about16-ring" />
                <div className="about16-core"><img src="/logo-yahn.png" alt="Logo YAHN" /><strong>Nilai AHN</strong></div>
                <div className="about16-node about16-node-top">Alumni</div>
                <div className="about16-node about16-node-left">Penerima<br />Beasiswa</div>
                <div className="about16-node about16-node-right">Sahabat<br />YAHN</div>
              </div>
            </div>
          )}

          {active === 'struktur' && (
            <div className="about16-org-panel refined">
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
