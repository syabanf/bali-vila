import { type FC } from 'react'
import { Bell, CheckSquare, AlertCircle, Camera, BookOpen, MapPin, ChevronRight, Zap, Clock } from 'lucide-react'
import clsx from 'clsx'

const MobileHome: FC = () => {
  const tasks = [
    { id: 1, title: 'Pre-arrival inspection', villa: 'Villa Tirta 05', time: '14:00', type: 'inspection', done: false, urgent: true },
    { id: 2, title: 'MEP daily checklist', villa: 'Villa Puri 12', time: '10:00', type: 'mep', done: true, urgent: false },
    { id: 3, title: 'Inventory update', villa: 'Villa Sawah 03', time: '11:30', type: 'inventory', done: false, urgent: false },
    { id: 4, title: 'Check-out inspection', villa: 'Villa Lumbung 08', time: '12:00', type: 'inspection', done: true, urgent: false },
  ]

  return (
    <div className="min-h-screen bg-sand-50 pb-24">
      {/* Header */}
      <div className="bg-navy-900 px-4 pt-12 pb-6 bg-batik">
        <div className="flex items-center justify-between mb-4">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Zap className="w-4 h-4 text-gold-400" />
          </div>
          <span className="text-xs text-navy-300">Mon, 12 May</span>
          <button className="relative w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Bell className="w-4 h-4 text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-terra-400 text-white text-xs flex items-center justify-center font-medium" style={{ fontSize: '8px' }}>2</span>
          </button>
        </div>
        <h1 className="font-display text-2xl font-semibold text-white">Good morning,</h1>
        <h2 className="font-display text-xl text-gold-300">Made Suarjana</h2>
        <p className="text-xs text-navy-300 mt-1">Supervisor · Villa Cluster South</p>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-2 mt-4">
          {[
            { label: 'Tasks today', value: '8', sub: '6 done' },
            { label: 'Current villa', value: 'T05', sub: 'Tirta 05' },
            { label: 'Check-ins', value: '3', sub: 'today' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
              <div className="font-display text-xl font-semibold text-white">{stat.value}</div>
              <div className="text-xs text-navy-300">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Urgent alert */}
      <div className="px-4 mt-4">
        <div className="bg-terra-50 border border-terra-200 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-terra-500 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-terra-800">Check-in in 2 hours</div>
            <div className="text-xs text-terra-600 mt-0.5">Villa Tirta 05 — Guest: Sophia Laurent</div>
          </div>
          <ChevronRight className="w-4 h-4 text-terra-400 mt-0.5" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 mt-4">
        <h3 className="font-semibold text-sm text-cocoa-800 mb-3">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: CheckSquare, label: 'Checklist', color: 'bg-teal-50 text-teal-600', border: 'border-teal-200' },
            { icon: AlertCircle, label: 'Report Issue', color: 'bg-terra-50 text-terra-600', border: 'border-terra-200' },
            { icon: Camera, label: 'Upload Photo', color: 'bg-gold-50 text-gold-600', border: 'border-gold-200' },
            { icon: BookOpen, label: 'View SOP', color: 'bg-navy-50 text-navy-600', border: 'border-navy-200' },
          ].map((action) => {
            const Icon = action.icon
            return (
              <button key={action.label} className={`flex flex-col items-center gap-2 p-3 rounded-2xl border ${action.color} ${action.border} hover:opacity-80 transition-opacity`}>
                <Icon className="w-5 h-5" />
                <span className="text-xs font-medium leading-tight text-center">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm text-cocoa-800">Today's Tasks</h3>
          <span className="text-xs text-teal-600 font-medium">{tasks.filter(t => t.done).length}/{tasks.length} done</span>
        </div>
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div key={task.id} className={clsx(
              'flex items-center gap-3 p-4 rounded-2xl border bg-white shadow-card transition-all duration-200',
              task.done ? 'opacity-60' : 'hover:shadow-card-hover',
              task.urgent && !task.done ? 'border-terra-200 ring-1 ring-terra-100' : 'border-sand-300'
            )}>
              <div className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                task.done ? 'bg-teal-100' : task.urgent ? 'bg-terra-100' : 'bg-sand-100'
              )}>
                <CheckSquare className={clsx('w-4 h-4', task.done ? 'text-teal-600' : task.urgent ? 'text-terra-500' : 'text-cocoa-500')} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={clsx('text-sm font-semibold', task.done ? 'text-cocoa-500 line-through' : 'text-cocoa-800')}>{task.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <MapPin className="w-3 h-3 text-cocoa-500" />
                  <span className="text-xs text-cocoa-500">{task.villa}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <div className="flex items-center gap-1 text-xs text-cocoa-500">
                  <Clock className="w-3 h-3" />
                  {task.time}
                </div>
                {task.urgent && !task.done && <span className="badge-danger text-xs">Urgent</span>}
                {task.done && <span className="badge-success text-xs">Done</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming check-in */}
      <div className="px-4 mt-5">
        <h3 className="font-semibold text-sm text-cocoa-800 mb-3">Today's Arrivals</h3>
        <div className="space-y-2">
          {[
            { guest: 'Sophia Laurent', villa: 'Villa Tirta 05', time: '14:00', guests: 2, nights: 4 },
            { guest: 'Raj Patel', villa: 'Villa Seminyak 07', time: '15:00', guests: 4, nights: 7 },
          ].map((arrival) => (
            <div key={arrival.guest} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-sand-300 shadow-card">
              <div className="w-10 h-10 rounded-full bg-navy-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-navy-700">{arrival.guest.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-cocoa-800">{arrival.guest}</div>
                <div className="text-xs text-cocoa-500">{arrival.villa} · {arrival.guests} guests · {arrival.nights}N</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-cocoa-800">{arrival.time}</div>
                <div className="text-xs text-teal-600">Check-in</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MobileHome
