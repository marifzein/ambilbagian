import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { categories, statusMeta } from '../data/categories'
import { useApp } from '../store/AppContext.jsx'
import NeedCard from '../components/NeedCard.jsx'
import { pct } from '../utils/format'

const SORTS = [
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'progress', label: 'Paling hampir terpenuhi' },
  { id: 'kekurangan', label: 'Kekurangan terbesar' },
  { id: 'populer', label: 'Paling banyak dicari' },
]

const chipBase =
  'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer'

export default function NeedsPage() {
  const { needs } = useApp()
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState(null)
  const [regency, setRegency] = useState(null)
  const [sort, setSort] = useState('terbaru')

  const category = params.get('kategori')

  const setCategory = (id) => {
    const next = new URLSearchParams(params)
    if (!id || id === category) next.delete('kategori')
    else next.set('kategori', id)
    setParams(next, { replace: true })
  }

  const regencies = useMemo(() => [...new Set(needs.map((n) => n.location.regency))].sort(), [needs])

  const filtered = useMemo(() => {
    let list = [...needs]
    if (category && category !== 'kesehatan') list = list.filter((n) => n.category === category)
    if (status) list = list.filter((n) => n.status === status)
    if (regency) list = list.filter((n) => n.location.regency === regency)
    if (q.trim()) {
      const needle = q.trim().toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(needle) ||
          n.location.village.toLowerCase().includes(needle) ||
          n.location.regency.toLowerCase().includes(needle) ||
          n.summary.toLowerCase().includes(needle)
      )
    }
    switch (sort) {
      case 'progress':
        list.sort((a, b) => pct(b.collected, b.target) - pct(a.collected, a.target))
        break
      case 'kekurangan':
        list.sort((a, b) => b.target - b.collected - (a.target - a.collected))
        break
      case 'populer':
        list.sort((a, b) => b.searchCount - a.searchCount)
        break
      default:
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    }
    return list
  }, [needs, category, status, regency, q, sort])

  const activeChips = [
    category && { label: `Kategori: ${categories.find((c) => c.id === category)?.name}`, clear: () => setCategory(category) },
    status && { label: `Status: ${statusMeta[status].label}`, clear: () => setStatus(null) },
    regency && { label: `Wilayah: ${regency}`, clear: () => setRegency(null) },
  ].filter(Boolean)

  return (
    <div className="container-app py-10 md:py-14">
      <header className="max-w-2xl">
        <p className="eyebrow">Daftar Kebutuhan</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-sand-950">
          Semua kebutuhan yang terverifikasi
        </h1>
        <p className="mt-3 text-sand-600">
          Cari berdasarkan lokasi atau kebutuhan. Setiap kartu menunjukkan progress terkini — kamu bisa mulai dari yang
          paling hampir terpenuhi.
        </p>
      </header>

      {/* Filter bar */}
      <div className="sticky top-16 z-30 -mx-4 mt-8 border-y border-sand-200/70 bg-sand-50/90 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari kebutuhan, desa, atau kota…"
              className="w-full rounded-full border border-sand-200 bg-white py-2.5 pl-10 pr-4 text-sm text-sand-900 placeholder:text-sand-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
            />
          </div>
          <div className="nice-scroll flex items-center gap-2 overflow-x-auto pb-0.5">
            {categories
              .filter((c) => c.active)
              .map((c) => {
                const Icon = c.icon
                return (
                  <button
                    key={c.id}
                    onClick={() => setCategory(c.id)}
                    className={`${chipBase} inline-flex items-center gap-1.5 ${
                      category === c.id ? 'border-transparent text-white' : 'border-sand-200 bg-white text-sand-700 hover:border-sand-300'
                    }`}
                    style={category === c.id ? { backgroundColor: c.color } : {}}
                  >
                    <Icon size={13} /> {c.short}
                  </button>
                )
              })}
            <span className="mx-1 h-5 w-px shrink-0 bg-sand-200" />
            <select
              value={regency || ''}
              onChange={(e) => setRegency(e.target.value || null)}
              className="shrink-0 rounded-full border border-sand-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sand-700 focus:outline-none"
            >
              <option value="">Semua wilayah</option>
              {regencies.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            <select
              value={status || ''}
              onChange={(e) => setStatus(e.target.value || null)}
              className="shrink-0 rounded-full border border-sand-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sand-700 focus:outline-none"
            >
              <option value="">Semua status</option>
              {Object.entries(statusMeta).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="shrink-0 rounded-full border border-sand-200 bg-white px-3.5 py-1.5 text-xs font-bold text-sand-700 focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>
        {activeChips.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <SlidersHorizontal size={13} className="text-sand-400" />
            {activeChips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.clear}
                className="inline-flex items-center gap-1 rounded-full bg-brand-700/10 px-3 py-1 text-xs font-bold text-brand-800 hover:bg-brand-700/15"
              >
                {chip.label} <X size={12} />
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="tnum mt-6 text-sm font-semibold text-sand-500">
        {filtered.length} kebutuhan ditemukan
      </p>

      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <NeedCard key={n.id} need={n} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-6 rounded-2xl border border-dashed border-sand-300 bg-white p-12 text-center">
          <p className="font-display text-xl font-semibold text-sand-800">Belum ada yang cocok</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-sand-500">
            Coba ubah kata kunci atau hapus filter. Kebutuhan baru masuk setiap minggu — kembali lagi nanti, ya.
          </p>
        </div>
      )}
    </div>
  )
}
