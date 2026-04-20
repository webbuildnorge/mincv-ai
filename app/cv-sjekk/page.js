'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './cvsjekk.module.css';

export default function CVSjekk() {
  const [cv, setCv] = useState('');
  const [ad, setAd] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleCheck() {
    if (!cv.trim() || !ad.trim()) {
      setError('Fyll inn både CV og stillingsannonse.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `Du er en norsk karriererådgiver. Analyser CV-en mot stillingsannonsen og returner KUN et JSON-objekt (ingen markdown, ingen forklaring) med disse feltene:
{
  "score": <tall 0-100>,
  "sammendrag": "<2 setninger om match>",
  "styrker": ["<punkt>", "<punkt>", "<punkt>"],
  "mangler": ["<punkt>", "<punkt>", "<punkt>"],
  "tips": ["<konkret tips>", "<konkret tips>", "<konkret tips>"]
}`,
          messages: [{
            role: 'user',
            content: `CV:\n${cv}\n\nStillingsannonse:\n${ad}`
          }]
        })
      });

      const data = await res.json();
      const text = data.content?.map(b => b.text || '').join('') || '';
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);
      setResult(parsed);
    } catch (e) {
      setError('Noe gikk galt. Prøv igjen.');
    }
    setLoading(false);
  }

  const scoreColor = result ? (result.score >= 70 ? '#10b981' : result.score >= 45 ? '#f59e0b' : '#ef4444') : '#3b82f6';

  return (
    <div className={styles.page}>

      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          MinCV<span className="tg">.ai</span>
        </Link>
        <Link href="/dashboard" className="btn btn-s" style={{ fontSize: 13 }}>← Dashboard</Link>
      </nav>

      <div className={styles.container}>
        <div className={styles.header}>
          <div className="badge-pill" style={{ marginBottom: '1rem' }}>
            <div className="badge-dot" />AI-drevet analyse
          </div>
          <h1>CV-sjekk mot <span className="tg">stillingsannonse</span></h1>
          <p>Lim inn CV-en din og stillingsannonsen. AI-en analyserer og gir deg konkrete tips på sekunder.</p>
        </div>

        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <label>Din CV</label>
            <textarea
              placeholder="Lim inn innholdet fra CV-en din her..."
              value={cv}
              onChange={e => setCv(e.target.value)}
              rows={12}
            />
            <span className={styles.charCount}>{cv.length} tegn</span>
          </div>
          <div className={styles.inputGroup}>
            <label>Stillingsannonse</label>
            <textarea
              placeholder="Lim inn stillingsannonsen her..."
              value={ad}
              onChange={e => setAd(e.target.value)}
              rows={12}
            />
            <span className={styles.charCount}>{ad.length} tegn</span>
          </div>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
          <button className="btn btn-p btn-lg" onClick={handleCheck} disabled={loading}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className={styles.spinner} />Analyserer...
              </span>
            ) : '🔍 Analyser CV-en min'}
          </button>
          <p style={{ fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>Ingen registrering nødvendig · Gratis</p>
        </div>

        {result && (
          <div className={styles.result}>

            {/* SCORE */}
            <div className={styles.scoreCard}>
              <div className={styles.scoreCircle} style={{ background: `conic-gradient(${scoreColor} ${result.score}%, var(--bg3) 0)` }}>
                <div className={styles.scoreInner}>
                  <div className={styles.scoreNum} style={{ color: scoreColor }}>{result.score}</div>
                  <div className={styles.scoreLabel}>/ 100</div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  {result.score >= 70 ? '🟢 Godt samsvar' : result.score >= 45 ? '🟡 Middels samsvar' : '🔴 Svakt samsvar'}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>{result.sammendrag}</p>
              </div>
            </div>

            {/* DETAILS */}
            <div className={styles.detailGrid}>
              <div className={styles.detailCard} style={{ borderTop: '3px solid #10b981' }}>
                <h4>✅ Styrker</h4>
                <ul>{result.styrker?.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
              <div className={styles.detailCard} style={{ borderTop: '3px solid #ef4444' }}>
                <h4>❌ Mangler</h4>
                <ul>{result.mangler?.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
              <div className={styles.detailCard} style={{ borderTop: '3px solid #3b82f6', gridColumn: 'span 2' }}>
                <h4>💡 Konkrete tips</h4>
                <ul>{result.tips?.map((s, i) => <li key={i}>{s}</li>)}</ul>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Link href="/dashboard" className="btn btn-p">Legg til i søknadsoversikt →</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
