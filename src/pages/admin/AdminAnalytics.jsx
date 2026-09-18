import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Timer, Search, HeartHandshake, MapPinned, AlertTriangle } from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { categories } from '../../data/categories'
import {
  weeklyIncoming,
  weeklyCompleted,
  weeks,
  avgResolutionDays,
  participation,
  needsSearched,
  needsSupported,
} from '../../data/partners'
import { formatID, pct, rupiah } from '../../utils/format'

export default function AdminAnalytics() {
  const { needs } = useApp()

  const byCategory = useMemo(
    () =>
      categories
        .filter((c) => c.active)
        .map((c) => ({ cat: c, count: needs.filter((n) => n.category === c.id).length })),
    [needs]
  )
  const maxCat = Math.max(...byCategory.map((x) => x.count))
  const maxWeek = Math.max(...weeklyIncoming)

  const byRegion = useMemo(() => {
    const map = {}
    needs.forEach((n) => (map[n.location.regency] = (map[n.location.regency] || 0) + 1))
    return Object.entries(map).sort((a, b) => b[1] - a[1])
  }, [needs])
  const maxRegion = byRegion[0]?.[1] || 1

  const stagnant = useMemo(
    () =>
      needs
        .filter((n) => n.status !== 'selesai' && pct(n.collected, n.target) < 40)
        .sort((a, b) => pct(a.collected, a.target) - pct(b.collected, b.target))
        .slice(0, 5),
    [needs]
  )
  const almostDone = useMemo(
    () =>
      needs
        .filter((n) => n.status !== 'selesai' && pct(n.collected, n.target) >= 80)
        .sort((a, b) => pct(b.collected, b.target) - pct(a.collected, a.target)),
    [needs]
  )

  const needById = (id) => needs.find((n) => n.id === id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Analytics</h1>
        <p className="mt-1 text-sm text-sand-500">
          Data monitoring & presentasi: kategori, tren mingguan, pencarian, dukungan, dan wilayah.
        </p>
      </div>

      {/* Kategori */}
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-sand-950">Jumlah kebutuhan per kategori</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-3 xl:grid-cols-5">
          {byCategory.map(({ cat, count }) => (
            <div key={cat.id} className="rounded-2xl border border-sand-200/70 p-4">
              <span
                className="inline-grid h-9 w-9 place-items-center rounded-xl text-white"
                style={{ backgroundColor: cat.color }}
              >
                <cat.icon size={16} />
              </span>
              <p className="tnum mt-2.5 font-display text-2xl font-semibold text-sand-950">{count}</p>
              <p className="text-xs font-bold text-sand-600">{cat.name}</p>
            </div>
          ))}
          <div className="rounded-2xl border border-dashed border-sand-300 bg-sand-50 p-4">
            <span className="inline-grid h-9 w-9 place-items-center rounded-xl bg-sand-200 text-sand-500">
              <AlertTriangle size={16} />
            </span>
            <p className="tnum mt-2.5 font-display text-2xl font-semibold text-sand-400">—</p>
            <p className="text-xs font-bold text-sand-500">Kesehatan · Segera Hadir</p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        {/* Mingguan */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-sand-950">Kebutuhan masuk & selesai per minggu</h2>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-700">
              <TrendingUp size={14} /> +21% 4 minggu
            </span>
          </div>
          <div className="mt-5 flex h-44 items-end gap-2.5">
            {weeks.map((w, i) => (
              <div key={w} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="flex w-full flex-1 items-end justify-center gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(weeklyIncoming[i] / maxWeek) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className="w-1/2 max-w-[26px] rounded-t-md bg-brand-500"
                    title={`Masuk: ${weeklyIncoming[i]}`}
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(weeklyCompleted[i] / maxWeek) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.05 }}
                    className="w-1/2 max-w-[26px] rounded-t-md bg-moss-500"
                    title={`Selesai: ${weeklyCompleted[i]}`}
                  />
                </div>
                <span className="tnum text-[10px] font-bold text-sand-400">{w}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center gap-5 border-t border-sand-100 pt-4 text-xs font-bold text-sand-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-brand-500" /> Masuk
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-moss-500" /> Selesai
            </span>
          </div>
        </div>

        {/* Efisiensi */}
        <div className="grid gap-5">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-sand-950">Kecepatan penyelesaian</h2>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-sand-50 p-4">
                <p className="tnum font-display text-2xl font-semibold text-sand-950">{avgResolutionDays}</p>
                <p className="text-[10px] font-bold text-sand-500">Hari rata-rata selesai</p>
              </div>
              <div className="rounded-xl bg-sand-50 p-4">
                <p className="tnum font-display text-2xl font-semibold text-sand-950">11</p>
                <p className="text-[10px] font-bold text-sand-500">Hari tercepat</p>
              </div>
              <div className="rounded-xl bg-sand-50 p-4">
                <p className="tnum font-display text-2xl font-semibold text-sand-950">48</p>
                <p className="text-[10px] font-bold text-sand-500">Hari terlama</p>
              </div>
            </div>
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[11px] leading-relaxed text-brand-900">
              <Timer size={14} className="mt-0.5 shrink-0" />
              Kebutuhan yang hampir terpenuhi biasanya selesai dalam ≤ 7 hari setelah mencapai 80%.
            </p>
          </div>

          {/* Paling dicari & didukung */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sand-950">
                <Search size={15} className="text-brand-700" /> Paling banyak dicari
              </h3>
              <ul className="mt-3 space-y-2.5">
                {needsSearched.map((row) => {
                  const n = needById(row.id)
                  return (
                    <li key={row.id} className="flex items-center justify-between gap-2 text-xs">
                      <Link to={`/operations/kebutuhan/${row.id}`} className="min-w-0 truncate font-semibold text-sand-700 hover:text-brand-800">
                        {n?.title || row.id}
                      </Link>
                      <span className="tnum shrink-0 font-bold text-sand-500">{row.count}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="card p-5">
              <h3 className="flex items-center gap-2 text-sm font-bold text-sand-950">
                <HeartHandshake size={15} className="text-ember-600" /> Paling banyak didukung
              </h3>
              <ul className="mt-3 space-y-2.5">
                {needsSupported.map((row) => (
                  <li key={row.id} className="flex items-center justify-between gap-2 text-xs">
                    <Link to={`/operations/kebutuhan/${row.id}`} className="min-w-0 truncate font-semibold text-sand-700 hover:text-brand-800">
                      {needById(row.id)?.title || row.id}
                    </Link>
                    <span className="tnum shrink-0 font-bold text-sand-500">{row.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        {/* Wilayah */}
        <div className="card p-6">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-sand-950">
            <MapPinned size={17} className="text-brand-700" /> Wilayah dengan kebutuhan terbanyak
          </h2>
          <div className="mt-5 space-y-3.5">
            {byRegion.map(([region, count]) => (
              <div key={region}>
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-sand-700">{region}</span>
                  <span className="tnum text-sand-500">{count} kebutuhan</span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand-100">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(count / maxRegion) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="h-full rounded-full bg-brand-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hampir terpenuhi & stagnan */}
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-sand-950">Hampir terpenuhi — dorong sampai selesai</h2>
            <ul className="mt-4 divide-y divide-sand-100">
              {almostDone.map((n) => (
                <li key={n.id}>
                  <Link to={`/operations/kebutuhan/${n.id}`} className="flex items-center justify-between gap-3 py-2.5 text-xs first:pt-0 last:pb-0 hover:[&_span.t]:text-brand-800">
                    <span className="t min-w-0 flex-1 truncate font-semibold text-sand-700">{n.title}</span>
                    <span className="tnum shrink-0 rounded-full bg-brand-100 px-2 py-0.5 font-bold text-brand-800">
                      {pct(n.collected, n.target)}%
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-sand-950">
              <AlertTriangle size={16} className="text-ember-600" /> Kebutuhan stagnan (&lt; 40%)
            </h2>
            <ul className="mt-4 divide-y divide-sand-100">
              {stagnant.map((n) => (
                <li key={n.id}>
                  <Link to={`/operations/kebutuhan/${n.id}`} className="flex items-center justify-between gap-3 py-2.5 text-xs first:pt-0 last:pb-0">
                    <span className="min-w-0 flex-1 truncate font-semibold text-sand-700">{n.title}</span>
                    <span className="tnum shrink-0 rounded-full bg-ember-100 px-2 py-0.5 font-bold text-ember-800">
                      {pct(n.collected, n.target)}%
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Partisipasi ringkas */}
      <div className="card p-6">
        <h2 className="font-display text-lg font-semibold text-sand-950">Partisipasi</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Total partisipasi', value: formatID(participation.contributions) },
            { label: 'Rata-rata nominal', value: rupiah(participation.avgAmount) },
            { label: 'Orang terlibat', value: formatID(participation.people) },
            { label: 'Total dana', value: rupiah(participation.totalAmount).replace('Rp', 'Rp ') },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-sand-50 p-4 text-center">
              <p className="tnum font-display text-xl font-semibold text-sand-950">{s.value}</p>
              <p className="mt-0.5 text-[10px] font-bold text-sand-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
