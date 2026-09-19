import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import {
  Inbox,
  Phone,
  Mail,
  MessageCircle,
  BellRing,
  ChevronDown,
  ChevronUp,
  Image as ImageIcon,
  BadgeCheck,
  Send,
  ClipboardCheck,
} from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'
import { categoryById } from '../../data/categories'
import { distributorPartners } from '../../data/partners'

const STATUS = {
  menunggu: { label: 'Menunggu Verifikasi', tone: 'bg-amber-100 text-amber-800 border-amber-200' },
  diverifikasi: { label: 'Diverifikasi', tone: 'bg-sky-100 text-sky-800 border-sky-200' },
  diteruskan: { label: 'Diteruskan ke Mitra', tone: 'bg-moss-100 text-moss-800 border-moss-200' },
}

function NotifButton({ icon: Icon, label, onClick }) {
  const [hit, setHit] = useState(false)
  return (
    <button
      onClick={() => {
        setHit(true)
        onClick()
      }}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-bold transition-all ${
        hit
          ? 'border-moss-300 bg-moss-50 text-moss-700'
          : 'border-sand-200 bg-white text-sand-700 hover:border-brand-300 hover:text-brand-700'
      }`}
    >
      <Icon size={13} />
      {hit ? 'Terkirim' : label}
    </button>
  )
}

export default function AdminPengajuan() {
  const { proposals, pushToast } = useApp()
  const [expanded, setExpanded] = useState(null)

  const stats = useMemo(() => {
    const waiting = proposals.filter((p) => p.status === 'menunggu').length
    const verified = proposals.filter((p) => p.status === 'diverifikasi').length
    const forwarded = proposals.filter((p) => p.status === 'diteruskan').length
    return { waiting, verified, forwarded }
  }, [proposals])

  const forward = (id) => {
    pushToast({
      title: 'Notifikasi mitra terkirim (simulasi)',
      message: 'Email + WhatsApp dikirim ke Lazismu, MDMC, dan PeduliMuslim.',
      tone: 'success',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Pengajuan Bantuan</h1>
        <p className="mt-1 text-sm text-sand-500">
          Pipeline pengajuan dari warga: verifikasi → teruskan ke mitra distributor → donasi dibuka.
        </p>
      </div>

      {/* Pipeline kecil */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Menunggu verifikasi', value: stats.waiting, tone: 'text-amber-700' },
          { label: 'Sedang diverifikasi', value: stats.verified, tone: 'text-sky-700' },
          { label: 'Diteruskan ke mitra', value: stats.forwarded, tone: 'text-moss-700' },
        ].map((s) => (
          <div key={s.label} className="card p-5">
            <p className={`tnum font-display text-3xl font-semibold ${s.tone}`}>{s.value}</p>
            <p className="mt-1 text-xs font-bold text-sand-600">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Daftar pengajuan */}
      <div className="space-y-4">
        {proposals.map((p) => {
          const cat = categoryById(p.category)
          const Icon = cat.icon
          const st = STATUS[p.status]
          const open = expanded === p.id
          return (
            <motion.div key={p.id} layout className="card overflow-hidden">
              <button
                onClick={() => setExpanded(open ? null : p.id)}
                className="flex w-full items-center gap-4 p-4 text-left transition-colors hover:bg-sand-50/60 sm:p-5"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  <Icon size={19} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="tnum rounded-full bg-sand-100 px-2 py-0.5 text-[10px] font-bold text-sand-600">
                      {p.id}
                    </span>
                    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${st.tone}`}>
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm font-bold text-sand-950">
                    {p.quantity} — {p.village}, {p.regency}
                  </p>
                  <p className="truncate text-xs text-sand-500">
                    {cat.name} · {p.name} · {p.receivers} · masuk {p.submittedAt}
                  </p>
                </div>
                {open ? (
                  <ChevronUp size={17} className="shrink-0 text-sand-400" />
                ) : (
                  <ChevronDown size={17} className="shrink-0 text-sand-400" />
                )}
              </button>

              {open && (
                <div className="border-t border-sand-100 bg-sand-50/50 p-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    {/* Detail */}
                    <div className="space-y-3 text-sm">
                      <p className="text-xs font-bold uppercase tracking-wider text-sand-400">Pengusul</p>
                      <ul className="space-y-1.5 text-sand-700">
                        <li className="flex items-center gap-2">
                          <Phone size={14} className="shrink-0 text-brand-600" /> {p.name} · {p.phone}
                        </li>
                        {p.nik && (
                          <li className="flex items-center gap-2">
                            <BadgeCheck size={14} className="shrink-0 text-brand-600" /> NIK {p.nik}
                          </li>
                        )}
                        <li className="flex items-center gap-2">
                          <ClipboardCheck size={14} className="shrink-0 text-brand-600" /> {p.receivers}
                        </li>
                      </ul>
                      <p className="rounded-xl bg-white p-3 text-xs leading-relaxed text-sand-600 border border-sand-100">
                        {p.notes}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.photoNames.map((f, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-semibold text-sand-700 border border-sand-200"
                          >
                            <ImageIcon size={12} className="text-brand-600" /> {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Notifikasi mitra */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-sand-400">
                        Notifikasi mitra distributor
                      </p>
                      {p.notified.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                          {p.notified.map((n, i) => (
                            <li
                              key={i}
                              className="flex items-center justify-between gap-3 rounded-xl bg-white px-3 py-2.5 text-xs border border-sand-100"
                            >
                              <span className="font-bold text-sand-900">{n.partner}</span>
                              <span className="inline-flex items-center gap-1.5 font-semibold text-moss-700">
                                <BellRing size={12} /> {n.channel} · {n.at}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 rounded-xl bg-white p-3 text-xs leading-relaxed text-sand-500 border border-sand-100">
                          Belum ada mitra yang dinotifikasi. Setelah verifikasi lapangan selesai, teruskan pengajuan
                          ini — mitra menerima email, WhatsApp, atau telepon, dan yang mengambil akan membuka donasi.
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-sand-500">Kirim ke:</span>
                        {distributorPartners.map((d) => (
                          <NotifButton
                            key={d.id}
                            icon={Mail}
                            label={d.name.split(' ')[0]}
                            onClick={() =>
                              pushToast({
                                title: `Notifikasi ke ${d.name} (simulasi)`,
                                message: 'Email berisi lokasi, jumlah penerima, kebutuhan, dan foto pengajuan.',
                                tone: 'success',
                              })
                            }
                          />
                        ))}
                        <NotifButton
                          icon={MessageCircle}
                          label="WA broadcast"
                          onClick={() =>
                            pushToast({ title: 'WA broadcast terkirim (simulasi)', message: 'Dikirim ke 3 mitra distributor aktif.', tone: 'success' })
                          }
                        />
                        <NotifButton
                          icon={Send}
                          label="Teruskan semua"
                          onClick={() => forward(p.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Penjelasan siklus */}
      <div className="card p-6">
        <p className="eyebrow">Alur setelah diteruskan</p>
        <div className="mt-4 grid gap-4 text-sm md:grid-cols-4">
          {[
            { n: '01', t: 'Mitra mengambil', d: 'Mitra yang menerima notifikasi mengonfirmasi kesediaan menjalankan distribusi.' },
            { n: '02', t: 'Donasi dibuka', d: 'Kebutuhan tayang publik dengan progress, jatuh tempo, dan bukti berkala.' },
            { n: '03', t: 'Jatuh tempo', d: 'Dana terkumpul ditransfer ke mitra distributor sesuai anggaran yang disetujui.' },
            { n: '04', t: 'Kurang dari 10%?', d: 'Donatur ditawari memilih: alihkan dana ke kebutuhan lain, atau ikut menutup kekurangannya.' },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl border border-sand-100 bg-sand-50/60 p-4">
              <p className="tnum font-display text-lg font-semibold text-brand-700">{s.n}</p>
              <p className="mt-1 font-bold text-sand-950">{s.t}</p>
              <p className="mt-1 text-xs leading-relaxed text-sand-600">{s.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-sand-500">
          <Inbox size={13} className="mt-0.5 shrink-0" />
          Nama mitra (Lazismu, MDMC, PeduliMuslim) adalah contoh prototype — bukan afiliasi resmi. Data pengusul tidak
          ditampilkan ke publik.
        </p>
      </div>
    </div>
  )
}
