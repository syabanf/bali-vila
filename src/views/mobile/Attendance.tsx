import { type FC, useState } from 'react'
import { ArrowLeft, MapPin, Clock, CheckCircle, LogIn, LogOut, Briefcase } from 'lucide-react'
import clsx from 'clsx'

const timeline = [
  { time: '07:30', event: 'Clock In', villa: 'BAV Office', type: 'clock-in' },
  { time: '08:15', event: 'Arrived at Villa', villa: 'Villa Tirta 05', type: 'arrive' },
  { time: '08:20', event: 'Started inspection', villa: 'Villa Tirta 05', type: 'task' },
  { time: '09:10', event: 'Inspection complete', villa: 'Villa Tirta 05', type: 'done' },
  { time: '09:30', event: 'Transit to next villa', villa: 'Villa Puri 12', type: 'transit' },
  { time: '09:50', event: 'Arrived at Villa', villa: 'Villa Puri 12', type: 'arrive' },
]

const Attendance: FC = () => {
  const [clockedIn, setClockedIn] = useState(true)
  const [currentVilla, setCurrentVilla] = useState('Villa Tirta 05')

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-5 bg-batik">
        <div className="flex items-center gap-3 mb-4">
          <button className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="flex-1">
            <div className="text-xs text-navy-300">Attendance</div>
            <h2 className="font-display text-lg font-semibold text-white">Made Suarjana</h2>
          </div>
          <span className={clsx(
            'flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border',
            clockedIn ? 'bg-teal-500/20 text-teal-300 border-teal-500/30' : 'bg-terra-500/20 text-terra-300 border-terra-500/30'
          )}>
            <span className={clsx('w-1.5 h-1.5 rounded-full', clockedIn ? 'bg-teal-400 animate-pulse-slow' : 'bg-terra-400')} />
            {clockedIn ? 'On Shift' : 'Off Shift'}
          </span>
        </div>

        {/* Status card */}
        <div className="bg-white/10 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-300" />
              <span className="text-sm text-navy-200">Clock-in time</span>
            </div>
            <span className="text-sm font-semibold text-white">07:30 WIB</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-teal-300" />
              <span className="text-sm text-navy-200">Current location</span>
            </div>
            <span className="text-sm font-semibold text-white">{currentVilla}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-navy-300" />
              <span className="text-sm text-navy-200">Tasks today</span>
            </div>
            <span className="text-sm font-semibold text-white">6 / 8 done</span>
          </div>
        </div>
      </div>

      {/* Clock action */}
      <div className="px-4 mt-5">
        <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-5 text-center">
          <div className={clsx(
            'w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center border-4 transition-all duration-300',
            clockedIn
              ? 'bg-teal-50 border-teal-400'
              : 'bg-sand-50 border-sand-300'
          )}>
            <Clock className={clsx('w-8 h-8', clockedIn ? 'text-teal-600' : 'text-cocoa-400')} />
          </div>
          <div className="font-display text-2xl font-semibold text-navy-800">10:24:07</div>
          <div className="text-xs text-cocoa-400 mt-1">Current time · Monday, 12 May 2026</div>
          {clockedIn && (
            <div className="text-xs text-teal-600 font-medium mt-2">Shift duration: 2h 54m</div>
          )}

          <button
            onClick={() => setClockedIn(!clockedIn)}
            className={clsx(
              'mt-4 w-full py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300',
              clockedIn
                ? 'bg-terra-500 text-white hover:bg-terra-600'
                : 'bg-teal-500 text-white hover:bg-teal-600'
            )}
          >
            {clockedIn ? <><LogOut className="w-4 h-4" /> Clock Out</> : <><LogIn className="w-4 h-4" /> Clock In</>}
          </button>
        </div>
      </div>

      {/* Map placeholder */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold text-sm text-navy-800 mb-2">Current Location</h3>
        <div className="relative h-36 bg-gradient-to-br from-teal-50 to-navy-50 rounded-2xl border border-sand-200 overflow-hidden shadow-card">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #0F2040 1px, transparent 0)', backgroundSize: '20px 20px' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-teal-400 border-4 border-white shadow-xl flex items-center justify-center">
                <span className="text-sm font-bold text-white">MS</span>
              </div>
              <div className="absolute inset-0 rounded-full bg-teal-400/30 animate-ping" />
            </div>
          </div>
          <div className="absolute bottom-3 left-3 text-xs text-navy-700 bg-white/90 px-2.5 py-1.5 rounded-lg shadow-sm font-medium">
            <MapPin className="w-3 h-3 inline mr-1 text-teal-600" />
            Villa Tirta 05, Seminyak
          </div>
          <div className="absolute bottom-3 right-3 text-xs text-cocoa-500 bg-white/90 px-2.5 py-1.5 rounded-lg shadow-sm">
            Live ·  Bali South
          </div>
        </div>
      </div>

      {/* Activity timeline */}
      <div className="px-4 mt-5">
        <h3 className="font-semibold text-sm text-navy-800 mb-3">Today's Activity</h3>
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-sand-200" />
          <div className="space-y-3">
            {timeline.map((event, i) => (
              <div key={i} className="flex items-start gap-3 pl-2">
                <div className={clsx(
                  'w-6 h-6 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm',
                  event.type === 'clock-in' ? 'bg-teal-400' :
                  event.type === 'done' ? 'bg-teal-500' :
                  event.type === 'arrive' ? 'bg-navy-400' :
                  event.type === 'transit' ? 'bg-gold-400' : 'bg-sand-300'
                )}>
                  {event.type === 'done' && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                  {event.type !== 'done' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 border border-sand-200 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-navy-800">{event.event}</span>
                    <span className="text-xs text-cocoa-400">{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-cocoa-400" />
                    <span className="text-xs text-cocoa-500">{event.villa}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
