import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  HandHeart,
  FileText,
  ArrowRight,
  Users,
  Clock3,
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { categoryById, statusMeta, priorityMeta } from '../data/categories'
import { partnerById } from '../data/partners'
import MediaCarousel from '../components/ui/MediaCarousel.jsx'
import Progress from '../components/ui/Progress.jsx'
import ContributeModal from '../components/ContributeModal.jsx'
import NeedCard from '../components/NeedCard.jsx'
import { formatID, rupiah, rupiahShort, pct, formatDate } from '../utils/format'
import { STAGES } from '../data/needs'

export default function NeedDetailPage() {
  const { id } = useParams()
  const { needs, getNeed } = useApp()
  const need = getNeed(id)
  const [modalOpen, setModalOpen] = useState(false)

  const related = useMemo(
    () => needs.filter((n) => n.category === need?.category && n.id !== need?.id).slice(0, 3),
    [needs, need]
  )

  if (!need) {
    return (
      <div className="container-app py-24 text-center">
        <p className="font-display text-2xl font-semibold text-sand-900">Kebutuhan tidak ditemukan</p>
        <Link to="/kebutuhan" className="btn-primary mt-6">
          Kembali ke daftar kebutuhan
        </Link>
      </div>
    )
  }

  const cat = categoryById(need.category)
  const Icon = cat.icon
  const status = statusMeta[need.status]
  const percent = pct(need.collected, need.target)
  const remaining = need.target - need.collected
  const partner = need.partner ? partnerById(need.partner) : null
  const doneCount = need.timeline.filter((t) => t.date).length
  const cost = need.operationalCost
  const done = need.status === 'selesai'

  return (
    <div>
      {/* Gallery */}
      <div className="container-app pt-6 md:pt-8">
        <Link
          to="/kebutuhan"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-sand-500 transition-colors hover:text-sand-800"
        >
          <ArrowLeft size={15} /> Semua kebutuhan
        </Link>
        <MediaCarousel media={need.media} className="mt-4" aspect="aspect-[16/10] md:aspect-[21/9]" />
      </div>

      <div className="container-app grid gap-10 py-10 md:py-14 lg:grid-cols-[1.6fr_1fr]">
        {/* ================= KOLOM UTAMA ================= */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white"
              style={{ backgroundColor: cat.color }}
            >
              <Icon size={13} /> {cat.name}
            </span>
            {status && (
              <span className={`rounded-full border bg-white px-3 py-1 text-xs font-bold ${status.tone}`}>{status.label}</span>
            )}
            <span className={`rounded-full border bg-white px-3 py-1 text-xs font-bold ${priorityMeta[need.priority].tone}`}>
              {priorityMeta[need.priority].label}
            </span>
            <span className="tnum inline-flex items-center gap-1 rounded-full bg-sand-100 px-3 py-1 text-xs font-bold text-sand-600">
              {need.id}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-sand-950 sm:text-4xl">
            {need.title}
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-sand-500">
            <MapPin size={15} />
            {need.location.village}, Kec. {need.location.district}, {need.location.regency}, {need.location.province}
          </p>

          <p className="mt-5 text-lg leading-relaxed text-sand-700">{need.summary}</p>

          {/* Kenapa kebutuhan ini ada */}
          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-sand-950">Kenapa kebutuhan ini ada?</h2>
            <p className="mt-3 leading-relaxed text-sand-700">{need.why}</p>
            <p className="mt-4 rounded-2xl border border-brand-200 bg-brand-50 p-4 text-sm leading-relaxed text-brand-900">
              <strong className="font-bold">Yang sedang dibutuhkan:</strong> {need.neededNow || 'Tidak ada — kebutuhan sudah terpenuhi.'}
            </p>
          </section>

          {/* Timeline */}
          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-sand-950">Progress</h2>
            <ol className="mt-5 space-y-0">
              {STAGES.map((stage, i) => {
                const entry = need.timeline.find((t) => t.stage === stage.id)
                const isDone = !!entry?.date
                const isLast = i === STAGES.length - 1
                return (
                  <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
                    {!isLast && (
                      <span
                        className={`absolute left-[13px] top-7 h-full w-0.5 ${isDone ? 'bg-brand-500' : 'bg-sand-200'}`}
                      />
                    )}
                    <span
                      className={`relative z-10 mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border-2 ${
                        isDone ? 'border-brand-600 bg-brand-600 text-white' : 'border-sand-300 bg-white text-sand-400'
                      }`}
                    >
                      {isDone ? <BadgeCheck size={15} /> : <span className="h-1.5 w-1.5 rounded-full bg-current" />}
                    </span>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex flex-wrap items-baseline gap-x-3">
                        <p className={`font-bold ${isDone ? 'text-sand-950' : 'text-sand-400'}`}>{stage.label}</p>
                        {entry?.date && <p className="tnum text-xs font-semibold text-sand-500">{formatDate(entry.date)}</p>}
                      </div>
                      {entry?.note && <p className="mt-1 text-sm leading-relaxed text-sand-600">{entry.note}</p>}
                      {entry?.image && (
                        <img
                          src={entry.image}
                          alt=""
                          loading="lazy"
                          className="mt-3 h-28 w-full max-w-[280px] rounded-xl border border-sand-200 object-cover"
                        />
                      )}
                    </div>
                  </li>
                )
              })}
            </ol>
          </section>

          {/* Bukti & dokumentasi */}
          <section className="mt-10">
            <h2 className="font-display text-2xl font-semibold text-sand-950">Bukti & Dokumentasi</h2>
            {need.evidence.length === 0 ? (
              <p className="mt-3 rounded-2xl border border-dashed border-sand-300 bg-white p-6 text-sm text-sand-500">
                Dokumentasi akan terunggah seiring berjalannya distribusi oleh mitra pelaksana.
              </p>
            ) : (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {need.evidence.map((ev, i) =>
                  ev.type === 'receipt' || ev.type === 'note' ? (
                    <div key={i} className="flex items-start gap-3 rounded-2xl border border-sand-200 bg-white p-4 shadow-soft">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sand-100 text-sand-600">
                        <FileText size={18} />
                      </span>
                      <div>
                        <p className="text-sm font-bold text-sand-900">{ev.label}</p>
                        <p className="tnum mt-0.5 text-xs font-semibold text-sand-500">{ev.ref}</p>
                      </div>
                    </div>
                  ) : (
                    <figure key={i} className="overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-soft">
                      <img src={ev.url} alt={ev.caption} loading="lazy" className="aspect-video w-full object-cover" />
                      <figcaption className="p-3 text-xs font-semibold text-sand-600">{ev.caption}</figcaption>
                    </figure>
                  )
                )}
              </div>
            )}
          </section>
        </div>

        {/* ================= SIDEBAR ================= */}
        <aside className="lg:sticky lg:top-24 self-start">
          <div className="card p-6">
            <p className="eyebrow">Progress saat ini</p>
            <p className="tnum mt-2 font-display text-3xl font-semibold text-sand-950">
              {formatID(need.collected)}
              <span className="text-lg text-sand-400"> / {formatID(need.target)} {need.unit === 'Rp' ? '' : need.unit}</span>
            </p>
            <div className="mt-3">
              <Progress collected={need.collected} target={need.target} size="lg" tone={done ? 'sand' : 'moss'} />
            </div>
            <p className="tnum mt-2 text-sm font-bold text-brand-700">{percent}% terpenuhi</p>

            {done ? (
              <p className="mt-4 rounded-xl bg-sand-100 p-3 text-center text-sm font-bold text-sand-700">
                Kebutuhan ini sudah terpenuhi. Terima kasih!
              </p>
            ) : (
              <>
                <p className="mt-4 text-sm text-sand-600">
                  Masih dibutuhkan:{' '}
                  <span className="tnum font-bold text-sand-950">
                    {need.unit === 'Rp' ? rupiah(remaining) : `${formatID(remaining)} ${need.unit}`}
                  </span>
                </p>
                <button onClick={() => setModalOpen(true)} className="btn-primary btn-lg mt-4 w-full">
                  <HandHeart size={18} />
                  Ambil Bagian
                </button>
                <p className="mt-2.5 text-center text-[11px] leading-relaxed text-sand-500">
                  Berapa pun yang kamu bisa bantu, itu sangat berarti.
                </p>
              </>
            )}
          </div>

          {/* Transparansi operasional */}
          {need.unit === 'Rp' || cost?.collected ? (
            <div className="card mt-5 p-6">
              <p className="eyebrow">Transparansi operasional</p>
              <ul className="tnum mt-3 space-y-2.5 text-sm">
                <li className="flex justify-between gap-4">
                  <span className="text-sand-600">Dana terkumpul</span>
                  <span className="font-bold text-sand-950">{rupiahShort(cost.collected)}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-sand-600">Pengadaan bantuan</span>
                  <span className="font-bold text-sand-950">{rupiahShort(cost.procurement)}</span>
                </li>
                <li className="flex justify-between gap-4 border-t border-dashed border-sand-200 pt-2.5">
                  <span className="text-sand-600">Distribusi & operasional</span>
                  <span className="font-bold text-sand-950">{rupiahShort(cost.operations)}</span>
                </li>
              </ul>
              <p className="mt-3 text-[11px] leading-relaxed text-sand-500">
                Distribusi tidak berjalan tanpa biaya: transportasi, bahan bakar, bongkar muat, dan tenaga operasional.
                Semua angka mock data prototype.
              </p>
            </div>
          ) : null}

          {/* Mitra */}
          {partner && (
            <div className="card mt-5 p-6">
              <p className="eyebrow">Mitra pelaksana</p>
              <div className="mt-3 flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-800">
                  <Users size={20} />
                </span>
                <div>
                  <p className="text-sm font-bold text-sand-950">{partner.name}</p>
                  <p className="text-xs text-sand-500">
                    {partner.type} · {partner.region}
                  </p>
                  {need.execution && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-brand-700">
                      <Clock3 size={13} /> {need.execution.progressLabel} · ETA {need.execution.etaDays} hari
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-sand-200/70 bg-white">
          <div className="container-app py-14">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-semibold text-sand-950">Kebutuhan serupa</h2>
              <Link to={`/kebutuhan?kategori=${cat.id}`} className="btn-ghost">
                Lihat semua {cat.short} <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              {related.map((n) => (
                <NeedCard key={n.id} need={n} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ContributeModal need={need} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
