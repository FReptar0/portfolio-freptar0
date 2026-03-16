"use client";

export default function SageSyncDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 400"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="SageSync architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .ss-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .ss-node {
          transition: filter 0.3s ease;
        }
        .ss-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="ss-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <linearGradient id="ss-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="ss-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="ss-sub-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--bg-secondary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* ========== Sage 300 ERP Node (left) ========== */}
      <g className="ss-node">
        <rect x="30" y="115" width="170" height="160" rx="16" fill="url(#ss-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        {/* Database icon */}
        <g transform="translate(92, 138)">
          <ellipse cx="14" cy="4" rx="12" ry="4.5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 2 4 L 2 18 C 2 22, 26 22, 26 18 L 26 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="14" cy="18" rx="12" ry="4.5" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="115" y="182" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Sage 300 ERP</text>
        <text x="115" y="200" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Inventory &amp; Assets</text>
        <line x1="55" y1="212" x2="175" y2="212" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.6" />
        <text x="115" y="230" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Source of Truth</text>
        <text x="115" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">MSSQL</text>
      </g>

      {/* ========== SageSync Central Node ========== */}
      <g className="ss-node">
        <rect x="275" y="75" width="250" height="240" rx="16" fill="url(#ss-main-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />

        {/* Title with gear icon */}
        <g transform="translate(372, 94)">
          <circle cx="8" cy="8" r="3.5" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.6" />
          <path d="M 8 2 L 8 0 M 8 14 L 8 16 M 2 8 L 0 8 M 14 8 L 16 8 M 3.8 3.8 L 2.4 2.4 M 12.2 12.2 L 13.6 13.6" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>
        <text x="400" y="108" textAnchor="middle" fill="var(--text-primary)" fontSize="17" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">SageSync</text>
        <text x="400" y="126" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Node.js Background Service</text>

        {/* Sub-node: OAuth2 Manager */}
        <rect x="295" y="145" width="210" height="68" rx="12" fill="url(#ss-sub-fill)" stroke="var(--glass-border)" strokeWidth="1" />
        <g transform="translate(365, 156)">
          <rect x="0" y="0" width="12" height="8" rx="2" fill="none" stroke="var(--primary-600)" strokeWidth="0.8" opacity="0.5" />
          <circle cx="6" cy="4" r="1.5" fill="var(--primary-600)" opacity="0.5" />
        </g>
        <text x="400" y="178" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">OAuth2 Manager</text>
        <text x="400" y="196" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Token Lifecycle &amp; Refresh</text>

        {/* Sub-node: Sync Engine */}
        <rect x="295" y="228" width="210" height="68" rx="12" fill="url(#ss-sub-fill)" stroke="var(--glass-border)" strokeWidth="1" />
        <g transform="translate(368, 240)">
          <path d="M 0 6 L 5 0 L 10 6 M 5 0 L 5 12" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5" />
        </g>
        <text x="400" y="262" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Sync Engine</text>
        <text x="400" y="280" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Scheduled &amp; On-Demand</text>
      </g>

      {/* ========== Fracttal CMMS Node (right) ========== */}
      <g className="ss-node">
        <rect x="600" y="115" width="170" height="160" rx="16" fill="url(#ss-node-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        {/* Cloud icon */}
        <g transform="translate(662, 138)">
          <path d="M 6 16 C 2 16, 0 14, 0 11 C 0 8.5, 1.5 7, 3.5 6.5 C 4 3.5, 6.5 1.5, 9.5 1.5 C 13 1.5, 15.5 3.5, 16 6.5 C 18 6.5, 20 8, 20 11 C 20 14, 17.5 16, 14 16 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="685" y="180" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Fracttal CMMS</text>
        <text x="685" y="198" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">Asset Management</text>
        <line x1="625" y1="210" x2="745" y2="210" stroke="var(--glass-border)" strokeWidth="0.5" opacity="0.6" />
        <text x="685" y="228" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">&amp; Maintenance</text>
        <text x="685" y="246" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">REST API</text>
      </g>

      {/* ========== Curved Connections ========== */}

      {/* Sage 300 -> SageSync (top curve: Inventory Data) */}
      <path d="M 200 170 C 225 170, 245 168, 275 168" className="ss-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ss-arrow)" />
      <text x="237" y="158" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Inventory Data</text>

      {/* SageSync -> Sage 300 (bottom curve: Monitoring) */}
      <path d="M 275 225 C 250 225, 230 228, 200 228" className="ss-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ss-arrow)" />
      <text x="237" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Monitoring</text>

      {/* SageSync -> Fracttal (top curve: Synced Records) */}
      <path d="M 525 170 C 550 170, 570 168, 600 168" className="ss-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ss-arrow)" />
      <text x="562" y="158" textAnchor="middle" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Synced Records</text>

      {/* Fracttal -> SageSync (bottom curve: OAuth2 Tokens) */}
      <path d="M 600 225 C 575 225, 555 228, 525 228" className="ss-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#ss-arrow)" />
      <text x="562" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">OAuth2 Tokens</text>

      {/* ========== Legend ========== */}
      <text x="400" y="370" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Automated synchronization between ERP inventory and CMMS with OAuth2 authentication
      </text>
    </svg>
  );
}
