import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import './index.css'

import { AppProvider } from './store/AppContext.jsx'
import PublicLayout from './layouts/PublicLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

import HomePage from './pages/HomePage.jsx'
import NeedsPage from './pages/NeedsPage.jsx'
import NeedDetailPage from './pages/NeedDetailPage.jsx'
import MapPage from './pages/MapPage.jsx'
import ProgressPage from './pages/ProgressPage.jsx'
import HowItWorksPage from './pages/HowItWorksPage.jsx'
import AboutPage from './pages/AboutPage.jsx'

import AdminOverview from './pages/admin/AdminOverview.jsx'
import AdminNeeds from './pages/admin/AdminNeeds.jsx'
import AdminPengajuan from './pages/admin/AdminPengajuan.jsx'
import AdminVerification from './pages/admin/AdminVerification.jsx'
import AdminMap from './pages/admin/AdminMap.jsx'
import AdminExecution from './pages/admin/AdminExecution.jsx'
import AdminPartners from './pages/admin/AdminPartners.jsx'
import AdminParticipation from './pages/admin/AdminParticipation.jsx'
import AdminReports from './pages/admin/AdminReports.jsx'
import AdminAnalytics from './pages/admin/AdminAnalytics.jsx'
import AdminNeedDetail from './pages/admin/AdminNeedDetail.jsx'

import { Toaster } from './components/ui/Toaster.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/kebutuhan" element={<NeedsPage />} />
            <Route path="/kebutuhan/:id" element={<NeedDetailPage />} />
            <Route path="/peta" element={<MapPage />} />
            <Route path="/kebutuhan/:id/progress" element={<ProgressPage />} />
            <Route path="/cara-kerja" element={<HowItWorksPage />} />
            <Route path="/tentang" element={<AboutPage />} />
          </Route>

          <Route path="/operations" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="kebutuhan" element={<AdminNeeds />} />
            <Route path="kebutuhan/:id" element={<AdminNeedDetail />} />
            <Route path="pengajuan" element={<AdminPengajuan />} />
            <Route path="verifikasi" element={<AdminVerification />} />
            <Route path="peta" element={<AdminMap />} />
            <Route path="pelaksanaan" element={<AdminExecution />} />
            <Route path="mitra" element={<AdminPartners />} />
            <Route path="partisipasi" element={<AdminParticipation />} />
            <Route path="laporan" element={<AdminReports />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
)
