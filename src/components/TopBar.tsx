import { type FC } from 'react'
import { Bell, Search, Smartphone, Monitor } from 'lucide-react'

interface TopBarProps {
  title: string
  subtitle?: string
  mode: 'desktop' | 'mobile'
  onToggleMode: () => void
}

const TopBar: FC<TopBarProps> = ({ title, subtitle, mode, onToggleMode }) => {
  return (
    <header className="h-14 md:h-16 bg-white border-b border-sand-200 flex items-center px-4 md:px-6 gap-3 sticky top-0 z-20 min-w-0">
      {/* Title — left margin on mobile to clear the hamburger */}
      <div className="flex-1 min-w-0 pl-10 md:pl-0">
        <h1 className="font-display text-base md:text-xl font-semibold text-navy-800 leading-tight truncate">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-cocoa-400 mt-0.5 truncate hidden sm:block">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Search — hidden on small screens */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-sand-50 border border-sand-200 rounded-xl">
          <Search className="w-3.5 h-3.5 text-cocoa-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search anything…"
            className="bg-transparent text-sm text-cocoa-700 placeholder-cocoa-400 outline-none w-36 xl:w-44"
          />
          <kbd className="text-xs text-cocoa-400 bg-sand-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
        </div>

        {/* Mode toggle */}
        <button
          onClick={onToggleMode}
          className="flex items-center gap-1.5 px-2.5 md:px-3 py-2 rounded-xl border border-sand-300 bg-white text-sm font-medium text-cocoa-700 hover:bg-sand-50 transition-all duration-200"
          title={mode === 'desktop' ? 'Switch to Mobile View' : 'Switch to Desktop View'}
        >
          {mode === 'desktop'
            ? <><Smartphone className="w-4 h-4" /><span className="hidden sm:inline text-xs">Mobile</span></>
            : <><Monitor className="w-4 h-4" /><span className="hidden sm:inline text-xs">Desktop</span></>
          }
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 rounded-xl bg-sand-50 border border-sand-200 flex items-center justify-center hover:bg-sand-100 transition-all duration-200">
          <Bell className="w-4 h-4 text-cocoa-600" />
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-terra-400 text-white text-xs flex items-center justify-center font-medium">5</span>
        </button>

        <div className="text-xs text-cocoa-400 hidden xl:block whitespace-nowrap">Mon, 12 May 2026</div>
      </div>
    </header>
  )
}

export default TopBar
