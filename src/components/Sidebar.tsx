import { type FC, useState } from 'react'
import {
  LayoutDashboard, TrendingUp, Package, ShoppingCart,
  ClipboardCheck, FileText, Bell, Search, Zap, Settings,
  ChevronRight, Cpu, Menu, X, Home, Users, UserCog,
  CalendarCheck, Wrench, BarChart3
} from 'lucide-react'
import clsx from 'clsx'

type DesktopView =
  | 'executive' | 'marketing' | 'bookings' | 'inventory' | 'purchasing'
  | 'checklist' | 'statements' | 'maintenance' | 'announcements' | 'vendors' | 'ai-assistant'
  | 'analytics' | 'villas' | 'owners' | 'staff'

interface SidebarProps {
  activeView: DesktopView
  onNavigate: (view: DesktopView) => void
}

const navGroups = [
  {
    label: 'Command',
    items: [
      { id: 'executive', icon: LayoutDashboard, label: 'Executive Overview' },
      { id: 'marketing', icon: TrendingUp, label: 'Marketing & Sales' },
      { id: 'bookings', icon: CalendarCheck, label: 'Bookings' },
    ],
  },
  {
    label: 'Master Data',
    items: [
      { id: 'villas', icon: Home, label: 'Villa Master' },
      { id: 'owners', icon: Users, label: 'Owner Registry' },
      { id: 'staff', icon: UserCog, label: 'Staff Directory' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { id: 'inventory', icon: Package, label: 'Inventory' },
      { id: 'purchasing', icon: ShoppingCart, label: 'Purchasing' },
      { id: 'checklist', icon: ClipboardCheck, label: 'Checklists' },
      { id: 'maintenance', icon: Wrench, label: 'Maintenance' },
      { id: 'statements', icon: FileText, label: 'Owner Statements' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { id: 'analytics', icon: BarChart3, label: 'Reports & Analytics' },
      { id: 'announcements', icon: Bell, label: 'Announcements' },
      { id: 'vendors', icon: Search, label: 'Vendor Finder' },
      { id: 'ai-assistant', icon: Cpu, label: 'AI Assistant' },
    ],
  },
]

const Sidebar: FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavigate = (view: DesktopView) => {
    onNavigate(view)
    setMobileOpen(false)
  }

  return (
    <>
      {/* Hamburger — only below md */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 w-9 h-9 rounded-xl bg-navy-900 border border-navy-700 flex items-center justify-center shadow-luxury-lg"
      >
        <Menu className="w-4 h-4 text-white" />
      </button>

      {/* Backdrop — mobile only */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-navy-950/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          'min-h-screen bg-navy-900 flex flex-col fixed left-0 top-0 z-50 bg-batik transition-[width,transform] duration-300 ease-in-out overflow-hidden',
          // Mobile (<768): slide in/out, full width when open
          'max-md:w-64',
          mobileOpen ? 'max-md:translate-x-0' : 'max-md:-translate-x-full',
          // Tablet (768–1023): always visible, icon-only strip
          'md:translate-x-0 md:w-16',
          // Desktop (≥1024): full sidebar
          'lg:w-64',
        )}
      >
        {/* Logo */}
        <div className="px-3 pt-5 pb-4 border-b border-white/8 flex items-center gap-3 min-h-[64px]">
          <div className="w-9 h-9 rounded-xl bg-gold-400/20 border border-gold-400/30 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5 text-gold-400" />
          </div>
          <div className="lg:block hidden whitespace-nowrap">
            <div className="font-display text-lg font-semibold text-white leading-none">BAV OS</div>
            <div className="text-xs text-navy-300 mt-0.5">Villa Command Center</div>
          </div>
          {/* Also show text when mobile drawer is open */}
          <div className="md:hidden block whitespace-nowrap">
            <div className="font-display text-lg font-semibold text-white leading-none">BAV OS</div>
            <div className="text-xs text-navy-300 mt-0.5">Villa Command Center</div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden ml-auto w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0"
          >
            <X className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto overflow-x-hidden">
          {navGroups.map((group) => (
            <div key={group.label}>
              {/* Section label — full sidebar only */}
              <div className="lg:block md:hidden block sidebar-section">{group.label}</div>
              {/* Spacer on icon strip */}
              <div className="md:block lg:hidden hidden h-2" />

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon
                  const isActive = activeView === item.id
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavigate(item.id as DesktopView)}
                      title={item.label}
                      className={clsx(
                        'w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer',
                        // Icon-only mode (tablet)
                        'md:justify-center md:px-0 md:py-2.5',
                        // Full mode (desktop + mobile drawer)
                        'lg:justify-start lg:px-3 lg:py-2.5 lg:gap-3',
                        // Mobile drawer: full
                        'max-md:px-3 max-md:py-2.5 max-md:gap-3',
                        isActive
                          ? 'bg-gold-400/15 text-gold-400'
                          : 'text-navy-200 hover:bg-white/8 hover:text-white',
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      {/* Label: show on desktop and mobile drawer, hide on tablet icon strip */}
                      <span className={clsx(
                        'flex-1 text-left text-sm font-medium',
                        'md:hidden lg:block max-md:block',
                      )}>
                        {item.label}
                      </span>
                      {isActive && (
                        <ChevronRight className={clsx('w-3 h-3 opacity-60', 'md:hidden lg:block max-md:block')} />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom user info */}
        <div className="px-2 py-4 border-t border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-semibold text-teal-300">SM</span>
            </div>
            <div className="lg:block md:hidden max-md:block flex-1 min-w-0">
              <div className="text-xs font-medium text-white truncate">Setiawan Malik</div>
              <div className="text-xs text-navy-400">Head of Operations</div>
            </div>
            <Settings className="w-4 h-4 text-navy-400 cursor-pointer hover:text-white transition-colors flex-shrink-0 lg:block md:hidden max-md:block" />
          </div>
          <div className="mt-3 items-center gap-2 px-2 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/20 lg:flex md:hidden max-md:flex">
            <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-slow flex-shrink-0" />
            <span className="text-xs text-teal-300 truncate">247 villas · 68% occ.</span>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar
