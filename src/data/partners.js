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
