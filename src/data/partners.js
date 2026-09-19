/**
 * Mitra pelaksana & data internal. Semua FIKTIF.
 * "Lazismu" hanya CONTOH mitra — bukan afiliasi resmi platform.
 */
export const partners = [
  {
    id: 'lazismu',
    name: 'Lazismu (contoh mitra)',
    type: 'Lembaga kemanusiaan',
    region: 'Jawa Timur',
    activePrograms: 6,
    donePrograms: 14,
    runningPrograms: 6,
    reportCompliance: 98,
    docsRating: 4.8,
    active: true,
    note: 'Contoh mitra dalam prototype — bukan afiliasi resmi.',
  },
  {
    id: 'mitraA',
    name: 'Mitra Pelaksana A',
    type: 'Organisasi masyarakat',
    region: 'Bojonegoro & Tuban',
    activePrograms: 4,
    donePrograms: 9,
    runningPrograms: 4,
    reportCompliance: 96,
    docsRating: 4.6,
    active: true,
  },
  {
    id: 'kmnubojonegoro',
    name: 'Komunitas Muda Bojonegoro',
    type: 'Komunitas',
    region: 'Bojonegoro',
    activePrograms: 3,
    donePrograms: 7,
    runningPrograms: 3,
    reportCompliance: 94,
    docsRating: 4.4,
    active: true,
  },
  {
    id: 'relawanjatim',
    name: 'Jaringan Relawan Jatim',
    type: 'Organisasi sosial',
    region: 'Jawa Timur',
    activePrograms: 5,
    donePrograms: 11,
    runningPrograms: 5,
    reportCompliance: 97,
    docsRating: 4.7,
    active: true,
  },
  {
    id: 'karangtaruna',
    name: 'Karang Taruna Nusantara',
    type: 'Komunitas',
    region: 'Jawa Timur',
    activePrograms: 2,
    donePrograms: 4,
    runningPrograms: 2,
    reportCompliance: 90,
    docsRating: 4.1,
    active: true,
  },
  {
    id: 'relawanjateng',
    name: 'Relawan Jawa Tengah',
    type: 'Organisasi sosial',
    region: 'Jawa Tengah',
    activePrograms: 2,
    donePrograms: 5,
    runningPrograms: 2,
    reportCompliance: 95,
    docsRating: 4.5,
    active: true,
  },
  {
    id: 'relawanjabar',
    name: 'Relawan Jawa Barat',
    type: 'Organisasi sosial',
    region: 'Jawa Barat',
    activePrograms: 1,
    donePrograms: 3,
    runningPrograms: 1,
    reportCompliance: 92,
    docsRating: 4.2,
    active: true,
  },
]

export const partnerById = (id) => partners.find((p) => p.id === id) || null

/** Antrian verifikasi kebutuhan masuk */
export const verificationQueue = [
  {
    id: 'VER-118',
    needRef: 'NEED-026',
    category: 'bencana',
    location: 'Bojonegoro',
    proposer: 'Posko Desa Sukosewu',
    submittedAt: '2026-09-14',
    status: 'proses',
    priority: 'sedang',
    verifier: 'Dina Kartika',
  },
  {
    id: 'VER-117',
    needRef: 'NEED-025',
    category: 'pendidikan',
    location: 'Ngawi',
    proposer: 'Ruang Baca Bandungrejo',
    submittedAt: '2026-09-12',
    status: 'terverifikasi',
    priority: 'biasa',
    verifier: 'Rizal Aminudin',
  },
  {
    id: 'VER-116',
    needRef: 'NEED-018',
    category: 'air',
    location: 'Gresik',
    proposer: 'Linmas Dusun Ngembal Lawas',
    submittedAt: '2026-09-10',
    status: 'terverifikasi',
    priority: 'biasa',
    verifier: 'Dina Kartika',
  },
  {
    id: 'VER-115',
    needRef: '—',
    category: 'sembako',
    location: 'Madiun',
    proposer: 'Kader PKK Kebonsari',
    submittedAt: '2026-09-09',
    status: 'menunggu',
    priority: 'sedang',
    verifier: null,
  },
  {
    id: 'VER-114',
    needRef: '—',
    category: 'beras',
    location: 'Bojonegoro',
    proposer: 'Bidan Desa Temayang',
    submittedAt: '2026-09-08',
    status: 'menunggu',
    priority: 'tinggi',
    verifier: null,
  },
  {
    id: 'VER-113',
    needRef: '—',
    category: 'pendidikan',
    location: 'Tuban',
    proposer: 'Guru MI Darul Ulum',
    submittedAt: '2026-09-05',
    status: 'perbaikan',
    priority: 'biasa',
    verifier: 'Rizal Aminudin',
  },
  {
    id: 'VER-112',
    needRef: '—',
    category: 'air',
    location: 'Ngawi',
    proposer: 'Karang Taruna Geneng',
    submittedAt: '2026-09-03',
    status: 'ditolak',
    priority: 'biasa',
    verifier: 'Dina Kartika',
  },
  {
    id: 'VER-111',
    needRef: 'NEED-005',
    category: 'bencana',
    location: 'Ngawi',
    proposer: 'Posko Ketro',
    submittedAt: '2026-09-03',
    status: 'terverifikasi',
    priority: 'tinggi',
    verifier: 'Verifikasi Kilat',
  },
]

/** Funnel kebutuhan (mock) */
export const funnel = [
  { stage: 'Diajukan', count: 128 },
  { stage: 'Verifikasi', count: 94 },
  { stage: 'Disetujui', count: 82 },
  { stage: 'Aktif', count: 65 },
  { stage: 'Pengadaan', count: 42 },
  { stage: 'Distribusi', count: 31 },
  { stage: 'Selesai', count: 27 },
]

/** Seri mingguan untuk analytics (8 minggu terakhir) */
export const weeklyIncoming = [11, 14, 12, 17, 15, 19, 16, 21]
export const weeklyCompleted = [4, 5, 6, 4, 7, 5, 8, 6]
export const weeks = ['W26', 'W27', 'W28', 'W29', 'W30', 'W31', 'W32', 'W33']

export const avgResolutionDays = 26

/** Partisipasi (agregat, tanpa data pribadi) */
export const participation = {
  people: 4812,
  contributions: 9764,
  totalAmount: 412500000,
  avgAmount: 42246,
  byCategory: [
    { id: 'beras', count: 3120 },
    { id: 'air', count: 2418 },
    { id: 'pendidikan', count: 1877 },
    { id: 'sembako', count: 1504 },
    { id: 'bencana', count: 845 },
  ],
  trend: [420, 465, 510, 588, 612, 640, 702, 758],
  recent: [
    { initials: 'AD', city: 'Bojonegoro', amount: 25000, need: 'NEED-003', at: '2026-09-16 08:41' },
    { initials: 'SR', city: 'Surabaya', amount: 100000, need: 'NEED-004', at: '2026-09-16 08:12' },
    { initials: 'MH', city: 'Jakarta', amount: 50000, need: 'NEED-005', at: '2026-09-16 07:56' },
    { initials: 'TW', city: 'Yogyakarta', amount: 10000, need: 'NEED-001', at: '2026-09-16 07:31' },
    { initials: 'BP', city: 'Tuban', amount: 250000, need: 'NEED-017', at: '2026-09-16 06:58' },
  ],
}

export const needsSearched = [
  { id: 'NEED-003', count: 421 },
  { id: 'NEED-005', count: 512 },
  { id: 'NEED-004', count: 289 },
  { id: 'NEED-001', count: 312 },
  { id: 'NEED-002', count: 268 },
]

export const needsSupported = [
  { id: 'NEED-005', count: 341 },
  { id: 'NEED-003', count: 263 },
  { id: 'NEED-004', count: 198 },
  { id: 'NEED-001', count: 187 },
  { id: 'NEED-002', count: 174 },
]

/**
 * Mitra distributor tambahan (contoh prototype, bukan afiliasi resmi).
 * Menerima notifikasi pengajuan kebutuhan via email/WA/telepon.
 */
export const distributorPartners = [
  {
    id: 'mdmc',
    name: 'MDMC Indonesia',
    type: 'Lembaga kemanusiaan',
    region: 'Nasional',
    activePrograms: 3,
    donePrograms: 8,
    runningPrograms: 3,
    reportCompliance: 97,
    docsRating: 4.7,
    active: true,
    note: 'Contoh mitra dalam prototype — bukan afiliasi resmi.',
  },
  {
    id: 'pedulimuslim',
    name: 'PeduliMuslim',
    type: 'Lembaga kemanusiaan',
    region: 'Jawa & Sumatera',
    activePrograms: 2,
    donePrograms: 6,
    runningPrograms: 2,
    reportCompliance: 95,
    docsRating: 4.5,
    active: true,
    note: 'Contoh mitra dalam prototype — bukan afiliasi resmi.',
  },
]

/** Jatuh tempo penggalangan dana per kebutuhan (siklus distributor — contoh). */
export const fundingCycles = {
  'NEED-001': { deadline: '2026-10-05' },
  'NEED-003': { deadline: '2026-09-30' },
  'NEED-004': { deadline: '2026-10-12' },
  'NEED-005': { deadline: '2026-09-27' },
  'NEED-017': { deadline: '2026-10-20' },
}

/**
 * Pengajuan bantuan dari warga/pengusul (mock).
 * status: menunggu → diverifikasi → diteruskan (mitra menerima notifikasi).
 */
export const proposalsSeed = [
  {
    id: 'PGA-104',
    category: 'beras',
    name: 'Supardi',
    phone: '+62 812-3456-7890',
    nik: '••••••••3512',
    village: 'Desa Sumberrejo',
    regency: 'Bojonegoro',
    receivers: '87 KK (±340 warga)',
    quantity: '±2,5 ton beras',
    notes: 'Mayoritas lansia dan buruh tani; panen gagal karena kemarau panjang.',
    photoNames: ['kondisi-desa.jpg', 'warga-antre.jpg'],
    submittedAt: '2026-09-18',
    status: 'menunggu',
    notified: [],
  },
  {
    id: 'PGA-103',
    category: 'air',
    name: 'Siti Aminah (Kades)',
    phone: '+62 857-1122-3344',
    nik: null,
    village: 'Dusun Ngembal',
    regency: 'Gresik',
    receivers: '±150 warga',
    quantity: '6 tangki air bersih',
    notes: 'Sumur kering sejak Agustus; air dibeli per jerigen Rp5.000.',
    photoNames: ['sumur-kering.jpg'],
    submittedAt: '2026-09-16',
    status: 'diteruskan',
    notified: [
      { partner: 'Lazismu (contoh mitra)', channel: 'Email + WhatsApp', at: '2026-09-16 10:20' },
      { partner: 'MDMC Indonesia', channel: 'Email + Telepon', at: '2026-09-16 10:20' },
      { partner: 'PeduliMuslim', channel: 'Email', at: '2026-09-16 10:20' },
    ],
  },
  {
    id: 'PGA-102',
    category: 'pendidikan',
    name: 'Pak Harun (Guru)',
    phone: '+62 813-9988-7766',
    nik: null,
    village: 'SDN 2 Temayang',
    regency: 'Bojonegoro',
    receivers: '23 siswa',
    quantity: '23 pasang sepatu + 23 tas',
    notes: 'Siswa kelas 4–6; sepatu rusak untuk jalan ±3 km ke sekolah.',
    photoNames: ['siswa-sepatu-rusak.jpg'],
    submittedAt: '2026-09-15',
    status: 'diverifikasi',
    notified: [],
  },
  {
    id: 'PGA-101',
    category: 'sembako',
    name: 'Kader PKK Kebonsari',
    phone: '+62 822-4455-6677',
    nik: '••••••••0921',
    village: 'Kebonsari',
    regency: 'Madiun',
    receivers: '40 KK',
    quantity: '40 paket sembako',
    notes: 'Isi paket: minyak goreng, gula, telur, mie instan.',
    photoNames: ['daftar-kk.jpg', 'pos-pkk.jpg'],
    submittedAt: '2026-09-13',
    status: 'diteruskan',
    notified: [{ partner: 'PeduliMuslim', channel: 'Email + WhatsApp', at: '2026-09-14 09:05' }],
  },
  {
    id: 'PGA-100',
    category: 'bencana',
    name: 'Linmas Jetak',
    phone: '+62 856-7788-9900',
    nik: null,
    village: 'Dusun Jetak',
    regency: 'Ngawi',
    receivers: '±220 warga / 6 RT',
    quantity: '110 paket makanan + air bersih',
    notes: 'Banjir kiriman; posko aktif di balai desa.',
    photoNames: ['banjir-jetak.jpg'],
    submittedAt: '2026-09-11',
    status: 'diteruskan',
    notified: [
      { partner: 'MDMC Indonesia', channel: 'Email + WhatsApp', at: '2026-09-11 14:40' },
      { partner: 'Lazismu (contoh mitra)', channel: 'Email + WhatsApp', at: '2026-09-11 14:40' },
    ],
  },
]
