import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  X,
  UserRound,
  ClipboardList,
  Camera,
  CheckCircle2,
  ChevronLeft,
  Send,
  ShieldCheck,
  BellRing,
  Info,
  ImagePlus,
} from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { categories } from '../data/categories'

const STEPS = [
  { id: 1, label: 'Verifikasi', icon: UserRound },
  { id: 2, label: 'Kebutuhan', icon: ClipboardList },
  { id: 3, label: 'Foto & Kirim', icon: Camera },
]

const FIELD =
  'w-full rounded-xl border border-sand-200 bg-white px-3.5 py-2.5 text-sm font-medium text-sand-900 placeholder:font-normal placeholder:text-sand-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15'

export default function ProposalModal({ open, onClose, presetCategory = null }) {
  const { addProposal } = useApp()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', nik: '', category: 'beras', receivers: '', quantity: '', notes: '' })
  const [photos, setPhotos] = useState([])
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    if (open) {
      setStep(1)
      setDone(false)
      setTouched(false)
      setPhotos([])
      setForm((f) => ({ ...f, category: presetCategory || 'beras' }))
    }
  }, [open, presetCategory])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const phoneOk = /^(\+62|62|0)8\d{7,12}$/.test(form.phone.replace(/[\s-]/g, ''))
  const step1Ok = form.name.trim().length >= 3 && phoneOk
  const step2Ok =
    form.receivers.trim().length >= 2 &&
    form.quantity.trim().length >= 2 &&
    (form.village || '').trim().length >= 2 &&
    (form.regency || '').trim().length >= 2
  const stepValid = step === 1 ? step1Ok : step === 2 ? step2Ok : true

  const activeCats = useMemo(() => categories.filter((c) => c.active), [])

  const submit = () => {
    addProposal({
      category: form.category,
      name: form.name.trim(),
      phone: form.phone.trim(),
      nik: form.nik.trim() ? `••••••••${form.nik.replace(/\D/g, '').slice(-4)}` : null,
      village: form.village?.trim() || '—',
      regency: form.regency?.trim() || '—',
      receivers: form.receivers.trim(),
      quantity: form.quantity.trim(),
      notes: form.notes.trim(),
      photoNames: photos.map((p) => p.name),
    })
    setDone(true)
  }

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-end justify-center bg-sand-950/45 backdrop-blur-[3px] sm:items-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
          >
            {/* Header modal */}
            <div className="flex items-center justify-between gap-3 border-b border-sand-100 px-6 py-4">
              <div className="flex items-center gap-2.5">
                {!done && step > 1 && (
                  <button
                    onClick={() => setStep((s) => s - 1)}
                    className="grid h-8 w-8 place-items-center rounded-full border border-sand-200 text-sand-600 transition-colors hover:bg-sand-50"
                    aria-label="Langkah sebelumnya"
                  >
                    <ChevronLeft size={16} />
                  </button>
                )}
                <div>
                  <p className="text-sm font-bold text-sand-950">Pengajuan Bantuan</p>
                  {!done && (
                    <p className="text-[11px] font-semibold text-sand-500">
                      Langkah {step} dari 3 — {STEPS[step - 1].label}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Tutup"
                className="grid h-9 w-9 place-items-center rounded-full bg-sand-100 text-sand-700 transition-transform hover:scale-105"
              >
                <X size={16} />
              </button>
            </div>

            {!done && (
              <div className="flex gap-1.5 px-6 pt-3">
                {STEPS.map((s) => (
                  <span
                    key={s.id}
                    className={`h-1.5 flex-1 rounded-full ${s.id <= step ? 'bg-brand-600' : 'bg-sand-200'}`}
                  />
                ))}
              </div>
            )}

            <div className="nice-scroll flex-1 overflow-y-auto px-6 py-5">
              {done ? (
                <div className="flex flex-col items-center py-6 text-center">
                  <motion.span
                    initial={{ scale: 0.6, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                    className="grid h-16 w-16 place-items-center rounded-full bg-moss-100 text-moss-700"
                  >
                    <CheckCircle2 size={30} />
                  </motion.span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-sand-950">Pengajuan terkirim</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-sand-600">
                    Terima kasih. Tim verifikasi akan meninjau dan menghubungi kamu lewat WhatsApp
                    {' '}<span className="font-bold text-sand-900">{form.phone}</span> maksimal 3 hari kerja.
                  </p>
                  <div className="mt-6 w-full max-w-sm space-y-2.5 rounded-2xl border border-sand-200 bg-sand-50 p-4 text-left text-xs leading-relaxed text-sand-600">
                    <p className="flex items-start gap-2">
                      <BellRing size={14} className="mt-0.5 shrink-0 text-brand-600" />
                      Setelah lolos verifikasi, pengajuanmu diteruskan ke mitra distributor (Lazismu, MDMC,
                      PeduliMuslim, dan lainnya) lewat email, WhatsApp, atau telepon.
                    </p>
                    <p className="flex items-start gap-2">
                      <ShieldCheck size={14} className="mt-0.5 shrink-0 text-brand-600" />
                      Begitu ada mitra yang mengambil, donasi dibuka dan progressnya bisa dipantau di sini.
                    </p>
                  </div>
                  <button onClick={onClose} className="btn-primary mt-6">
                    Tutup
                  </button>
                </div>
              ) : step === 1 ? (
                /* ============ LANGKAH 1: VERIFIKASI ============ */
                <div className="space-y-4">
                  <p className="text-sm leading-relaxed text-sand-600">
                    Kenalan dulu, ya. Data ini dipakai tim verifikasi untuk menghubungi kamu.
                  </p>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">Nama lengkap *</label>
                    <input value={form.name} onChange={set('name')} placeholder="cth. Supardi" className={FIELD} />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">Nomor WhatsApp / HP *</label>
                    <input
                      value={form.phone}
                      onChange={set('phone')}
                      placeholder="cth. 0812 3456 7890"
                      inputMode="tel"
                      className={FIELD}
                    />
                    {touched && !phoneOk && form.phone && (
                      <p className="mt-1 text-[11px] font-semibold text-ember-600">Format nomor belum benar.</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">
                      NIK <span className="font-medium text-sand-400">(opsional)</span>
                    </label>
                    <input
                      value={form.nik}
                      onChange={set('nik')}
                      placeholder="16 digit — mempercepat verifikasi"
                      inputMode="numeric"
                      className={FIELD}
                    />
                    <p className="mt-1 text-[11px] text-sand-400">
                      Hanya 4 digit terakhir yang tampil di sistem. Boleh dikosongkan.
                    </p>
                  </div>
                  <p className="rounded-xl bg-sand-50 p-3 text-[11px] leading-relaxed text-sand-500">
                    Data kamu hanya dipakai untuk verifikasi pengajuan ini dan tidak dibagikan ke publik.
                  </p>
                </div>
              ) : step === 2 ? (
                /* ============ LANGKAH 2: DETAIL KEBUTUHAN ============ */
                <div className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">Layanan yang diajukan *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {activeCats.map((c) => {
                        const Icon = c.icon
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => setForm((f) => ({ ...f, category: c.id }))}
                            className={`flex flex-col items-center gap-1.5 rounded-xl border px-2 py-3 text-[11px] font-bold transition-all ${
                              form.category === c.id
                                ? 'border-brand-600 bg-brand-50 text-brand-800'
                                : 'border-sand-200 text-sand-600 hover:border-sand-300'
                            }`}
                          >
                            <Icon size={17} style={{ color: c.color }} />
                            {c.short}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-sand-700">Desa / Dusun *</label>
                      <input value={form.village || ''} onChange={set('village')} placeholder="cth. Dusun Jetak" className={FIELD} />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-bold text-sand-700">Kabupaten / Kota *</label>
                      <input value={form.regency || ''} onChange={set('regency')} placeholder="cth. Bojonegoro" className={FIELD} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">
                      Berapa warga / KK yang terdampak? *
                    </label>
                    <input
                      value={form.receivers}
                      onChange={set('receivers')}
                      placeholder="cth. 87 KK (±340 warga)"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">
                      Berapa kebutuhannya? *
                    </label>
                    <input
                      value={form.quantity}
                      onChange={set('quantity')}
                      placeholder={form.category === 'beras' ? 'cth. ±2,5 ton beras' : 'cth. 40 paket sembako'}
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-bold text-sand-700">Ceritakan kondisinya</label>
                    <textarea
                      value={form.notes}
                      onChange={set('notes')}
                      rows={3}
                      placeholder="cth. Panen gagal karena kemarau panjang; mayoritas warga buruh tani."
                      className={`${FIELD} resize-none`}
                    />
                  </div>
                </div>
              ) : (
                /* ============ LANGKAH 3: FOTO & KIRIM ============ */
                <div className="space-y-4">
                  <label className="flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 border-dashed border-sand-300 bg-sand-50 p-6 text-center transition-colors hover:border-brand-400 hover:bg-brand-50/50">
                    <ImagePlus size={26} className="text-brand-600" />
                    <span className="text-sm font-bold text-sand-800">Unggah foto lokasi / warga</span>
                    <span className="text-[11px] text-sand-500">
                      Foto membantu verifikasi lebih cepat — bisa lebih dari satu
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={(e) => setPhotos(Array.from(e.target.files || []))}
                    />
                  </label>
                  {photos.length > 0 && (
                    <div className="space-y-1.5">
                      {photos.map((p, i) => (
                        <p
                          key={i}
                          className="flex items-center gap-2 rounded-lg bg-sand-50 px-3 py-2 text-xs font-semibold text-sand-700"
                        >
                          <ImagePlus size={13} className="shrink-0 text-brand-600" />
                          <span className="truncate">{p.name}</span>
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="rounded-2xl border border-sand-200 p-4 text-sm">
                    <p className="text-xs font-bold uppercase tracking-wider text-sand-400">Ringkasan</p>
                    <ul className="mt-2 space-y-1 text-sand-700">
                      <li>
                        <span className="font-bold">{form.name}</span> · {form.phone}
                      </li>
                      <li>
                        {form.village || '—'}, {form.regency || '—'}
                      </li>
                      <li>{form.receivers} · {form.quantity}</li>
                    </ul>
                  </div>

                  <p className="flex items-start gap-2 rounded-xl bg-brand-50 p-3 text-[11px] leading-relaxed text-brand-900">
                    <Info size={14} className="mt-0.5 shrink-0" />
                    Setelah dikirim: tim verifikasi meninjau → pengajuan diteruskan ke mitra distributor →
                    donasi dibuka → dana dicairkan ke mitra saat jatuh tempo.
                  </p>
                </div>
              )}
            </div>

            {!done && (
              <div className="border-t border-sand-100 px-6 py-4">
                <button
                  onClick={() => (step < 3 ? (setTouched(true), stepValid && setStep(step + 1)) : submit())}
                  disabled={!stepValid}
                  className="btn-primary btn-lg w-full"
                >
                  {step < 3 ? (
                    <>
                      Lanjut <Send size={16} />
                    </>
                  ) : (
                    <>
                      Kirim Pengajuan <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
