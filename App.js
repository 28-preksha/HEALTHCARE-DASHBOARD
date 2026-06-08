import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import Patients from './components/Patients';
import Appointments from './components/Appointments';
import './styles.css';

export default function App() {
  const [tab, setTab] = useState('overview');
  const [dark, setDark] = useState(true);

  const page = { overview: <Overview />, patients: <Patients />, appointments: <Appointments /> }[tab];

  return (
    <div className={`app-root ${dark ? 'dark' : 'light'}`}>
      <Sidebar tab={tab} setTab={setTab} dark={dark} setDark={setDark} />
      <main className="main-content">{page}</main>
    </div>
  );
}
