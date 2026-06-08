import React, { useState } from 'react';

const appointments = [
  { time: '09:00\nAM', patient: 'Arjun Mehta',   type: 'Follow-up',      doctor: 'Dr. Riya Sharma', dept: 'Cardiology',  status: 'Confirmed', room: 'OPD-3' },
  { time: '09:30\nAM', patient: 'Meena Das',      type: 'New Consultation',doctor: 'Dr. S. Iyer',     dept: 'Neurology',   status: 'Confirmed', room: 'OPD-7' },
  { time: '10:15\nAM', patient: 'Raju Verma',     type: 'Lab Review',     doctor: 'Dr. P. Verma',    dept: 'Orthopedics', status: 'Waiting',   room: 'OPD-2' },
  { time: '11:00\nAM', patient: 'Sana Sheikh',    type: 'Follow-up',      doctor: 'Dr. Anil Kumar',  dept: 'Gynecology',  status: 'Confirmed', room: 'OPD-5' },
  { time: '11:30\nAM', patient: 'Vikas Singh',    type: 'Emergency',      doctor: 'Dr. Riya Sharma', dept: 'Cardiology',  status: 'Urgent',    room: 'ER-1'  },
  { time: '12:00\nPM', patient: 'Pooja Tiwari',   type: 'New Consultation',doctor: 'Dr. M. Singh',   dept: 'Pediatrics',  status: 'Confirmed', room: 'OPD-9' },
  { time: '02:00\nPM', patient: 'Harish Nanda',   type: 'Post-Surgery',   doctor: 'Dr. P. Verma',    dept: 'Orthopedics', status: 'Confirmed', room: 'Ward-B'},
  { time: '03:30\nPM', patient: 'Lalita Goyal',   type: 'Follow-up',      doctor: 'Dr. S. Iyer',     dept: 'Neurology',   status: 'Cancelled', room: 'OPD-7' },
];

const statusStyle = {
  Confirmed: 'b-green',
  Waiting:   'b-amber',
  Urgent:    'b-red',
  Cancelled: 'b-purple',
};

const vitals = [
  { label: 'Avg Wait Time',    val: '18',  unit: 'min',  status: '↑ 3 min vs yesterday', statusColor: '#EF4444', bg: 'rgba(239,68,68,0.08)' },
  { label: 'Scheduled Today',  val: '32',  unit: 'appts',status: '4 pending confirmation', statusColor: '#F59E0B', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Completed',        val: '14',  unit: 'done', status: '43% of day complete',   statusColor: '#10B981', bg: 'rgba(16,185,129,0.08)' },
  { label: 'Doctors On Duty',  val: '9',   unit: 'active',status: '2 on break',           statusColor: '#2563EB', bg: 'rgba(37,99,235,0.08)'  },
];

export default function Appointments() {
  const [filter, setFilter] = useState('All');
  const statuses = ['All', 'Confirmed', 'Waiting', 'Urgent', 'Cancelled'];

  const filtered = filter === 'All' ? appointments : appointments.filter(a => a.status === filter);

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Appointments</div>
        <div className="page-sub">Today's schedule — Monday, June 8, 2026</div>
      </div>

      {/* Vitals strip */}
      <div className="grid-4" style={{ marginBottom: 24 }}>
        {vitals.map((v, i) => (
          <div key={i} className="card" style={{ background: v.bg, border: 'none' }}>
            <div className="stat-label">{v.label}</div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 30, fontWeight: 700, letterSpacing: -1 }}>
              {v.val} <span style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{v.unit}</span>
            </div>
            <div style={{ fontSize: 12, color: v.statusColor, marginTop: 5, fontWeight: 500 }}>{v.status}</div>
          </div>
        ))}
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18, flexWrap: 'wrap' }}>
        {statuses.map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '7px 16px',
            borderRadius: 999,
            border: `1px solid ${filter === s ? 'var(--blue)' : 'var(--border)'}`,
            background: filter === s ? 'var(--blue-dim)' : 'transparent',
            color: filter === s ? 'var(--blue)' : 'var(--text-muted)',
            fontSize: 13, fontWeight: 500, cursor: 'pointer',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
          }}>
            {s}
          </button>
        ))}
      </div>

      {/* Appointment list */}
      <div className="card">
        <div className="sec-title">
          Today's Appointments
          <span className="sec-link">+ Add Appointment</span>
        </div>

        {filtered.map((a, i) => (
          <div key={i} className="appt-item">
            <div className="appt-time-box">{a.time}</div>
            <div style={{ flex: 1 }}>
              <div className="appt-name">{a.patient}</div>
              <div className="appt-type">{a.type} · {a.dept}</div>
            </div>
            <div style={{ textAlign: 'right', marginRight: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{a.doctor}</div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>Room: {a.room}</div>
            </div>
            <span className={`badge ${statusStyle[a.status]}`}>{a.status}</span>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)', fontSize: 14 }}>
            No appointments with this status.
          </div>
        )}
      </div>
    </div>
  );
}
