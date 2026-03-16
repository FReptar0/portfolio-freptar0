"use client";

export default function CarryTradeDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 620"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Carry Trade Algorithm architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .ct-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .ct-node {
          transition: filter 0.3s ease;
        }
        .ct-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
        .ct-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>

      <defs>
        <marker id="ct-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <marker id="ct-arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--accent-500)" opacity="0.7" />
        </marker>
        <linearGradient id="ct-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ct-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="ct-accent-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="ct-risk-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* ========== OANDA API (top) ========== */}
      <g className="ct-node">
        <rect x="320" y="15" width="260" height="70" rx="16" fill="url(#ct-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(430, 25)">
          <circle cx="8" cy="8" r="6" fill="none" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <path d="M 5 8 L 8 5 L 11 8 M 8 5 L 8 12" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="450" y="52" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">OANDA v20 REST API</text>
        <text x="450" y="70" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">300 H1 Candles &middot; Positions &middot; Swap Rates</text>
      </g>

      {/* OANDA -> Strategy */}
      <path d="M 450 85 C 450 100, 450 110, 450 125" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ct-arrow)" />
      <text x="466" y="108" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Hourly Tick</text>

      {/* ========== V3 Strategy (center-top) ========== */}
      <g className="ct-node">
        <rect x="310" y="125" width="280" height="85" rx="16" fill="url(#ct-main-fill)" stroke="var(--primary-600)" strokeWidth="2" />
        <text x="450" y="152" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">V3 Carry Strategy</text>
        <text x="450" y="170" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Golden Cross (50/200 MA) + Positive Swap</text>
        <text x="450" y="188" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">6 JPY Pairs &middot; RSI &lt; 75 &middot; Regime Filter</text>
      </g>

      {/* ========== Regime Detector (left of strategy) ========== */}
      <g className="ct-node">
        <rect x="30" y="125" width="190" height="70" rx="16" fill="url(#ct-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <text x="125" y="155" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Regime Detector</text>
        <text x="125" y="173" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">ADX + ATR &rarr; 4 Market States</text>
        <text x="125" y="186" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Trend/Range &times; Low/High Vol</text>
      </g>

      {/* Regime -> Strategy */}
      <path d="M 220 160 C 260 160, 280 162, 310 165" className="ct-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow-accent)" />

      {/* ========== News Calendar (right of strategy) ========== */}
      <g className="ct-node">
        <rect x="680" y="125" width="190" height="70" rx="16" fill="url(#ct-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <text x="775" y="155" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">News Blackout</text>
        <text x="775" y="173" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">FOMC &middot; BOJ &middot; ECB</text>
        <text x="775" y="186" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">&plusmn;1h High-Impact Events</text>
      </g>

      {/* News -> Strategy */}
      <path d="M 680 160 C 640 160, 620 162, 590 165" className="ct-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow-accent)" />

      {/* Strategy -> ML Bandit */}
      <path d="M 450 210 C 450 225, 450 235, 450 248" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ct-arrow)" />
      <text x="466" y="232" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Signals</text>

      {/* ========== ML Bandit Gate ========== */}
      <g className="ct-node">
        <rect x="330" y="248" width="240" height="65" rx="16" fill="url(#ct-main-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />
        <text x="450" y="273" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">ML Signal Gate</text>
        <text x="450" y="291" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Thompson Sampling &middot; 14 Features &middot; TAKE / SKIP</text>
      </g>

      {/* ML Bandit -> Dynamic Sizer */}
      <path d="M 450 313 C 450 328, 450 338, 450 350" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ct-arrow)" />

      {/* ========== Dynamic Sizer + Exit Manager (center) ========== */}
      <g className="ct-node">
        <rect x="300" y="350" width="300" height="85" rx="16" fill="url(#ct-main-fill)" stroke="var(--primary-600)" strokeWidth="2" />
        <text x="450" y="378" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Dynamic Sizer + Exit Manager</text>
        <text x="450" y="396" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Kelly &times; ATR &times; Regime &times; Correlation &times; DD Decay</text>
        <text x="450" y="414" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">7 Exit Conditions &middot; Trailing Stops &middot; Profit Scaling</text>
      </g>

      {/* ========== Risk Pipeline (left of sizer) ========== */}
      <g className="ct-node">
        <rect x="30" y="330" width="190" height="120" rx="16" fill="url(#ct-risk-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <text x="125" y="355" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">5-Layer Risk</text>
        <text x="125" y="374" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">1. Kelly Criterion</text>
        <text x="125" y="389" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">2. ATR Volatility Scaling</text>
        <text x="125" y="404" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">3. Regime Multiplier</text>
        <text x="125" y="419" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">4. Correlation Monitor</text>
        <text x="125" y="434" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">5. Drawdown Decay</text>
      </g>

      {/* Risk -> Sizer */}
      <path d="M 220 390 C 260 390, 275 390, 300 390" className="ct-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow-accent)" />

      {/* ========== Circuit Breakers (right of sizer) ========== */}
      <g className="ct-node">
        <rect x="680" y="345" width="190" height="95" rx="16" fill="url(#ct-risk-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <circle cx="775" cy="362" r="5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" className="ct-pulse" />
        <text x="775" y="383" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Circuit Breakers</text>
        <text x="775" y="401" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Daily: -3% &middot; Weekly: -7%</text>
        <text x="775" y="418" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Max DD: -20% &rarr; HALT</text>
        <text x="775" y="432" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Max 6 Positions &middot; 15%/Pair</text>
      </g>

      {/* Sizer -> Breakers */}
      <path d="M 600 392 C 640 392, 655 392, 680 392" className="ct-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow-accent)" />

      {/* Sizer -> Order Execution */}
      <path d="M 450 435 C 450 450, 450 462, 450 478" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ct-arrow)" />
      <text x="466" y="460" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Limit Orders @ Bid</text>

      {/* ========== Persistence + Monitoring (bottom) ========== */}
      <g className="ct-node">
        <rect x="150" y="478" width="200" height="70" rx="16" fill="url(#ct-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(232, 488)">
          <ellipse cx="10" cy="4" rx="8" ry="3.5" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 2 4 L 2 14 C 2 17.5, 18 17.5, 18 14 L 18 4" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
        </g>
        <text x="250" y="515" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">SQLite (WAL)</text>
        <text x="250" y="531" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Trades &middot; Equity &middot; Protocol</text>
        <text x="250" y="543" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Survives Container Restarts</text>
      </g>

      <g className="ct-node">
        <rect x="550" y="478" width="200" height="70" rx="16" fill="url(#ct-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(636, 488)">
          <path d="M 0 4 L 12 4 L 8 0 M 12 4 L 12 14 L 0 14 L 0 4" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
        </g>
        <text x="650" y="515" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Telegram Bot</text>
        <text x="650" y="531" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">/status &middot; /trends &middot; /positions</text>
        <text x="650" y="543" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Real-time Alerts &middot; Watchdog</text>
      </g>

      {/* Execution -> SQLite + Telegram */}
      <path d="M 420 478 C 380 490, 340 500, 350 510" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow)" opacity="0.6" />
      <path d="M 480 478 C 520 490, 560 500, 550 510" className="ct-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#ct-arrow)" opacity="0.6" />

      {/* ========== Docker/AWS label ========== */}
      <rect x="80" y="8" width="120" height="28" rx="8" fill="var(--glass-bg)" stroke="var(--glass-border)" strokeWidth="1" opacity="0.6" />
      <text x="140" y="27" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Docker on AWS EC2</text>

      {/* Live indicator */}
      <circle cx="660" cy="27" r="4" fill="#22c55e" className="ct-pulse" />
      <text x="672" y="31" textAnchor="start" fill="var(--text-secondary)" fontSize="10" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">LIVE — Day 41/94</text>

      {/* ========== Legend ========== */}
      <text x="450" y="575" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Hourly event-driven pipeline: OANDA data &rarr; Strategy &rarr; ML Gate &rarr; Risk Sizing &rarr; Execution &rarr; Persistence
      </text>

      <g transform="translate(225, 592)">
        <line x1="0" y1="0" x2="20" y2="0" stroke="var(--primary-600)" strokeWidth="1.8" className="ct-flow-line" />
        <text x="26" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Core Pipeline</text>
        <line x1="110" y1="0" x2="130" y2="0" stroke="var(--accent-500)" strokeWidth="1.5" className="ct-flow-line" />
        <text x="136" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Risk / Filters</text>
        <rect x="230" y="-6" width="12" height="12" rx="3" fill="url(#ct-main-fill)" stroke="var(--primary-600)" strokeWidth="1.2" />
        <text x="248" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Decision Node</text>
        <rect x="350" y="-6" width="12" height="12" rx="3" fill="url(#ct-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.2" />
        <text x="368" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Guard / Gate</text>
      </g>
    </svg>
  );
}
