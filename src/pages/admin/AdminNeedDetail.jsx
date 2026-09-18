import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  UserRound,
  MapPin,
  ShieldCheck,
  Handshake,
  Wallet,
  Receipt,
  FileText,
  Camera,
  Clock3,
  BadgeCheck,
} from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { categoryById, statusMeta, priorityMeta, verificationMeta } from '../../data/categories'
import { partnerById, verificationQueue } from '../../data/partners'
import { STAGES } from '../../data/needs'
import { formatID, rupiah, rupiahShort, pct, formatDate } from '../../utils/format'
import MediaCarousel from '../../components/ui/MediaCarousel.jsx'

export default function AdminNeedDetail() {
  const { id } = useParams()
  const { needs, getNeed } = useApp()
  const need = getNeed(id)
  const [tab, setTab] = useState('ringkasan')

  if (!need) {
    return (
      <div className="card p-16 text-center">
        <p className="font-display text-xl font-semibold text-sand-900">Kebutuhan tidak ditemukan</p>
        <Link to="/operations/kebutuhan" className="btn-primary mt-5">Kembali</Link>
      </div>
    )
  }

  const cat = categoryById(need.category)
  const partner = need.partner ? partnerById(need.partner) : null
  const ver = verificationQueue.find((v) => v.needRef === need.id)
  const cost = need.operationalCost
  const procPct = cost.collected ? Math.round((cost.procurement / cost.collected) * 100) : 0
  const opsPct = cost.collected ? Math.round((cost.operations / cost.collected) * 100) : 0

  return (
    <div className="space-y-6">
      <Link to="/operations/kebutuhan" className="inline-flex items-center gap-1.5 text-sm font-semibold text-sand-500 hover:text-sand-800">
        <ArrowLeft size={15} /> Kembali ke daftar
      </Link>

      {/* Header */}
      <div className="card overflow-hidden">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
          <img src={need.media[0]?.url || cat.image} alt="" loading="lazy" className="h-28 w-full rounded-xl object-cover sm:w-44" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" style={{ backgroundColor: cat.color }}>
                {cat.name}
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusMeta[need.status].tone}`}>
                {statusMeta[need.status].label}
              </span>
              <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${priorityMeta[need.priority].tone}`}>
                {priorityMeta[need.priority].label}
              </span>
              <span className="tnum rounded-full bg-sand-100 px-2.5 py-0.5 text-[11px] font-bold text-sand-600">{need.id}</span>
            </div>
            <h1 className="mt-2 font-display text-xl font-semibold leading-snug text-sand-950 md:text-2xl">{need.title}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-sand-500">
              <MapPin size={14} /> {need.location.village}, Kec. {need.location.district}, {need.location.regency}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="tnum font-display text-3xl font-semibold text-sand-950">{pct(need.collected, need.target)}%</p>
            <p className="text-[11px] font-bold text-sand-500">terpenuhi</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto nice-scroll">
        {['ringkasan', 'verifikasi', 'anggaran', 'dokumentasi'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold capitalize transition-colors ${
              tab === t ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ================= TAB: RINGKASAN ================= */}
      {tab === 'ringkasan' && (
        <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-5">
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-sand-950">Informasi kebutuhan</h2>
              <p className="mt-3 text-sm leading-relaxed text-sand-700">{need.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-sand-600">{need.why}</p>
              <div className="tnum mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-sand-50 p-3.5 text-center">
                  <p className="font-display text-lg font-semibold text-sand-950">{formatID(need.target)}</p>
                  <p className="text-[10px] font-bold text-sand-500">Target {need.unit === 'Rp' ? 'dana' : need.unit}</p>
                </div>
                <div className="rounded-xl bg-sand-50 p-3.5 text-center">
                  <p className="font-display text-lg font-semibold text-moss-700">{formatID(need.collected)}</p>
                  <p className="text-[10px] font-bold text-sand-500">Terkumpul</p>
                </div>
                <div className="rounded-xl bg-sand-50 p-3.5 text-center">
                  <p className="font-display text-lg font-semibold text-sand-950">{formatID(need.target - need.collected)}</p>
                  <p className="text-[10px] font-bold text-sand-500">Kekurangan</p>
                </div>
                <div className="rounded-xl bg-sand-50 p-3.5 text-center">
                  <p className="font-display text-lg font-semibold text-sand-950">
                    {need.timeline.filter((t) => t.date).length}/6
                  </p>
                  <p className="text-[10px] font-bold text-sand-500">Tahap selesai</p>
                </div>
              </div>
            </div>

            {/* Timeline internal */}
            <div className="card p-6">
              <h2 className="font-display text-lg font-semibold text-sand-950">Timeline pelaksanaan</h2>
              <ol className="mt-4 space-y-4">
                {STAGES.map((stage, i) => {
                  const entry = need.timeline.find((t) => t.stage === stage.id)
                  const isDone = !!entry?.date
                  return (
                    <li key={stage.id} className="flex gap-3">
                      <span
                        className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-[10px] font-bold ${
                          isDone ? 'bg-moss-700 text-white' : 'bg-sand-100 text-sand-400'
                        }`}
                      >
                        {isDone ? <BadgeCheck size={14} /> : i + 1}
                      </span>
                      <div className="min-w-0 flex-1 border-b border-dashed border-sand-100 pb-3 last:border-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <p className={`text-sm font-bold ${isDone ? 'text-sand-950' : 'text-sand-400'}`}>{stage.label}</p>
                          <p className="tnum text-[11px] font-semibold text-sand-500">{entry?.date ? formatDate(entry.date) : '—'}</p>
                        </div>
                        {entry?.note && <p className="mt-0.5 text-xs leading-relaxed text-sand-600">{entry.note}</p>}
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>

          {/* Sisi kanan */}
          <div className="space-y-5">
            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sand-950">
                <UserRound size={15} className="text-moss-700" /> Pengusul
              </h3>
              <p className="mt-2 text-sm font-bold text-sand-950">{need.proposer.name}</p>
              <p className="text-xs text-sand-500">{need.proposer.role}</p>
              <p className="tnum mt-1 text-[11px] font-semibold text-sand-400">Mengajukan {formatDate(need.proposer.date)}</p>
            </div>

            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sand-950">
                <ShieldCheck size={15} className="text-moss-700" /> Verifikasi
              </h3>
              <p className="mt-2 text-sm text-sand-700">{need.verifier}</p>
              <p className="tnum mt-1 text-xs text-sand-500">
                {ver ? `${ver.id} · status ${verificationMeta[ver.status].label.toLowerCase()}` : 'Ter(catat) via kunjungan lapangan'}
              </p>
            </div>

            <div className="card p-6">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sand-950">
                <Handshake size={15} className="text-moss-700" /> Mitra pelaksana
              </h3>
              <p className="mt-2 text-sm font-bold text-sand-950">{partner?.name || 'Menunggu penugasan'}</p>
              {partner && <p className="text-xs text-sand-500">{partner.type} · {partner.region}</p>}
              {need.execution && (
                <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-moss-700">
                  <Clock3 size={13} /> {need.execution.progressLabel} · ETA {need.execution.etaDays} hari
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: ANGGARAN ================= */}
      {tab === 'anggaran' && (
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="card p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-sand-950">
              <Wallet size={17} className="text-moss-700" /> Rincian anggaran
            </h2>
            <ul className="tnum mt-5 space-y-3.5 text-sm">
              <li className="flex items-center justify-between">
                <span className="text-sand-600">Dana terkumpul</span>
                <span className="font-bold text-sand-950">{rupiah(cost.collected)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-sand-600">Pengadaan bantuan</span>
                <span className="font-bold text-sand-950">{rupiah(cost.procurement)}</span>
              </li>
              <li className="flex items-center justify-between border-t border-dashed border-sand-200 pt-3">
                <span className="text-sand-600">Distribusi & operasional</span>
                <span className="font-bold text-sand-950">{rupiah(cost.operations)}</span>
              </li>
            </ul>
            <div className="mt-5 space-y-2.5">
              <div className="flex h-3.5 overflow-hidden rounded-full">
                <div className="bg-moss-600" style={{ width: `${procPct}%` }} />
                <div className="bg-ember-400" style={{ width: `${opsPct}%` }} />
              </div>
              <div className="flex justify-between text-[11px] font-bold text-sand-500">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-moss-600" /> Pengadaan {procPct}%
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm bg-ember-400" /> Operasional {opsPct}%
                </span>
              </div>
            </div>
            <p className="mt-4 rounded-xl bg-sand-50 p-3 text-[11px] leading-relaxed text-sand-500">
              Biaya operasional mencakup transportasi, bahan bakar, bongkar muat, komunikasi, dan tenaga lapangan.
              Persentase tidak ditetapkan platform — mengikuti kondisi tiap kebutuhan.
            </p>
          </div>
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-sand-950">Bukti pengeluaran</h2>
            <div className="mt-4 space-y-3">
              {need.evidence.filter((ev) => ev.type === 'receipt' || ev.type === 'note').map((ev, i) => (
                <div key={i} className="flex items-start gap-3 rounded-xl border border-sand-200 p-3.5">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${ev.type === 'receipt' ? 'bg-ember-500/10 text-ember-700' : 'bg-sky-500/10 text-sky-700'}`}>
                    {ev.type === 'receipt' ? <Receipt size={16} /> : <FileText size={16} />}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-sand-950">{ev.label}</p>
                    <p className="tnum text-[11px] font-semibold text-sand-500">{ev.ref}</p>
                  </div>
                </div>
              ))}
              {need.evidence.filter((ev) => ev.type === 'receipt' || ev.type === 'note').length === 0 && (
                <p className="rounded-xl border border-dashed border-sand-300 p-6 text-center text-xs text-sand-500">
                  Nota akan terunggah setelah pengadaan dilakukan.
                </p>
              )}
            </div>
            <p className="mt-4 text-[11px] text-sand-400">Total tercatat: {rupiahShort(cost.collected)} (mock data).</p>
          </div>
        </div>
      )}

      {/* ================= TAB: DOKUMENTASI ================= */}
      {tab === 'dokumentasi' && (
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-sand-950">
              <Camera size={17} className="text-moss-700" /> Dokumentasi & bukti
            </h2>
            <Link to={`/kebutuhan/${need.id}`} className="text-xs font-bold text-moss-700 hover:underline">
              Lihat versi publik
            </Link>
          </div>
          <MediaCarousel media={need.media} aspect="aspect-[16/9]" className="mt-5" />
          {need.evidence.length > 0 && (
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {need.evidence.map((ev, i) =>
                ev.url ? (
                  <figure key={i} className="overflow-hidden rounded-xl border border-sand-200">
                    <img src={ev.url} alt={ev.caption} loading="lazy" className="aspect-video w-full object-cover" />
                    <figcaption className="p-2.5 text-[11px] font-semibold text-sand-600">{ev.caption}</figcaption>
                  </figure>
                ) : (
                  <div key={i} className="flex items-center gap-3 rounded-xl border border-sand-200 p-3.5">
                    <FileText size={15} className="shrink-0 text-sand-500" />
                    <div>
                      <p className="text-xs font-bold text-sand-950">{ev.label}</p>
                      <p className="tnum text-[10px] text-sand-500">{ev.ref}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB: VERIFIKASI ================= */}
      {tab === 'verifikasi' && (
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-sand-950">Riwayat verifikasi</h2>
          <p className="mt-2 text-sm text-sand-600">
            Verifikasi dilakukan {need.verifier} sebelum kebutuhan tayang. Kebutuhan ini tayang ke publik pada{' '}
            {formatDate(need.createdAt)}.
          </p>
          <div className="mt-4 rounded-xl bg-moss-50 p-4 text-sm text-moss-900">
            <p className="font-bold">Hasil verifikasi</p>
            <p className="mt-1 text-[13px] leading-relaxed">
              Jumlah penerima, kondisi lapangan, dan urgensi sesuai pengajuan. Kebutuhan valid untuk dipublikasikan.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
