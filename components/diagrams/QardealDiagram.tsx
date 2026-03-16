"use client";

export default function QardealDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 700 500"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Qardeal architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .qd-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .qd-node {
          transition: filter 0.3s ease;
        }
        .qd-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="qd-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <linearGradient id="qd-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="qd-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="qd-accent-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* ========== Browser Node (top) ========== */}
      <g className="qd-node">
        <rect x="250" y="20" width="200" height="75" rx="16" fill="url(#qd-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Browser/monitor icon */}
        <g transform="translate(326, 34)">
          <rect x="0" y="0" width="18" height="12" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="4" x2="18" y2="4" stroke="var(--text-secondary)" strokeWidth="0.8" opacity="0.4" />
          <circle cx="3" cy="2" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
          <circle cx="6" cy="2" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
          <line x1="9" y1="12" x2="9" y2="15" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="15" x2="13" y2="15" stroke="var(--text-secondary)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="350" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Browser</text>
        <text x="350" y="80" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">User Interface</text>
      </g>

      {/* Browser -> Next.js */}
      <path d="M 350 95 C 350 108, 350 118, 350 135" className="qd-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#qd-arrow)" />

      {/* ========== Next.js / React Node ========== */}
      <g className="qd-node">
        <rect x="235" y="135" width="230" height="80" rx="16" fill="url(#qd-main-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />
        {/* React-like icon */}
        <g transform="translate(323, 149)">
          <ellipse cx="8" cy="6" rx="8" ry="3" fill="none" stroke="var(--primary-600)" strokeWidth="0.8" opacity="0.5" transform="rotate(30 8 6)" />
          <ellipse cx="8" cy="6" rx="8" ry="3" fill="none" stroke="var(--primary-600)" strokeWidth="0.8" opacity="0.5" transform="rotate(-30 8 6)" />
          <ellipse cx="8" cy="6" rx="8" ry="3" fill="none" stroke="var(--primary-600)" strokeWidth="0.8" opacity="0.5" />
          <circle cx="8" cy="6" r="1.5" fill="var(--primary-600)" opacity="0.5" />
        </g>
        <text x="350" y="174" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Next.js / React</text>
        <text x="350" y="195" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif">SSR &amp; Client Components</text>
      </g>

      {/* Next.js -> API Routes */}
      <path d="M 350 215 C 350 230, 350 245, 350 260" className="qd-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#qd-arrow)" />

      {/* ========== API Routes Node ========== */}
      <g className="qd-node">
        <rect x="255" y="260" width="190" height="75" rx="16" fill="url(#qd-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* API icon */}
        <g transform="translate(330, 274)">
          <path d="M 0 8 L 4 0 L 8 8 M 2 5 L 6 5" stroke="var(--primary-600)" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 12 0 L 12 8 M 12 0 L 16 0 C 18 0, 18 4, 16 4 L 12 4" stroke="var(--primary-600)" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
        </g>
        <text x="350" y="298" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">API Routes</text>
        <text x="350" y="316" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">REST Endpoints</text>
      </g>

      {/* API Routes -> MongoDB */}
      <path d="M 350 335 C 350 350, 350 365, 350 385" className="qd-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#qd-arrow)" />

      {/* ========== MongoDB Node (bottom) ========== */}
      <g className="qd-node">
        <rect x="255" y="385" width="190" height="80" rx="16" fill="url(#qd-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Database icon */}
        <g transform="translate(330, 397)">
          <ellipse cx="12" cy="4" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 2 4 L 2 18 C 2 22, 22 22, 22 18 L 22 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="12" cy="18" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="350" y="430" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">MongoDB</text>
        <text x="350" y="450" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Document Store</text>
      </g>

      {/* ========== Payment Gateway (left branch) ========== */}
      <g className="qd-node">
        <rect x="30" y="258" width="160" height="80" rx="16" fill="url(#qd-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Payment/card icon */}
        <g transform="translate(90, 270)">
          <rect x="0" y="0" width="18" height="12" rx="2" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="4" x2="18" y2="4" stroke="var(--accent-500)" strokeWidth="1.5" opacity="0.5" />
          <rect x="2" y="7" width="5" height="2" rx="0.5" fill="var(--accent-500)" opacity="0.3" />
        </g>
        <text x="110" y="298" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Payment Gateway</text>
        <text x="110" y="318" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Transactions</text>
      </g>

      {/* API Routes -> Payment Gateway (curved left branch) */}
      <path d="M 255 295 C 225 295, 210 293, 190 293" className="qd-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#qd-arrow)" />
      <text x="222" y="282" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Payments</text>

      {/* ========== XML Invoicing (right branch) ========== */}
      <g className="qd-node">
        <rect x="510" y="258" width="160" height="80" rx="16" fill="url(#qd-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Document/XML icon */}
        <g transform="translate(573, 270)">
          <path d="M 2 0 L 12 0 L 16 4 L 16 14 L 2 14 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 12 0 L 12 4 L 16 4" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <text x="9" y="11" textAnchor="middle" fill="var(--accent-500)" fontSize="5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.6">XML</text>
        </g>
        <text x="590" y="298" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">XML Invoicing</text>
        <text x="590" y="318" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">CFDI Generation</text>
      </g>

      {/* API Routes -> XML Invoicing (curved right branch) */}
      <path d="M 445 295 C 475 295, 490 293, 510 293" className="qd-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#qd-arrow)" />
      <text x="478" y="282" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Invoices</text>

      {/* ========== Legend ========== */}
      <text x="350" y="490" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Full-stack e-commerce architecture with integrated payment and invoicing services
      </text>
    </svg>
  );
}
