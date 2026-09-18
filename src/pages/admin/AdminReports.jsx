import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ImageOff, Receipt } from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { categoryById } from '../../data/categories'
import MediaCarousel from '../../components/ui/MediaCarousel.jsx'
import { formatDate } from '../../utils/format'

const FILTERS = [
  { id: 'semua', label: 'Semua bukti' },
  { id: 'photo', label: 'Foto dokumentasi' },
  { id: 'receipt', label: 'Nota / invoice' },
  { id: 'note', label: 'Catatan distribusi' },
]

export default function AdminReports() {
  const { needs } = useApp()
  const [filter, setFilter] = useState('semua')
  const [activeNeedId, setActiveNeedId] = useState(null)

  /** Kumpulkan semua bukti dengan konteks kebutuhannya */
  const all = useMemo(
    () =>
      needs
        .filter((n) => n.evidence.length > 0)
        .flatMap((n) => n.evidence.map((ev) => ({ need: n, ev }))),
    [needs]
  )

  const photos = all.filter((x) => x.ev.type === 'photo' || !x.ev.type)
  const selected = needs.find((n) => n.id === activeNeedId)
  const selectedCat = selected ? categoryById(selected.category) : null

  const filtered = filter === 'semua' ? all : all.filter((x) => x.ev.type === filter)
  const counts = {
    semua: all.length,
    photo: photos.length,
    receipt: all.filter((x) => x.ev.type === 'receipt').length,
    note: all.filter((x) => x.ev.type === 'note').length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Laporan & Bukti</h1>
        <p className="mt-1 text-sm text-sand-500">
          Bukti pelaksanaan dari lapangan: foto, video, nota, dan catatan distribusi — melekat pada kebutuhannya.
        </p>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full border px-4 py-1.5 text-xs font-bold transition-colors ${
              filter === f.id ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700 hover:border-sand-300'
            }`}
          >
            {f.label} · {counts[f.id]}
          </button>
        ))}
      </div>

      {/* Galeri foto dokumentasi */}
      {(filter === 'semua' || filter === 'photo') && photos.length > 0 && (
        <div className="card overflow-hidden">
          <div className="flex items-center justify-between border-b border-sand-100 px-5 py-4">
            <h2 className="font-display text-lg font-semibold text-sand-950">Galeri dokumentasi lapangan</h2>
            <span className="text-xs font-bold text-sand-500">Klik foto untuk membuka program terkait</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map(({ need, ev }, i) => (
              <motion.button
                key={need.id + i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 8) * 0.03 }}
                onClick={() => setActiveNeedId(need.id)}
                className="group relative aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={ev.url}
                  alt={ev.caption}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 truncate bg-gradient-to-t from-sand-950/80 to-transparent p-2 pt-6 text-left text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {ev.caption}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Dokumen */}
      {filter !== 'photo' && (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered
            .filter((x) => x.ev.type !== 'photo')
            .map(({ need, ev }, i) => (
              <div key={need.id + i} className="card flex items-start gap-3.5 p-5">
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${
                    ev.type === 'receipt' ? 'bg-ember-500/10 text-ember-700' : 'bg-sky-500/10 text-sky-700'
                  }`}
                >
                  {ev.type === 'receipt' ? <Receipt size={19} /> : <FileText size={19} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold leading-snug text-sand-950">{ev.label}</p>
                  <p className="tnum mt-0.5 text-xs font-semibold text-sand-500">
                    {ev.ref} · {formatDate(need.updatedAt)}
                  </p>
                  <p className="mt-1.5 text-xs text-sand-500">
                    {need.title} — {need.location.village}
                  </p>
                </div>
              </div>
            ))}
          {filtered.filter((x) => x.ev.type !== 'photo').length === 0 && (
            <div className="card col-span-full p-12 text-center text-sm text-sand-500">
              <ImageOff size={22} className="mx-auto mb-2 text-sand-300" />
              Belum ada dokumen pada filter ini.
            </div>
          )}
        </div>
      )}

      {/* Modal galeri kebutuhan */}
      {selected && (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-sand-950/50 p-4 backdrop-blur-[3px]"
          onClick={() => setActiveNeedId(null)}
        >
          <div className="card w-full max-w-2xl overflow-hidden p-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-sand-100 px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider" style={{ color: selectedCat.color }}>
                  {selectedCat.name} · {selected.id}
                </p>
                <p className="mt-0.5 max-w-md truncate font-bold text-sand-950">{selected.title}</p>
              </div>
              <button onClick={() => setActiveNeedId(null)} className="text-xs font-bold text-sand-500 hover:text-sand-800">
                Tutup
              </button>
            </div>
            <div className="p-5">
              <MediaCarousel media={selected.evidence} aspect="aspect-[16/9]" />
              <p className="mt-3 text-xs leading-relaxed text-sand-500">
                Dokumentasi {selected.execution?.photoCount || selected.evidence.length} foto/video — pelaksana:{' '}
                <strong className="font-bold text-sand-700">{selected.partner ? 'Mitra terkait' : 'menunggu penugasan'}</strong>.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
