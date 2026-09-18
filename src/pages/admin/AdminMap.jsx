import { categories } from '../../data/categories'
import { useApp } from '../../store/AppContext.jsx'
import NeedsMap from '../../components/NeedsMap.jsx'

export default function AdminMap() {
  const { needs } = useApp()
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-sand-950 md:text-3xl">Peta Internal</h1>
        <p className="mt-1 text-sm text-sand-500">
          Seluruh kebutuhan terdata, termasuk yang belum tayang ke publik. Klik titik untuk membuka detail internal.
        </p>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-sand-600">
        {categories.filter((c) => c.active).map((c) => (
          <span key={c.id} className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
            {c.name}
          </span>
        ))}
      </div>

      <NeedsMap items={needs} detailBase="/operations/kebutuhan" height="h-[520px]" />
    </div>
  )
}
