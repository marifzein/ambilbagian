import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useApp } from '../../store/AppContext.jsx'

export function Toaster() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 z-[90] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-moss-200 bg-white p-4 shadow-lift"
          >
            <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-moss-100 text-moss-700">
              <CheckCircle2 size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-sand-950">{t.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-sand-600">{t.message}</p>
            </div>
            <button
              onClick={() => dismissToast(t.id)}
              className="rounded-lg p-1 text-sand-400 transition-colors hover:bg-sand-100 hover:text-sand-700"
              aria-label="Tutup notifikasi"
            >
              <X size={15} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
