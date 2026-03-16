"use client";

export default function GymManagerDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 450"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GymManager architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .gm-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .gm-node {
          transition: filter 0.3s ease;
        }
        .gm-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="gm-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <linearGradient id="gm-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="gm-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="gm-accent-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* ========== Browser Node (top) ========== */}
      <g className="gm-node">
        <rect x="250" y="20" width="200" height="75" rx="16" fill="url(#gm-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Browser icon */}
        <g transform="translate(326, 32)">
          <rect x="0" y="0" width="18" height="12" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="4" x2="18" y2="4" stroke="var(--text-secondary)" strokeWidth="0.8" opacity="0.4" />
          <circle cx="3" cy="2" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
          <circle cx="6" cy="2" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
          <line x1="9" y1="12" x2="9" y2="15" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="15" x2="13" y2="15" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="350" y="60" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Browser</text>
        <text x="350" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Admin &amp; Member UI</text>
      </g>

      {/* Browser -> Next.js */}
      <path d="M 350 95 C 350 108, 350 118, 350 140" className="gm-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#gm-arrow)" />
      <text x="370" y="122" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">HTTP</text>

      {/* ========== Next.js Node (center) ========== */}
      <g className="gm-node">
        <rect x="235" y="140" width="230" height="105" rx="16" fill="url(#gm-main-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />
        {/* Next.js-like icon */}
        <g transform="translate(330, 152)">
          <circle cx="8" cy="8" r="7" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
          <path d="M 5 5 L 11 11 M 11 5 L 11 11" stroke="var(--primary-600)" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="350" y="180" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Next.js</text>
        <text x="350" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Server Components</text>
        <text x="350" y="218" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif">API Routes &amp; Auth</text>
      </g>

      {/* Next.js -> PostgreSQL */}
      <path d="M 350 245 C 350 265, 350 285, 350 310" className="gm-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#gm-arrow)" />
      <text x="370" y="282" textAnchor="start" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Prisma ORM</text>

      {/* ========== PostgreSQL Node (bottom center) ========== */}
      <g className="gm-node">
        <rect x="255" y="310" width="190" height="90" rx="16" fill="url(#gm-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Database icon */}
        <g transform="translate(330, 322)">
          <ellipse cx="12" cy="4" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 2 4 L 2 20 C 2 24, 22 24, 22 20 L 22 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="12" cy="20" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="350" y="360" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">PostgreSQL</text>
        <text x="350" y="378" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Members, Plans,</text>
        <text x="350" y="392" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Attendance &amp; Payments</text>
      </g>

      {/* ========== KPI Dashboard (left branch) ========== */}
      <g className="gm-node">
        <rect x="20" y="160" width="160" height="85" rx="16" fill="url(#gm-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Chart/dashboard icon */}
        <g transform="translate(80, 172)">
          <rect x="0" y="0" width="16" height="12" rx="1.5" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <rect x="3" y="5" width="2.5" height="5" rx="0.5" fill="var(--accent-500)" opacity="0.35" />
          <rect x="7" y="3" width="2.5" height="7" rx="0.5" fill="var(--accent-500)" opacity="0.35" />
          <rect x="11" y="6" width="2.5" height="4" rx="0.5" fill="var(--accent-500)" opacity="0.35" />
        </g>
        <text x="100" y="203" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">KPI Dashboard</text>
        <text x="100" y="223" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Analytics &amp; Charts</text>
      </g>

      {/* Next.js -> KPI Dashboard (curved left) */}
      <path d="M 235 192 C 210 192, 200 195, 180 198" className="gm-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#gm-arrow)" />
      <text x="207" y="182" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Metrics</text>

      {/* KPI Dashboard -> PostgreSQL (subtle curved diagonal) */}
      <path d="M 100 245 C 100 280, 200 320, 255 345" className="gm-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#gm-arrow)" opacity="0.3" />

      {/* ========== Membership Engine (right branch) ========== */}
      <g className="gm-node">
        <rect x="520" y="160" width="160" height="85" rx="16" fill="url(#gm-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Gear/membership icon */}
        <g transform="translate(582, 172)">
          <circle cx="8" cy="5" r="3.5" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 2 14 C 2 10, 5 8, 8 8 C 11 8, 14 10, 14 14" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
        </g>
        <text x="600" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Membership</text>
        <text x="600" y="216" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Engine</text>
        <text x="600" y="234" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Plans &amp; Renewals</text>
      </g>

      {/* Next.js -> Membership Engine (curved right) */}
      <path d="M 465 192 C 490 192, 500 195, 520 198" className="gm-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#gm-arrow)" />
      <text x="493" y="182" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Rules</text>

      {/* Membership Engine -> PostgreSQL (subtle curved diagonal) */}
      <path d="M 600 245 C 600 280, 500 320, 445 345" className="gm-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#gm-arrow)" opacity="0.3" />

      {/* ========== Legend ========== */}
      <text x="350" y="435" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Gym management platform with KPI tracking and automated membership workflows
      </text>
    </svg>
  );
}
