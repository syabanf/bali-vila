import { type FC, useState } from 'react'
import { Search, Star, MapPin, Clock, Zap, Filter, Phone, CheckCircle } from 'lucide-react'
import { vendors } from '../../data/mockData'
import clsx from 'clsx'

const skills = ['All', 'Plumbing', 'Electrical', 'Air Conditioning', 'Pool', 'Carpentry', 'Civil Repair']

const skillColors: Record<string, string> = {
  Plumbing: 'bg-navy-50 text-navy-700 border-navy-200',
  Electrical: 'bg-gold-50 text-gold-700 border-gold-200',
  'Air Conditioning': 'bg-teal-50 text-teal-700 border-teal-200',
  Pool: 'bg-navy-50 text-navy-600 border-navy-200',
  Carpentry: 'bg-cocoa-50 text-cocoa-700 border-cocoa-200',
  'Civil Repair': 'bg-terra-50 text-terra-700 border-terra-200',
}

const VendorFinder: FC = () => {
  const [activeSkill, setActiveSkill] = useState('All')
  const [selectedVendor, setSelectedVendor] = useState(vendors[0])

  const filtered = activeSkill === 'All' ? vendors : vendors.filter(v => v.specialty === activeSkill)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-sand-200 shadow-card p-5">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-cocoa-400" />
            <input type="text" placeholder="Search technicians, vendors, or specialties…" className="input-field pl-10 py-3" />
          </div>
          <button className="btn-secondary py-3 px-4"><MapPin className="w-4 h-4" /> Location</button>
          <button className="btn-secondary py-3 px-4"><Filter className="w-4 h-4" /> Filter</button>
        </div>
        <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => setActiveSkill(skill)}
              className={clsx(
                'flex-shrink-0 text-xs px-3 py-1.5 rounded-full font-medium border transition-all duration-200',
                activeSkill === skill
                  ? 'bg-navy-800 text-white border-navy-800'
                  : 'bg-white text-cocoa-600 border-sand-200 hover:border-navy-300'
              )}
            >{skill}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {/* Vendor Grid */}
        <div className="col-span-12 xl:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-cocoa-500 font-medium">{filtered.length} vendors found</p>
            <select className="input-field text-xs py-1.5 px-3 w-36">
              <option>Sort by Rating</option>
              <option>Sort by Response Time</option>
              <option>Sort by Distance</option>
            </select>
          </div>

          {filtered.map((vendor) => (
            <button
              key={vendor.id}
              onClick={() => setSelectedVendor(vendor)}
              className={clsx(
                'w-full bg-white rounded-2xl border shadow-card p-5 text-left hover:shadow-card-hover transition-all duration-200',
                selectedVendor.id === vendor.id ? 'border-navy-300 ring-1 ring-navy-200' : 'border-sand-200'
              )}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-100 to-teal-100 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="font-display text-lg font-semibold text-navy-700">
                    {vendor.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-navy-800">{vendor.name}</span>
                    {vendor.available && (
                      <span className="flex items-center gap-1 text-xs font-medium text-teal-600 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-slow" />
                        Available
                      </span>
                    )}
                    {!vendor.available && (
                      <span className="text-xs font-medium text-cocoa-400 bg-sand-100 border border-sand-200 px-2 py-0.5 rounded-full">Busy</span>
                    )}
                  </div>

                  <span className={clsx('text-xs px-2 py-0.5 rounded-full border font-medium inline-block mb-2', skillColors[vendor.specialty] || 'bg-sand-50 text-cocoa-600 border-sand-200')}>
                    {vendor.specialty}
                  </span>

                  <div className="flex items-center flex-wrap gap-3 text-xs text-cocoa-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{vendor.area}</span>
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 fill-gold-400 text-gold-400" />{vendor.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{vendor.response}</span>
                    <span className="flex items-center gap-1"><Zap className="w-3 h-3" />{vendor.jobs} jobs</span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="text-xs text-cocoa-400 mb-1">Est. cost</div>
                  <div className="text-sm font-semibold text-navy-800">{vendor.estimate}</div>
                  <div className="text-xs text-cocoa-400 mt-2">{vendor.lastJob}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Vendor Profile */}
        <div className="col-span-12 xl:col-span-5">
          <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden sticky top-20">
            <div className="bg-navy-900 px-6 py-5 bg-batik">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400/20 to-teal-400/20 border border-white/10 flex items-center justify-center">
                  <span className="font-display text-xl font-semibold text-white">
                    {selectedVendor.name.split(' ').slice(-1)[0].slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold text-white">{selectedVendor.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-navy-300">{selectedVendor.specialty}</span>
                    {selectedVendor.available
                      ? <span className="flex items-center gap-1 text-xs text-teal-300"><span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse-slow" />Available now</span>
                      : <span className="text-xs text-terra-300">Currently busy</span>
                    }
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {[1,2,3,4,5].map((s) => (
                      <Star key={s} className={clsx('w-4 h-4', s <= Math.floor(selectedVendor.rating) ? 'fill-gold-400 text-gold-400' : 'text-navy-600')} />
                    ))}
                    <span className="text-sm text-gold-300 font-semibold ml-1">{selectedVendor.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Coverage Area', value: selectedVendor.area, icon: MapPin },
                  { label: 'Response Time', value: selectedVendor.response, icon: Clock },
                  { label: 'Jobs Completed', value: selectedVendor.jobs.toString(), icon: CheckCircle },
                  { label: 'Cost Range', value: selectedVendor.estimate, icon: Zap },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="bg-sand-50 rounded-xl p-3 border border-sand-200">
                      <Icon className="w-4 h-4 text-cocoa-400 mb-1" />
                      <div className="text-xs font-semibold text-navy-800">{item.value}</div>
                      <div className="text-xs text-cocoa-400 mt-0.5">{item.label}</div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-sand-50 rounded-xl p-3 border border-sand-200">
                <div className="text-xs text-cocoa-400 mb-0.5">Last job performed</div>
                <div className="text-sm font-medium text-navy-800">{selectedVendor.lastJob}</div>
              </div>

              <div className="flex gap-2">
                <button className="btn-secondary flex-1 justify-center"><Phone className="w-4 h-4" /> Contact</button>
                <button className="btn-primary flex-1 justify-center"><Zap className="w-4 h-4" /> Quick Assign</button>
              </div>
              <button className="btn-gold w-full justify-center">Create Service Ticket</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorFinder
