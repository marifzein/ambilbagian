import { Wheat, ShoppingBasket, Droplets, GraduationCap, Tent, HeartPulse } from 'lucide-react'

/**
 * Kategori layanan "Bantu ..." — 5 aktif + 1 segera hadir.
 * Palet: dominan biru (brand), sekunder hijau, aksen merah — dari logo.
 * Foto adalah dokumentasi nyata (bukan stock generik), bersumber dari
 * proyek dokumentasi: UNICEF, World Bank, Wikimedia Commons. Sumber dicantumkan.
 */
export const categories = [
  {
    id: 'beras',
    prefix: 'Bantu',
    name: 'Bantu Beras',
    short: 'Beras',
    tagline: 'Satu karung beras, banyak keluarga terbantu.',
    description:
      'Beras adalah kebutuhan paling dasar. Bantuan bisa untuk satu keluarga sampai satu desa — diadakan dari penggilingan lokal, diangkut, dan diserahkan langsung ke warga.',
    icon: Wheat,
    // Bantuan pangan dikirim dengan truk — dokumentasi bantuan berbasis pangan (DFID, CC BY 2.0)
    image:
      'https://live.staticflickr.com/8249/8511071806_454d85742a_b.jpg',
    imageCredit: 'DFID (CC BY 2.0)',
    color: '#2f66d4', // biru brand
    active: true,
  },
  {
    id: 'sembako',
    prefix: 'Bantu',
    name: 'Bantu Sembako',
    short: 'Sembako',
    tagline: 'Isi dapur yang tidak boleh kosong.',
    description:
      'Minyak goreng, telur, gula, mie instan, dan kebutuhan dapur lainnya — dikemas per keluarga atau per RT, dibagikan langsung di titik temu warga.',
    icon: ShoppingBasket,
    // Pembagian paket bantuan di posko — suasana antrean paket yang tertib (Relawan PKS memberi bantuan banjir di Padang, Wikimedia Commons, CC BY-SA 4.0)
    image:
      'https://upload.wikimedia.org/wikipedia/commons/d/d1/Relawan_PKS_memberi_bantuan_banjir_di_Padang.jpg',
    imageCredit: 'Wikimedia Commons (CC BY-SA 4.0)',
    color: '#e8480f', // aksen merah logo
    active: true,
  },
  {
    id: 'air',
    prefix: 'Bantu',
    name: 'Bantu Air',
    short: 'Air',
    tagline: 'Air bersih sampai ke titik yang sulit.',
    description:
      'Distribusi air bersih pakai truk tangki ke wilayah yang sulit air, terutama saat kemarau. Dari pengisian sampai antrean jerigen di titik distribusi.',
    icon: Droplets,
    // Truk tangki tiba di titik distribusi air saat kekeringan (UNICEF Ethiopia, CC BY-NC-ND 2.0)
    image:
      'https://live.staticflickr.com/8349/8184611897_e1a9df95b7_b.jpg',
    imageCredit: 'UNICEF Ethiopia (CC BY-NC-ND 2.0)',
    color: '#0369a1', // biru laut
    active: true,
  },
  {
    id: 'pendidikan',
    prefix: 'Bantu',
    name: 'Bantu Pendidikan',
    short: 'Pendidikan',
    tagline: 'Sepatu, tas, buku — anak belajar tenang.',
    description:
      'Barang pendidikan yang konkret dan bisa diverifikasi: sepatu sekolah, seragam, tas, buku, alat tulis. Usulan datang dari guru dan sekolah.',
    icon: GraduationCap,
    // Siswa dan guru di ruang kelas, Indonesia (World Bank Photo Collection, CC BY-NC-ND 2.0)
    image:
      'https://live.staticflickr.com/8122/8775444854_fa9e2944b1_b.jpg',
    imageCredit: 'World Bank Photo Collection (CC BY-NC-ND 2.0)',
    color: '#16a34a', // hijau sekunder
    active: true,
  },
  {
    id: 'bencana',
    prefix: 'Bantu',
    name: 'Bantu Bencana',
    short: 'Bencana',
    tagline: 'Respons cepat untuk yang paling mendesak.',
    description:
      'Banjir, kekeringan, longsor, kebakaran. Logistik darurat, air bersih, dan kebutuhan pengungsian — disalurkan lewat mitra yang siap turun.',
    icon: Tent,
    // Posko bantuan darurat setelah banjir (Wikimedia Commons, CC BY-SA 4.0)
    image:
      'https://upload.wikimedia.org/wikipedia/commons/f/fa/Relawan_PKS_memberi_bantuan_banjir_di_Padang_2.jpg',
    imageCredit: 'Wikimedia Commons (CC BY-SA 4.0)',
    color: '#b45309',
    active: true,
  },
  {
    id: 'kesehatan',
    prefix: 'Bantu',
    name: 'Bantu Kesehatan',
    short: 'Kesehatan',
    tagline: 'Sedang kami siapkan dengan teliti.',
    description:
      'Kebutuhan kesehatan berskala kebutuhan nyata: alat kesehatan, obat, dan dukungan layanan dasar. Layanan ini belum aktif — sedang disiapkan.',
    icon: HeartPulse,
    // Fasilitas layanan kesehatan daerah (Wikimedia Commons, CC BY-SA 4.0)
    image:
      'https://upload.wikimedia.org/wikipedia/commons/c/c6/Puskesmas_Pandaan%2C_puskesmas_menuju_terbaik_se-Indonesia._-_panoramio.jpg',
    imageCredit: 'Wikimedia Commons (CC BY-SA 4.0)',
    color: '#0f766e',
    active: false,
  },
]

export const categoryById = (id) => categories.find((c) => c.id === id)

export const statusMeta = {
  baru: { label: 'Baru', tone: 'bg-amber-100 text-amber-800 border-amber-200' },
  berjalan: { label: 'Sedang Berjalan', tone: 'bg-sky-100 text-sky-800 border-sky-200' },
  hampir: { label: 'Hampir Terpenuhi', tone: 'bg-moss-100 text-moss-800 border-moss-200' },
  selesai: { label: 'Selesai', tone: 'bg-sand-200 text-sand-800 border-sand-300' },
}

export const priorityMeta = {
  tinggi: { label: 'Prioritas Tinggi', tone: 'bg-ember-100 text-ember-800 border-ember-200' },
  sedang: { label: 'Prioritas Sedang', tone: 'bg-amber-100 text-amber-800 border-amber-200' },
  biasa: { label: 'Prioritas Biasa', tone: 'bg-sand-100 text-sand-700 border-sand-200' },
}

export const verificationMeta = {
  menunggu: { label: 'Menunggu', tone: 'bg-amber-100 text-amber-800 border-amber-200' },
  proses: { label: 'Sedang Diverifikasi', tone: 'bg-sky-100 text-sky-800 border-sky-200' },
  terverifikasi: { label: 'Terverifikasi', tone: 'bg-moss-100 text-moss-800 border-moss-200' },
  perbaikan: { label: 'Perlu Perbaikan', tone: 'bg-ember-100 text-ember-800 border-ember-200' },
  ditolak: { label: 'Ditolak', tone: 'bg-sand-200 text-sand-700 border-sand-300' },
}
