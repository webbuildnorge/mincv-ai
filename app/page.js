import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>M</div>
          MinCV<span className="tg">.ai</span>
        </div>
        <div className={styles.navLinks}>
          <Link href="#features">Funksjoner</Link>
          <Link href="#pricing">Priser</Link>
          <Link href="/cv-sjekk">CV-sjekk</Link>
        </div>
        <div className={styles.navRight}>
          <Link href="/dashboard" className="btn btn-s">Logg inn</Link>
          <Link href="/dashboard" className="btn btn-p">Start gratis</Link>
        </div>
      </nav>

      <div className={styles.heroWrap}>
        <div className={styles.heroGlow} />
        <div className={styles.heroLine} />
        <div className={styles.heroInner}>
          <div className="badge-pill" style={{ marginBottom: '2.25rem' }}>
            <div className="badge-dot" />
            Norges smarteste verktøy for jobbsøkere
          </div>
          <h1>Full kontroll på<br /><span className="tg">alle jobbsøknader</span></h1>
          <p>MinCV.ai hjelper deg med å holde styr på søknader, frister og oppfølging – slik at du kan fokusere på å sikre drømmejobben.</p>
          <div className={styles.heroBtns}>
            <Link href="/dashboard" className="btn btn-p btn-lg">Start gratis nå →</Link>
            <Link href="#pricing" className="btn btn-s btn-lg">Se priser</Link>
          </div>
          <div className={styles.heroMeta}>
            <span><div className={styles.dot} />Opprett konto på 30 sekunder</span>
            <span><div className={styles.dot} />Ingen kortregistrering</span>
            <span><div className={styles.dot} />Ingen binding</span>
          </div>
        </div>
      </div>

      <div className={styles.trust}>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>Kryptert og sikker</div>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>GDPR-kompatibel</div>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>Lynrask</div>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>99,9% oppetid</div>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>Norsk tjeneste</div>
        <div className={styles.trustItem}><div className={styles.trustIcon}>✓</div>Gratis support</div>
      </div>

      <div className={styles.section} id="features">
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>Funksjoner</div>
          <h2>Alt du trenger for <span className="tg">jobbsøket</span></h2>
          <p>Kraftige AI-verktøy som gjør jobbsøkingen enklere og mer organisert.</p>
        </div>
        <div className={styles.featGrid}>
          <div className={styles.featCard}>
            <div className={styles.featTag}>NYTT</div>
            <div className={styles.featIcon}>🤖</div>
            <h3>AI øvingsintervju</h3>
            <p>Øv med en AI-intervjuer som stiller realistiske spørsmål og gir personlig tilbakemelding.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featTag}>NYTT</div>
            <div className={styles.featIcon}>🎯</div>
            <h3>Intervjuforberedelse med AI</h3>
            <p>Skreddersydde spørsmål og lønnsdata generert for hver stilling du søker på.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}>📄</div>
            <h3>AI CV-analyse</h3>
            <p>Se hvilke ferdigheter du bør fremheve – automatisk tilpasset stillingsannonsen.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}>📋</div>
            <h3>Kanban-brett</h3>
            <p>Se alle søknader på ett sted med status, frister og notater.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}>⚡</div>
            <h3>Import fra Finn.no</h3>
            <p>Lim inn en jobb-URL og få alle detaljer automatisk.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featTag}>NYTT</div>
            <div className={styles.featIcon}>🔗</div>
            <h3>Offentlig CV-side</h3>
            <p>Del CV-en din med en personlig lenke som mincv.ai/ditt-navn.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}>📊</div>
            <h3>15 CV-maler</h3>
            <p>Eksporter til 15 profesjonelle PDF-maler.</p>
          </div>
          <div className={styles.featCard}>
            <div className={styles.featIcon}>🔥</div>
            <h3>Streaks og mål</h3>
            <p>Hold motivasjonen oppe med daglige streaks og ukentlige mål.</p>
          </div>
        </div>
      </div>

      <div className={styles.howWrap}>
        <div className={styles.howInner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionLabel}>Slik fungerer det</div>
            <h2>I gang på <span className="tg">få minutter</span></h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <div className={styles.stepN}>1</div>
              <h3>Opprett gratis konto</h3>
              <p>Registrer deg på under ett minutt.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepN}>2</div>
              <h3>Legg til søknader</h3>
              <p>Registrer stillinger med bedrift og frist.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepN}>3</div>
              <h3>Følg fremgangen</h3>
              <p>Få påminnelser og full statistikk.</p>
            </div>
            <div className={styles.step}>
              <div className={styles.stepN}>4</div>
              <h3>Land drømmejobben</h3>
              <p>AI-støtte øker sjansene dine betraktelig.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.pricingWrap} id="pricing">
        <div className={styles.sectionHead}>
          <div className={styles.sectionLabel}>Priser</div>
          <h2>Enkel og transparent <span className="tg">prising</span></h2>
          <p>Kom i gang helt gratis. Oppgrader kun når du trenger mer.</p>
        </div>
        <div className={styles.pricingGrid}>
          <div className={styles.pCard}>
            <h3>Gratis</h3>
            <p className={styles.pSub}>Perfekt for å komme i gang</p>
            <div className={styles.pPrice}>0 kr<span>/mnd</span></div>
            <p className={styles.pTrial}>Gratis for alltid</p>
            <ul className={styles.pList}>
              <li><div className={styles.chk}>✓</div>10 aktive søknader</li>
              <li><div className={styles.chk}>✓</div>Gratis CV-sjekk</li>
              <li><div className={styles.chk}>✓</div>15 PDF CV-maler</li>
              <li><div className={styles.chk}>✓</div>1 AI øvingsintervju per uke</li>
              <li><div className={styles.chk}>✓</div>Påminnelser og frister</li>
            </ul>
            <Link href="/dashboard" className="btn btn-s btn-full">Start gratis nå</Link>
          </div>
          <div className={`${styles.pCard} ${styles.pCardFeatured}`}>
            <div className={styles.pBadge}>Anbefalt</div>
            <h3>Pro</h3>
            <p className={styles.pSub}>For den seriøse jobbsøkeren</p>
            <div className={styles.pPrice}>29 kr<span>/mnd</span></div>
            <p className={styles.pTrial}>14 dager gratis · Avbryt når som helst</p>
            <ul className={styles.pList}>
              <li><div className={styles.chk}>✓</div>Ubegrenset søknader</li>
              <li><div className={styles.chk}>✓</div>Offentlig CV-side</li>
              <li><div className={styles.chk}>✓</div>Ubegrenset AI øvingsintervju</li>
              <li><div className={styles.chk}>✓</div>AI CV-tilpasning per stilling</li>
              <li><div className={styles.chk}>✓</div>Prioritert support</li>
            </ul>
            <Link href="/dashboard" className="btn btn-p btn-full">Prøv 14 dager gratis →</Link>
          </div>
        </div>
      </div>

      <div className={styles.ctaWrap}>
        <div className={styles.ctaGlow} />
        <div className={styles.ctaInner}>
          <div className="badge-pill" style={{ marginBottom: '1.75rem' }}>
            <div className="badge-dot" />Start jobbsøket ditt i dag
          </div>
          <h2>Klar til å ta kontroll over <span className="tg">jobbsøket ditt?</span></h2>
          <p>Opprett en gratis konto på 30 sekunder. Ingen kortregistrering nødvendig.</p>
          <Link href="/dashboard" className="btn btn-p btn-lg">Start gratis nå →</Link>
          <p className={styles.ctaMeta}>✓ Ingen kortregistrering · ✓ Gratis for alltid</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.logo}>
          <div className={styles.logoIcon} style={{ width: 30, height: 30, fontSize: 14 }}>M</div>
          MinCV<span className="tg">.ai</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="#">Personvern</Link>
          <Link href="#">Vilkår</Link>
          <Link href="#">Kontakt</Link>
        </div>
        <span>© 2026 MinCV.ai</span>
      </footer>

    </main>
  );
}
