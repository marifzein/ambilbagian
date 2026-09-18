import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  ClipboardList,
  ShieldCheck,
  Map,
  Truck,
  Handshake,
  Users,
  FolderOpen,
  BarChart3,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react'

const NAV = [
  { to: '/operations', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/operations/kebutuhan', label: 'Kebutuhan', icon: ClipboardList },
  { to: '/operations/verifikasi', label: 'Verifikasi', icon: ShieldCheck },
  { to: '/operations/peta', label: 'Peta', icon: Map },
  { to: '/operations/pelaksanaan', label: 'Pelaksanaan', icon: Truck },
  { to: '/operations/mitra', label: 'Mitra', icon: Handshake },
  { to: '/operations/partisipasi', label: 'Partisipasi', icon: Users },
  { to: '/operations/laporan', label: 'Laporan & Bukti', icon: FolderOpen },
  { to: '/operations/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center gap-2.5 border-b border-brand-900/60 px-5">
        <img src="/logo.png" alt="Logo Ambil Bagian" className="h-8 w-auto" />
        <div className="leading-tight">
          <p className="text-sm font-bold text-white">Ambil Bagian</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-brand-400">Operations</p>
        </div>
      </div>
      <nav className="nice-scroll flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-brand-500/15 text-white'
                  : 'text-brand-200/80 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            <item.icon size={17} className="shrink-0" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-brand-900/60 p-4">
        <Link
          to="/"
          className="flex items-center justify-between rounded-xl bg-white/5 px-3.5 py-2.5 text-xs font-bold text-brand-100 transition-colors hover:bg-white/10"
        >
          Lihat situs publik
          <ExternalLink size={13} />
        </Link>
        <p className="mt-3 px-1 text-[10px] leading-relaxed text-brand-400/70">
          Pusat kendali operasional — semua angka mock data prototype.
        </p>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-sand-100/60">
      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-brand-950 lg:block">{sidebar}</aside>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-sand-950/50" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-brand-950 shadow-lift">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-sand-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-sand-200 text-sand-700 lg:hidden"
              aria-label="Buka menu operasional"
            >
              <Menu size={17} />
            </button>
            <div>
              <p className="text-sm font-bold text-sand-950">Ambil Bagian — Operations</p>
              <p className="hidden text-[11px] font-semibold text-sand-500 sm:block">
                Pusat kendali kebutuhan, verifikasi, pelaksanaan, dan bukti
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="hidden rounded-full bg-brand-100 px-3 py-1 text-[11px] font-bold text-brand-800 md:inline-block">
              Mode prototype
            </span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-800 text-xs font-bold text-white">
              OP
            </span>
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
