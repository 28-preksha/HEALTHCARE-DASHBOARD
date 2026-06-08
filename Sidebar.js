import React from 'react';
import { LayoutDashboard, Users, CalendarDays, Activity, FileText, Settings, Sun, Moon, LogOut } from 'lucide-react';

const nav = [
  { id: 'overview',     label: 'Overview',     icon: LayoutDashboard },
  { id: 'patients',     label: 'Patients',      icon: Users },
  { id: 'appointments', label: 'Appointments',  icon: CalendarDays },
];

const nav2 = [
  { id: 'reports',  label: 'Reports',  icon: FileText },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ tab, setTab, dark, setDark }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-dot">🏥</div>
        MediCare Pro
      </div>

      <div className="nav-group">
        <div className="nav-section-label">Main Menu</div>
        {nav.map(({ id, label, icon: Icon }) => (
          <button key={id} className={`nav-item ${tab === id ? 'active' : ''}`} onClick={() => setTab(id)}>
            <Icon size={16} />{label}
          </button>
        ))}

        <div className="nav-section-label">Tools</div>
        {nav2.map(({ id, label, icon: Icon }) => (
          <button key={id} className="nav-item">
            <Icon size={16} />{label}
          </button>
        ))}
      </div>

      <div className="sidebar-bottom">
        <button className="theme-btn" onClick={() => setDark(!dark)}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {dark ? <Moon size={14} /> : <Sun size={14} />}
            {dark ? 'Dark Mode' : 'Light Mode'}
          </span>
          <div className={`pill ${dark ? 'on' : ''}`} />
        </button>
        <div className="doctor-card">
          <div className="avatar">DR</div>
          <div style={{ flex: 1 }}>
            <div className="doc-name">Dr. Riya Sharma</div>
            <div className="doc-role">Cardiologist</div>
          </div>
          <LogOut size={14} style={{ color: 'var(--text-muted)', cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  );
}
