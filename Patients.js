import React, { useState } from 'react';
import { Search } from 'lucide-react';

const patients = [
  { id: 'P-1042', name: 'Arjun Mehta',    age: 54, gender: 'Male',   dept: 'Cardiology',  status: 'Critical', admitted: 'Jun 2', doctor: 'Dr. Riya Sharma',  color: '#EF4444', initials: 'AM', bg: '#EF444430' },
  { id: 'P-1041', name: 'Priya Nair',     age: 31, gender: 'Female', dept: 'Gynecology',  status: 'Stable',   admitted: 'Jun 4', doctor: 'Dr. Anil Kumar',   color: '#10B981', initials: 'PN', bg: '#10B98130' },
  { id: 'P-1040', name: 'Ravi Shankar',   age: 67, gender: 'Male',   dept: 'Neurology',   status: 'Stable',   admitted: 'Jun 5', doctor: 'Dr. S. Iyer',      color: '#10B981', initials: 'RS', bg: '#8B5CF630' },
  { id: 'P-1039', name: 'Kavita Joshi',   age: 45, gender: 'Female', dept: 'Orthopedics', status: 'Recovering',admitted: 'Jun 1', doctor: 'Dr. P. Verma',    color: '#F59E0B', initials: 'KJ', bg: '#F59E0B30' },
  { id: 'P-1038', name: 'Suresh Patel',   age: 72, gender: 'Male',   dept: 'Cardiology',  status: 'Critical', admitted: 'May 30',doctor: 'Dr. Riya Sharma',  color: '#EF4444', initials: 'SP', bg: '#EF444430' },
  { id: 'P-1037', name: 'Neha Gupta',     age: 28, gender: 'Female', dept: 'Pediatrics',  status: 'Stable',   admitted: 'Jun 6', doctor: 'Dr. M. Singh',     color: '#10B981', initials: 'NG', bg: '#10B98130' },
  { id: 'P-1036', name: 'Deepak Rao',     age: 58, gender: 'Male',   dept: 'Neurology',   status: 'Recovering',admitted: 'May 28',doctor: 'Dr. S. Iyer',     color: '#F59E0B', initials: 'DR', bg: '#8B5CF630' },
  { id: 'P-1035', name: 'Sunita Verma',   age: 40, gender: 'Female', dept: 'Cardiology',  status: 'Stable',   admitted: 'Jun 3', doctor: 'Dr. Riya Sharma',  color: '#10B981', initials: 'SV', bg: '#EF444430' },
];

const statusBadge = { Critical: 'b-red', Stable: 'b-green', Recovering: 'b-amber' };

export default function Patients() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const depts = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Gynecology'];
  const filtered = patients.filter(p =>
    (filter === 'All' || p.dept === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.includes(search))
  );

  return (
    <div>
      <div className="page-header">
        <div className="page-title">Patient Records</div>
        <div className="page-sub">{patients.length} total patients · {patients.filter(p => p.status === 'Critical').length} critical</div>
      </div>

      {/* Search + Filter */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 22, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or ID..."
            style={{
              width: '100%', padding: '10px 12px 10px 36px',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: 13,
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              outline: 'none',
              borderRadius: 10,
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {depts.map(d => (
            <button key={d} onClick={() => setFilter(d)} style={{
              padding: '9px 14px',
              borderRadius: 10,
              border: `1px solid ${filter === d ? 'var(--blue)' : 'var(--border)'}`,
              background: filter === d ? 'var(--blue-dim)' : 'transparent',
              color: filter === d ? 'var(--blue)' : 'var(--text-muted)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
            }}>
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Patient table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--surface2)', borderBottom: '1px solid var(--border)' }}>
              {['Patient', 'ID', 'Age/Gender', 'Department', 'Doctor', 'Admitted', 'Status'].map(h => (
                <th key={h} style={{ padding: '13px 16px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--surface2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: '50%', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: p.color, flexShrink: 0 }}>
                      {p.initials}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</span>
                  </div>
                </td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)', fontFamily: 'monospace' }}>{p.id}</td>
                <td style={{ padding: '14px 16px', fontSize: 13 }}>{p.age} · {p.gender}</td>
                <td style={{ padding: '14px 16px' }}><span className={`badge b-blue`} style={{ fontSize: 11 }}>{p.dept}</span></td>
                <td style={{ padding: '14px 16px', fontSize: 13 }}>{p.doctor}</td>
                <td style={{ padding: '14px 16px', fontSize: 13, color: 'var(--text-muted)' }}>{p.admitted}</td>
                <td style={{ padding: '14px 16px' }}><span className={`badge ${statusBadge[p.status]}`}>{p.status}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} style={{ padding: 32, textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
                  No patients found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
