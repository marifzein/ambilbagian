import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Search,
  BadgeCheck,
  Users,
  PackageOpen,
  Truck,
  Camera,
  Flag,
  HandHeart,
  Handshake,
  ShieldCheck,
  Receipt,
  BellRing,
  CalendarClock,
  ArrowLeftRight,
} from 'lucide-react'
import SectionHeading from '../components/SectionHeading.jsx'
import { partners } from '../data/partners'

const STEPS = [
  { icon: Search, title: 'Kebutuhan ditemukan', text: 'Guru, kader, kepala dusun, atau relawan mengusulkan kebutuhan nyata di daerah mereka.' },
  { icon: BadgeCheck, title: 'Kebutuhan diverifikasi', text: 'Tim menuruni lokasi: cek jumlah penerima, kondisi, dan urgensi. Yang tidak jelas, ditolak.' },
  { icon: Users, title: 'Orang-orang ikut ambil bagian', text: 'Banyak orang memberi sesuai kemampuan — Rp10 ribu pun berarti.' },
  { icon: PackageOpen, title: 'Bantuan disiapkan', text: 'Pengadaan barang/jasa, diprioritaskan ke pelaku usaha lokal di dekat lokasi.' },
  { icon: Truck, title: 'Mitra pelaksana menyalurkan', text: 'Mitra yang punya kemampuan logistik mengeksekusi distribusi dan mendokumentasikan semuanya.' },
  { icon: Camera, title: 'Progress dan bukti diperbarui', text: 'Foto, nota, dan catatan distribusi diunggah — bisa dilihat siapa pun.' },
  { icon: Flag, title: 'Kebutuhan dinyatakan selesai', text: 'Laporan akhir terbit, kebutuhan ditutup, ceritanya jadi bukti platform bekerja.' },
]

export default function HowItWorksPage() {
  return (
    <div>
      <section className="container-app py-12 md:py-16">
        <SectionHeading eyebrow="Cara Kerja" title="Dari kebutuhan ditemukan sampai selesai — semua terlihat">
          Tidak ada langkah tersembunyi. Platform mempertemukan kebutuhan dengan orang yang mau membantu, lalu memastikan
          bantuannya benar-benar sampai.
        </SectionHeading>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06 }}
              className="flex gap-4 rounded-2xl border border-sand-200/80 bg-white p-5 shadow-soft"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-700/10 text-brand-800">
                <s.icon size={20} />
              </span>
              <div>
                <p className="flex items-baseline gap-2">
                  <span className="tnum font-display text-lg font-semibold text-sand-300">{String(i + 1).padStart(2, '0')}</span>
                  <span className="font-bold text-sand-950">{s.title}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-sand-600">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Siklus pendanaan & mitra distributor */}
      <section className="border-y border-sand-200/70 bg-white">
        <div className="container-app py-14 md:py-16">
          <SectionHeading eyebrow="Siklus pendanaan" title="Pengajuan diverifikasi, mitra mengambil, donasi mengalir">
            Platform mempertemukan pengajuan dengan mitra distributor yang siap mengeksekusi. Pendanaan punya batas
            waktu dan aturan yang jelas, sehingga dana tidak mengendap.
          </SectionHeading>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: BellRing,
                title: 'Mitra dinotifikasi',
                text: 'Pengajuan yang lolos verifikasi dikirim ke mitra distributor — Lazismu, MDMC, PeduliMuslim, dan lainnya — lewat email, WhatsApp, atau telepon.',
              },
              {
                icon: Handshake,
                title: 'Donasi dibuka',
                text: 'Begitu ada mitra yang mengambil, kebutuhan tayang publik dan donasi dibuka dengan progress serta jatuh tempo yang jelas.',
              },
              {
                icon: CalendarClock,
                title: 'Jatuh tempo → transfer',
                text: 'Saat tenggat tercapai, dana bantuan dikirim/ditransfer ke mitra distributor untuk difokuskan ke pengadaan dan distribusi.',
              },
              {
                icon: ArrowLeftRight,
                title: 'Kurang dari 10%?',
                text: 'Donatur ditawari lewat email/pesan/WA: alihkan dukungannya ke kebutuhan lain, atau ikut menutup kekurangan terakhir.',
              },
            ].map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-2xl border border-sand-200/80 bg-sand-50/60 p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-700/10 text-brand-800">
                    <c.icon size={20} />
                  </span>
                  <span className="tnum font-display text-lg font-semibold text-sand-300">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-3 font-bold text-sand-950">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-sand-600">{c.text}</p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 rounded-2xl border border-sand-200 bg-sand-100/70 p-4 text-xs leading-relaxed text-sand-600">
            Nama mitra distributor pada prototype ini adalah <strong>contoh</strong> — bukan afiliasi resmi. Kebijakan
            persentase biaya operasional tidak ditetapkan platform; setiap laporan menampilkan rinciannya sendiri.
          </p>
        </div>
      </section>

      {/* Mitra pelaksana */}
      <section className="border-y border-sand-200/70 bg-white">
        <div className="container-app grid items-start gap-10 py-14 md:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow">Mitra Pelaksana</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-sand-950">
              Platform tidak menjalankan semuanya sendiri
            </h2>
            <p className="mt-4 leading-relaxed text-sand-700">
              Ambil Bagian bekerja bersama mitra pelaksana yang punya kemampuan dan jaringan di daerah — organisasi
              sosial, komunitas, lembaga kemanusiaan, dan organisasi masyarakat yang lolos standar verifikasi.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Pengadaan barang dan jasa di daerah',
                'Transportasi dan distribusi ke titik yang sulit',
                'Dokumentasi dan pelaporan yang bisa dipertanggungjawabkan',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-sand-800">
                  <BadgeCheck size={17} className="mt-0.5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-2xl border border-sand-200 bg-sand-100/70 p-4 text-xs leading-relaxed text-sand-600">
              Pada prototype ini, <strong>"Lazismu"</strong> tampil sebagai <strong>contoh mitra</strong> — bukan berarti
              platform afiliasi resmi dengan organisasi mana pun.
            </p>
          </div>

          <div className="card overflow-hidden">
            <div className="border-b border-sand-200/70 bg-sand-50 px-5 py-4">
              <p className="text-sm font-bold text-sand-950">Contoh program berjalan</p>
            </div>
            <div className="space-y-4 p-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sand-500">Kebutuhan</span>
                <span className="font-bold text-sand-950">10 tangki air</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sand-500">Pelaksana</span>
                <span className="font-bold text-sand-950">Mitra Pelaksana A</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-sand-500">Status</span>
                <span className="font-bold text-brand-700">Distribusi tahap 1 selesai</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-dashed border-sand-200 pt-4">
                <span className="text-sand-500">Biaya operasional</span>
                <span className="text-right font-bold text-sand-950">
                  ditampilkan terbuka
                  <br />
                  dalam laporan
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Transparansi */}
      <section className="container-app py-14 md:py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: 'Verifikasi sebelum tampil',
              text: 'Kebutuhan diverifikasi lapangan sebelum bisa menerima bantuan. Angka yang tampil adalah angka hasil survei.',
            },
            {
              icon: Handshake,
              title: 'Mitra, bukan volunteer dadakan',
              text: 'Distribusi dijalankan mitra yang punya standar operasional — bukan pihak yang baru pertama ketemu di lokasi.',
            },
            {
              icon: Receipt,
              title: 'Biaya operasional terbuka',
              text: 'Transportasi, bahan bakar, bongkar muat, dan komunikasi butuh biaya. Semua ditampilkan dalam laporan.',
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-sand-200/80 bg-white p-6 shadow-soft">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-700/10 text-brand-800">
                <c.icon size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-sand-950">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sand-600">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-900">
        <div className="container-app flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
              Sekarang giliran kamu.
            </h2>
            <p className="mt-2 text-sand-200">Pilih satu kebutuhan, ambil bagian, pantau sampai selesai.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/kebutuhan" className="btn-lg btn border border-white/25 bg-white/10 text-white hover:bg-white/20">
              Lihat Kebutuhan
            </Link>
            <Link to="/peta" className="btn-lg btn-primary">
              <HandHeart size={17} /> Buka Peta
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
