import { Handshake, FileCheck2, Star, Activity } from 'lucide-react'
import { partners } from '../../data/partners'

export default function AdminPartners() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Mitra Pelaksana</h1>
        <p className="mt-1 text-sm text-sand-500">
          Fokus monitoring kualitas operasional — bukan ranking kompetitif. Nama pada prototype bersifat contoh
          ("Lazismu" hanya ilustrasi mitra, bukan afiliasi).
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((p) => (
          <div key={p.id} className="card flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-moss-700/10 text-moss-800">
                  <Handshake size={20} />
                </span>
                <div>
                  <p className="font-bold leading-snug text-sand-950">{p.name}</p>
                  <p className="text-xs text-sand-500">
                    {p.type} · {p.region}
                  </p>
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                  p.active ? 'bg-moss-100 text-moss-800' : 'bg-sand-100 text-sand-500'
                }`}
              >
                {p.active ? 'Aktif' : 'Nonaktif'}
              </span>
            </div>

            <div className="tnum mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-xl bg-sand-50 py-2.5">
                <p className="font-display text-lg font-semibold text-sand-950">{p.donePrograms}</p>
                <p className="text-[10px] font-bold text-sand-500">Selesai</p>
              </div>
              <div className="rounded-xl bg-sand-50 py-2.5">
                <p className="font-display text-lg font-semibold text-sand-950">{p.runningPrograms}</p>
                <p className="text-[10px] font-bold text-sand-500">Berjalan</p>
              </div>
              <div className="rounded-xl bg-sand-50 py-2.5">
                <p className="font-display text-lg font-semibold text-sand-950">{p.activePrograms}</p>
                <p className="text-[10px] font-bold text-sand-500">Total program</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-sand-600">
                  <FileCheck2 size={13} className="text-moss-600" /> Kepatuhan laporan
                </span>
                <span className="tnum font-bold text-sand-950">{p.reportCompliance}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-sand-100">
                <div className="h-full rounded-full bg-moss-600" style={{ width: `${p.reportCompliance}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-semibold text-sand-600">
                  <Star size={13} className="text-ember-500" /> Rating dokumentasi (internal)
                </span>
                <span className="tnum font-bold text-sand-950">{p.docsRating.toFixed(1)}/5,0</span>
              </div>
            </div>

            {p.note && (
              <p className="mt-4 rounded-xl border border-dashed border-sand-300 bg-sand-50 p-3 text-[11px] leading-relaxed text-sand-500">
                {p.note}
              </p>
            )}
            <p className="mt-auto flex items-center gap-1.5 pt-3 text-[10px] font-bold uppercase tracking-wider text-sand-400">
              <Activity size={11} /> Pemantauan kualitas operasional
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
