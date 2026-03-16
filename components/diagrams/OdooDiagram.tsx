"use client";

export default function OdooDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 750 450"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Odoo architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .od-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .od-node {
          transition: filter 0.3s ease;
        }
        .od-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="od-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <linearGradient id="od-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="od-core-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="od-module-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* ========== Odoo Core (center) ========== */}
      <g className="od-node">
        <rect x="265" y="155" width="220" height="110" rx="16" fill="url(#od-core-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />
        {/* Gear icon */}
        <g transform="translate(349, 168)">
          <circle cx="8" cy="8" r="4" fill="none" stroke="var(--primary-600)" strokeWidth="1.2" opacity="0.5" />
          <path d="M 8 1 L 8 0 M 8 15 L 8 16 M 1 8 L 0 8 M 15 8 L 16 8 M 3.3 3.3 L 2 2 M 12.7 12.7 L 14 14 M 3.3 12.7 L 2 14 M 12.7 3.3 L 14 2" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="375" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="18" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Odoo Core</text>
        <text x="375" y="220" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">ERP Framework</text>
        <text x="375" y="237" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif">Python / ORM</text>
      </g>

      {/* ========== Billing Module (top-left) ========== */}
      <g className="od-node">
        <rect x="35" y="30" width="185" height="95" rx="16" fill="url(#od-module-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Invoice/document icon */}
        <g transform="translate(108, 42)">
          <path d="M 2 0 L 12 0 L 16 4 L 16 16 L 2 16 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 12 0 L 12 4 L 16 4" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <line x1="5" y1="7" x2="13" y2="7" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
          <line x1="5" y1="10" x2="11" y2="10" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
          <line x1="5" y1="13" x2="9" y2="13" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
        </g>
        <text x="127" y="74" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Billing Module</text>
        <text x="127" y="92" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">CFDI 4.0 Invoicing</text>
        <text x="127" y="108" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">&amp; Complements</text>
      </g>

      {/* Billing -> Core (curved) */}
      <path d="M 220 110 C 240 130, 260 145, 280 160" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#od-arrow)" />

      {/* ========== RFC Validator (top-right) ========== */}
      <g className="od-node">
        <rect x="530" y="30" width="185" height="95" rx="16" fill="url(#od-module-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Shield/check icon */}
        <g transform="translate(604, 42)">
          <path d="M 8 0 L 16 4 L 16 10 C 16 14, 8 18, 8 18 C 8 18, 0 14, 0 10 L 0 4 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 4 9 L 7 12 L 12 6" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </g>
        <text x="622" y="74" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">RFC Validator</text>
        <text x="622" y="92" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">SAT Blacklist Check</text>
        <text x="622" y="108" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">&amp; Validation</text>
      </g>

      {/* RFC Validator -> Core (curved) */}
      <path d="M 530 110 C 510 130, 490 145, 470 160" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#od-arrow)" />

      {/* ========== Payment Control (right) ========== */}
      <g className="od-node">
        <rect x="555" y="175" width="165" height="85" rx="16" fill="url(#od-module-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Payment/wallet icon */}
        <g transform="translate(618, 188)">
          <rect x="0" y="2" width="16" height="12" rx="2" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 0 6 L 16 6" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
          <circle cx="12" cy="10" r="1.5" fill="var(--accent-500)" opacity="0.4" />
        </g>
        <text x="637" y="218" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Payment Control</text>
        <text x="637" y="238" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Multi-method Tracking</text>
      </g>

      {/* Payment Control -> Core (curved) */}
      <path d="M 555 218 C 530 218, 510 215, 485 210" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#od-arrow)" />

      {/* ========== PostgreSQL (bottom center) ========== */}
      <g className="od-node">
        <rect x="270" y="330" width="210" height="90" rx="16" fill="url(#od-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Database icon */}
        <g transform="translate(352, 342)">
          <ellipse cx="14" cy="4" rx="12" ry="4.5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 2 4 L 2 20 C 2 24, 26 24, 26 20 L 26 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="14" cy="20" rx="12" ry="4.5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="375" y="380" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">PostgreSQL</text>
        <text x="375" y="400" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Relational Database</text>
        <text x="375" y="414" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Odoo ORM Layer</text>
      </g>

      {/* Core -> PostgreSQL (curved) */}
      <path d="M 375 265 C 375 285, 375 305, 375 330" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#od-arrow)" />
      <text x="400" y="302" textAnchor="start" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Queries</text>

      {/* ========== Subtle module-to-DB connections ========== */}

      {/* Billing -> PostgreSQL (curved diagonal) */}
      <path d="M 127 125 C 127 200, 200 290, 280 350" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#od-arrow)" opacity="0.3" />

      {/* RFC Validator -> PostgreSQL (curved diagonal) */}
      <path d="M 622 125 C 622 200, 550 290, 470 350" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#od-arrow)" opacity="0.3" />

      {/* Payment Control -> PostgreSQL (curved diagonal) */}
      <path d="M 620 260 C 600 290, 530 320, 470 350" className="od-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#od-arrow)" opacity="0.3" />

      {/* ========== Legend ========== */}
      <text x="375" y="442" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Custom Odoo modules extending core ERP with Mexican fiscal compliance
      </text>
    </svg>
  );
}
