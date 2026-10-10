export type PublicStudent = {
  slug: string;
  name: string;
  initials: string;
  program: string;
  semester: number;
  gpa: string;
  need: string;
  target: number;
  funded: number;
  story: string;
};

export const publicStudents: PublicStudent[] = [
  {
    slug: 'alya-statistika', name: 'Alya P.', initials: 'AP', program: 'Statistika dan Sains Data', semester: 5, gpa: '3.76',
    need: 'Living Cost', target: 9000000, funded: 6750000,
    story: 'Alya sedang menempuh pendidikan berbasis data dan aktif mengembangkan kemampuan akademik. Dukungan difokuskan untuk menjaga keberlanjutan biaya hidup selama masa studi.'
  },
  {
    slug: 'dimas-ilkom', name: 'Dimas R.', initials: 'DR', program: 'Ilmu Komputer', semester: 4, gpa: '3.61',
    need: 'UKT', target: 7000000, funded: 3500000,
    story: 'Dimas memiliki ketertarikan pada pengembangan perangkat lunak. Pendanaan yang dibutuhkan saat ini diprioritaskan untuk membantu UKT semester berjalan.'
  },
  {
    slug: 'nabila-matematika', name: 'Nabila S.', initials: 'NS', program: 'Matematika', semester: 6, gpa: '3.84',
    need: 'UKT + Living Cost', target: 12000000, funded: 9600000,
    story: 'Nabila menjaga performa akademik yang konsisten. Dukungan Kakak Asuh membantu menutup kebutuhan pendidikan dan kebutuhan harian hingga akhir tahun akademik.'
  }
];

export const rupiah = (value: number) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(value);
