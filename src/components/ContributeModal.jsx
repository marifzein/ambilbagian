import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, HeartHandshake, PartyPopper, ShieldCheck } from 'lucide-react'
import { useApp } from '../store/AppContext.jsx'
import { rupiah } from '../utils/format'
import { categoryById } from '../data/categories'

const NOMINALS = [10000, 25000, 50000, 100000, 250000]

/**
 * Modal "Ambil Bagian" — simulasi kontribusi.
 * Versi API nyata: submit → POST /needs/:id/contributions → refetch progress.
 */
export default function ContributeModal({ need, open, onClose }) {
  const { contribute } = useApp()
  const [amount, setAmount] = useState(25000)
  const [custom, setCustom] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (open) {
      setDone(false)
      setAmount(25000)
      setCustom('')
    }
  }, [open, need?.id])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const submit = () => {
    const value = custom ? Math.max(1000, parseInt(custom.replace(/\D/g, ''), 10) || 0) : amount
    if (value >= 1000) contribute(need.id, value)
    setDone(true)
  }

  const cat = need ? categoryById(need.category) : null

  return (
    <AnimatePresence>
      {open && need && (
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
            className="relative flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-lift sm:rounded-3xl"
          >
            {!done ? (
              <>
                <div className="relative h-24 shrink-0">
                  <img
                    src={need.media[0]?.url || cat.image}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                  <button
                    onClick={onClose}
                    aria-label="Tutup"
                    className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/95 text-sand-800 shadow-soft transition-transform hover:scale-105"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="px-6 pb-6 pt-1">
                  <p className="eyebrow">{cat?.name}</p>
                  <h3 className="mt-1 line-clamp-2 font-display text-xl font-semibold leading-snug text-sand-950">
                    {need.title}
                  </h3>
                  <p className="mt-2 text-sm text-sand-600">
                    Berapa pun yang kamu bisa bantu, itu sangat berarti. Nominal bebas sesuai kemampuanmu.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2">
                    {NOMINALS.map((n) => (
                      <button
                        key={n}
                        onClick={() => {
                          setAmount(n)
                          setCustom('')
                        }}
                        className={`tnum rounded-xl border px-2 py-2.5 text-sm font-bold transition-all ${
                          !custom && amount === n
                            ? 'border-brand-700 bg-brand-700/10 text-brand-800'
                            : 'border-sand-200 text-sand-700 hover:border-sand-300'
                        }`}
                      >
                        {rupiah(n)}
                      </button>
                    ))}
                    <input
                      value={custom}
                      onChange={(e) => setCustom(e.target.value.replace(/[^\d]/g, ''))}
                      placeholder="Nominal lain"
                      inputMode="numeric"
                      className="tnum col-span-3 w-full rounded-xl border border-sand-200 px-4 py-2.5 text-sm font-semibold text-sand-900 placeholder:font-normal placeholder:text-sand-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15"
                    />
                  </div>

                  <button onClick={submit} className="btn-primary btn-lg mt-5 w-full">
                    <HeartHandshake size={18} />
                    Ambil Bagian {custom ? `· ${rupiah(parseInt(custom, 10) || 0)}` : `· ${rupiah(amount)}`}
                  </button>
                  <p className="mt-3 flex items-center justify-center gap-1.5 text-center text-[11px] text-sand-500">
                    <ShieldCheck size={13} />
                    Ini prototype — tidak ada pembayaran nyata. Simulasi progres kebutuhan.
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <motion.span
                  initial={{ scale: 0.6, rotate: -8 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-brand-100 text-brand-700"
                >
                  <PartyPopper size={28} />
                </motion.span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-sand-950">
                  Terima kasih. Kamu sudah ikut ambil bagian.
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-sand-600">
                  {need.collected >= need.target
                    ? 'Dan bantuanmu menutup kebutuhan ini — progress sudah terpenuhi.'
                    : 'Progress kebutuhan ini baru saja bertambah. Pantau terus sampai selesai, ya.'}
                </p>
                <div className="mt-6 flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
                  <button onClick={onClose} className="btn-primary">
                    Lihat Progress
                  </button>
                  <button onClick={onClose} className="btn-ghost">
                    Tutup
                  </button>
                </div>
                <p className="mt-5 text-[11px] text-sand-400">Kamu juga bisa ambil bagian lagi kapan saja.</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
