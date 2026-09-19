import { useMemo, useState } from 'react'
import { Filter, MapPinned } from 'lucide-react'
import { categories, statusMeta } from '../data/categories'
import { useApp } from '../store/AppContext.jsx'
import NeedsMap from '../components/NeedsMap.jsx'

export default function MapPage() {
  const { needs } = useApp()
  const [cat, setCat] = useState('semua')
  const [status, setStatus] = useState('semua')

  const items = useMemo(
    () =>
      needs.filter((n) => (cat === 'semua' || n.category === cat) && (status === 'semua' || n.status === status)),
    [needs, cat, status]
  )

  return (
    <div className="container-app py-10 md:py-14">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="eyebrow">Peta Kebaikan</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-sand-950">
            Kebutuhan nyata, di titik yang nyata
          </h1>
          <p className="mt-3 text-sand-600">
            Klik titik di peta untuk melihat kebutuhan, progress, dan berapa yang masih kurang. Titik dikelompokkan
            otomatis saat zoom jauh.
          </p>
        </div>
        <p className="tnum flex items-center gap-2 rounded-full border border-sand-200 bg-white px-4 py-2 text-sm font-bold text-sand-700 shadow-soft">
          <MapPinned size={16} className="text-brand-700" />
          {items.length} titik kebutuhan
        </p>
      </header>

      {/* Filter kategori & status */}
      <div className="mt-7 flex flex-wrap items-center gap-2">
        <span className="mr-1 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-sand-500">
          <Filter size={13} /> Kategori
        </span>
        <div className="nice-scroll flex gap-2 overflow-x-auto pb-1">
          {categories.map((c) => {
            const Icon = c.icon
            const isOff = !c.active
            return (
              <button
                key={c.id}
                disabled={isOff}
                onClick={() => setCat(c.id)}
                className={`${'shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all'} ${
                  cat === c.id
                    ? 'border-transparent text-white'
                    : isOff
                      ? 'cursor-not-allowed border-sand-200 bg-sand-100 text-sand-400'
                      : 'cursor-pointer border-sand-200 bg-white text-sand-700 hover:border-sand-300'
                }`}
                style={cat === c.id ? { backgroundColor: c.color } : {}}
                title={isOff ? 'Segera hadir' : undefined}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Icon size={13} /> {c.short}
                  {isOff && <span className="font-semibold opacity-70">· Segera Hadir</span>}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-bold uppercase tracking-wider text-sand-500">Status</span>
        <button
          onClick={() => setStatus('semua')}
          className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
            status === 'semua' ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700'
          }`}
        >
          Semua
        </button>
        {Object.entries(statusMeta).map(([k, v]) => (
          <button
            key={k}
            onClick={() => setStatus(k)}
            className={`rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all ${
              status === k ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700'
            }`}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div className="mt-7">
        <NeedsMap items={items} height="h-[440px] md:h-[560px]" />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-sand-600">
        {categories
          .filter((c) => c.active)
          .map((c) => (
            <span key={c.id} className="inline-flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
            </span>
          ))}
      </div>
    </div>
  )
}
