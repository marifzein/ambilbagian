import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, ShieldCheck, HandHeart, Search, FilePlus2, MapPinned } from 'lucide-react'
import { categories } from '../data/categories'
import { useApp } from '../store/AppContext.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import NeedCard from '../components/NeedCard.jsx'
import Progress from '../components/ui/Progress.jsx'
import ContributeModal from '../components/ContributeModal.jsx'
import ProposalModal from '../components/ProposalModal.jsx'
import { formatID, pct } from '../utils/format'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

export default function HomePage() {
  const { needs } = useApp()
  const [ctaNeed, setCtaNeed] = useState(null)
  const [proposalCat, setProposalCat] = useState(undefined) // undefined = tertutup

  const stats = useMemo(() => {
    const active = needs.filter((n) => n.status !== 'selesai')
    const rice = needs.filter((n) => n.category === 'beras')
    const riceKg = rice.reduce((a, n) => a + n.target, 0)
    const regencies = new Set(needs.map((n) => n.location.regency))
    const families = 1284 // agregat platform (mock)
    return { activeCount: active.length, riceKg, regencyCount: regencies.size, families }
  }, [needs])

  const featured = useMemo(
    () =>
      ['NEED-001', 'NEED-003', 'NEED-004']
        .map((id) => needs.find((n) => n.id === id))
        .filter(Boolean),
    [needs]
  )

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        <div className="container-app grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24 lg:pt-16">
          <motion.div {...fadeUp}>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-bold text-brand-800">
              <MapPin size={13} />
              Peta Kebaikan — dimulai dari Bojonegoro
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-sand-950 sm:text-5xl lg:text-[3.4rem]">
              Berapa pun yang kamu sisihkan,{' '}
              <span className="relative inline-block">
                ada senyum yang tercipta darinya.
                <svg
                  className="absolute -bottom-1.5 left-0 w-full text-ember-500"
                  viewBox="0 0 220 10"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3 7c40-5 140-6 214-2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-sand-600">
              Kamu nggak harus bantu semuanya. 
              Berapa pun yang kamu sisihkan, ada senyum yang tercipta darinya
              {/* Cukup ambil bagian — lihat kebutuhan nyata di peta, pahami progresnya, */}
              {/* lalu bantu sesuai kemampuanmu. */}
            </p>
            <div className="mt-7 space-y-3.5">
              {/* Peta = pembeda utama platform → CTA primer, paling atas di mobile */}
              <Link
                to="/peta"
                className="btn-primary btn-lg w-full justify-center shadow-lift sm:w-auto"
              >
                <MapPinned size={18} />
                Buka Peta Kebaikan
              </Link>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/kebutuhan" className="btn-ghost btn-lg justify-center">
                  Lihat Kebutuhan
                  <ArrowRight size={17} />
                </Link>
                <button
                  onClick={() => setCtaNeed(featured[0] || needs[0])}
                  className="inline-flex items-center justify-center gap-1.5 px-1 text-sm font-bold text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4 transition-colors hover:text-brand-800"
                >
                  <HandHeart size={15} />
                  Kamu juga bisa ambil bagian!
                </button>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-1.5 text-xs text-sand-500">
              <ShieldCheck size={14} className="text-brand-600" />
              Setiap kebutuhan diverifikasi sebelum tampil. Progress dan bukti distribusi terbuka untuk semua.
            </p>
          </motion.div>

          {/* Hero visual: foto dokumentasi + kartu peta & progress */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-3xl border border-sand-200 shadow-lift">
              <img
                src="https://live.staticflickr.com/8349/8184611897_e1a9df95b7_b.jpg"
                alt="Truk tangki air tiba di titik distribusi"
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
                loading="eager"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-sand-950/70 to-transparent p-5 pt-14">
                <p className="text-sm font-bold text-white">Distribusi air bersih — Dusun Tegalsari, Bojonegoro</p>
                <p className="mt-0.5 text-xs text-white/70">Foto dokumentasi mitra pelaksana · mock data prototype</p>
              </div>
            </div>

            {/* Kartu melayang: mini peta — bisa ditap, menuju peta interaktif */}
            <Link
              to="/peta"
              className="group absolute -left-3 -top-5 hidden w-44 rotate-[-3deg] rounded-2xl border border-sand-200 bg-white p-3 shadow-lift transition-transform duration-300 hover:rotate-0 hover:scale-[1.04] sm:block"
              aria-label="Buka peta kebutuhan"
            >
              <div className="relative h-20 overflow-hidden rounded-xl bg-[#eef2fb]">
                <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(#b3cbfb_1.4px,transparent_1.4px)] [background-size:10px_10px]" />
                <svg viewBox="0 0 100 60" className="absolute inset-0 h-full w-full">
                  <path d="M8 46C26 40 38 22 62 18" stroke="#84aaf8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <circle cx="62" cy="18" r="4.5" fill="#e8480f" />
                  <circle cx="30" cy="34" r="3.5" fill="#2f66d4" />
                  <circle cx="80" cy="34" r="3.5" fill="#16a34a" />
                  <circle cx="46" cy="46" r="3.5" fill="#0369a1" />
                </svg>
              </div>
              <p className="mt-2 text-center text-[11px] font-bold text-brand-700 group-hover:text-brand-800">
                {stats.activeCount} kebutuhan aktif di peta →
              </p>
            </Link>

            {/* Kartu melayang: progress */}
            {featured[0] && (
              <div className="absolute -bottom-6 right-2 w-64 rounded-2xl border border-sand-200 bg-white p-4 shadow-lift sm:-right-5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-brand-700">Bantu Beras · Desa Sukodadi</p>
                <p className="tnum mt-1 text-sm font-bold text-sand-950">
                  {formatID(featured[0].collected)} / {formatID(featured[0].target)} kg
                </p>
                <div className="mt-2">
                  <Progress collected={featured[0].collected} target={featured[0].target} size="sm" />
                </div>
                <p className="mt-2 text-[11px] font-semibold text-sand-600">
                  Kurang {formatID(featured[0].target - featured[0].collected)} kg · {pct(featured[0].collected, featured[0].target)}% terpenuhi
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ================= ANGKA NYATA ================= */}
      <section className="border-y border-sand-200/70 bg-white">
        <div className="container-app grid grid-cols-2 gap-x-6 gap-y-10 py-12 text-center md:grid-cols-4 md:py-14">
          {[
            { value: formatID(stats.families), label: 'Keluarga terbantu' },
            { value: `${(stats.riceKg / 1000).toFixed(1).replace('.', ',')} ton`, label: 'Kebutuhan beras' },
            { value: formatID(stats.activeCount), label: 'Kebutuhan aktif' },
            { value: formatID(stats.regencyCount), label: 'Wilayah' },
          ].map((s) => (
            <motion.div key={s.label} {...fadeUp}>
              <p className="tnum font-display text-3xl font-semibold text-brand-800 md:text-4xl">{s.value}</p>
              <p className="mt-1.5 text-sm font-medium text-sand-600">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= LAYANAN ================= */}
      <section className="container-app py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading eyebrow="Layanan" title="Pilih yang paling dekat di hatimu">
            Enam layanan, lima sudah aktif. Semua lewat verifikasi, pelaksana mitra, dan bukti distribusi yang terbuka.
          </SectionHeading>
          <Link to="/kebutuhan" className="btn-ghost">
            Semua kebutuhan <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            const count = needs.filter((n) => n.category === cat.id && n.status !== 'selesai').length
            const href = cat.active ? `/kebutuhan?kategori=${cat.id}` : '/kebutuhan'
            return (
              <motion.div
                key={cat.id}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className={cat.active ? '' : 'opacity-95'}
              >
                <div
                  className={`group flex h-full flex-col overflow-hidden rounded-2xl border border-sand-200/80 bg-white shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${
                    !cat.active ? 'grayscale-[0.4]' : ''
                  }`}
                >
                  <Link to={href} className="relative block aspect-[16/9] overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-sand-950/45 to-transparent" />
                    <span
                      className="absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-xl text-white shadow-soft"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon size={17} />
                    </span>
                    {!cat.active && (
                      <span className="absolute right-3 top-3 rounded-full bg-sand-950/75 px-3 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur">
                        Segera Hadir
                      </span>
                    )}
                  </Link>
                  <div className="flex flex-1 flex-col p-5">
                    <Link to={href}>
                      <h3 className="font-display text-[1.55rem] font-bold leading-tight tracking-tight text-sand-950 transition-colors hover:text-brand-800">
                        {cat.name}
                      </h3>
                    </Link>
                    <p className="mt-1 text-[13px] font-medium text-sand-500">{cat.tagline}</p>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sand-600">{cat.description}</p>
                    <div className="mt-auto pt-4">
                      {cat.active ? (
                        <>
                          <p className="tnum text-xs font-bold text-brand-700">
                            {count} kebutuhan aktif menunggu
                          </p>
                          <button
                            onClick={() => setProposalCat(cat.id)}
                            className="btn-primary mt-3 w-full"
                          >
                            <FilePlus2 size={16} />
                            Pengajuan Bantuan
                          </button>
                          <Link
                            to={href}
                            className="mt-2.5 flex items-center justify-center gap-1 text-xs font-bold text-brand-700 transition-all hover:gap-2 hover:underline"
                          >
                            Lihat kebutuhan {cat.short} <ArrowRight size={13} />
                          </Link>
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-sand-400">Belum menerima bantuan</p>
                          <button disabled className="btn-ghost mt-3 w-full cursor-not-allowed opacity-60">
                            Segera Hadir
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ================= KEBUTUHAN TERDEKAT ================= */}
      <section className="border-y border-sand-200/70 bg-white">
        <div className="container-app py-16 md:py-20">
          <SectionHeading eyebrow="Dari wilayah sekitar" title="Kebutuhan yang sedang menunggu">
            Setiap kebutuhan punya cerita, angka, dan progress yang bisa kamu pantau sampai selesai.
          </SectionHeading>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featured.map((n) => (
              <NeedCard key={n.id} need={n} />
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Link to="/kebutuhan" className="btn-primary btn-lg">
              Jelajahi semua kebutuhan
              <Search size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CTA BAND ================= */}
      <section className="bg-brand-900">
        <div className="container-app flex flex-col items-start justify-between gap-6 py-14 md:flex-row md:items-center md:py-16">
          <div>
            <h2 className="font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
              Kamu nggak harus bantu semuanya.
              <br />
              <span className="text-brand-200">Cukup ambil bagian.</span>
            </h2>
            <p className="mt-3 max-w-md text-sand-200">
              Berapa pun yang kamu sisihkan, ada senyum yang tercipta darinya.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link to="/peta" className="btn-lg btn border border-white/25 bg-white/10 text-white hover:bg-white/20">
              Buka Peta Kebaikan
            </Link>
            <button onClick={() => setCtaNeed(featured[1] || featured[0])} className="btn btn-lg bg-white text-brand-800 shadow-soft hover:bg-brand-50">
              Ambil Bagian Sekarang
            </button>
          </div>
        </div>
        <div className="container-app border-t border-white/10 py-5">
          <button
            onClick={() => setProposalCat(null)}
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-200 transition-colors hover:text-white"
          >
            <FilePlus2 size={15} />
            Punya informasi kebutuhan di sekitarmu? Ajukan di sini — tim kami akan verifikasi.
          </button>
        </div>
      </section>

      <ContributeModal need={ctaNeed} open={!!ctaNeed} onClose={() => setCtaNeed(null)} />
      <ProposalModal open={proposalCat !== undefined} onClose={() => setProposalCat(undefined)} presetCategory={proposalCat} />
    </div>
  )
}
