'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './dashboard.module.css';

const STATUSES = ['Sendt', 'Under vurdering', 'Intervju', 'Tilbud', 'Avslag'];

const STATUS_COLORS = {
  'Sendt': '#3b82f6',
  'Under vurdering': '#f59e0b',
  'Intervju': '#8b5cf6',
  'Tilbud': '#10b981',
  'Avslag': '#ef4444',
};

const EXAMPLE_JOBS = [
  { id: 1, title: 'Frontend-utvikler', company: 'Bekk Consulting', status: 'Intervju', deadline: '2026-05-01', url: 'https://finn.no', note: 'Spennende stilling!' },
  { id: 2, title: 'UX Designer', company: 'Finn.no', status: 'Sendt', deadline: '2026-04-28', url: '', note: '' },
  { id: 3, title: 'Fullstack-utvikler', company: 'Equinor', status: 'Under vurdering', deadline: '2026-05-10', url: '', note: 'Sjekk opp lønn' },
];

export default function Dashboard() {
  const [jobs, setJobs] = useState(EXAMPLE_JOBS);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('Alle');
  const [form, setForm] = useState({ title: '', company: '', status: 'Sendt', deadline: '', url: '', note: '' });
  const [editId, setEditId] = useState(null);

  const filtered = filter === 'Alle' ? jobs : jobs.filter(j => j.status === filter);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.company) return;
    if (editId !== null) {
      setJobs(jobs.map(j => j.id === editId ? { ...form, id: editId } : j));
      setEditId(null);
    } else {
      setJobs([...jobs, { ...form, id: Date.now() }]);
    }
    setForm({ title: '', company: '', status: 'Sendt', deadline: '', url: '', note: '' });
    setShowForm(false);
  }

  function handleEdit(job) {
    setForm({ title: job.title, company: job.company, status: job.status, deadline: job.deadline, url: job.url || '', note: job.note || '' });
    setEditId(job.id);
    setShowForm(true);
  }

  function handleDelete(id) {
    setJobs(jobs.filter(j => j.id !== id));
  }

  const counts = STATUSES.reduce((acc, s) => { acc[s] = jobs.filter(j => j.status === s).length; return acc; }, {});

  return (
    <div className={styles.page}>

      {/* NAV */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          MinCV<span className="tg">.ai</span>
        </Link>
        <div className={styles.navRight}>
          <Link href="/cv-sjekk" className="btn btn-s" style={{ fontSize: 13 }}>CV-sjekk</Link>
          <div className={styles.avatar}>JS</div>
        </div>
      </nav>

      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div>
            <h1>Mine søknader</h1>
            <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>{jobs.length} søknader totalt</p>
          </div>
          <button className="btn btn-p" onClick={() => { setShowForm(true); setEditId(null); setForm({ title: '', company: '', status: 'Sendt', deadline: '', url: '', note: '' }); }}>
            + Ny søknad
          </button>
        </div>

        {/* STATS */}
        <div className={styles.statsRow}>
          {STATUSES.map(s => (
            <div key={s} className={styles.statCard} style={{ borderTop: `3px solid ${STATUS_COLORS[s]}` }}>
              <div className={styles.statN} style={{ color: STATUS_COLORS[s] }}>{counts[s]}</div>
              <div className={styles.statL}>{s}</div>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className={styles.filters}>
          {['Alle', ...STATUSES].map(s => (
            <button
              key={s}
              className={styles.filterBtn}
              style={{ background: filter === s ? STATUS_COLORS[s] || 'var(--primary)' : 'var(--bg3)', color: filter === s ? '#fff' : 'var(--muted)', borderColor: filter === s ? 'transparent' : 'var(--border2)' }}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {/* FORM */}
        {showForm && (
          <div className={styles.formCard}>
            <div className={styles.formHeader}>
              <h3>{editId !== null ? 'Rediger søknad' : 'Legg til ny søknad'}</h3>
              <button onClick={() => setShowForm(false)} className={styles.closeBtn}>✕</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Stillingstittel *</label>
                  <input placeholder="f.eks. Frontend-utvikler" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Bedrift *</label>
                  <input placeholder="f.eks. Bekk Consulting" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} required />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Status</label>
                  <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                    {STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Søknadsfrist</label>
                  <input type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>URL til stillingen</label>
                <input placeholder="https://finn.no/..." value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              </div>
              <div className={styles.formGroup}>
                <label>Notater</label>
                <textarea placeholder="Legg til egne notater..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} rows={3} />
              </div>
              <div className={styles.formActions}>
                <button type="button" className="btn btn-s" onClick={() => setShowForm(false)}>Avbryt</button>
                <button type="submit" className="btn btn-p">{editId !== null ? 'Lagre endringer' : 'Legg til søknad'}</button>
              </div>
            </form>
          </div>
        )}

        {/* JOB LIST */}
        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <p>Ingen søknader her enda.</p>
            <button className="btn btn-p" style={{ marginTop: 16 }} onClick={() => setShowForm(true)}>+ Legg til din første søknad</button>
          </div>
        ) : (
          <div className={styles.jobList}>
            {filtered.map(job => (
              <div key={job.id} className={styles.jobCard}>
                <div className={styles.jobLeft}>
                  <div className={styles.jobTitle}>{job.title}</div>
                  <div className={styles.jobCompany}>{job.company}</div>
                  {job.note && <div className={styles.jobNote}>{job.note}</div>}
                </div>
                <div className={styles.jobRight}>
                  <div className={styles.statusBadge} style={{ background: STATUS_COLORS[job.status] + '22', color: STATUS_COLORS[job.status], border: `1px solid ${STATUS_COLORS[job.status]}44` }}>
                    {job.status}
                  </div>
                  {job.deadline && (
                    <div className={styles.deadline}>
                      📅 {new Date(job.deadline).toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' })}
                    </div>
                  )}
                  <div className={styles.jobActions}>
                    {job.url && <a href={job.url} target="_blank" rel="noopener noreferrer" className={styles.iconBtn} title="Åpne annonse">🔗</a>}
                    <button className={styles.iconBtn} onClick={() => handleEdit(job)} title="Rediger">✏️</button>
                    <button className={styles.iconBtn} onClick={() => handleDelete(job.id)} title="Slett">🗑️</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
