import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, ArrowUpRight, Plus } from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { categories, statusMeta, priorityMeta } from '../../data/categories'
import { pct } from '../../utils/format'

export default function AdminNeeds() {
  const { needs } = useApp()
  const [params] = useSearchParams()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState(params.get('status') || 'semua')
  const [cat, setCat] = useState('semua')

  const filtered = useMemo(
    () =>
      needs.filter(
        (n) =>
          (status === 'semua' || n.status === status) &&
          (cat === 'semua' || n.category === cat) &&
          (!q.trim() ||
            `${n.id} ${n.title} ${n.location.village} ${n.location.regency}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [needs, q, status, cat]
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Kebutuhan</h1>
          <p className="mt-1 text-sm text-sand-500">{needs.length} kebutuhan terdata — klik baris untuk detail internal.</p>
        </div>
        <button className="btn-primary" disabled title="Tidak tersedia pada prototype">
          <Plus size={16} /> Tambah kebutuhan
        </button>
      </div>

      <div className="card p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari ID, judul, desa, atau kota…"
              className="w-full rounded-xl border border-sand-200 py-2.5 pl-10 pr-4 text-sm focus:border-brand-600 focus:outline-none"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-xl border border-sand-200 px-3.5 py-2.5 text-sm font-semibold text-sand-700 focus:outline-none"
          >
            <option value="semua">Semua kategori</option>
            {categories.filter((c) => c.active).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-sand-200 px-3.5 py-2.5 text-sm font-semibold text-sand-700 focus:outline-none"
          >
            <option value="semua">Semua status</option>
            {Object.entries(statusMeta).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px] text-left text-sm">
            <thead>
              <tr className="border-b border-sand-200 bg-sand-50 text-[11px] font-bold uppercase tracking-wider text-sand-500">
                <th className="px-5 py-3.5">Kebutuhan</th>
                <th className="px-3 py-3.5">Kategori</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-3 py-3.5">Prioritas</th>
                <th className="px-3 py-3.5">Progress</th>
                <th className="px-5 py-3.5"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filtered.map((n) => {
                const catObj = categories.find((c) => c.id === n.category)
                const percent = pct(n.collected, n.target)
                return (
                  <tr key={n.id} className="group transition-colors hover:bg-sand-50">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img src={n.media[0]?.url || catObj.image} alt="" loading="lazy" className="h-10 w-14 shrink-0 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <p className="tnum text-[11px] font-bold text-sand-400">{n.id}</p>
                          <Link to={`/operations/kebutuhan/${n.id}`} className="block max-w-[340px] truncate font-bold text-sand-950 group-hover:text-brand-800">
                            {n.title}
                          </Link>
                          <p className="text-xs text-sand-500">{n.location.village}, {n.location.regency}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className="text-xs font-bold" style={{ color: catObj.color }}>{catObj.short}</span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusMeta[n.status].tone}`}>
                        {statusMeta[n.status].label}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${priorityMeta[n.priority].tone}`}>
                        {priorityMeta[n.priority].label.replace('Prioritas ', '')}
                      </span>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="w-32">
                        <div className="h-1.5 overflow-hidden rounded-full bg-sand-100">
                          <div className="h-full rounded-full bg-brand-600" style={{ width: `${percent}%` }} />
                        </div>
                        <p className="tnum mt-1 text-[11px] font-bold text-sand-500">{percent}%</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        to={`/operations/kebutuhan/${n.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-brand-700 hover:underline"
                      >
                        Detail <ArrowUpRight size={13} />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className="p-10 text-center text-sm text-sand-500">Tidak ada kebutuhan yang cocok dengan filter.</p>
        )}
      </div>
    </div>
  )
}
