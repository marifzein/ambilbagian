export default function SectionHeading({ eyebrow, title, children, light = false }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className={`eyebrow ${light ? 'text-brand-300' : ''}`}>{eyebrow}</p>}
      <h2
        className={`mt-2 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-sand-950'
        }`}
      >
        {title}
      </h2>
      {children && (
        <p className={`mt-3 text-base leading-relaxed ${light ? 'text-sand-200' : 'text-sand-600'}`}>{children}</p>
      )}
    </div>
  )
}
