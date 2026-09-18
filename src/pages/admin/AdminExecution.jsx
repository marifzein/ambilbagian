import { Link } from 'react-router-dom'
import { Clock3, Camera, ArrowUpRight, Truck } from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { partnerById } from '../../data/partners'
import { categoryById, statusMeta } from '../../data/categories'
import { pct } from '../../utils/format'

export default function AdminExecution() {
  const { needs } = useApp()
  const running = needs.filter((n) => n.execution && n.status !== 'selesai')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Pelaksanaan</h1>
        <p className="mt-1 text-sm text-sand-500">
          Kebutuhan yang sedang dieksekusi di lapangan oleh mitra pelaksana.
        </p>
      </div>

      {running.length === 0 && (
        <div className="card p-12 text-center text-sm text-sand-500">Tidak ada pelaksanaan aktif saat ini.</div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {running.map((n) => {
          const cat = categoryById(n.category)
          const partner = partnerById(n.partner)
          const status = statusMeta[n.status]
          return (
            <div key={n.id} className="card overflow-hidden">
              <div className="flex items-center gap-4 border-b border-sand-100 p-5">
                <img src={n.media[0]?.url || cat.image} alt="" loading="lazy" className="h-16 w-20 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: cat.color }}>{cat.name}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${status.tone}`}>{status.label}</span>
                  </div>
                  <Link to={`/operations/kebutuhan/${n.id}`} className="mt-0.5 block truncate font-bold text-sand-950 hover:text-moss-800">
                    {n.title}
                  </Link>
                  <p className="text-xs text-sand-500">{n.location.village}, {n.location.regency}</p>
                </div>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sand-400">Mitra pelaksana</p>
                  <p className="mt-1 text-sm font-bold text-sand-950">{partner?.name || 'Menunggu penugasan'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-sand-400">Status lapangan</p>
                  <p className="mt-1 text-sm font-bold text-sand-950">{n.execution.progressLabel}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-700">
                    <Clock3 size={14} className="text-ember-600" /> ETA {n.execution.etaDays} hari
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-sand-700">
                    <Camera size={14} className="text-moss-600" /> {n.execution.photoCount} foto
                  </span>
                </div>
                <div className="sm:text-right">
                  <span className="tnum text-sm font-bold text-moss-700">{pct(n.collected, n.target)}% terpenuhi</span>
                </div>
                <div className="sm:col-span-2">
                  <div className="h-2 overflow-hidden rounded-full bg-sand-100">
                    <div className="h-full rounded-full bg-moss-600 transition-all" style={{ width: `${pct(n.collected, n.target)}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-sand-100 bg-sand-50/60 px-5 py-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sand-500">
                  <Truck size={13} /> Dana distribusi & operasional tampil terbuka di laporan
                </span>
                <Link to={`/operations/kebutuhan/${n.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-moss-700 hover:underline">
                  Detail internal <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
