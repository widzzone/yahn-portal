import Link from 'next/link';
import { FoundationInfoFooter } from '@/components/FoundationInfoFooter';
import { FoundationInfoHeader } from '@/components/FoundationInfoHeader';

const activities = [
  'Melestarikan dan menyebarluaskan nilai-nilai yang diajarkan oleh Prof. Dr. Ir. Andi Hakim Nasoetion terkait penyebarluasan akses pendidikan kepada anak-anak berpotensi dan tidak mampu di seluruh pelosok Indonesia.',
  'Menghimpun dan menyalurkan bantuan sosial kepada mahasiswa.',
  'Memberikan beasiswa atau bantuan pendidikan kepada mahasiswa yang tidak mampu.',
  'Melakukan kerja sama dengan lembaga lain dalam bidang sosial kemanusiaan.',
  'Melakukan kegiatan untuk mengembangkan dana kekayaan Yayasan berupa usaha-usaha produktif.',
];

const values = [
  {
    code: '01',
    icon: '✦',
    title: 'Nurturing Talents',
    subtitle: 'Menumbuhkan potensi',
    bullets: [
      'Mengenali dan menghimpun bakat-bakat berkualitas.',
      'Memberikan prioritas kepada siswa dan mahasiswa berprestasi.',
    ],
  },
  {
    code: '02',
    icon: '◉',
    title: 'Education for All',
    subtitle: 'Memperluas akses pendidikan',
    bullets: [
      'Membantu siswa dan mahasiswa yang membutuhkan.',
      'Memberi kesempatan belajar kepada siswa dan mahasiswa di pelosok negeri.',
    ],
  },
  {
    code: '03',
    icon: '♡',
    title: 'Community of Care',
    subtitle: 'Menghubungkan kepedulian',
    bullets: [
      'Menghimpun komunitas donatur yang peduli.',
      'Memfasilitasi penghimpunan dan penyaluran dana yang berkesinambungan.',
    ],
  },
];

const pembina = {
  title: 'Pembina',
  leadLabel: 'Ketua',
  lead: 'Agus Buono',
  members: ['Amini Nasoetion', 'Asep Saefuddin', 'Lis Hendriani', 'Marlina Nasoetion'],
};

const pengawas = {
  title: 'Pengawas',
  leadLabel: 'Ketua',
  lead: 'Etih Sudarnika',
  members: ['Satrio Wiseno', 'Wahyu Handayani', 'Parihutan Sinaga', 'Fitria Virgantari', 'Anang Kurnia', 'Andini Nauli Nasoetion'],
};

const pengurus = {
  title: 'Pengurus',
  roles: [
    ['Ketua', 'Amir Toha'],
    ['Wakil Ketua', 'Sandi Noorzaman'],
    ['Sekretaris', 'Sutriyati'],
    ['Bendahara', 'Pimpi Rachmavirani'],
  ],
  members: ['Paras Sujiwo', 'Intan Juwita', 'Utami Dyah Safitri', 'Bagus Sartono', 'Nizwar H Nasoetion'],
};

export default function TentangYayasanPage() {
  return (
    <>
      <FoundationInfoHeader />
      <main className="about15-page">
        <section className="about15-hero">
          <div className="about15-orb about15-orb-a" />
          <div className="about15-orb about15-orb-b" />
          <div className="container about15-hero-grid">
            <div className="about15-hero-copy">
              <span className="about15-eyebrow">Tentang Yayasan Andi Hakim Nasoetion</span>
              <h1>Membuka peluang pendidikan, menumbuhkan talenta, dan merawat kepedulian.</h1>
              <p>
                Yayasan Andi Hakim Nasoetion berkontribusi membangun manusia berbudaya dan
                bermartabat melalui pembukaan peluang akses ke pendidikan tinggi serta kegiatan
                sosial kemanusiaan yang berkelanjutan.
              </p>
              <div className="about15-hero-actions">
                <Link href="#tujuan" className="btn btn-primary btn-lg">Kenali Tujuan Yayasan ↓</Link>
                <Link href="/mahasiswa" className="btn btn-light btn-lg">Program Beasiswa</Link>
              </div>
              <div className="about15-hero-pills">
                <span>Pendidikan</span>
                <span>Kemanusiaan</span>
                <span>Kolaborasi</span>
                <span>Keberlanjutan</span>
              </div>
            </div>

            <div className="about15-hero-visual" aria-label="Identitas Yayasan Andi Hakim Nasoetion">
              <div className="about15-logo-halo" />
              <img src="/logo-yahn.png" alt="Logo Yayasan Andi Hakim Nasoetion" />
              <div className="about15-hero-note">
                <span>Dedikasi</span>
                <strong>untuk Pendidikan Masa Depan</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="about15-purpose" id="tujuan">
          <div className="container about15-purpose-grid">
            <aside className="about15-section-label">
              <span>01</span>
              <small>Tujuan Yayasan</small>
            </aside>
            <div className="about15-purpose-content">
              <div className="about15-section-head">
                <span className="about15-eyebrow">Arah utama</span>
                <h2>Membangun manusia berbudaya dan bermartabat melalui akses pendidikan.</h2>
              </div>

              <div className="about15-purpose-statement">
                <span className="about15-quote-mark">“</span>
                <p>
                  Tujuan Yayasan Andi Hakim Nasoetion adalah untuk berkontribusi membangun manusia
                  berbudaya dan bermartabat melalui pembukaan peluang akses ke pendidikan tinggi
                  dengan melaksanakan kegiatan sosial kemanusiaan, termasuk penghimpunan dan
                  penyaluran donasi kepada mahasiswa yang membutuhkan.
                </p>
              </div>

              <div className="about15-activities">
                {activities.map((item, index) => (
                  <article key={item} className="about15-activity-card">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <p>{item}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="about15-values-section">
          <div className="container">
            <div className="about15-split-head">
              <div>
                <span className="about15-eyebrow">Nilai AHN</span>
                <h2>Nilai yang menjadi fondasi setiap program.</h2>
              </div>
              <p>
                Nilai-nilai ini menjaga agar dukungan pendidikan tidak berhenti pada bantuan,
                tetapi berkembang menjadi ekosistem yang menumbuhkan potensi dan kepedulian.
              </p>
            </div>

            <div className="about15-values-grid">
              {values.map((value) => (
                <article key={value.title} className="about15-value-card">
                  <div className="about15-value-top">
                    <span className="about15-value-icon">{value.icon}</span>
                    <small>{value.code}</small>
                  </div>
                  <span className="about15-value-subtitle">{value.subtitle}</span>
                  <h3>{value.title}</h3>
                  <ul>
                    {value.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about15-community-section">
          <div className="container about15-community-grid">
            <div className="about15-community-copy">
              <span className="about15-eyebrow">Sustainable Community</span>
              <h2>Satu nilai, tiga bagian komunitas yang saling menguatkan.</h2>
              <p>
                Ekosistem YAHN mempertemukan penerima manfaat, alumni, dan para filantropis agar
                dukungan pendidikan dapat tumbuh menjadi jejaring yang berkesinambungan.
              </p>
              <div className="about15-community-points">
                <div><strong>Alumni</strong><span>Meneruskan nilai dan pengalaman kepada generasi berikutnya.</span></div>
                <div><strong>Penerima Beasiswa</strong><span>Mendapat ruang untuk belajar, berkembang, dan bertumbuh.</span></div>
                <div><strong>Sahabat / Filantropis</strong><span>Menggerakkan dukungan dan keberlanjutan program pendidikan.</span></div>
              </div>
            </div>

            <div className="about15-community-visual" aria-label="Ekosistem komunitas YAHN">
              <div className="about15-community-ring" />
              <div className="about15-community-core">
                <img src="/logo-yahn.png" alt="Logo YAHN" />
                <strong>Nilai AHN</strong>
              </div>
              <div className="about15-community-node node-alumni"><span>Alumni</span></div>
              <div className="about15-community-node node-awardee"><span>Penerima<br />Beasiswa</span></div>
              <div className="about15-community-node node-philanthropist"><span>Sahabat<br />YAHN</span></div>
            </div>
          </div>
        </section>

        <section className="about15-organization-section">
          <div className="container">
            <div className="about15-split-head organization-head">
              <div>
                <span className="about15-eyebrow">Struktur Organisasi</span>
                <h2>Pengelolaan yayasan yang terstruktur.</h2>
              </div>
              <p>
                Struktur organisasi terdiri dari Pembina, Pengawas, dan Pengurus yang menjalankan
                fungsi masing-masing dalam tata kelola Yayasan Andi Hakim Nasoetion.
              </p>
            </div>

            <div className="about15-org-grid">
              <article className="about15-org-card about15-org-card-warm">
                <div className="about15-org-head"><span>01</span><h3>{pembina.title}</h3></div>
                <div className="about15-role-row"><span>{pembina.leadLabel}</span><strong>{pembina.lead}</strong></div>
                <div className="about15-member-block"><span>Anggota</span>{pembina.members.map((name) => <b key={name}>{name}</b>)}</div>
              </article>

              <article className="about15-org-card about15-org-card-brand about15-org-card-large">
                <div className="about15-org-head"><span>02</span><h3>{pengurus.title}</h3></div>
                <div className="about15-role-list">
                  {pengurus.roles.map(([role, name]) => (
                    <div className="about15-role-row" key={role}><span>{role}</span><strong>{name}</strong></div>
                  ))}
                </div>
                <div className="about15-member-block"><span>Anggota</span>{pengurus.members.map((name) => <b key={name}>{name}</b>)}</div>
              </article>

              <article className="about15-org-card about15-org-card-soft">
                <div className="about15-org-head"><span>03</span><h3>{pengawas.title}</h3></div>
                <div className="about15-role-row"><span>{pengawas.leadLabel}</span><strong>{pengawas.lead}</strong></div>
                <div className="about15-member-block"><span>Anggota</span>{pengawas.members.map((name) => <b key={name}>{name}</b>)}</div>
              </article>
            </div>
          </div>
        </section>

        <section className="about15-cta-section">
          <div className="container">
            <div className="about15-cta">
              <div>
                <span className="about15-eyebrow about15-eyebrow-light">Bersama YAHN</span>
                <h2>Ambil bagian dalam membuka peluang pendidikan.</h2>
                <p>Pilih jalur yang paling sesuai: mendaftar program beasiswa atau menjadi bagian dari komunitas pendukung pendidikan YAHN.</p>
              </div>
              <div className="about15-cta-actions">
                <Link href="/mahasiswa" className="btn btn-white btn-lg">Mendaftar Beasiswa →</Link>
                <Link href="/sahabat" className="btn btn-accent btn-lg">Menjadi Donatur →</Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FoundationInfoFooter />
    </>
  );
}
