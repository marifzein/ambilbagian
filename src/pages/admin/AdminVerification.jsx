import { useMemo, useState } from 'react'
import { Search, ShieldCheck, Clock3, AlertTriangle, XCircle, CheckCircle2, RefreshCcw } from 'lucide-react'
import { verificationQueue, partnerById } from '../../data/partners'
import { categoryById, verificationMeta, priorityMeta } from '../../data/categories'

const statusIcons = {
  menunggu: Clock3,
  proses: RefreshCcw,
  terverifikasi: CheckCircle2,
  perbaikan: AlertTriangle,
  ditolak: XCircle,
}

export default function AdminVerification() {
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('semua')

  const filtered = useMemo(
    () =>
      verificationQueue.filter(
        (v) =>
          (status === 'semua' || v.status === status) &&
          (!q.trim() || `${v.id} ${v.location} ${v.proposer}`.toLowerCase().includes(q.toLowerCase()))
      ),
    [q, status]
  )

  const counts = useMemo(() => {
    const c = { menunggu: 0, proses: 0, terverifikasi: 0, perbaikan: 0, ditolak: 0 }
    verificationQueue.forEach((v) => (c[v.status] += 1))
    return c
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Verifikasi</h1>
        <p className="mt-1 text-sm text-sand-500">
          Antrian kebutuhan masuk. Tidak ada kebutuhan yang bisa tampil ke publik sebelum lolos verifikasi lapangan.
        </p>
      </div>

      {/* Status chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setStatus('semua')}
          className={`rounded-full border px-4 py-1.5 text-xs font-bold ${
            status === 'semua' ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700'
          }`}
        >
          Semua · {verificationQueue.length}
        </button>
        {Object.entries(verificationMeta).map(([k, v]) => {
          const Icon = statusIcons[k]
          return (
            <button
              key={k}
              onClick={() => setStatus(k)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-bold ${
                status === k ? 'border-sand-950 bg-sand-950 text-white' : 'border-sand-200 bg-white text-sand-700'
              }`}
            >
              <Icon size={13} /> {v.label} · {counts[k]}
            </button>
          )
        })}
      </div>

      <div className="card p-4">
        <div className="relative max-w-md">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sand-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari ID, lokasi, atau pengusul…"
            className="w-full rounded-xl border border-sand-200 py-2.5 pl-10 pr-4 text-sm focus:border-moss-600 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((v) => {
          const cat = categoryById(v.category)
          const meta = verificationMeta[v.status]
          const Icon = statusIcons[v.status]
          return (
            <div key={v.id} className="card flex flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="tnum text-[11px] font-bold text-sand-400">{v.id} · masuk {v.submittedAt}</p>
                  <p className="mt-1 font-bold text-sand-950">{v.proposer}</p>
                  <p className="text-xs text-sand-500">
                    {cat.short} · {v.location}
                  </p>
                </div>
                <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${meta.tone}`}>
                  <Icon size={12} /> {meta.label}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                <span className={`rounded-full border px-2.5 py-0.5 ${priorityMeta[v.priority].tone}`}>
                  {priorityMeta[v.priority].label.replace('Prioritas ', '')}
                </span>
                <span className="tnum rounded-full bg-sand-100 px-2.5 py-0.5 text-sand-600">
                  {v.needRef !== '—' ? `Terkait ${v.needRef}` : 'Belum terbit'}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-dashed border-sand-200 pt-3.5 text-xs">
                <span className="text-sand-500">
                  Verifier: <strong className="font-bold text-sand-800">{v.verifier || 'belum ditugaskan'}</strong>
                </span>
                <ShieldCheck size={15} className={v.status === 'terverifikasi' ? 'text-moss-600' : 'text-sand-300'} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
