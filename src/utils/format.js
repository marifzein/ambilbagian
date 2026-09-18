/** Util format angka Indonesia — dipakai lintas halaman publik & admin. */

export const formatID = (n) => new Intl.NumberFormat('id-ID').format(Math.round(n))

export const rupiah = (n) => 'Rp' + formatID(n)

export const rupiahShort = (n) => {
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(1).replace('.', ',')} M`
  if (n >= 1_000_000) return `Rp${(n / 1_000_000).toFixed(1).replace('.', ',')} jt`
  if (n >= 1_000) return `Rp${Math.round(n / 1_000)} rb`
  return rupiah(n)
}

export const pct = (collected, target) => (target > 0 ? Math.round((collected / target) * 100) : 0)

export const formatDate = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const formatDateLong = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
}

/** Status otomatis berdasarkan progress — dipakai saat simulasi bantuan. */
export const autoStatus = (collected, target) => {
  if (collected >= target) return 'selesai'
  const p = pct(collected, target)
  if (p >= 80) return 'hampir'
  if (p > 0) return 'berjalan'
  return 'baru'
}
