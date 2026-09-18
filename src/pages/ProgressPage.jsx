import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, BadgeCheck, CircleDashed, CalendarDays, FileText } from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { categoryById, statusMeta } from '../data/categories'
import { partnerById } from '../data/partners'
import { STAGES } from '../data/needs'
import { formatDate, formatDateLong, formatID, pct, rupiah } from '../utils/format'
import Progress from '../components/ui/Progress.jsx'

const STAGE_NOTES = {
  ditemukan: 'Kebutuhan masuk dari pengusul — guru, kader, kepala dusun, atau relawan.',
  verifikasi: 'Tim verifikasi menuruni lokasi: jumlah penerima, kondisi, dan urgensi dicek.',
  terkumpul: 'Bantuan mulai terkumpul dari banyak orang — berapa pun nominalnya.',
  pengadaan: 'Barang/jasa diadakan di pelaku usaha lokal sebisa mungkin.',
  distribusi: 'Mitra pelaksana menyalurkan bantuan dan mendokumentasikannya.',
  selesai: 'Laporan akhir & bukti lengkap dipublikasikan.',
}

export default function ProgressPage() {
  const { id } = useParams()
  const { getNeed } = useApp()
  const need = getNeed(id)

  if (!need) {
    return (
      <div className="container-app py-24 text-center">
        <p className="font-display text-2xl font-semibold text-sand-900">Kebutuhan tidak ditemukan</p>
        <Link to="/kebutuhan" className="btn-primary mt-6">Kembali</Link>
      </div>
    )
  }

  const cat = categoryById(need.category)
  const partner = need.partner ? partnerById(need.partner) : null
  const doneCount = need.timeline.filter((t) => t.date).length
  const done = need.status === 'selesai'

  return (
    <div>
      {/* Header gelap */}
      <section className="bg-brand-950">
        <div className="container-app py-10 md:py-14">
          <Link
            to={`/kebutuhan/${need.id}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-200 transition-colors hover:text-white"
          >
            <ArrowLeft size={15} /> Kembali ke detail kebutuhan
          </Link>
          <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-brand-300">
            {cat.name} · {need.id}
          </p>
          <h1 className="mt-2 max-w-3xl font-display text-3xl font-semibold leading-tight text-white md:text-4xl">
            Perjalanan kebutuhan ini, dari ditemukan sampai selesai
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border bg-white/95 px-3 py-1 text-xs font-bold ${statusMeta[need.status].tone}`}>
              {statusMeta[need.status].label}
            </span>
            <p className="tnum text-sm font-semibold text-brand-100">
              {formatID(need.collected)} / {formatID(need.target)} {need.unit === 'Rp' ? '— dana' : need.unit} ·{' '}
              {pct(need.collected, need.target)}%
            </p>
          </div>
          <div className="mt-4 max-w-xl">
            <Progress collected={need.collected} target={need.target} size="lg" tone="ember" />
          </div>
        </div>
      </section>

      {/* Timeline kartu */}
      <div className="container-app grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr] md:py-16">
        <ol className="relative space-y-5">
          {STAGES.map((stage, i) => {
            const entry = need.timeline.find((t) => t.stage === stage.id)
            const isDone = !!entry?.date
            const Icon = isDone ? BadgeCheck : CircleDashed
            return (
              <motion.li
                key={stage.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className={`relative flex gap-4 rounded-2xl border p-5 ${
                  isDone ? 'border-sand-200/80 bg-white shadow-soft' : 'border-dashed border-sand-300 bg-transparent'
                }`}
              >
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    isDone ? 'bg-brand-700 text-white' : 'bg-sand-100 text-sand-400'
                  }`}
                >
                  <Icon size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="flex items-baseline gap-2.5">
                      <span className="tnum font-display text-lg font-semibold text-sand-300">{String(i + 1).padStart(2, '0')}</span>
                      <span className={`font-bold ${isDone ? 'text-sand-950' : 'text-sand-500'}`}>{stage.label}</span>
                    </p>
                    {entry?.date ? (
                      <span className="tnum inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-brand-800">
                        <CalendarDays size={12} /> {formatDate(entry.date)}
                      </span>
                    ) : (
                      <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-bold text-sand-400">Menunggu</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-sand-600">
                    {entry?.note || STAGE_NOTES[stage.id]}
                  </p>
                  {entry?.image && (
                    <img
                      src={entry.image}
                      alt=""
                      loading="lazy"
                      className="mt-3 aspect-video w-full max-w-sm rounded-xl border border-sand-200 object-cover"
                    />
                  )}
                </div>
              </motion.li>
            )
          })}
        </ol>

        {/* Sidebar ringkasan */}
        <aside className="space-y-5 self-start lg:sticky lg:top-24">
          <div className="card p-6">
            <p className="eyebrow">Ringkasan</p>
            <p className="mt-2 text-sm leading-relaxed text-sand-600">{need.summary}</p>
            <ul className="tnum mt-4 space-y-2 text-sm">
              <li className="flex justify-between">
                <span className="text-sand-500">Tahap selesai</span>
                <span className="font-bold text-sand-950">{doneCount} dari {STAGES.length}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-sand-500">Diperbarui</span>
                <span className="font-bold text-sand-950">{formatDate(need.updatedAt)}</span>
              </li>
              {partner && (
                <li className="flex justify-between gap-4">
                  <span className="text-sand-500">Mitra pelaksana</span>
                  <span className="text-right font-bold text-sand-950">{partner.name}</span>
                </li>
              )}
              {need.unit === 'Rp' && (
                <li className="flex justify-between">
                  <span className="text-sand-500">Dana terkumpul</span>
                  <span className="font-bold text-sand-950">{rupiah(need.collected)}</span>
                </li>
              )}
            </ul>
          </div>

          {need.evidence.length > 0 && (
            <div className="card p-6">
              <p className="eyebrow">Bukti tahap berjalan</p>
              <div className="mt-3 space-y-3">
                {need.evidence.slice(0, 3).map((ev, i) =>
                  ev.type === 'photo' || !ev.type ? (
                    <figure key={i}>
                      <img src={ev.url} alt={ev.caption} loading="lazy" className="aspect-video w-full rounded-xl object-cover" />
                      <figcaption className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-sand-600">
                        <FileText size={12} /> {ev.caption}
                      </figcaption>
                    </figure>
                  ) : (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-sand-200 p-3">
                      <FileText size={16} className="shrink-0 text-sand-500" />
                      <div>
                        <p className="text-xs font-bold text-sand-900">{ev.label}</p>
                        <p className="tnum text-[11px] text-sand-500">{ev.ref}</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-brand-900 p-6 text-sand-100">
            <p className="font-display text-xl font-semibold text-white">Kamu bisa mempercepat tahap ini</p>
            <p className="mt-2 text-sm leading-relaxed text-sand-200">
              Berapa pun yang kamu bisa bantu, itu sangat berarti.
            </p>
            <Link to={`/kebutuhan/${need.id}`} className="btn-primary mt-4 w-full">
              Buka kebutuhan
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
