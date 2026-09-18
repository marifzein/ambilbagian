import { motion } from 'framer-motion'
import { pct } from '../../utils/format'

export default function Progress({ collected, target, tone = 'moss', size = 'md', showPct = false }) {
  const percent = Math.min(100, pct(collected, target))
  const height = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3.5' : 'h-2.5'
  const tones = {
    moss: 'bg-moss-600',
    ember: 'bg-ember-500',
    sky: 'bg-sky-600',
    sand: 'bg-sand-400',
  }
  return (
    <div className="flex items-center gap-3">
      <div className={`relative w-full overflow-hidden rounded-full bg-sand-200/80 ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-full rounded-full ${tones[tone]}`}
        />
      </div>
      {showPct && <span className="tnum shrink-0 text-xs font-bold text-sand-700">{percent}%</span>}
    </div>
  )
}
