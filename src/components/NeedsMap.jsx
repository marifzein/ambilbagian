import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet.markercluster'
import { categoryById } from '../data/categories'
import { pct } from '../utils/format'

/**
 * Peta kebutuhan bersama (publik & internal).
 * - clustering via leaflet.markercluster
 * - titik diberi warna per kategori
 * - popup: foto, judul, lokasi, progress, kekurangan, tombol "Lihat Detail"
 */
export default function NeedsMap({ items, height = 'h-[460px]', center = [-7.1, 111.9], zoom = 8, detailBase = '/kebutuhan' }) {
  const elRef = useRef(null)
  const mapRef = useRef(null)
  const clusterRef = useRef(null)

  useEffect(() => {
    if (!elRef.current || mapRef.current) return
    const map = L.map(elRef.current, {
      center,
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    })
    // OpenStreetMap standar — tanpa API key. (CARTO kini menuntut API key
    // untuk basemapsnya, jadi tidak dipakai di prototype ini.)
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)
    const cluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 42,
      spiderfyOnMaxZoom: true,
    })
    map.addLayer(cluster)
    mapRef.current = map
    clusterRef.current = cluster
    setTimeout(() => map.invalidateSize(), 80)
    return () => {
      map.remove()
      mapRef.current = null
      clusterRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const cluster = clusterRef.current
    const map = mapRef.current
    if (!cluster || !map) return
    cluster.clearLayers()

    const markers = (items || []).map((n) => {
      const cat = categoryById(n.category)
      const percent = pct(n.collected, n.target)
      const remainingText =
        n.status === 'selesai'
          ? 'Kebutuhan terpenuhi'
          : n.unit === 'Rp'
            ? `Kurang Rp${(n.target - n.collected).toLocaleString('id-ID')}`
            : `Kurang ${n.target - n.collected} ${n.unit}`
      const icon = L.divIcon({
        className: '',
        html: `<span style="display:block;width:14px;height:14px;border-radius:999px;background:${cat.color};border:2.5px solid #fff;box-shadow:0 1px 4px rgba(38,30,24,.35)"></span>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      })
      const marker = L.marker(n.location.coords, { icon, title: n.title })
      marker.bindPopup(
        `<div style="overflow:hidden">
          <img src="${n.media[0]?.url || cat.image}" alt="" style="width:100%;height:110px;object-fit:cover" loading="lazy"/>
          <div style="padding:10px 12px 12px">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="display:inline-block;width:8px;height:8px;border-radius:99px;background:${cat.color}"></span>
              <span style="font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:${cat.color}">${cat.name}</span>
            </div>
            <p style="margin:4px 0 2px;font-size:13px;font-weight:800;line-height:1.35;color:#261e18">${n.title}</p>
            <p style="margin:0;font-size:11px;color:#715a41">${n.location.village}, ${n.location.regency}</p>
            <div style="margin-top:8px;height:6px;border-radius:99px;background:#e6dfd0;overflow:hidden">
              <div style="height:100%;width:${percent}%;border-radius:99px;background:#54873f"></div>
            </div>
            <p style="margin:6px 0 0;font-size:11px;font-weight:700;color:#46392e">${remainingText}</p>
            <a href="${detailBase}/${n.id}" data-detail style="margin-top:9px;display:block;text-align:center;background:#355626;color:#fff;font-size:12px;font-weight:800;padding:8px 10px;border-radius:99px;text-decoration:none">Lihat Detail</a>
          </div>
        </div>`
      )
      return marker
    })

    cluster.addLayers(markers)
    if (items?.length) {
      const bounds = cluster.getBounds()
      if (bounds.isValid()) map.fitBounds(bounds.pad(0.12), { animate: false })
    }
  }, [items, detailBase])

  return <div ref={elRef} className={`${height} w-full overflow-hidden rounded-2xl border border-sand-200`} />
}
