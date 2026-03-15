"use client";

export default function SageConnectDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 500"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SageConnect architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .sc-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .sc-node {
          transition: filter 0.3s ease;
        }
        .sc-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="sc-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <linearGradient id="sc-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="sc-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="sc-sub-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg-secondary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* ========== Sage 300 ERP Node (left) ========== */}
      <g className="sc-node">
        <rect x="20" y="120" width="190" height="170" rx="16" fill="url(#sc-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Database icon */}
        <g transform="translate(90, 150)">
          <ellipse cx="20" cy="4" rx="16" ry="5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.7" />
          <path d="M 4 4 L 4 22 C 4 26, 36 26, 36 22 L 36 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.7" />
          <ellipse cx="20" cy="22" rx="16" ry="5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.7" />
        </g>
        <text x="115" y="195" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Sage 300 ERP</text>
        <text x="115" y="215" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">MSSQL Database</text>
        <line x1="50" y1="228" x2="180" y2="228" stroke="var(--glass-border)" strokeWidth="0.5" />
        <text x="115" y="246" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">APVEND, POPORH1</text>
        <text x="115" y="262" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">PORCPH1, APTCR</text>
      </g>

      {/* ========== SageConnect Main Node (center) ========== */}
      <g className="sc-node">
        <rect x="270" y="55" width="410" height="280" rx="16" fill="url(#sc-main-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />

        {/* Title area */}
        {/* Gear icon */}
        <g transform="translate(440, 72)">
          <circle cx="8" cy="8" r="3.5" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.6" />
          <path d="M 8 2 L 8 0 M 8 14 L 8 16 M 2 8 L 0 8 M 14 8 L 16 8 M 3.8 3.8 L 2.4 2.4 M 12.2 12.2 L 13.6 13.6 M 3.8 12.2 L 2.4 13.6 M 12.2 3.8 L 13.6 2.4" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>
        <text x="475" y="86" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">SageConnect</text>
        <text x="475" y="104" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Node.js / Express &mdash; Single Process</text>

        {/* Multi-tenant badge */}
        <rect x="418" y="114" width="114" height="22" rx="11" fill="var(--accent-500)" opacity="0.12" />
        <text x="475" y="129" textAnchor="middle" fill="var(--accent-500)" fontSize="10" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Multi-tenant</text>

        {/* Sub-node: Express Dashboard */}
        <rect x="290" y="150" width="185" height="168" rx="12" fill="url(#sc-sub-fill)" stroke="var(--glass-border)" strokeWidth="1" />
        {/* Monitor icon */}
        <g transform="translate(358, 162)">
          <rect x="0" y="0" width="16" height="11" rx="2" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
          <line x1="8" y1="11" x2="8" y2="14" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
          <line x1="4" y1="14" x2="12" y2="14" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="382" y="193" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Express Dashboard</text>
        <text x="382" y="210" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Port 3030</text>
        <line x1="310" y1="220" x2="454" y2="220" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.6" />
        <text x="382" y="238" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Logs &amp; Monitoring</text>
        <text x="382" y="254" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Execution Status</text>
        <text x="382" y="270" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Stats &amp; Shutdown</text>

        {/* Sub-node: Background Processor */}
        <rect x="490" y="150" width="175" height="168" rx="12" fill="url(#sc-sub-fill)" stroke="var(--glass-border)" strokeWidth="1" />
        {/* Gear icon */}
        <g transform="translate(554, 162)">
          <circle cx="8" cy="8" r="3" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
          <path d="M 8 2 L 8 0.5 M 8 14 L 8 15.5 M 2 8 L 0.5 8 M 14 8 L 15.5 8" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="577" y="193" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Background Processor</text>
        <text x="577" y="210" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">8 Controllers / Tenant</text>
        <line x1="508" y1="220" x2="648" y2="220" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.6" />
        <text x="577" y="236" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Provider Sync</text>
        <text x="577" y="250" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">CFDI Download</text>
        <text x="577" y="264" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Payment Check &amp; Upload</text>
        <text x="577" y="278" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">PO Create / Update / Close</text>
        <text x="577" y="292" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">PO Cancellation</text>
      </g>

      {/* ========== Portal de Proveedores Node (right) ========== */}
      <g className="sc-node">
        <rect x="740" y="120" width="145" height="170" rx="16" fill="url(#sc-node-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Cloud icon */}
        <g transform="translate(787, 143)">
          <path d="M 8 18 C 3 18, 0 15.5, 0 12.5 C 0 10, 2 8, 4.5 7.5 C 5 4, 8 2, 11.5 2 C 15.5 2, 18.5 4.5, 19 7.5 C 21.5 7.5, 24 9.5, 24 12.5 C 24 15.5, 21 18, 16 18 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="812" y="183" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Portal de</text>
        <text x="812" y="200" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Proveedores</text>
        <text x="812" y="220" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Focaltec</text>
        <line x1="760" y1="230" x2="865" y2="230" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.6" />
        <text x="812" y="246" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">REST API</text>
        <text x="812" y="260" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">Providers, POs,</text>
        <text x="812" y="274" textAnchor="middle" fill="var(--text-secondary)" fontSize="9.5" fontFamily="system-ui, -apple-system, sans-serif">CFDIs, Payments</text>
      </g>

      {/* ========== Sage 300 Web API Node (bottom center, planned migration) ========== */}
      <g className="sc-node">
        <rect x="385" y="385" width="180" height="80" rx="16"
          fill="url(#sc-node-fill)"
          stroke="var(--primary-600)"
          strokeWidth="1.5"
          strokeDasharray="4 2"
        />
        {/* Network/API icon */}
        <g transform="translate(454, 398)">
          <rect x="0" y="2" width="14" height="10" rx="2"
            fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.5" />
          <path d="M 3 0 L 3 4 M 7 0 L 7 4 M 11 0 L 11 4"
            stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="475" y="425" textAnchor="middle"
          fill="var(--text-primary)" fontSize="14" fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif">
          Sage 300 Web API
        </text>
        <text x="475" y="443" textAnchor="middle"
          fill="var(--text-secondary)" fontSize="9.5"
          fontFamily="system-ui, -apple-system, sans-serif">
          REST / JSON
        </text>
        <text x="475" y="457" textAnchor="middle"
          fill="var(--accent-500)" fontSize="9.5" fontWeight="600"
          fontFamily="system-ui, -apple-system, sans-serif">
          Planned Migration
        </text>
      </g>

      {/* ========== Curved Connections ========== */}

      {/* Sage 300 -> SageConnect (top curve) */}
      <path d="M 210 175 C 230 175, 240 170, 270 170" className="sc-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#sc-arrow)" />
      <text x="240" y="160" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">MSSQL Queries</text>

      {/* SageConnect -> Sage 300 (bottom curve) */}
      <path d="M 270 215 C 245 215, 235 220, 210 220" className="sc-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#sc-arrow)" />
      <text x="240" y="240" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">POs, Payments, Vendors</text>

      {/* SageConnect -> Portal (top curve) */}
      <path d="M 680 175 C 700 175, 720 170, 740 170" className="sc-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#sc-arrow)" />
      <text x="710" y="160" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">REST API</text>

      {/* Portal -> SageConnect (bottom curve) */}
      <path d="M 740 225 C 720 225, 700 230, 680 230" className="sc-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#sc-arrow)" />
      <text x="710" y="250" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">CFDIs, POs, Payments</text>

      {/* SageConnect -> Sage 300 Web API (downward curve, planned) */}
      <path d="M 475 335 C 475 355, 475 365, 475 385" className="sc-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#sc-arrow)" />
      <text x="510" y="365" textAnchor="middle"
        fill="var(--accent-500)" fontSize="9.5" fontWeight="600"
        fontFamily="system-ui, -apple-system, sans-serif">
        REST API (Planned)
      </text>

      {/* ========== Legend ========== */}
      <text x="450" y="490" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Single-process architecture: sequential multi-tenant sync between Sage 300, Portal, and Web API (planned)
      </text>
    </svg>
  );
}
