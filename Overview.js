import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Users, UserCheck, BedDouble, TrendingUp, TrendingDown, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const weekData = [
  { day: 'Mon', admitted: 12, discharged: 8  },
  { day: 'Tue', admitted: 18, discharged: 14 },
  { day: 'Wed', admitted: 9,  discharged: 11 },
  { day: 'Thu', admitted: 22, discharged: 16 },
  { day: 'Fri', admitted: 15, discharged: 13 },
  { day: 'Sat', admitted: 8,  discharged: 7  },
  { day: 'Sun', admitted: 6,  discharged: 9  },
];

const revenueData = [
  { month: 'Jan', revenue: 420000 },
  { month: 'Feb', revenue: 380000 },
  { month: 'Mar', revenue: 510000 },
  { month: 'Apr', revenue: 490000 },
  { month: 'May', revenue: 560000 },
  { month: 'Jun', revenue: 610000 },
];

const depts = [
  { name: 'Cardiology',   patients: 48, capacity: 60, color: '#EF4444' },
  { name: 'Neurology',    patients: 32, capacity: 50, color: '#8B5CF6' },
  { name: 'Orthopedics',  patients: 27, capacity: 40, color: '#2563EB' },
  { name: 'Pediatrics',   patients: 41, capacity: 55, color: '#10B981' },
];

const alerts = [
  { type: 'critical', icon: <AlertCircle size={16} />, title: 'ICU Bed Capacity at 92%', text: 'Only 4 ICU beds remaining. Consider patient transfers.' },
  { type: 'warning',  icon: <AlertTriangle size={16} />, title: 'Lab Results Pending',    text: '12 patient lab results overdue by more than 6 hours.' },
  { type: 'info',     icon: <Info size={16} />,          title: 'Staff Meeting Today',    text: 'Monthly review at 5:00 PM in Conference Hall B.' },
];

export default function Overview() {
  return (
    <div>
      <div className="page-header">
        <div className="page-title">Hospital Overview</div>
        <div className="page-sub">Monday, June 8, 2026 — General Ward, City Medical Center</div>
      </div>

      {/* Stats */}
      <div className="grid-4">
        {[
          { label: 'Total Patients', val: '284',  sub: '+12 today',       icon: <Users size={20} color="#2563EB" />, bg: 'rgba(37,99,235,0.12)',  trend: 'up' },
          { label: 'Discharged',     val: '58',   sub: '+8 vs yesterday', icon: <UserCheck size={20} color="#10B981" />, bg: 'rgba(16,185,129,0.12)', trend: 'up' },
          { label: 'Beds Occupied',  val: '148',  sub: '74% occupancy',   icon: <BedDouble size={20} color="#F59E0B" />, bg: 'rgba(245,158,11,0.12)', trend: 'down' },
          { label: 'Critical Cases', val: '17',   sub: '-3 vs yesterday', icon: <AlertCircle size={20} color="#EF4444" />, bg: 'rgba(239,68,68,0.12)', trend: 'down' },
        ].map((s, i) => (
          <div className="card stat-card" key={i}>
            <div className="stat-icon-box" style={{ background: s.bg }}>{s.icon}</div>
            <div className="stat-label">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className={`stat-sub ${s.trend}`}>
              {s.trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid-2">
        <div className="card">
          <div className="sec-title">Admissions vs Discharges <span className="sec-link">This Week</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weekData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="day" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background: 'var(--surface2)', border: 'none', borderRadius: 10, fontSize: 13 }} />
              <Bar dataKey="admitted"   name="Admitted"   fill="#2563EB" radius={[4,4,0,0]} />
              <Bar dataKey="discharged" name="Discharged" fill="#10B981" radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <div className="sec-title">Monthly Revenue <span className="sec-link">6 months</span></div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" tick={{ fill: 'var(--text-muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                formatter={(v) => [`₹${(v/100000).toFixed(1)}L`, 'Revenue']}
                contentStyle={{ background: 'var(--surface2)', border: 'none', borderRadius: 10, fontSize: 13 }}
              />
              <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Departments + Alerts */}
      <div className="grid-2">
        <div className="card">
          <div className="sec-title">Department Occupancy</div>
          {depts.map((d, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                <span style={{ fontWeight: 600 }}>{d.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>{d.patients}/{d.capacity} beds</span>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width: `${Math.round((d.patients/d.capacity)*100)}%`, background: d.color }} />
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
                {Math.round((d.patients/d.capacity)*100)}% occupied
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="sec-title">Active Alerts</div>
          {alerts.map((a, i) => (
            <div className={`alert-card ${a.type}`} key={i}>
              <div style={{ marginTop: 1, flexShrink: 0, color: a.type === 'critical' ? 'var(--red)' : a.type === 'warning' ? 'var(--amber)' : 'var(--blue)' }}>
                {a.icon}
              </div>
              <div>
                <div className="alert-title">{a.title}</div>
                <div className="alert-text">{a.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
