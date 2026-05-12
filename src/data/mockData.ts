// ─── Revenue ────────────────────────────────────────────────────────────────
export const revenueData = [
  { month: 'Jan', direct: 180, ota: 240, total: 420 },
  { month: 'Feb', direct: 210, ota: 220, total: 430 },
  { month: 'Mar', direct: 260, ota: 280, total: 540 },
  { month: 'Apr', direct: 290, ota: 310, total: 600 },
  { month: 'May', direct: 340, ota: 290, total: 630 },
  { month: 'Jun', direct: 410, ota: 320, total: 730 },
  { month: 'Jul', direct: 480, ota: 350, total: 830 },
  { month: 'Aug', direct: 520, ota: 380, total: 900 },
  { month: 'Sep', direct: 440, ota: 360, total: 800 },
  { month: 'Oct', direct: 390, ota: 330, total: 720 },
  { month: 'Nov', direct: 350, ota: 290, total: 640 },
  { month: 'Dec', direct: 460, ota: 380, total: 840 },
];

export const occupancyData = [
  { name: 'Occupied', value: 68, color: '#3D8B7A' },
  { name: 'Available', value: 22, color: '#E0D4B8' },
  { name: 'Maintenance', value: 6, color: '#C4664A' },
  { name: 'Cleaning', value: 4, color: '#C9A84C' },
];

export const villaGrowthData = [
  { label: '100', villas: 100, done: true },
  { label: '200', villas: 200, done: true },
  { label: '247', villas: 247, done: true, current: true },
  { label: '300', villas: 300, done: false },
  { label: '400', villas: 400, done: false },
];

// ─── Sales Pipeline ──────────────────────────────────────────────────────────
export const leads = [
  {
    id: 'L001', name: 'Sophia Laurent', villa: 'Villa Tirta 05', source: 'Instagram',
    value: 4200, probability: 85, assignee: 'Rina S.', lastContact: '2h ago',
    nextAction: 'Send proposal', stage: 'Hot', avatar: 'SL',
  },
  {
    id: 'L002', name: 'James Whitfield', villa: 'Villa Puri 12', source: 'Website',
    value: 7800, probability: 72, assignee: 'Dewa A.', lastContact: '1d ago',
    nextAction: 'Follow-up call', stage: 'Warm', avatar: 'JW',
  },
  {
    id: 'L003', name: 'Aiko Tanaka', villa: 'Villa Sawah 03', source: 'Referral',
    value: 12500, probability: 90, assignee: 'Rina S.', lastContact: '30m ago',
    nextAction: 'Confirm dates', stage: 'Proposal Sent', avatar: 'AT',
  },
  {
    id: 'L004', name: 'Marco Bellini', villa: 'Villa Lumbung 08', source: 'WhatsApp',
    value: 3600, probability: 45, assignee: 'Ketut P.', lastContact: '3d ago',
    nextAction: 'Re-engage', stage: 'Contacted', avatar: 'MB',
  },
  {
    id: 'L005', name: 'Sarah Chen', villa: 'Villa Tebing 01', source: 'OTA',
    value: 9200, probability: 60, assignee: 'Dewa A.', lastContact: '5h ago',
    nextAction: 'Price negotiation', stage: 'Warm', avatar: 'SC',
  },
  {
    id: 'L006', name: 'David Park', villa: 'Villa Bukit 11', source: 'Instagram',
    value: 15400, probability: 95, assignee: 'Rina S.', lastContact: '1h ago',
    nextAction: 'Contract signing', stage: 'Booking Confirmed', avatar: 'DP',
  },
  {
    id: 'L007', name: 'Emma Dubois', villa: 'Villa Canggu 04', source: 'Website',
    value: 5800, probability: 20, assignee: 'Ketut P.', lastContact: '1w ago',
    nextAction: 'Archive', stage: 'Lost', avatar: 'ED',
  },
  {
    id: 'L008', name: 'Raj Patel', villa: 'Villa Seminyak 07', source: 'Referral',
    value: 6700, probability: 35, assignee: 'Dewa A.', lastContact: '2d ago',
    nextAction: 'Send brochure', stage: 'New Lead', avatar: 'RP',
  },
];

export const campaignData = [
  { channel: 'Instagram', leads: 124, cost: 1800, bookings: 38, cpl: 14.5 },
  { channel: 'WhatsApp', leads: 89, cost: 320, bookings: 42, cpl: 3.6 },
  { channel: 'Website', leads: 67, cost: 2200, bookings: 28, cpl: 32.8 },
  { channel: 'OTA', leads: 203, cost: 4500, bookings: 89, cpl: 22.2 },
  { channel: 'Referral', leads: 45, cost: 0, bookings: 31, cpl: 0 },
];

// ─── Inventory ───────────────────────────────────────────────────────────────
export const inventoryItems = [
  { id: 'I001', villa: 'Villa Tirta 05', category: 'Linen', item: 'Bath Towels', standard: 12, current: 9, diff: -3, status: 'Low', lastUpdate: '2h ago', updatedBy: 'Made S.' },
  { id: 'I002', villa: 'Villa Puri 12', category: 'Kitchen', item: 'Dinner Plates', standard: 8, current: 8, diff: 0, status: 'OK', lastUpdate: '1d ago', updatedBy: 'Putu A.' },
  { id: 'I003', villa: 'Villa Sawah 03', category: 'Amenities', item: 'Shampoo (200ml)', standard: 20, current: 6, diff: -14, status: 'Critical', lastUpdate: '4h ago', updatedBy: 'Wayan D.' },
  { id: 'I004', villa: 'Villa Lumbung 08', category: 'Consumables', item: 'Toilet Paper', standard: 24, current: 18, diff: -6, status: 'Low', lastUpdate: '30m ago', updatedBy: 'Made S.' },
  { id: 'I005', villa: 'Villa Tebing 01', category: 'Linen', item: 'Bed Sheets (King)', standard: 6, current: 4, diff: -2, status: 'Low', lastUpdate: '3h ago', updatedBy: 'Ketut R.' },
  { id: 'I006', villa: 'Villa Bukit 11', category: 'Kitchen', item: 'Wine Glasses', standard: 10, current: 7, diff: -3, status: 'Breakage', lastUpdate: '1d ago', updatedBy: 'Putu A.' },
  { id: 'I007', villa: 'Villa Canggu 04', category: 'Operational', item: 'Pool Net', standard: 2, current: 2, diff: 0, status: 'OK', lastUpdate: '2d ago', updatedBy: 'Wayan D.' },
  { id: 'I008', villa: 'Villa Seminyak 07', category: 'Amenities', item: 'Coffee Capsules', standard: 30, current: 8, diff: -22, status: 'Critical', lastUpdate: '1h ago', updatedBy: 'Made S.' },
];

// ─── Purchasing ───────────────────────────────────────────────────────────────
export const purchaseRequests = [
  { id: 'PR001', item: 'Bath Towels x24', villa: 'Multiple', requestedBy: 'Made S.', amount: 1280, status: 'Pending', date: 'May 10', category: 'Linen', urgency: 'High' },
  { id: 'PR002', item: 'Shampoo 200ml x100', villa: 'Villa Sawah 03', requestedBy: 'Wayan D.', amount: 420, status: 'Approved', date: 'May 09', category: 'Amenities', urgency: 'Critical' },
  { id: 'PR003', item: 'Coffee Capsules x200', villa: 'Villa Seminyak 07', requestedBy: 'Putu A.', amount: 185, status: 'Ordered', date: 'May 08', category: 'Consumables', urgency: 'Medium' },
  { id: 'PR004', item: 'Pool Chemical Set', villa: 'Villa Puri 12', requestedBy: 'Ketut R.', amount: 680, status: 'Received', date: 'May 07', category: 'Pool', urgency: 'Low' },
  { id: 'PR005', item: 'King Bed Sheets x12', villa: 'Multiple', requestedBy: 'Made S.', amount: 960, status: 'Pending', date: 'May 10', category: 'Linen', urgency: 'High' },
];

export const suppliers = [
  { id: 'S001', name: 'Bali Linen House', specialty: 'Linen & Textiles', rating: 4.8, response: '2h', lastPrice: 'IDR 45K/pc', trend: 'stable', preferred: true },
  { id: 'S002', name: 'Island Amenities Co.', specialty: 'Bath & Guest Amenities', rating: 4.6, response: '4h', lastPrice: 'IDR 28K/unit', trend: 'up', preferred: false },
  { id: 'S003', name: 'Tropical Kitchen Supply', specialty: 'Kitchen & Dining', rating: 4.9, response: '1h', lastPrice: 'IDR 85K/set', trend: 'stable', preferred: true },
  { id: 'S004', name: 'Bali Pool Masters', specialty: 'Pool Equipment & Chemicals', rating: 4.7, response: '3h', lastPrice: 'IDR 320K/kit', trend: 'down', preferred: false },
];

// ─── Checklists ───────────────────────────────────────────────────────────────
export const checklistVillas = [
  { id: 'V001', villa: 'Villa Tirta 05', type: 'Check-in', supervisor: 'Made S.', status: 'Completed', completion: 100, time: '09:30' },
  { id: 'V002', villa: 'Villa Puri 12', type: 'Check-out', supervisor: 'Putu A.', status: 'In Progress', completion: 65, time: '11:00' },
  { id: 'V003', villa: 'Villa Sawah 03', type: 'Check-in', supervisor: 'Wayan D.', status: 'Pending', completion: 0, time: '14:00' },
  { id: 'V004', villa: 'Villa Lumbung 08', type: 'Check-in', supervisor: 'Ketut R.', status: 'Completed', completion: 100, time: '10:15' },
  { id: 'V005', villa: 'Villa Tebing 01', type: 'Check-out', supervisor: 'Made S.', status: 'In Progress', completion: 40, time: '10:00' },
];

export const mepItems = [
  { category: 'Electrical', items: ['Main panel stable', 'Backup generator tested', 'External lighting OK', 'Indoor lighting OK'] },
  { category: 'Water System', items: ['Water pressure normal', 'Pump condition OK', 'Hot water heater working', 'Plumbing leakage check'] },
  { category: 'Air Conditioning', items: ['All AC units cooling', 'Filter cleaned', 'Thermostat calibrated', 'Remote controls working'] },
  { category: 'Pool', items: ['pH level balanced', 'Chlorine level OK', 'Pump/filter running', 'Pool cleanliness check'] },
];

// ─── Monthly Statements ───────────────────────────────────────────────────────
export const ownerStatements = [
  { id: 'OS001', owner: 'I Wayan Sudirta', villa: 'Villa Tirta 05', period: 'April 2026', totalIncome: 28400, directIncome: 16200, otaIncome: 12200, maintenance: 850, purchasing: 1200, netPayable: 26350, status: 'Ready', managementFee: 2840 },
  { id: 'OS002', owner: 'Ni Luh Artini', villa: 'Villa Puri 12', period: 'April 2026', totalIncome: 42600, directIncome: 28000, otaIncome: 14600, maintenance: 1200, purchasing: 2100, netPayable: 39300, status: 'Pending Review', managementFee: 4260 },
  { id: 'OS003', owner: 'PT Sawah Indah', villa: 'Villa Sawah 03', period: 'April 2026', totalIncome: 18900, directIncome: 9200, otaIncome: 9700, maintenance: 400, purchasing: 780, netPayable: 17720, status: 'Sent', managementFee: 1890 },
  { id: 'OS004', owner: 'James Whitfield', villa: 'Villa Lumbung 08', period: 'April 2026', totalIncome: 35200, directIncome: 22000, otaIncome: 13200, maintenance: 680, purchasing: 950, netPayable: 33570, status: 'Ready', managementFee: 3520 },
];

// ─── Vendors ───────────────────────────────────────────────────────────────────
export const vendors = [
  { id: 'VN001', name: 'Pak Nyoman', specialty: 'Plumbing', area: 'Seminyak–Kerobokan', rating: 4.9, response: '< 1h', lastJob: 'Pipe repair Villa Bukit', estimate: 'IDR 150–400K', available: true, jobs: 234 },
  { id: 'VN002', name: 'Pak Ketut Listrik', specialty: 'Electrical', area: 'Canggu–Pererenan', rating: 4.7, response: '2h', lastJob: 'Panel upgrade Villa Tirta', estimate: 'IDR 200–800K', available: true, jobs: 189 },
  { id: 'VN003', name: 'CV Bali AC Service', specialty: 'Air Conditioning', area: 'Ubud–Gianyar', rating: 4.8, response: '3h', lastJob: 'AC overhaul Villa Puri', estimate: 'IDR 350–1.2M', available: false, jobs: 312 },
  { id: 'VN004', name: 'Made Pool Pro', specialty: 'Pool', area: 'Jimbaran–Bukit', rating: 4.9, response: '< 1h', lastJob: 'Pool pump Villa Tebing', estimate: 'IDR 500K–2M', available: true, jobs: 156 },
  { id: 'VN005', name: 'Bali Timber Works', specialty: 'Carpentry', area: 'All Bali', rating: 4.6, response: '1d', lastJob: 'Deck repair Villa Canggu', estimate: 'IDR 400K–3M', available: true, jobs: 98 },
  { id: 'VN006', name: 'Ketut Civil Repair', specialty: 'Civil Repair', area: 'Denpasar–South Bali', rating: 4.5, response: '1d', lastJob: 'Crack repair Villa Seminyak', estimate: 'IDR 500K–5M', available: true, jobs: 67 },
];

// ─── AI Troubleshooting ────────────────────────────────────────────────────────
export const aiChatHistory = [
  {
    role: 'user',
    message: 'Water pressure in Villa 21 bathroom is low and pump sound is irregular.',
    time: '10:42',
  },
  {
    role: 'ai',
    message: `**Diagnosis: Low Water Pressure + Irregular Pump Sound**

**Possible Causes:**
1. Pump cavitation — air entering the suction line
2. Clogged pump impeller or intake filter
3. Pressure tank bladder failure
4. Pipe leak between pump and bathroom fixtures

**Immediate Inspection Steps:**
1. Check pump for unusual vibration or heat
2. Inspect suction line for air leaks or loose fittings
3. Verify pressure gauge reading (should be 2.5–3.5 bar)
4. Check filter/strainer basket for debris

**Urgency Level:** Medium-High — address within 4 hours

**Recommendation:** Dispatch plumbing technician. Likely filter cleaning or pressure tank recharge needed.`,
    time: '10:42',
    urgency: 'medium',
    actions: ['Assign Technician', 'Create Ticket', 'Notify Supervisor'],
  },
];

// ─── Staff / Attendance ────────────────────────────────────────────────────────
export const staffActivity = [
  { id: 'ST001', name: 'Made Suarjana', role: 'Supervisor', villa: 'Villa Tirta 05', status: 'active', clockIn: '07:30', tasks: 8, completed: 6, lat: -8.682, lng: 115.161 },
  { id: 'ST002', name: 'Putu Artawan', role: 'Housekeeping', villa: 'Villa Puri 12', status: 'active', clockIn: '08:00', tasks: 5, completed: 5, lat: -8.692, lng: 115.171 },
  { id: 'ST003', name: 'Wayan Darma', role: 'MEP', villa: 'Villa Sawah 03', status: 'break', clockIn: '07:00', tasks: 6, completed: 3, lat: -8.672, lng: 115.181 },
  { id: 'ST004', name: 'Ketut Riana', role: 'Supervisor', villa: 'Villa Lumbung 08', status: 'active', clockIn: '07:45', tasks: 7, completed: 7, lat: -8.702, lng: 115.151 },
  { id: 'ST005', name: 'Ni Luh Suartini', role: 'Housekeeping', villa: 'Villa Tebing 01', status: 'active', clockIn: '08:15', tasks: 4, completed: 2, lat: -8.712, lng: 115.141 },
];

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const alerts = [
  { id: 'A001', type: 'warning', title: 'Linen Variance Exceeded', body: 'Villa 028: Bath towel count below threshold by 30%', time: '2h ago', villa: 'Villa Tirta 05' },
  { id: 'A002', type: 'critical', title: 'Maintenance Overdue', body: 'Villa 105: Pump maintenance overdue by 12 days', time: '5h ago', villa: 'Villa Sawah 03' },
  { id: 'A003', type: 'urgent', title: 'Hot Lead Expiring', body: 'Lead L001 (Sophia Laurent) requires follow-up in < 30 min', time: '28m ago', villa: '—' },
  { id: 'A004', type: 'info', title: 'Supplier Price Alert', body: 'Island Amenities Co. increased prices 12% for shampoo line', time: '1d ago', villa: '—' },
  { id: 'A005', type: 'warning', title: 'Low Stock Alert', body: 'Villa Seminyak 07: Coffee capsules at 27% of standard stock', time: '1h ago', villa: 'Villa Seminyak 07' },
];

// ─── SOP Library ─────────────────────────────────────────────────────────────
export const sopCategories = [
  { id: 'SOP-HK', name: 'Housekeeping', icon: 'BedDouble', count: 24, color: 'teal' },
  { id: 'SOP-MEP', name: 'MEP & Maintenance', icon: 'Wrench', count: 18, color: 'navy' },
  { id: 'SOP-POOL', name: 'Pool & Outdoor', icon: 'Waves', count: 12, color: 'terra' },
  { id: 'SOP-GS', name: 'Guest Services', icon: 'Users', count: 16, color: 'gold' },
  { id: 'SOP-SEC', name: 'Security & Safety', icon: 'Shield', count: 8, color: 'cocoa' },
  { id: 'SOP-EMER', name: 'Emergency SOP', icon: 'ShieldAlert', count: 6, color: 'terra' },
];

export const recentSOPs = [
  { id: 'SOP001', title: 'Pre-Arrival Checklist', category: 'Housekeeping', lastViewed: '2h ago', views: 124 },
  { id: 'SOP002', title: 'Pool Chemical Balance Procedure', category: 'Pool & Outdoor', lastViewed: '1d ago', views: 89 },
  { id: 'SOP003', title: 'AC Unit Maintenance Guide', category: 'MEP & Maintenance', lastViewed: '3h ago', views: 67 },
  { id: 'SOP004', title: 'Guest Welcome Protocol', category: 'Guest Services', lastViewed: '30m ago', views: 203 },
];

export const emergencySOPs = [
  { id: 'ESOP001', title: 'Power Outage Response', urgency: 'critical', steps: 7 },
  { id: 'ESOP002', title: 'Water Leak Emergency', urgency: 'critical', steps: 5 },
  { id: 'ESOP003', title: 'Guest Medical Emergency', urgency: 'critical', steps: 8 },
  { id: 'ESOP004', title: 'Fire Safety Protocol', urgency: 'critical', steps: 9 },
];

// ─── Villas Master ────────────────────────────────────────────────────────────
export const villasMaster = [
  { id: 'VM001', name: 'Villa Tirta 05', zone: 'Seminyak', type: 'Pool Villa', bedrooms: 3, maxGuests: 6, ownerId: 'OW001', ownerName: 'I Wayan Sudirta', status: 'Occupied', supervisor: 'Made Suarjana', yearBuilt: 2019, monthlyRevenue: 28400, occupancyRate: 78, maintenanceScore: 92, lastInspection: 'May 10', nextAvailable: 'May 18', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Garden', 'BBQ'], address: 'Jl. Kayu Aya No. 5, Seminyak', size: 420, photos: 12 },
  { id: 'VM002', name: 'Villa Puri 12', zone: 'Ubud', type: 'Heritage Villa', bedrooms: 4, maxGuests: 8, ownerId: 'OW002', ownerName: 'Ni Luh Artini', status: 'Available', supervisor: 'Putu Artawan', yearBuilt: 2016, monthlyRevenue: 42600, occupancyRate: 85, maintenanceScore: 88, lastInspection: 'May 11', nextAvailable: 'May 13', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Rice Field View', 'Spa'], address: 'Jl. Raya Ubud No. 12, Ubud', size: 680, photos: 18 },
  { id: 'VM003', name: 'Villa Sawah 03', zone: 'Canggu', type: 'Surf Villa', bedrooms: 2, maxGuests: 4, ownerId: 'OW003', ownerName: 'PT Sawah Indah', status: 'Cleaning', supervisor: 'Wayan Darma', yearBuilt: 2021, monthlyRevenue: 18900, occupancyRate: 62, maintenanceScore: 75, lastInspection: 'May 09', nextAvailable: 'May 12', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Surf Storage'], address: 'Jl. Batu Bolong No. 3, Canggu', size: 280, photos: 9 },
  { id: 'VM004', name: 'Villa Lumbung 08', zone: 'Seminyak', type: 'Luxury Pool Villa', bedrooms: 5, maxGuests: 10, ownerId: 'OW004', ownerName: 'James Whitfield', status: 'Occupied', supervisor: 'Ketut Riana', yearBuilt: 2018, monthlyRevenue: 35200, occupancyRate: 71, maintenanceScore: 96, lastInspection: 'May 12', nextAvailable: 'May 20', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Home Theater', 'Gym', 'BBQ', 'Garden'], address: 'Jl. Petitenget No. 8, Seminyak', size: 850, photos: 24 },
  { id: 'VM005', name: 'Villa Tebing 01', zone: 'Jimbaran', type: 'Clifftop Villa', bedrooms: 3, maxGuests: 6, ownerId: 'OW005', ownerName: 'Sarah Holt', status: 'Maintenance', supervisor: 'Made Suarjana', yearBuilt: 2020, monthlyRevenue: 22100, occupancyRate: 58, maintenanceScore: 61, lastInspection: 'May 08', nextAvailable: 'May 15', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Ocean View', 'Jacuzzi'], address: 'Jl. Uluwatu No. 1, Jimbaran', size: 510, photos: 15 },
  { id: 'VM006', name: 'Villa Bukit 11', zone: 'Bukit', type: 'Ocean View Villa', bedrooms: 4, maxGuests: 8, ownerId: 'OW001', ownerName: 'I Wayan Sudirta', status: 'Available', supervisor: 'Putu Artawan', yearBuilt: 2017, monthlyRevenue: 31500, occupancyRate: 80, maintenanceScore: 94, lastInspection: 'May 11', nextAvailable: 'May 13', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Ocean View', 'Garden'], address: 'Jl. Pantai Bingin No. 11, Bukit', size: 590, photos: 21 },
  { id: 'VM007', name: 'Villa Canggu 04', zone: 'Canggu', type: 'Bohemian Villa', bedrooms: 2, maxGuests: 4, ownerId: 'OW006', ownerName: 'Marco Ricci', status: 'Occupied', supervisor: 'Wayan Darma', yearBuilt: 2022, monthlyRevenue: 15800, occupancyRate: 55, maintenanceScore: 83, lastInspection: 'May 10', nextAvailable: 'May 16', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Outdoor Cinema'], address: 'Jl. Pantai Berawa No. 4, Canggu', size: 240, photos: 11 },
  { id: 'VM008', name: 'Villa Seminyak 07', zone: 'Seminyak', type: 'Modern Villa', bedrooms: 3, maxGuests: 6, ownerId: 'OW007', ownerName: 'Liu Wei', status: 'Available', supervisor: 'Ketut Riana', yearBuilt: 2020, monthlyRevenue: 26700, occupancyRate: 74, maintenanceScore: 89, lastInspection: 'May 12', nextAvailable: 'May 14', amenities: ['Pool', 'AC', 'WiFi', 'Kitchen', 'Rooftop Terrace'], address: 'Jl. Raya Seminyak No. 7, Seminyak', size: 380, photos: 14 },
];

// ─── Owners Registry ──────────────────────────────────────────────────────────
export const owners = [
  { id: 'OW001', name: 'I Wayan Sudirta', nationality: 'Indonesian', email: 'wayan.sudirta@email.com', phone: '+62 812-3456-7890', villas: ['VM001', 'VM006'], totalVillas: 2, totalRevenue: 59900, status: 'Active', joinDate: 'Jan 2019', contractType: 'Full Management', bankName: 'BCA', accountNo: '***4521', notes: 'Long-term partner. Prefers monthly WhatsApp report summary.', avatar: 'WS' },
  { id: 'OW002', name: 'Ni Luh Artini', nationality: 'Indonesian', email: 'niluh.artini@gmail.com', phone: '+62 813-9876-5432', villas: ['VM002'], totalVillas: 1, totalRevenue: 42600, status: 'Active', joinDate: 'Mar 2016', contractType: 'Revenue Share 80/20', bankName: 'Mandiri', accountNo: '***8832', notes: 'Heritage property — no structural changes without approval.', avatar: 'NA' },
  { id: 'OW003', name: 'PT Sawah Indah', nationality: 'Indonesian (PT)', email: 'ops@sawahindalh.co.id', phone: '+62 361-445-5900', villas: ['VM003'], totalVillas: 1, totalRevenue: 18900, status: 'Active', joinDate: 'Jun 2021', contractType: 'Full Management', bankName: 'BNI', accountNo: '***2201', notes: 'Corporate owner — invoices required for all purchases.', avatar: 'SI' },
  { id: 'OW004', name: 'James Whitfield', nationality: 'British', email: 'j.whitfield@whitfield.co.uk', phone: '+44 7891 234567', villas: ['VM004'], totalVillas: 1, totalRevenue: 35200, status: 'Active', joinDate: 'Sep 2018', contractType: 'Full Management', bankName: 'HSBC Singapore', accountNo: '***6614', notes: 'USD settlement preferred. Quarterly visits in Q1 and Q3.', avatar: 'JW' },
  { id: 'OW005', name: 'Sarah Holt', nationality: 'Australian', email: 'sarah.holt@outlook.com', phone: '+61 4 1234 5678', villas: ['VM005'], totalVillas: 1, totalRevenue: 22100, status: 'Active', joinDate: 'Feb 2020', contractType: 'Revenue Share 75/25', bankName: 'ANZ Australia', accountNo: '***3390', notes: 'Plans to expand to 2nd villa in Uluwatu area by EOY.', avatar: 'SH' },
  { id: 'OW006', name: 'Marco Ricci', nationality: 'Italian', email: 'm.ricci@riccivillas.it', phone: '+39 347 123 4567', villas: ['VM007'], totalVillas: 1, totalRevenue: 15800, status: 'Active', joinDate: 'Jan 2022', contractType: 'Full Management', bankName: 'Wise (EUR)', accountNo: '***7743', notes: 'New owner — onboarding phase complete. Active on WhatsApp.', avatar: 'MR' },
  { id: 'OW007', name: 'Liu Wei', nationality: 'Chinese', email: 'liuwei@wechat.cn', phone: '+86 138 0013 8000', villas: ['VM008'], totalVillas: 1, totalRevenue: 26700, status: 'Active', joinDate: 'Apr 2020', contractType: 'Revenue Share 80/20', bankName: 'CIMB Niaga', accountNo: '***5512', notes: 'Reports preferred in English. WeChat primary communication.', avatar: 'LW' },
];

// ─── Staff Directory ──────────────────────────────────────────────────────────
export const staffDirectory = [
  { id: 'SF001', name: 'Made Suarjana', role: 'Supervisor', department: 'Operations', villa: 'Villa Tirta 05', status: 'active', phone: '+62 812-111-2222', email: 'made.s@bav.co.id', joinDate: 'Mar 2019', shift: 'Morning', taskCompletion: 94, attendance: 98, performanceScore: 96, avatar: 'MS', certifications: ['Supervisor L2', 'First Aid', 'Fire Safety'] },
  { id: 'SF002', name: 'Putu Artawan', role: 'Supervisor', department: 'Operations', villa: 'Villa Puri 12', status: 'active', phone: '+62 812-222-3333', email: 'putu.a@bav.co.id', joinDate: 'Jan 2020', shift: 'Morning', taskCompletion: 91, attendance: 96, performanceScore: 93, avatar: 'PA', certifications: ['Supervisor L1', 'First Aid'] },
  { id: 'SF003', name: 'Wayan Darma', role: 'MEP Technician', department: 'Maintenance', villa: 'Villa Sawah 03', status: 'break', phone: '+62 813-333-4444', email: 'wayan.d@bav.co.id', joinDate: 'Jul 2018', shift: 'Morning', taskCompletion: 87, attendance: 92, performanceScore: 88, avatar: 'WD', certifications: ['Electrical L2', 'Plumbing Basic'] },
  { id: 'SF004', name: 'Ketut Riana', role: 'Supervisor', department: 'Operations', villa: 'Villa Lumbung 08', status: 'active', phone: '+62 812-444-5555', email: 'ketut.r@bav.co.id', joinDate: 'May 2017', shift: 'Morning', taskCompletion: 97, attendance: 99, performanceScore: 98, avatar: 'KR', certifications: ['Supervisor L3', 'First Aid', 'Pool Maintenance', 'Fire Safety'] },
  { id: 'SF005', name: 'Ni Luh Suartini', role: 'Housekeeper', department: 'Housekeeping', villa: 'Villa Tebing 01', status: 'active', phone: '+62 812-555-6666', email: 'niluh.su@bav.co.id', joinDate: 'Oct 2021', shift: 'Morning', taskCompletion: 89, attendance: 95, performanceScore: 90, avatar: 'NS', certifications: ['Housekeeping Standard'] },
  { id: 'SF006', name: 'Dewa Asmara', role: 'Sales Executive', department: 'Sales', villa: 'HQ', status: 'active', phone: '+62 812-666-7777', email: 'dewa.a@bav.co.id', joinDate: 'Feb 2022', shift: 'Office Hours', taskCompletion: 82, attendance: 97, performanceScore: 85, avatar: 'DA', certifications: ['Sales Pro', 'CRM Certified'] },
  { id: 'SF007', name: 'Rina Sari', role: 'Sales Manager', department: 'Sales', villa: 'HQ', status: 'active', phone: '+62 812-777-8888', email: 'rina.s@bav.co.id', joinDate: 'Aug 2019', shift: 'Office Hours', taskCompletion: 95, attendance: 98, performanceScore: 97, avatar: 'RS', certifications: ['Sales Manager', 'Revenue Management'] },
  { id: 'SF008', name: 'Gede Wirawan', role: 'Pool Technician', department: 'Maintenance', villa: 'Multiple', status: 'active', phone: '+62 813-888-9999', email: 'gede.w@bav.co.id', joinDate: 'Dec 2020', shift: 'Morning', taskCompletion: 93, attendance: 94, performanceScore: 92, avatar: 'GW', certifications: ['Pool Maintenance L2', 'Chemical Handling'] },
  { id: 'SF009', name: 'Komang Dewi', role: 'Housekeeper', department: 'Housekeeping', villa: 'Villa Bukit 11', status: 'leave', phone: '+62 812-999-0000', email: 'komang.d@bav.co.id', joinDate: 'Mar 2023', shift: 'Morning', taskCompletion: 88, attendance: 90, performanceScore: 87, avatar: 'KD', certifications: ['Housekeeping Standard'] },
  { id: 'SF010', name: 'Ngurah Astawa', role: 'Driver', department: 'Operations', villa: 'Multiple', status: 'active', phone: '+62 813-000-1111', email: 'ngurah.a@bav.co.id', joinDate: 'Jun 2021', shift: 'All Day', taskCompletion: 100, attendance: 99, performanceScore: 99, avatar: 'NA', certifications: ['Driving License B', 'Guest Relations'] },
];

// ─── Bookings ─────────────────────────────────────────────────────────────────
export const bookings = [
  { id: 'BK001', guestName: 'Sophia Laurent', guestAvatar: 'SL', guestNationality: 'French', villa: 'Villa Tirta 05', villaId: 'VM001', checkIn: '2026-05-14', checkOut: '2026-05-18', nights: 4, guests: 2, channel: 'Direct', status: 'Confirmed', value: 4200, paid: 4200, notes: 'Anniversary celebration. Champagne setup requested.', supervisor: 'Made Suarjana', createdAt: 'May 10' },
  { id: 'BK002', guestName: 'James Whitfield', guestAvatar: 'JW', guestNationality: 'British', villa: 'Villa Puri 12', villaId: 'VM002', checkIn: '2026-05-20', checkOut: '2026-05-27', nights: 7, guests: 4, channel: 'Website', status: 'Pending Payment', value: 7800, paid: 3900, notes: 'Yoga retreat group. Require early check-in at 10:00.', supervisor: 'Putu Artawan', createdAt: 'May 11' },
  { id: 'BK003', guestName: 'Aiko Tanaka', guestAvatar: 'AT', guestNationality: 'Japanese', villa: 'Villa Lumbung 08', villaId: 'VM004', checkIn: '2026-05-15', checkOut: '2026-05-22', nights: 7, guests: 6, channel: 'OTA', status: 'Confirmed', value: 12500, paid: 12500, notes: 'Family group. Birthday for one guest on May 18.', supervisor: 'Ketut Riana', createdAt: 'May 09' },
  { id: 'BK004', guestName: 'Marco Bellini', guestAvatar: 'MB', guestNationality: 'Italian', villa: 'Villa Canggu 04', villaId: 'VM007', checkIn: '2026-05-16', checkOut: '2026-05-19', nights: 3, guests: 2, channel: 'WhatsApp', status: 'Confirmed', value: 3600, paid: 1800, notes: 'Honeymoon. Flower arrangement requested.', supervisor: 'Wayan Darma', createdAt: 'May 12' },
  { id: 'BK005', guestName: 'Sarah Chen', guestAvatar: 'SC', guestNationality: 'Singaporean', villa: 'Villa Seminyak 07', villaId: 'VM008', checkIn: '2026-05-25', checkOut: '2026-06-01', nights: 7, guests: 4, channel: 'OTA', status: 'Provisional', value: 9200, paid: 0, notes: 'Awaiting final confirmation. Price negotiation ongoing.', supervisor: 'Ketut Riana', createdAt: 'May 12' },
  { id: 'BK006', guestName: 'David Park', guestAvatar: 'DP', guestNationality: 'Korean', villa: 'Villa Bukit 11', villaId: 'VM006', checkIn: '2026-05-13', checkOut: '2026-05-20', nights: 7, guests: 2, channel: 'Direct', status: 'Checked In', value: 15400, paid: 15400, notes: 'VIP guest. Previous stay rated 5 stars.', supervisor: 'Putu Artawan', createdAt: 'May 03' },
  { id: 'BK007', guestName: 'Emma Dubois', guestAvatar: 'ED', guestNationality: 'French', villa: 'Villa Tirta 05', villaId: 'VM001', checkIn: '2026-06-01', checkOut: '2026-06-07', nights: 6, guests: 3, channel: 'Referral', status: 'Confirmed', value: 5800, paid: 2900, notes: 'Friends trip. Airport transfer needed.', supervisor: 'Made Suarjana', createdAt: 'May 08' },
  { id: 'BK008', guestName: 'Raj Patel', guestAvatar: 'RP', guestNationality: 'Indian', villa: 'Villa Puri 12', villaId: 'VM002', checkIn: '2026-05-30', checkOut: '2026-06-05', nights: 6, guests: 5, channel: 'Website', status: 'Confirmed', value: 6700, paid: 3350, notes: 'Corporate retreat. Vegetarian meals required.', supervisor: 'Putu Artawan', createdAt: 'May 11' },
  { id: 'BK009', guestName: 'Lisa Muller', guestAvatar: 'LM', guestNationality: 'German', villa: 'Villa Sawah 03', villaId: 'VM003', checkIn: '2026-05-19', checkOut: '2026-05-24', nights: 5, guests: 2, channel: 'OTA', status: 'Confirmed', value: 4100, paid: 4100, notes: 'Surf holiday. Board storage needed.', supervisor: 'Wayan Darma', createdAt: 'May 10' },
  { id: 'BK010', guestName: 'Carlos Mendez', guestAvatar: 'CM', guestNationality: 'Mexican', villa: 'Villa Tebing 01', villaId: 'VM005', checkIn: '2026-05-28', checkOut: '2026-06-04', nights: 7, guests: 4, channel: 'Direct', status: 'Confirmed', value: 8900, paid: 4450, notes: 'Cliff view villa. Sunset dinner setup requested.', supervisor: 'Made Suarjana', createdAt: 'May 09' },
];

// ─── Maintenance Tickets ──────────────────────────────────────────────────────
export const maintenanceTickets = [
  { id: 'TK001', villa: 'Villa Tirta 05', villaId: 'VM001', issue: 'Pump pressure low and irregular noise', category: 'Plumbing', priority: 'high', status: 'in-progress', createdAt: 'May 10', createdBy: 'Made Suarjana', assignedTo: 'Pak Nyoman', vendorId: 'VN001', estimatedCost: 350000, actualCost: null, estimatedTime: '2h', aiDiagnosis: 'Pump cavitation or clogged impeller. Check suction line for air leaks.', slaDeadline: 'May 11 14:00', notes: 'Guest check-in at 15:00 — priority resolution needed.', photos: 2 },
  { id: 'TK002', villa: 'Villa Sawah 03', villaId: 'VM003', issue: 'AC unit room 2 not cooling', category: 'Air Conditioning', priority: 'high', status: 'open', createdAt: 'May 11', createdBy: 'Wayan Darma', assignedTo: null, vendorId: null, estimatedCost: 800000, actualCost: null, estimatedTime: '3–4h', aiDiagnosis: 'Possible refrigerant leak or dirty condenser coils. Check filter first.', slaDeadline: 'May 11 18:00', notes: 'Room 2 currently unoccupied. Guest arrival May 12.', photos: 1 },
  { id: 'TK003', villa: 'Villa Puri 12', villaId: 'VM002', issue: 'Kitchen drain clogged', category: 'Plumbing', priority: 'low', status: 'scheduled', createdAt: 'May 09', createdBy: 'Putu Artawan', assignedTo: 'Pak Nyoman', vendorId: 'VN001', estimatedCost: 150000, actualCost: null, estimatedTime: '1h', aiDiagnosis: 'Standard drain blockage. Snake tool or chemical dissolvent should resolve.', slaDeadline: 'May 13 10:00', notes: 'Schedule during housekeeping hours.', photos: 0 },
  { id: 'TK004', villa: 'Villa Lumbung 08', villaId: 'VM004', issue: 'Garden light circuit tripped', category: 'Electrical', priority: 'medium', status: 'resolved', createdAt: 'May 08', createdBy: 'Ketut Riana', assignedTo: 'Pak Ketut Listrik', vendorId: 'VN002', estimatedCost: 300000, actualCost: 250000, estimatedTime: '2h', aiDiagnosis: 'GFCI breaker tripped. Likely moisture ingress on outdoor fixture.', slaDeadline: 'May 09 12:00', notes: 'Resolved. Replaced 2 outdoor fixtures with IP65 rated ones.', photos: 3 },
  { id: 'TK005', villa: 'Villa Bukit 11', villaId: 'VM006', issue: 'Pool pump making grinding noise', category: 'Pool', priority: 'medium', status: 'in-progress', createdAt: 'May 11', createdBy: 'Putu Artawan', assignedTo: 'Made Pool Pro', vendorId: 'VN004', estimatedCost: 1200000, actualCost: null, estimatedTime: '4h', aiDiagnosis: 'Worn pump bearing or debris in impeller housing. Do not run until inspected.', slaDeadline: 'May 12 16:00', notes: 'Pool temporarily closed. Inform guest David Park.', photos: 1 },
  { id: 'TK006', villa: 'Villa Tebing 01', villaId: 'VM005', issue: 'Water heater not heating', category: 'Plumbing', priority: 'high', status: 'pending-parts', createdAt: 'May 07', createdBy: 'Made Suarjana', assignedTo: 'Pak Nyoman', vendorId: 'VN001', estimatedCost: 2500000, actualCost: null, estimatedTime: '1–2d', aiDiagnosis: 'Heating element failure. Unit is 5 years old — replacement recommended.', slaDeadline: 'May 14 12:00', notes: 'Ordered Ariston replacement unit. ETA May 13.', photos: 2 },
  { id: 'TK007', villa: 'Villa Canggu 04', villaId: 'VM007', issue: 'WiFi router offline in master bedroom', category: 'IT / WiFi', priority: 'low', status: 'resolved', createdAt: 'May 10', createdBy: 'Wayan Darma', assignedTo: 'Internal', vendorId: null, estimatedCost: 0, actualCost: 0, estimatedTime: '30m', aiDiagnosis: 'Router power cycle required. Check SSID broadcast and 5GHz band.', slaDeadline: 'May 10 20:00', notes: 'Resolved via remote reboot. Monitoring for recurrence.', photos: 0 },
  { id: 'TK008', villa: 'Villa Seminyak 07', villaId: 'VM008', issue: 'Sliding door track broken', category: 'Carpentry', priority: 'medium', status: 'scheduled', createdAt: 'May 11', createdBy: 'Ketut Riana', assignedTo: 'Bali Timber Works', vendorId: 'VN005', estimatedCost: 600000, actualCost: null, estimatedTime: '3h', aiDiagnosis: 'Track warped or roller bearing worn. Replacement required.', slaDeadline: 'May 15 10:00', notes: 'Schedule before May 14 guest check-in.', photos: 1 },
];

// ─── Analytics Report Data ────────────────────────────────────────────────────
export const revenueByVilla = [
  { villa: 'Villa Puri 12', revenue: 42600, direct: 28000, ota: 14600, nights: 22, adr: 1936 },
  { villa: 'Villa Lumbung 08', revenue: 35200, direct: 22000, ota: 13200, nights: 18, adr: 1956 },
  { villa: 'Villa Bukit 11', revenue: 31500, direct: 20000, ota: 11500, nights: 20, adr: 1575 },
  { villa: 'Villa Tirta 05', revenue: 28400, direct: 16200, ota: 12200, nights: 24, adr: 1183 },
  { villa: 'Villa Seminyak 07', revenue: 26700, direct: 15000, ota: 11700, nights: 22, adr: 1214 },
  { villa: 'Villa Tebing 01', revenue: 22100, direct: 12000, ota: 10100, nights: 18, adr: 1228 },
  { villa: 'Villa Sawah 03', revenue: 18900, direct: 9200, ota: 9700, nights: 19, adr: 995 },
  { villa: 'Villa Canggu 04', revenue: 15800, direct: 7500, ota: 8300, nights: 17, adr: 929 },
];

export const occupancyTrend = [
  { month: 'Oct', rate: 62, target: 70 },
  { month: 'Nov', rate: 68, target: 70 },
  { month: 'Dec', rate: 82, target: 75 },
  { month: 'Jan', rate: 74, target: 70 },
  { month: 'Feb', rate: 71, target: 70 },
  { month: 'Mar', rate: 76, target: 70 },
  { month: 'Apr', rate: 68, target: 70 },
  { month: 'May', rate: 72, target: 70 },
];

export const maintenanceCostData = [
  { month: 'Jan', plumbing: 4200, electrical: 2800, ac: 6100, pool: 3200, carpentry: 1800, other: 900 },
  { month: 'Feb', plumbing: 3100, electrical: 4500, ac: 5200, pool: 2900, carpentry: 2200, other: 1100 },
  { month: 'Mar', plumbing: 5600, electrical: 3200, ac: 4800, pool: 4100, carpentry: 1500, other: 800 },
  { month: 'Apr', plumbing: 2900, electrical: 3800, ac: 7200, pool: 3500, carpentry: 2800, other: 1200 },
  { month: 'May', plumbing: 4100, electrical: 2200, ac: 5900, pool: 2800, carpentry: 900, other: 700 },
];

export const channelPerformance = [
  { channel: 'Direct', bookings: 48, revenue: 142000, avgStay: 5.2, convRate: 38, avgValue: 2958 },
  { channel: 'OTA', bookings: 89, revenue: 198000, avgStay: 4.8, convRate: 22, avgValue: 2225 },
  { channel: 'WhatsApp', bookings: 42, revenue: 76000, avgStay: 4.1, convRate: 47, avgValue: 1810 },
  { channel: 'Website', bookings: 28, revenue: 94000, avgStay: 6.0, convRate: 19, avgValue: 3357 },
  { channel: 'Referral', bookings: 31, revenue: 112000, avgStay: 5.8, convRate: 69, avgValue: 3613 },
];

export const staffPerformance = [
  { name: 'Ketut Riana', role: 'Supervisor', taskScore: 97, attendanceScore: 99, guestScore: 98, tickets: 12, avgResolution: '1.8h' },
  { name: 'Made Suarjana', role: 'Supervisor', taskScore: 94, attendanceScore: 98, guestScore: 95, tickets: 10, avgResolution: '2.1h' },
  { name: 'Rina Sari', role: 'Sales Manager', taskScore: 95, attendanceScore: 98, guestScore: 97, tickets: 0, avgResolution: 'N/A' },
  { name: 'Putu Artawan', role: 'Supervisor', taskScore: 91, attendanceScore: 96, guestScore: 92, tickets: 8, avgResolution: '2.4h' },
  { name: 'Gede Wirawan', role: 'Pool Tech', taskScore: 93, attendanceScore: 94, guestScore: 91, tickets: 22, avgResolution: '3.2h' },
  { name: 'Wayan Darma', role: 'MEP Tech', taskScore: 87, attendanceScore: 92, guestScore: 88, tickets: 18, avgResolution: '2.9h' },
];
