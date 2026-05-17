import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProjects from '../hooks/useProjects';
import { TYPE_COLORS } from '../data/typeColors';

const FAN_SIZE = 9;

const Projects = () => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const filters = ['ALL', 'Clustering', 'Classification', 'Neural Net', 'AI App', 'ML App'];

  const filtered = useMemo(() =>
    projects.filter(p => {
      const mf = activeFilter === 'ALL' || p.type === activeFilter;
      const ms = !searchTerm || p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || p.project?.toLowerCase().includes(searchTerm.toLowerCase());
      return mf && ms;
    }), [projects, activeFilter, searchTerm]);

  const totalPages = Math.ceil(filtered.length / FAN_SIZE);
  const fanCards = filtered.slice(page * FAN_SIZE, (page + 1) * FAN_SIZE);

  useEffect(() => { setPage(0); }, [activeFilter, searchTerm]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fan angles: spread from -36deg to +36deg, wider x-spread. Adapted beautifully for mobile!
  const getFan = (i, total) => {
    const t = total <= 1 ? 0.5 : (i / (total - 1));
    const maxAngle = isMobile ? 14 : 36;
    const stepX = isMobile ? 12 : 38;
    const stepY = isMobile ? 0.35 : 0.7;

    const angle = -maxAngle + t * (maxAngle * 2);
    const tx = (i - (total - 1) / 2) * stepX;
    const ty = Math.abs(angle) * stepY;
    return { rotate: angle, x: tx, y: ty };
  };

  return (
    <section id="projects" className="ps">

      {/* Header */}
      <motion.div className="ps-head" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}>
        <div className="ps-title-row">
          <h2 className="ps-title"><span className="c-cyan">{filtered.length}</span> Projects. <span className="c-pink">One</span> Universe.</h2>
          <div className="ps-search">
            <span>🔍</span>
            <input placeholder="SEARCH..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </div>
        <div className="ps-filters">
          {filters.map(f => (
            <button key={f} className={`ps-fb ${activeFilter === f ? 'active' : ''}`}
              style={{ '--fc': TYPE_COLORS[f] || 'var(--cyan)' }} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
      </motion.div>

      {/* Fan Stage */}
      <div className="fan-stage">
        {fanCards.length === 0 ? (
          <p className="no-res">No projects match.</p>
        ) : (
          <div className="fan-deck">
            {fanCards.map((p, i) => {
              const { rotate, x, y } = getFan(i, fanCards.length);
              const color = TYPE_COLORS[p.type] || '#00F5FF';
              return (
                <motion.div
                  key={p.id}
                  layoutId={`card-${p.id}`}
                  className="fan-card"
                  style={{ '--cc': color, zIndex: i }}
                  initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, rotate, x, y }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22, delay: i * 0.04 }}
                  whileHover={isMobile ? { y: y - 10, scale: 1.02, zIndex: 100 } : { y: y - 30, scale: 1.08, zIndex: 50, transition: { duration: 0.2 } }}
                  onClick={() => setSelected(p)}
                >
                  {/* Corner marks like a playing card */}
                  <div className="fc-corner fc-tl">
                    <span className="fc-num">{p.id < 10 ? `0${p.id}` : p.id}</span>
                    <span className="fc-suit" style={{ color }}>◈</span>
                  </div>
                  <div className="fc-center">
                    <div className="fc-icon" style={{ color }}>◉</div>
                    <h3 className="fc-name">{p.name}</h3>
                    <p className="fc-creator">{p.project}</p>
                  </div>
                  <div className="fc-corner fc-br">
                    <span className="fc-num">{p.id < 10 ? `0${p.id}` : p.id}</span>
                    <span className="fc-suit" style={{ color }}>◈</span>
                  </div>
                  <div className="fc-glow" style={{ background: `radial-gradient(circle at center, ${color}22, transparent 70%)` }} />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="fan-nav">
            <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0} className="fan-nav-btn">◀ PREV</button>
            <span className="fan-page">{page + 1} / {totalPages}</span>
            <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1} className="fan-nav-btn">NEXT ▶</button>
          </div>
        )}
      </div>

      {/* Expanded Card Modal */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div className="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)} />
            <motion.div
              layoutId={`card-${selected.id}`}
              className="card-modal"
              style={{ '--cc': TYPE_COLORS[selected.type] || '#00F5FF' }}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {/* Top bar */}
              <div className="cm-bar" style={{ background: `linear-gradient(90deg, var(--cc), transparent)` }} />

              <button className="cm-close" onClick={() => setSelected(null)}>✕</button>

              <div className="cm-body">
                <div className="cm-num" style={{ color: 'var(--cc)' }}>{selected.id < 10 ? `0${selected.id}` : selected.id}</div>
                <h2 className="cm-title">{selected.name}</h2>
                <p className="cm-sub">PROJECT BY</p>
                <p className="cm-creator">{selected.project}</p>

                <span className="cm-badge" style={{ borderColor: `${TYPE_COLORS[selected.type]}55`, color: TYPE_COLORS[selected.type], background: `${TYPE_COLORS[selected.type]}11` }}>
                  {selected.type}
                </span>

                <div className="cm-divider" />

                {selected.link && selected.link !== '#' ? (
                  <a href={selected.link} target="_blank" rel="noopener noreferrer" className="cm-btn" style={{ '--bc': TYPE_COLORS[selected.type] || '#00F5FF' }}>
                    LAUNCH PROJECT
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                  </a>
                ) : (
                  <div className="cm-btn cm-btn--soon">COMING SOON</div>
                )}
              </div>

              {/* Decorative suit watermark */}
              <div className="cm-watermark" style={{ color: TYPE_COLORS[selected.type] }}>◈</div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx="true">{`
        /* ── Section ── */
        .ps {
          position: relative;
          z-index: 10;
          padding: 5rem 5% 6rem;
          background: #060c1e;
          border-top: 1px solid rgba(0,245,255,0.08);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }

        /* ── Header ── */
        .ps-head { margin-bottom: 2.5rem; flex-shrink: 0; }
        .ps-title-row { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1.5rem; margin-bottom: 1.25rem; }
        .ps-title { font-family: 'Rajdhani', sans-serif; font-size: clamp(1.8rem, 4vw, 3rem); font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: -0.01em; }
        .c-cyan { color: var(--cyan); }
        .c-pink { color: var(--magenta); }

        .ps-search { position: relative; display: flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(0,245,255,0.12); border-radius: 10px; padding: 9px 14px; width: 240px; }
        .ps-search span { opacity: 0.4; font-size: 13px; flex-shrink: 0; }
        .ps-search input { background: none; border: none; outline: none; color: #fff; font-family: 'Space Mono', monospace; font-size: 10px; letter-spacing: 0.07em; width: 100%; }
        .ps-search input::placeholder { color: rgba(255,255,255,0.22); }

        .ps-filters { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .ps-fb { padding: 6px 15px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.02); color: rgba(232,244,248,0.5); font-family: 'Space Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.08em; cursor: pointer; transition: all 0.18s; }
        .ps-fb:hover { border-color: var(--fc); color: #fff; }
        .ps-fb.active { background: var(--fc); border-color: var(--fc); color: #050A1A; font-weight: 700; box-shadow: 0 0 14px var(--fc); }

        /* ── Fan Stage ── */
        .fan-stage { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 560px; }

        .fan-deck {
          position: relative;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          height: 420px;
          width: 100%;
          perspective: 1400px;
        }

        /* ── Individual Fan Card ── */
        .fan-card {
          position: absolute;
          width: 220px;
          height: 310px;
          background: linear-gradient(145deg, #0d1530, #091020);
          border: 2px solid var(--cc);
          border-radius: 18px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 1.1rem;
          box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset;
          transform-origin: bottom center;
          overflow: hidden;
          user-select: none;
        }

        .fc-glow { position: absolute; inset: 0; pointer-events: none; }

        .fc-corner { display: flex; flex-direction: column; align-items: center; gap: 2px; }
        .fc-tl { align-self: flex-start; }
        .fc-br { align-self: flex-end; transform: rotate(180deg); }

        .fc-num { font-family: 'Space Mono', monospace; font-size: 15px; font-weight: 700; color: var(--cc); line-height: 1; }
        .fc-suit { font-size: 13px; line-height: 1; }

        .fc-center { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; text-align: center; padding: 0 0.3rem; }
        .fc-icon { font-size: 36px; opacity: 0.6; }
        .fc-name { font-family: 'Rajdhani', sans-serif; font-size: 16px; font-weight: 800; color: #fff; text-transform: uppercase; line-height: 1.2; letter-spacing: 0.04em; }
        .fc-creator { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(232,244,248,0.55); text-transform: uppercase; letter-spacing: 0.05em; }

        /* ── Pagination ── */
        .fan-nav { display: flex; align-items: center; gap: 1.5rem; margin-top: 2.5rem; }
        .fan-nav-btn { background: rgba(255,255,255,0.04); border: 1px solid rgba(0,245,255,0.2); color: var(--cyan); font-family: 'Space Mono', monospace; font-size: 11px; padding: 8px 18px; border-radius: 8px; cursor: pointer; transition: all 0.2s; letter-spacing: 0.08em; }
        .fan-nav-btn:hover:not(:disabled) { background: var(--cyan); color: #050A1A; box-shadow: 0 0 16px var(--cyan); }
        .fan-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .fan-page { font-family: 'Space Mono', monospace; font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 0.1em; }

        /* ── Overlay ── */
        .overlay { position: fixed; inset: 0; background: rgba(3,6,18,0.85); backdrop-filter: blur(6px); z-index: 1000; cursor: pointer; }

        /* ── Modal Card ── */
        .card-modal {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1001;
          width: min(420px, 90vw);
          background: linear-gradient(145deg, #0d1530, #091020);
          border: 2px solid var(--cc);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 60px color-mix(in srgb, var(--cc) 20%, transparent);
        }

        .cm-bar { height: 4px; width: 100%; }
        .cm-close { position: absolute; top: 1rem; right: 1rem; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); width: 34px; height: 34px; border-radius: 50%; font-size: 14px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; z-index: 2; }
        .cm-close:hover { background: rgba(255,255,255,0.15); color: #fff; }

        .cm-body { padding: 2rem 2.5rem 2.5rem; display: flex; flex-direction: column; gap: 0.7rem; }

        .cm-num { font-family: 'Space Mono', monospace; font-size: 52px; font-weight: 700; opacity: 0.12; line-height: 1; }
        .cm-title { font-family: 'Rajdhani', sans-serif; font-size: 28px; font-weight: 800; color: #fff; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.15; margin-top: -0.5rem; }
        .cm-sub { font-family: 'Space Mono', monospace; font-size: 9px; color: rgba(255,255,255,0.3); letter-spacing: 0.15em; text-transform: uppercase; margin-top: 0.5rem; }
        .cm-creator { font-family: 'Rajdhani', sans-serif; font-size: 18px; font-weight: 600; color: var(--cc); letter-spacing: 0.05em; text-transform: uppercase; }

        .cm-badge { display: inline-block; align-self: flex-start; padding: 5px 12px; border-radius: 6px; border: 1px solid; font-family: 'Space Mono', monospace; font-size: 9px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-top: 0.25rem; }
        .cm-divider { height: 1px; background: rgba(255,255,255,0.07); margin: 0.75rem 0; }

        .cm-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 15px; background: color-mix(in srgb, var(--bc) 10%, transparent); border: 1px solid color-mix(in srgb, var(--bc) 45%, transparent); color: var(--bc); text-decoration: none; font-family: 'Rajdhani', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 2px; text-transform: uppercase; border-radius: 12px; cursor: pointer; transition: all 0.25s; }
        .cm-btn:hover { background: var(--bc); color: #050A1A; box-shadow: 0 0 30px color-mix(in srgb, var(--bc) 50%, transparent); }
        .cm-btn--soon { opacity: 0.3; cursor: not-allowed; pointer-events: none; font-size: 12px; letter-spacing: 1px; border-color: rgba(255,255,255,0.08); color: rgba(255,255,255,0.3); }

        .cm-watermark { position: absolute; bottom: -10px; right: 20px; font-size: 120px; opacity: 0.04; pointer-events: none; line-height: 1; }

        .no-res { color: rgba(232,244,248,0.25); font-family: 'Space Mono', monospace; font-size: 12px; letter-spacing: 0.1em; }

        @media (max-width: 768px) {
          .ps { padding: 3.5rem 4% 5rem; }
          .ps-title-row { flex-direction: column; align-items: flex-start; }
          .ps-search { width: 100%; }
          .fan-card {
            width: 135px;
            height: 195px;
            padding: 0.75rem;
            border-radius: 12px;
          }
          .fc-num { font-size: 11px; }
          .fc-suit { font-size: 10px; }
          .fc-icon { font-size: 24px; }
          .fc-name { font-size: 11px; letter-spacing: 0.02em; }
          .fc-creator { font-size: 8px; }
          .fan-deck { height: 260px; }
        }
      `}</style>
    </section>
  );
};

export default Projects;
