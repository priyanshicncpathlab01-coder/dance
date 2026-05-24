import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

/* ─── local styles scoped to this page only ─────────────────────────────── */
const pageStyles = `
  .jj-section { padding: 80px 0; }
  .jj-container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }

  .jj-sub-badge {
    display: inline-block;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    background: rgba(201,168,76,0.1);
    border: 1px solid rgba(201,168,76,0.3);
    color: var(--color-gold);
    margin-bottom: 16px;
  }

  .jj-section-title {
    font-family: var(--font-serif);
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 900;
    color: var(--color-text-heading);
    margin-bottom: 14px;
    line-height: 1.1;
  }

  .jj-divider {
    width: 70px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-gold), #E040FB);
    border-radius: 2px;
    margin-bottom: 48px;
  }
  .jj-divider.centered { margin-left: auto; margin-right: auto; }

  .jj-glass {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(201,168,76,0.2);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .jj-card {
    border-radius: 20px;
    padding: 28px;
    transition: transform 0.35s ease, box-shadow 0.35s ease;
    position: relative;
    overflow: hidden;
  }
  .jj-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(201,168,76,0.45), transparent, rgba(168,85,247,0.25));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .jj-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 18px 45px rgba(201,168,76,0.13);
  }

  .jj-grid-3 { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }
  .jj-grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }

  .jj-sub-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 9px 0;
    color: rgba(255,255,255,0.72);
    font-size: 14px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    line-height: 1.5;
  }
  .jj-sub-item:last-child { border-bottom: none; }
  .jj-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--color-gold);
    flex-shrink: 0;
    margin-top: 6px;
  }

  .jj-accordion-item { border-bottom: 1px solid rgba(201,168,76,0.13); }
  .jj-accordion-header {
    padding: 20px 0;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--color-text-heading);
    font-size: 15px;
    font-weight: 500;
    transition: color 0.2s;
  }
  .jj-accordion-header:hover { color: var(--color-gold); }
  .jj-accordion-body {
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.3s ease;
  }

  .jj-format-tab {
    padding: 9px 22px;
    border-radius: 50px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
    transition: all 0.3s;
    border: 1px solid rgba(201,168,76,0.3);
    color: rgba(255,255,255,0.55);
    background: transparent;
    font-family: inherit;
  }
  .jj-format-tab.active {
    background: linear-gradient(135deg, var(--color-gold, #C9A84C), #F0C862);
    color: #000;
    border-color: transparent;
    font-weight: 600;
  }
  .jj-format-tab:hover:not(.active) { border-color: var(--color-gold); color: var(--color-gold); }

  .jj-prize-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 18px;
    border-radius: 50px;
    font-size: 13px;
    font-weight: 600;
  }

  .jj-cta-btn {
    display: inline-block;
    background: linear-gradient(135deg, var(--color-gold, #C9A84C) 0%, #F0C862 100%);
    color: #000;
    font-weight: 700;
    padding: 15px 36px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    font-size: 15px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    text-decoration: none;
    font-family: inherit;
  }
  .jj-cta-btn:hover { transform: translateY(-2px); box-shadow: 0 10px 30px rgba(201,168,76,0.4); }

  .jj-outline-btn {
    display: inline-block;
    background: transparent;
    color: var(--color-gold);
    font-weight: 600;
    padding: 14px 32px;
    border: 1.5px solid var(--color-gold);
    border-radius: 50px;
    cursor: pointer;
    font-size: 15px;
    transition: all 0.3s ease;
    text-decoration: none;
    font-family: inherit;
  }
  .jj-outline-btn:hover { background: rgba(201,168,76,0.1); transform: translateY(-2px); }

  @media (max-width: 600px) {
    .jj-section { padding: 50px 0; }
    .jj-card { padding: 20px; }
  }
`;

/* ─── tiny Accordion ──────────────────────────────────────────────────────── */
const JJAccordion = ({ title, icon, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="jj-accordion-item">
            <div className="jj-accordion-header" onClick={() => setOpen(!open)}>
                <span>{icon} {title}</span>
                <span style={{ color: 'var(--color-gold)', fontSize: 20, transition: 'transform 0.3s', display: 'inline-block', transform: open ? 'rotate(45deg)' : 'none' }}>+</span>
            </div>
            <div className="jj-accordion-body" style={{ maxHeight: open ? 1000 : 0, paddingBottom: open ? 20 : 0 }}>
                {children}
            </div>
        </div>
    );
};

/* ─── Category data ───────────────────────────────────────────────────────── */
const CATEGORIES = [
    {
        style: 'Salsa',
        emoji: '💃',
        color: '#C9A84C',
        open: ['Jack & Jill Open', 'Strictly Salsa Open'],
        pro:  ['Jack & Jill Pro',  'Strictly Salsa Pro'],
        desc: 'On2 / On1 — leaders & followers randomly drawn',
    },
    {
        style: 'Bachata',
        emoji: '🌹',
        color: '#A855F7',
        open: ['Jack & Jill Open', 'Strictly Bachata Open'],
        pro:  ['Jack & Jill Pro',  'Strictly Bachata Pro'],
        desc: 'Sensual & Modern — random partner pairing',
    },
    {
        style: 'Kizomba',
        emoji: '🔥',
        color: '#E040FB',
        open: ['Jack & Jill Open', 'Strictly Kizomba Open'],
        pro:  ['Jack & Jill Pro',  'Strictly Kizomba Pro'],
        desc: 'Urban Kiz & Kizomba — connection-focused format',
    },
];

/* ─── Prize data ──────────────────────────────────────────────────────────── */
const PRIZES = [
    { place: '🥇 1st Place', amount: 'TBA', color: '#C9A84C', glow: 'rgba(201,168,76,0.2)' },
    { place: '🥈 2nd Place', amount: 'TBA', color: '#A8A8A8', glow: 'rgba(168,168,168,0.15)' },
    { place: '🥉 3rd Place', amount: 'TBA', color: '#CD7F32', glow: 'rgba(205,127,50,0.15)' },
];

/* ─── Main page ───────────────────────────────────────────────────────────── */
const JackAndJillPage = () => {
    const [activeTab, setActiveTab] = useState('open');

    const fadeUp = (delay = 0) => ({
        initial: { opacity: 0, y: 28 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, delay },
    });

    return (
        <div className="app">
            <style>{pageStyles}</style>
            <Navbar />

            <main style={{ paddingTop: '100px', minHeight: '80vh', background: 'var(--color-bg-main)' }}>

                {/* ── HERO ─────────────────────────────────────────────── */}
                <section style={{ padding: '100px 0 60px', position: 'relative', overflow: 'hidden' }}>
                    {/* subtle background glow */}
                    <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', width: '800px', height: '400px', background: 'radial-gradient(ellipse, rgba(123,47,190,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

                    <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
                        <motion.div {...fadeUp(0)}>
                            <span className="jj-sub-badge">LOL 2026 • Special Event</span>
                        </motion.div>

                        <motion.h1
                            {...fadeUp(0.1)}
                            style={{ fontSize: 'clamp(40px, 8vw, 72px)', fontFamily: 'var(--font-serif)', color: 'var(--color-text-heading)', marginBottom: '20px' }}
                        >
                            Jack &amp; Jill Competition
                        </motion.h1>

                        <motion.div {...fadeUp(0.15)} style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, var(--color-gold), #E040FB)', margin: '0 auto 30px', borderRadius: '2px' }} />

                        <motion.p {...fadeUp(0.2)} style={{ fontSize: '18px', color: 'var(--color-text-muted)', maxWidth: '700px', margin: '0 auto 40px', lineHeight: 1.75 }}>
                            Get ready for the most exciting Afro-Latin dance competition in India. Showcase your skills, connection, and musicality in our official Jack &amp; Jill battles.
                        </motion.p>

                        {/* key stats */}
                        <motion.div {...fadeUp(0.25)} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
                            {[
                                { v: '3', l: 'Dance Styles' },
                                { v: 'Open + Pro', l: 'Two Levels' },
                                { v: '₹2,000', l: 'Entry Fee' },
                                { v: 'Live DJ', l: 'All Rounds' },
                            ].map(({ v, l }) => (
                                <div key={l} className="jj-glass" style={{ borderRadius: '14px', padding: '16px 24px', textAlign: 'center', minWidth: '100px' }}>
                                    <div style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-gold)', fontFamily: 'var(--font-serif)' }}>{v}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '1px', marginTop: '4px', textTransform: 'uppercase' }}>{l}</div>
                                </div>
                            ))}
                        </motion.div>

                        <motion.div {...fadeUp(0.3)} style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <a href="#jj-register" className="jj-cta-btn">Register Now ✦</a>
                            <a href="#jj-categories" className="jj-outline-btn">View Categories</a>
                        </motion.div>
                    </div>
                </section>

                {/* ── WHAT IS JACK & JILL ──────────────────────────────── */}
                <section className="jj-section" style={{ background: 'rgba(123,47,190,0.03)' }}>
                    <div className="jj-container">
                        <div className="jj-grid-2" style={{ alignItems: 'center', gap: '60px' }}>
                            <motion.div {...fadeUp(0)}>
                                <span className="jj-sub-badge">What Is It?</span>
                                <h2 className="jj-section-title">The Ultimate<br /><span style={{ color: 'var(--color-gold)' }}>Partner Draw</span> Format</h2>
                                <div className="jj-divider" />
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '15px', marginBottom: '18px' }}>
                                    Jack &amp; Jill is a social dance competition where leaders and followers are randomly paired — you can't choose your partner. It's the ultimate test of adaptability, connection, and pure dance skill.
                                </p>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.8, fontSize: '15px' }}>
                                    Unlike choreographed shows, J&amp;J rewards real-time communication, musicality, and the ability to make magic with a stranger. The crowd loves it — and so do the judges.
                                </p>
                            </motion.div>

                            <div className="jj-grid-2" style={{ gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                                {[
                                    { icon: '🎲', title: 'Random Pairing', desc: 'Leaders & followers drawn by lot — no pre-arranged partners' },
                                    { icon: '🎵', title: 'Live DJ Music', desc: 'Every round is danced to live DJ sets — no prep, pure feel' },
                                    { icon: '⚡', title: 'Elimination Rounds', desc: 'Prelims → Semi-finals → Grand Final' },
                                    { icon: '🏆', title: 'Judged Separately', desc: 'Leaders and followers are scored and awarded independently' },
                                ].map(c => (
                                    <motion.div key={c.title} {...fadeUp(0.1)} className="jj-glass jj-card" style={{ padding: '22px' }}>
                                        <div style={{ fontSize: '28px', marginBottom: '10px' }}>{c.icon}</div>
                                        <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-gold)', marginBottom: '6px' }}>{c.title}</h4>
                                        <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{c.desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ── CATEGORIES ───────────────────────────────────────── */}
                <section id="jj-categories" className="jj-section">
                    <div className="jj-container">
                        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span className="jj-sub-badge">Competition Categories</span>
                            <h2 className="jj-section-title">Pick Your <span style={{ color: 'var(--color-gold)' }}>Style & Level</span></h2>
                            <div className="jj-divider centered" />
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <button className={`jj-format-tab ${activeTab === 'open' ? 'active' : ''}`} onClick={() => setActiveTab('open')}>
                                    🌟 Open Level
                                </button>
                                <button className={`jj-format-tab ${activeTab === 'pro' ? 'active' : ''}`} onClick={() => setActiveTab('pro')}>
                                    ⚡ Pro Level
                                </button>
                            </div>
                        </motion.div>

                        <div className="jj-grid-3">
                            {CATEGORIES.map((cat, i) => (
                                <motion.div key={cat.style} {...fadeUp(i * 0.1)} className="jj-glass jj-card">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                        <span style={{ fontSize: '30px' }}>{cat.emoji}</span>
                                        <div>
                                            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: cat.color }}>{cat.style}</h3>
                                            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{cat.desc}</p>
                                        </div>
                                    </div>
                                    {(activeTab === 'open' ? cat.open : cat.pro).map(sub => (
                                        <div key={sub} className="jj-sub-item">
                                            <div className="jj-dot" style={{ background: cat.color }} />
                                            {sub}
                                        </div>
                                    ))}
                                </motion.div>
                            ))}
                        </div>

                        <motion.p {...fadeUp(0.3)} style={{ textAlign: 'center', color: 'var(--color-text-muted)', fontSize: '13px', marginTop: '28px' }}>
                            * Separate leader & follower draws per category &nbsp;•&nbsp; Multiple category registration is allowed
                        </motion.p>
                    </div>
                </section>

                {/* ── RULES ────────────────────────────────────────────── */}
                <section id="jj-rules" className="jj-section" style={{ background: 'rgba(123,47,190,0.03)' }}>
                    <div className="jj-container" style={{ maxWidth: '780px' }}>
                        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '48px' }}>
                            <span className="jj-sub-badge">Rules & Format</span>
                            <h2 className="jj-section-title">Know Before <span style={{ color: 'var(--color-gold)' }}>You Compete</span></h2>
                            <div className="jj-divider centered" />
                        </motion.div>

                        <motion.div {...fadeUp(0.1)} className="jj-glass" style={{ borderRadius: '24px', padding: '8px 36px 20px' }}>
                            <JJAccordion title="General Competition Rules" icon="⚖️">
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {[
                                        'A valid Lead O\'Latino 2026 Festival Pass is required to compete.',
                                        'Registration is confirmed only after organizer approval.',
                                        'Participants may enter both Open and Pro levels in the same style if eligible.',
                                        'All competitors must check in at least 60 minutes before their category start time.',
                                        'Late arrivals may be disqualified at the organizer\'s discretion.',
                                        'The organizing team reserves the right to merge, cancel, or reschedule categories.',
                                        'Judges\' decisions are final and non-negotiable.',
                                        'No refunds will be issued after registration.',
                                    ].map(r => (
                                        <li key={r} className="jj-sub-item" style={{ fontSize: '14px' }}>
                                            <div className="jj-dot" />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </JJAccordion>

                            <JJAccordion title="Partner Draw & Pairing" icon="🎲">
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '14px', lineHeight: 1.8 }}>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {[
                                            'Partners are assigned by a random draw conducted by the organizing team.',
                                            'Each round may have a new partner draw — at the organizer\'s discretion.',
                                            'Participants cannot request or refuse a specific partner.',
                                            'Leaders and followers are scored independently of each other.',
                                            'If there is an imbalance in the leader/follower ratio, the organizer will notify affected participants.',
                                        ].map(r => (
                                            <li key={r} className="jj-sub-item" style={{ fontSize: '14px' }}>
                                                <div className="jj-dot" style={{ background: '#A855F7' }} />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </JJAccordion>

                            <JJAccordion title="Competition Format & Rounds" icon="🏟️">
                                <div style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '12px', marginBottom: '20px' }}>
                                        {[
                                            { label: 'Prelims', desc: 'All entrants compete in groups. Top scorers advance.' },
                                            { label: 'Semi-Finals', desc: 'Reduced field. New random draw per semi.' },
                                            { label: 'Grand Final', desc: 'Top leaders & followers compete for title.' },
                                        ].map(r => (
                                            <div key={r.label} style={{ background: 'rgba(201,168,76,0.06)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(201,168,76,0.15)' }}>
                                                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-gold)', marginBottom: '6px' }}>{r.label}</div>
                                                <div style={{ fontSize: '13px', lineHeight: 1.5 }}>{r.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                        {[
                                            'Each performance lasts approximately 1–2 minutes.',
                                            'Music is selected and played live by the official DJ.',
                                            'No choreography — all dancing must be fully improvised.',
                                            'Aerials, drops, and dangerous lifts are strictly prohibited.',
                                        ].map(r => (
                                            <li key={r} className="jj-sub-item" style={{ fontSize: '14px' }}>
                                                <div className="jj-dot" style={{ background: '#E040FB' }} />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </JJAccordion>

                            <JJAccordion title="Judging Criteria" icon="🎯">
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '12px' }}>
                                    {[
                                        { c: 'Musicality', d: 'How well you interpret the rhythm and feel of the music', icon: '🎵' },
                                        { c: 'Connection', d: 'Lead/follow communication and partner responsiveness', icon: '🤝' },
                                        { c: 'Technique', d: 'Body mechanics, footwork, and stylistic accuracy', icon: '💫' },
                                        { c: 'Creativity', d: 'Unique expression, phrasing, and interpretation', icon: '🎨' },
                                        { c: 'Stage Presence', d: 'Energy, confidence, and audience engagement', icon: '✨' },
                                        { c: 'Overall Impact', d: 'The lasting impression on judges and audience', icon: '⚡' },
                                    ].map(j => (
                                        <div key={j.c} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '14px 16px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                            <div style={{ fontSize: '20px', marginBottom: '6px' }}>{j.icon}</div>
                                            <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-gold)', marginBottom: '4px' }}>{j.c}</div>
                                            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{j.d}</div>
                                        </div>
                                    ))}
                                </div>
                            </JJAccordion>

                            <JJAccordion title="Code of Conduct" icon="🌟">
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {[
                                        'Treat all partners, competitors, and staff with respect at all times.',
                                        'Unsportsmanlike conduct or harassment will result in immediate disqualification.',
                                        'Appropriate dance attire is required — no bare feet on the competition floor.',
                                        'Alcohol or substance influence during competition is strictly prohibited.',
                                        'Event media, photos, and videos may be used for promotional purposes.',
                                        'Any disputes must be raised with the organizing team — not the judges directly.',
                                    ].map(r => (
                                        <li key={r} className="jj-sub-item" style={{ fontSize: '14px' }}>
                                            <div className="jj-dot" style={{ background: '#E040FB' }} />
                                            {r}
                                        </li>
                                    ))}
                                </ul>
                            </JJAccordion>
                        </motion.div>
                    </div>
                </section>

                {/* ── PRIZE POOL ───────────────────────────────────────── */}
                <section className="jj-section">
                    <div className="jj-container">
                        <motion.div {...fadeUp(0)} style={{ textAlign: 'center', marginBottom: '50px' }}>
                            <span className="jj-sub-badge">Prize Pool</span>
                            <h2 className="jj-section-title">Dance for <span style={{ color: 'var(--color-gold)' }}>Glory</span></h2>
                            <div className="jj-divider centered" />
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
                                Prizes awarded separately for <strong style={{ color: 'var(--color-gold)' }}>Leaders</strong> and <strong style={{ color: '#A855F7' }}>Followers</strong> in each category
                            </p>
                        </motion.div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', maxWidth: '700px', margin: '0 auto 40px' }}>
                            {PRIZES.map((p, i) => (
                                <motion.div key={p.place} {...fadeUp(i * 0.1)} className="jj-glass" style={{
                                    borderRadius: '20px',
                                    padding: '32px 20px',
                                    textAlign: 'center',
                                    border: `1px solid ${p.color}40`,
                                    boxShadow: `0 0 30px ${p.glow}`,
                                }}>
                                    <div style={{ fontSize: '40px', marginBottom: '12px' }}>{p.place.split(' ')[0]}</div>
                                    <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginBottom: '10px' }}>{p.place.slice(3)}</div>
                                    <div style={{ fontSize: '24px', fontWeight: 700, color: p.color, fontFamily: 'var(--font-serif)' }}>{p.amount}</div>
                                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', marginTop: '6px', letterSpacing: '1px' }}>
                                        PER ROLE
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div {...fadeUp(0.3)} className="jj-glass" style={{ borderRadius: '16px', padding: '20px 28px', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                                🏆 &nbsp;Prize pool details will be announced closer to the event date.<br />
                                All finalists receive an <span style={{ color: 'var(--color-gold)' }}>official LOL 2026 certificate</span> and recognition.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* ── REGISTRATION CTA ─────────────────────────────────── */}
                <section id="jj-register" className="jj-section" style={{ background: 'rgba(123,47,190,0.05)' }}>
                    <div className="jj-container" style={{ maxWidth: '680px', textAlign: 'center' }}>
                        <motion.div {...fadeUp(0)}>
                            <span className="jj-sub-badge">Join The Competition</span>
                            <h2 className="jj-section-title" style={{ marginBottom: '12px' }}>
                                Ready to <span style={{ color: 'var(--color-gold)' }}>Compete?</span>
                            </h2>
                            <div className="jj-divider centered" />

                            <motion.div {...fadeUp(0.15)} className="jj-glass" style={{ borderRadius: '24px', padding: '40px', marginBottom: '32px' }}>
                                <div style={{ fontSize: '60px', fontFamily: 'var(--font-serif)', fontWeight: 900, color: 'var(--color-gold)', lineHeight: 1, marginBottom: '8px' }}>
                                    ₹2,000
                                </div>
                                <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', letterSpacing: '2px', marginBottom: '28px', textTransform: 'uppercase' }}>
                                    Per Category Entry
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px', textAlign: 'left' }}>
                                    {[
                                        'Valid Festival Pass required to compete',
                                        'Registration confirmed after organizer approval',
                                        'Multiple category registration is allowed',
                                        'No refunds after registration is submitted',
                                    ].map(f => (
                                        <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <span style={{ color: 'var(--color-gold)', fontSize: '16px' }}>✓</span>
                                            <span style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>{f}</span>
                                        </div>
                                    ))}
                                </div>
                                <a href="https://wa.me/919821077414" target="_blank" rel="noreferrer" className="jj-cta-btn" style={{ display: 'block', textAlign: 'center', marginBottom: '14px' }}>
                                    Register via WhatsApp ✦
                                </a>
                                <a href="mailto:leadolatino@gmail.com" className="jj-outline-btn" style={{ display: 'block', textAlign: 'center' }}>
                                    Email Us to Register
                                </a>
                            </motion.div>

                            <p style={{ fontSize: '13px', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                                Questions? Contact&nbsp;
                                <a href="https://wa.me/919821077414" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Suraj Verma &amp; Addy</a>
                                &nbsp;on WhatsApp or at&nbsp;
                                <a href="mailto:leadolatino@gmail.com" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>leadolatino@gmail.com</a>
                            </p>
                        </motion.div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default JackAndJillPage;