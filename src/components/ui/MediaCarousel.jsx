import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, ImageIcon } from 'lucide-react'

/** Carousel media modern & sederhana — foto (dan placeholder thumbnail video). */
export default function MediaCarousel({ media, className = '', aspect = 'aspect-[16/10]' }) {
  const [index, setIndex] = useState(0)
  if (!media?.length) {
    return (
      <div className={`grid place-items-center rounded-2xl bg-sand-100 text-sand-400 ${aspect} ${className}`}>
        <ImageIcon size={28} />
      </div>
    )
  }
  const current = media[index]
  const go = (dir) => setIndex((i) => (i + dir + media.length) % media.length)

  return (
    <div className={className}>
      <div className={`group relative overflow-hidden rounded-2xl bg-sand-100 ${aspect}`}>
        <AnimatePresence mode="wait">
          <motion.img
            key={current.url}
            src={current.url}
            alt={current.caption}
            loading="lazy"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>

        {media.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              aria-label="Sebelumnya"
              className="absolute left-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-sand-800 opacity-0 shadow-soft backdrop-blur transition-all duration-200 hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Berikutnya"
              className="absolute right-3 top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-sand-800 opacity-0 shadow-soft backdrop-blur transition-all duration-200 hover:bg-white group-hover:opacity-100 focus-visible:opacity-100"
            >
              <ChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 right-3 rounded-full bg-sand-950/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
              {index + 1} / {media.length}
            </div>
          </>
        )}

        {current.type === 'video' && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-sand-950/70 px-3 py-1.5 text-[11px] font-bold text-white backdrop-blur">
            <Play size={12} /> Video
          </span>
        )}

        {current.caption && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-sand-950/72 to-transparent p-4 pt-10">
            <p className="text-[13px] font-semibold text-white">{current.caption}</p>
            {current.credit && <p className="mt-0.5 text-[10px] text-white/65">Foto: {current.credit}</p>}
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className="nice-scroll mt-3 flex gap-2 overflow-x-auto pb-1">
          {media.map((item, i) => (
            <button
              key={item.url + i}
              onClick={() => setIndex(i)}
              aria-label={`Media ${i + 1}`}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                i === index ? 'border-brand-600 opacity-100' : 'border-transparent opacity-60 hover:opacity-90'
              }`}
            >
              <img src={item.url} alt="" loading="lazy" className="h-full w-full object-cover" />
              {item.type === 'video' && (
                <span className="absolute inset-0 grid place-items-center bg-sand-950/35 text-white">
                  <Play size={14} />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
