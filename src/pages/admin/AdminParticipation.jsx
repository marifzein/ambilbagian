import { motion } from 'framer-motion'
import { Users, HeartHandshake, Wallet, Calculator } from 'lucide-react'
import { participation } from '../../data/partners'
import { categoryById } from '../../data/categories'
import { formatID, rupiah, rupiahShort } from '../../utils/format'
import { useApp } from '../../store/AppContext.jsx'

export default function AdminParticipation() {
  const { participation: live } = useApp()
  const p = live || participation
  const maxTrend = Math.max(...p.trend)
  const maxCat = Math.max(...p.byCategory.map((c) => c.count))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Partisipasi</h1>
        <p className="mt-1 text-sm text-sand-500">
          Agregat partisipasi tanpa data pribadi sensitif. Angka live berubah saat ada simulasi bantuan dari situs publik.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          { icon: Users, label: 'Orang ikut ambil bagian', value: formatID(p.people) },
          { icon: HeartHandshake, label: 'Jumlah partisipasi', value: formatID(p.contributions) },
          { icon: Wallet, label: 'Total nominal bantuan', value: rupiahShort(p.totalAmount) },
          { icon: Calculator, label: 'Rata-rata nominal', value: rupiah(p.avgAmount) },
        ].map((k) => (
          <div key={k.label} className="card p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-moss-700/10 text-moss-800">
              <k.icon size={18} />
            </span>
            <p className="tnum mt-3 font-display text-2xl font-semibold text-sand-950">{k.value}</p>
            <p className="mt-0.5 text-xs font-bold text-sand-600">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        {/* Distribusi kategori */}
        <div className="card p-6">
          <h2 className="font-display text-lg font-semibold text-sand-950">Distribusi per kategori</h2>
          <div className="mt-5 space-y-4">
            {p.byCategory.map((row) => {
              const cat = categoryById(row.id)
              return (
                <div key={row.id}>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-sand-700">{cat?.name || row.id}</span>
                    <span className="tnum text-sand-500">{formatID(row.count)} partisipasi</span>
                  </div>
                  <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sand-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(row.count / maxCat) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: cat?.color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
          <p className="mt-5 rounded-xl bg-sand-50 p-3 text-[11px] leading-relaxed text-sand-500">
            Kategori Kesehatan belum tampil di distribusi karena layanan belum aktif — Segera Hadir.
          </p>
        </div>

        {/* Trend + feed */}
        <div className="space-y-5">
          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-sand-950">Trend partisipasi per minggu</h2>
            <div className="mt-5 flex h-36 items-end gap-2.5">
              {p.trend.map((v, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
                  <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / maxTrend) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05 }}
                    className="w-full max-w-[30px] rounded-t-md bg-moss-600"
                    title={`${formatID(v)} partisipasi`}
                  />
                  <span className="tnum text-[10px] font-bold text-sand-400">{formatID(v)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <h2 className="font-display text-lg font-semibold text-sand-950">Partisipasi terbaru (teranonymisasi)</h2>
            <ul className="mt-4 divide-y divide-sand-100">
              {p.recent.map((r, i) => (
                <li key={i} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-moss-100 text-[11px] font-bold text-moss-800">
                    {r.initials}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-sand-900">
                      {r.initials} · {r.city}{' '}
                      <span className="tnum font-semibold text-moss-700">+{rupiah(r.amount)}</span>
                    </p>
                    <p className="tnum text-[11px] text-sand-500">
                      {r.need} · {r.at}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
