import { useState } from 'react'

// Layout
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import MobileNav from './components/MobileNav'

// Desktop views
import ExecutiveDashboard from './views/desktop/ExecutiveDashboard'
import MarketingSales from './views/desktop/MarketingSales'
import InventoryManagement from './views/desktop/InventoryManagement'
import Purchasing from './views/desktop/Purchasing'
import OperationsChecklist from './views/desktop/OperationsChecklist'
import MonthlyStatements from './views/desktop/MonthlyStatements'
import Announcements from './views/desktop/Announcements'
import VendorFinder from './views/desktop/VendorFinder'
import AIAssistant from './views/desktop/AIAssistant'
import VillaMaster from './views/desktop/VillaMaster'
import OwnerRegistry from './views/desktop/OwnerRegistry'
import StaffDirectory from './views/desktop/StaffDirectory'
import MaintenanceTickets from './views/desktop/MaintenanceTickets'
import ReportsAnalytics from './views/desktop/ReportsAnalytics'
import BookingManagement from './views/desktop/BookingManagement'

// Mobile views
import MobileHome from './views/mobile/MobileHome'
import SupervisorInspection from './views/mobile/SupervisorInspection'
import MEPChecklist from './views/mobile/MEPChecklist'
import InventoryUpdate from './views/mobile/InventoryUpdate'
import SOPLibrary from './views/mobile/SOPLibrary'
import Attendance from './views/mobile/Attendance'

type DesktopView = 'executive' | 'marketing' | 'bookings' | 'inventory' | 'purchasing' | 'checklist' | 'statements' | 'maintenance' | 'announcements' | 'vendors' | 'ai-assistant' | 'analytics' | 'villas' | 'owners' | 'staff'
type MobileView = 'home' | 'inspection' | 'mep' | 'inventory' | 'sop' | 'attendance'
type Mode = 'desktop' | 'mobile'

const desktopMeta: Record<DesktopView, { title: string; subtitle: string }> = {
  executive: { title: 'Executive Command Center', subtitle: 'Real-time villa operations overview · May 2026' },
  marketing: { title: 'Revenue Engine — Marketing & Sales', subtitle: 'Pipeline, leads, and campaign performance' },
  inventory: { title: 'Cost & Asset Protection — Inventory', subtitle: 'Stock levels, variance tracking, and restock alerts' },
  purchasing: { title: 'Smart Purchasing & Supplier Intelligence', subtitle: 'Purchase requests, approvals, and vendor management' },
  checklist: { title: 'Operational Control — Checklists', subtitle: 'Supervisor inspections and MEP daily checks' },
  statements: { title: 'Owner Trust — Monthly Statements', subtitle: 'Automated owner statements and PDF generation' },
  announcements: { title: 'AI Reservation Announcement Center', subtitle: 'Generate and send reservation announcements instantly' },
  vendors: { title: 'Technician Network — Smart Vendor Finder', subtitle: 'Find and assign the right technician fast' },
  'ai-assistant': { title: 'AI Maintenance Assistant', subtitle: 'Intelligent troubleshooting and maintenance support' },
  villas: { title: 'Villa Master Registry', subtitle: 'Complete portfolio — details, KPIs, and management' },
  owners: { title: 'Owner Registry', subtitle: 'Owner profiles, portfolios, and statement history' },
  staff: { title: 'Staff Directory', subtitle: 'Team management, performance, and assignments' },
  bookings: { title: 'Booking Management', subtitle: 'Reservations, guest profiles, and check-in pipeline' },
  maintenance: { title: 'Maintenance Tickets', subtitle: 'Issue tracking, vendor assignment, and SLA management' },
  analytics: { title: 'Reports & Analytics', subtitle: 'Revenue, occupancy, maintenance, and staff insights' },
}

export default function App() {
  const [mode, setMode] = useState<Mode>('desktop')
  const [desktopView, setDesktopView] = useState<DesktopView>('executive')
  const [mobileView, setMobileView] = useState<MobileView>('home')

  if (mode === 'mobile') {
    const mobileScreens: Record<MobileView, JSX.Element> = {
      home: <MobileHome />,
      inspection: <SupervisorInspection />,
      mep: <MEPChecklist />,
      inventory: <InventoryUpdate />,
      sop: <SOPLibrary />,
      attendance: <Attendance />,
    }
    return (
      <div className="min-h-screen bg-sand-50">
        {/* Mobile mode toggle - floating pill */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setMode('desktop')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-navy-900/90 text-white text-xs font-medium shadow-luxury-lg backdrop-blur-md border border-white/10"
          >
            ← Desktop
          </button>
        </div>

        <div className="max-w-sm mx-auto">
          {mobileScreens[mobileView]}
        </div>

        <div className="max-w-sm mx-auto">
          <MobileNav activeView={mobileView} onNavigate={setMobileView} />
        </div>
      </div>
    )
  }

  const meta = desktopMeta[desktopView]

  const desktopScreens: Record<DesktopView, JSX.Element> = {
    executive: <ExecutiveDashboard />,
    marketing: <MarketingSales />,
    inventory: <InventoryManagement />,
    purchasing: <Purchasing />,
    checklist: <OperationsChecklist />,
    statements: <MonthlyStatements />,
    announcements: <Announcements />,
    vendors: <VendorFinder />,
    'ai-assistant': <AIAssistant />,
    villas: <VillaMaster />,
    owners: <OwnerRegistry />,
    staff: <StaffDirectory />,
    bookings: <BookingManagement />,
    maintenance: <MaintenanceTickets />,
    analytics: <ReportsAnalytics />,
  }

  return (
    <div className="min-h-screen bg-sand-50 flex">
      <Sidebar activeView={desktopView} onNavigate={setDesktopView} />

      {/* Offset: 0 on mobile, w-16 on md, w-64 on lg+ */}
      <div className="flex-1 ml-0 md:ml-16 lg:ml-64 min-w-0">
        <TopBar
          title={meta.title}
          subtitle={meta.subtitle}
          mode="desktop"
          onToggleMode={() => setMode('mobile')}
        />

        <main className="p-4 md:p-5 lg:p-6">
          {desktopScreens[desktopView]}
        </main>
      </div>
    </div>
  )
}
