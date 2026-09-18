import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { Menu, X, Sprout, MapPinned, ArrowUpRight } from 'lucide-react'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/kebutuhan', label: 'Kebutuhan' },
  { to: '/peta', label: 'Peta' },
  { to: '/cara-kerja', label: 'Cara Kerja' },
  { to: '/tentang', label: 'Tentang' },
]

export function Wordmark({ light = false }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-moss-700 text-white transition-transform duration-300 group-hover:rotate-6">
        <Sprout size={18} strokeWidth={2.2} />
      </span>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-lg font-semibold tracking-tight ${light ? 'text-white' : 'text-sand-950'}`}>
          Ambil Bagian
        </span>
        <span className={`text-[10px] font-semibold uppercase tracking-[0.22em] ${light ? 'text-sand-300' : 'text-moss-700'}`}>
          Peta Kebutuhan Nyata
        </span>
      </span>
    </Link>
  )
}

export default function PublicLayout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-sand-50">
      <header className="sticky top-0 z-40 border-b border-sand-200/70 bg-sand-50/85 backdrop-blur-md">
        <div className="container-app flex h-16 items-center justify-between gap-4">
          <Wordmark />
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                    isActive ? 'bg-moss-700/10 text-moss-800' : 'text-sand-700 hover:bg-sand-100 hover:text-sand-950'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/kebutuhan" className="btn-ember hidden sm:inline-flex">
              Ambil Bagian
              <ArrowUpRight size={16} />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-xl border border-sand-200 bg-white text-sand-800 md:hidden"
              aria-label="Buka menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="border-t border-sand-200/70 bg-sand-50 px-4 pb-5 pt-2 md:hidden">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-3 text-base font-semibold ${
                    isActive ? 'bg-moss-700/10 text-moss-800' : 'text-sand-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <Link to="/kebutuhan" className="btn-ember mt-3 w-full">
              Ambil Bagian
            </Link>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-sand-200/70 bg-sand-100/60">
        <div className="container-app grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sand-700">
              Kamu nggak harus bantu semuanya. Cukup ambil bagian — berapa pun yang kamu bisa bantu, itu sangat berarti.
            </p>
            <p className="mt-4 text-xs leading-relaxed text-sand-500">
              Data & foto pada prototype ini adalah mock data fiktif; dokumentasi foto memakai foto dokumentasi dengan kredit sumber.
            </p>
          </div>
          <div>
            <p className="eyebrow">Jelajahi</p>
            <ul className="mt-3 space-y-2 text-sm text-sand-700">
              <li><Link className="hover:text-moss-800" to="/kebutuhan">Daftar Kebutuhan</Link></li>
              <li><Link className="hover:text-moss-800" to="/peta">Peta Kebutuhan</Link></li>
              <li><Link className="hover:text-moss-800" to="/cara-kerja">Cara Kerja</Link></li>
              <li><Link className="hover:text-moss-800" to="/tentang">Tentang Ambil Bagian</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Layanan</p>
            <ul className="mt-3 space-y-2 text-sm text-sand-700">
              <li>Bantu Beras</li>
              <li>Bantu Sembako</li>
              <li>Bantu Air</li>
              <li>Bantu Pendidikan</li>
              <li>Bantu Bencana</li>
              <li>Bantu Kesehatan — Segera Hadir</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">Internal</p>
            <ul className="mt-3 space-y-2 text-sm text-sand-700">
              <li>
                <Link className="inline-flex items-center gap-1 hover:text-moss-800" to="/operations">
                  Ambil Bagian — Operations
                  <MapPinned size={13} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sand-200/70">
          <div className="container-app flex flex-col items-start justify-between gap-2 py-5 text-xs text-sand-500 sm:flex-row sm:items-center">
            <span>© 2026 Ambil Bagian — prototype. Semua angka & kasus adalah mock data.</span>
            <span>Foto dokumentasi: UNICEF Ethiopia, World Bank, Wikimedia Commons — kredit di tiap media.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
