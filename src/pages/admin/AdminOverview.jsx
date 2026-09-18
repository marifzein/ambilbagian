import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ClipboardList,
  Flame,
  CheckCircle2,
  Hourglass,
  Wallet,
  MapPinned,
  Handshake,
  ArrowUpRight,
  ArrowRight,
} from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { funnel, weeklyIncoming, weeklyCompleted, weeks, avgResolutionDays } from '../../data/partners'
import { formatID, rupiahShort, pct } from '../../utils/format'
import { categoryById } from '../../data/categories'

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.45 },
}

function KpiCard({ icon: Icon, label, value, sub, tone = 'moss' }) {
  const tones = {
    moss: 'bg-moss-700/10 text-moss-800',
    ember: 'bg-ember-500/10 text-ember-700',
    sky: 'bg-sky-500/10 text-sky-700',
    sand: 'bg-sand-500/10 text-sand-700',
  }
  return (
    <motion.div {...fadeUp} className="card p-5">
      <div className="flex items-center justify-between">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="tnum mt-3 font-display text-2xl font-semibold text-sand-950">{value}</p>
      <p className="mt-0.5 text-xs font-bold text-sand-600">{label}</p>
      {sub && <p className="tnum mt-1 text-[11px] font-semibold text-sand-400">{sub}</p>}
    </motion.div>
  )
}

/** Bar chart sederhana tanpa library — dua seri berdampingan. */
function WeeklyBars() {
  const max = Math.max(...weeklyIncoming)
  return (
    <div className="mt-4 flex h-40 items-end gap-2.5">
      {weeks.map((w, i) => (
        <div key={w} className="group flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end justify-center gap-1">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(weeklyIncoming[i] / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="w-1/2 max-w-[26px] rounded-t-md bg-moss-500"
              title={`Masuk: ${weeklyIncoming[i]}`}
            />
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${(weeklyCompleted[i] / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
              className="w-1/2 max-w-[26px] rounded-t-md bg-ember-400"
              title={`Selesai: ${weeklyCompleted[i]}`}
            />
          </div>
          <span className="tnum text-[10px] font-bold text-sand-400">{w}</span>
        </div>
      ))}
    </div>
  )
}

export default function AdminOverview() {
  const { needs, participation } = useApp()

  const s = useMemo(() => {
    const active = needs.filter((n) => n.status !== 'selesai')
    const done = needs.filter((n) => n.status === 'selesai')
    const pending = 3 // kebutuhan menunggu verifikasi (mock, sinkron dengan antrian)
    const regions = new Set(needs.map((n) => n.location.regency))
    const collectedRp = needs.reduce((a, n) => a + n.operationalCost.collected, 0)
    const fulfilled = needs.reduce((a, n) => a + n.collected, 0)
    return { activeCount: active.length, doneCount: done.length, pending, regions: regions.size, collectedRp, fulfilled }
  }, [needs])

  const urgent = useMemo(
    () =>
      [...needs]
        .filter((n) => n.status !== 'selesai')
        .sort((a, b) => {
          const rank = { tinggi: 0, sedang: 1, biasa: 2 }
          return rank[a.priority] - rank[b.priority] || pct(a.collected, a.target) - pct(b.collected, b.target)
        })
        .slice(0, 5),
    [needs]
  )

  const maxFunnel = funnel[0].count

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Overview</h1>
        <p className="mt-1 text-sm text-sand-500">Kondisi operasional platform hari ini — semua dari mock data yang sama dengan situs publik.</p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard icon={ClipboardList} label="Total kebutuhan" value={formatID(needs.length)} sub="sejak Mei 2026" />
        <KpiCard icon={Flame} label="Kebutuhan aktif" value={formatID(s.activeCount)} tone="ember" sub="berjalan & hampir terpenuhi" />
        <KpiCard icon={CheckCircle2} label="Kebutuhan selesai" value={formatID(s.doneCount)} sub="dengan laporan lengkap" />
        <KpiCard icon={Hourglass} label="Menunggu verifikasi" value={formatID(s.pending)} tone="sky" sub="rata-rata 3,2 hari proses" />
        <KpiCard icon={Wallet} label="Total bantuan terkumpul" value={rupiahShort(s.collectedRp)} sub="akumulasi semua program" />
        <KpiCard icon={ArrowUpRight} label="Kebutuhan terpenuhi" value={formatID(s.fulfilled)} sub="satuan gabungan (kg/paket/tangki)" />
        <KpiCard icon={MapPinned} label="Wilayah" value={formatID(s.regions)} sub="kabupaten/kota terjangkau" />
        <KpiCard icon={Handshake} label="Mitra aktif" value="7" sub="semua lolos verifikasi" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        {/* Funnel */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold text-sand-950">Funnel kebutuhan</h2>
              <p className="text-xs text-sand-500">Diajukan → Selesai, kumulatif 8 minggu terakhir</p>
            </div>
            <Link to="/operations/kebutuhan" className="text-xs font-bold text-moss-700 hover:underline">
              Semua kebutuhan
            </Link>
          </div>
          <div className="mt-5 space-y-3">
            {funnel.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-3">
                <span className="w-24 shrink-0 text-xs font-bold text-sand-600">{f.stage}</span>
                <div className="h-7 flex-1 overflow-hidden rounded-lg bg-sand-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(f.count / maxFunnel) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-moss-700 to-moss-500 pr-2.5"
                  >
                    <span className="tnum text-[11px] font-bold text-white">{f.count}</span>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-sand-100 pt-4 text-center">
            <div>
              <p className="tnum font-display text-lg font-semibold text-sand-950">{avgResolutionDays} hari</p>
              <p className="text-[10px] font-bold text-sand-500">Rata-rata waktu penyelesaian</p>
            </div>
            <div>
              <p className="tnum font-display text-lg font-semibold text-sand-950">{pct(27, 128)}%</p>
              <p className="text-[10px] font-bold text-sand-500">Diajukan → selesai</p>
            </div>
            <div>
              <p className="tnum font-display text-lg font-semibold text-sand-950">{formatID(participation.people)}</p>
              <p className="text-[10px] font-bold text-sand-500">Orang ikut ambil bagian</p>
            </div>
          </div>
        </div>

        {/* Weekly */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-sand-950">Kebutuhan per minggu</h2>
          <p className="text-xs text-sand-500">Hijau: masuk · Oranye: selesai</p>
          <WeeklyBars />
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-sand-100 pt-4 text-center">
            <div>
              <p className="tnum font-display text-lg font-semibold text-sand-950">125</p>
              <p className="text-[10px] font-bold text-sand-500">Masuk 8 minggu</p>
            </div>
            <div>
              <p className="tnum font-display text-lg font-semibold text-sand-950">45</p>
              <p className="text-[10px] font-bold text-sand-500">Selesai 8 minggu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Prioritas perhatian */}
      <div className="card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-sand-950">Perlu perhatian tim</h2>
          <Link to="/operations/pelaksanaan" className="inline-flex items-center gap-1 text-xs font-bold text-moss-700 hover:underline">
            Buka pelaksanaan <ArrowRight size={12} />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-sand-100">
          {urgent.map((n) => {
            const cat = categoryById(n.category)
            return (
              <Link
                key={n.id}
                to={`/operations/kebutuhan/${n.id}`}
                className="group flex items-center gap-4 py-3 first:pt-0 last:pb-0"
              >
                <img
                  src={n.media[0]?.url || cat.image}
                  alt=""
                  loading="lazy"
                  className="h-12 w-16 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-sand-950 group-hover:text-moss-800">{n.title}</p>
                  <p className="text-xs text-sand-500">
                    {cat.short} · {n.location.regency} · {n.neededNow || 'selesai'}
                  </p>
                </div>
                <div className="hidden w-32 sm:block">
                  <div className="h-1.5 overflow-hidden rounded-full bg-sand-100">
                    <div className="h-full rounded-full bg-moss-600" style={{ width: `${pct(n.collected, n.target)}%` }} />
                  </div>
                </div>
                <ArrowUpRight size={15} className="shrink-0 text-sand-300 transition-colors group-hover:text-moss-700" />
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
