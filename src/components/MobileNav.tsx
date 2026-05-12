import { type FC } from 'react'
import { Home, ClipboardList, AlertCircle, MoreHorizontal, User } from 'lucide-react'
import clsx from 'clsx'

type MobileView = 'home' | 'inspection' | 'mep' | 'inventory' | 'sop' | 'attendance'

interface MobileNavProps {
  activeView: MobileView
  onNavigate: (view: MobileView) => void
}

const tabs = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'inspection', icon: ClipboardList, label: 'Checklist' },
  { id: 'inventory', icon: AlertCircle, label: 'Inventory' },
  { id: 'attendance', icon: User, label: 'Attendance' },
  { id: 'sop', icon: MoreHorizontal, label: 'More' },
]

const MobileNav: FC<MobileNavProps> = ({ activeView, onNavigate }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand-300 px-2 pb-safe shadow-luxury-lg">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeView === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id as MobileView)}
              className="flex flex-col items-center gap-1 px-4 py-1.5 min-w-0 transition-all duration-200"
            >
              <div className={clsx(
                'w-10 h-10 rounded-2xl flex items-center justify-center transition-all duration-200',
                isActive ? 'bg-navy-800' : 'bg-transparent'
              )}>
                <Icon className={clsx('w-5 h-5', isActive ? 'text-white' : 'text-cocoa-500')} />
              </div>
              <span className={clsx('text-xs font-medium leading-none', isActive ? 'text-cocoa-800' : 'text-cocoa-500')}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MobileNav
