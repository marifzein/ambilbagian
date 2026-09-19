import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { needs as seedNeeds } from '../data/needs'
import { participation as seedParticipation, proposalsSeed } from '../data/partners'
import { autoStatus } from '../utils/format'

/**
 * AppContext — lapisan "state" di atas mock data.
 * Nanti cukup diganti dengan fetch/React Query: contribute() jadi POST /needs/:id/contributions
 * dan needs() jadi GET /needs. Struktur data tidak perlu berubah.
 */
const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [needs, setNeeds] = useState(seedNeeds)
  const [participation, setParticipation] = useState(seedParticipation)
  const [proposals, setProposals] = useState(proposalsSeed)
  const [toasts, setToasts] = useState([])

  const pushToast = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, ...toast }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 5200)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  /**
   * Simulasi kontribusi: tambah collected, hitung ulang status,
   * naikkan agregat partisipasi, dan tampilkan toast.
   * Di versi API nyata: POST /needs/:id/contributions lalu refetch.
   *
   * Konversi rupiah → satuan memakai estimasi harga per kategori
   * (beras ±Rp12.500/kg, paket sembako ±Rp155rb, tangki air ±Rp1,9jt, item pendidikan ±Rp145rb)
   * agar progress bergerak secara masuk akal. Kebutuhan berbasis Rp menambah collected langsung.
   */
  const contribute = useCallback(
    (needId, amount) => {
      const UNIT_PRICE = { beras: 12500, sembako: 155000, air: 1900000, pendidikan: 145000 }
      let updated = null
      setNeeds((prev) =>
        prev.map((n) => {
          if (n.id !== needId) return n
          const units =
            n.unit === 'Rp' ? amount : Math.max(1, Math.round(amount / (UNIT_PRICE[n.category] || 50000)))
          const collected = Math.min(n.target, n.collected + units)
          updated = {
            ...n,
            collected,
            status: collected >= n.target ? 'selesai' : autoStatus(collected, n.target),
            updatedAt: new Date().toISOString().slice(0, 10),
          }
          return updated
        })
      )
      setParticipation((prev) => ({
        ...prev,
        people: prev.people + 1,
        contributions: prev.contributions + 1,
        totalAmount: prev.totalAmount + amount,
        avgAmount: Math.round((prev.totalAmount + amount) / (prev.contributions + 1)),
      }))
      if (updated) {
        const done = updated.collected >= updated.target
        pushToast({
          title: done ? 'Kebutuhan ini terpenuhi!' : 'Terima kasih!',
          message: done
            ? 'Kamu menutup kebutuhan ini. Tim kami akan lanjut ke pengadaan.'
            : `Kamu sudah ikut ambil bagian untuk ${updated.title.split('—')[0].slice(0, 48)}…`,
          tone: 'success',
        })
      }
      return updated
    },
    [pushToast]
  )

  const getNeed = useCallback((id) => needs.find((n) => n.id === id), [needs])

  /**
   * Simulasi pengajuan bantuan baru dari warga.
   * Di versi API nyata: POST /proposals → tim verifikasi meninjau →
   * notifikasi dikirim ke mitra distributor.
   */
  const addProposal = useCallback(
    (data) => {
      const entry = {
        id: `PGA-${105 + proposals.length}`,
        photoNames: [],
        status: 'menunggu',
        notified: [],
        submittedAt: new Date().toISOString().slice(0, 10),
        ...data,
      }
      setProposals((prev) => [entry, ...prev])
      pushToast({
        title: 'Pengajuan terkirim',
        message: 'Tim verifikasi akan menghubungi kamu via WhatsApp maksimal 3 hari kerja.',
        tone: 'success',
      })
      return entry
    },
    [proposals.length, pushToast]
  )

  const value = useMemo(
    () => ({ needs, participation, proposals, contribute, addProposal, getNeed, toasts, dismissToast }),
    [needs, participation, proposals, contribute, addProposal, getNeed, toasts, dismissToast]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp harus dipakai di dalam AppProvider')
  return ctx
}
