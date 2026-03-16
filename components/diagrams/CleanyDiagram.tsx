"use client";

export default function CleanyDiagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 560"
      className={`w-full h-auto ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cleany architecture diagram"
    >
      <style>{`
        @keyframes flowDash {
          to { stroke-dashoffset: -24; }
        }
        .cl-flow-line {
          stroke-dasharray: 8 8;
          animation: flowDash 1.5s linear infinite;
        }
        .cl-node {
          transition: filter 0.3s ease;
        }
        .cl-node:hover {
          filter: drop-shadow(0 4px 16px rgba(0,0,0,0.15));
        }
      `}</style>

      <defs>
        <marker id="cl-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--primary-600)" opacity="0.7" />
        </marker>
        <marker id="cl-arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 7 4 L 0 7 Z" fill="var(--accent-500)" opacity="0.7" />
        </marker>
        <linearGradient id="cl-node-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cl-main-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="cl-accent-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--glass-bg)" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      {/* ========== Landing Page (top left) ========== */}
      <g className="cl-node">
        <rect x="30" y="20" width="200" height="85" rx="16" fill="url(#cl-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(110, 30)">
          <rect x="0" y="0" width="18" height="14" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="0" y1="5" x2="18" y2="5" stroke="var(--text-secondary)" strokeWidth="0.8" opacity="0.4" />
          <circle cx="3" cy="2.5" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
          <circle cx="6" cy="2.5" r="0.8" fill="var(--text-secondary)" opacity="0.4" />
        </g>
        <text x="130" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Landing Page</text>
        <text x="130" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Next.js + Sanity CMS</text>
        <text x="130" y="92" textAnchor="middle" fill="var(--accent-500)" fontSize="9" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">cleany.pro</text>
      </g>

      {/* ========== Admin Dashboard (top center) ========== */}
      <g className="cl-node">
        <rect x="280" y="20" width="200" height="85" rx="16" fill="url(#cl-node-fill)" stroke="var(--primary-600)" strokeWidth="1.8" />
        <g transform="translate(362, 30)">
          <rect x="0" y="0" width="16" height="12" rx="1.5" fill="none" stroke="var(--primary-600)" strokeWidth="1" opacity="0.6" />
          <rect x="3" y="5" width="2.5" height="5" rx="0.5" fill="var(--primary-600)" opacity="0.35" />
          <rect x="7" y="3" width="2.5" height="7" rx="0.5" fill="var(--primary-600)" opacity="0.35" />
          <rect x="11" y="6" width="2.5" height="4" rx="0.5" fill="var(--primary-600)" opacity="0.35" />
        </g>
        <text x="380" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Admin Dashboard</text>
        <text x="380" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">React SPA + Zustand</text>
        <text x="380" y="92" textAnchor="middle" fill="var(--accent-500)" fontSize="9" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">app.cleany.pro</text>
      </g>

      {/* ========== Worker PWA (top right) ========== */}
      <g className="cl-node">
        <rect x="530" y="20" width="200" height="85" rx="16" fill="url(#cl-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(616, 30)">
          <rect x="2" y="0" width="10" height="16" rx="2" fill="none" stroke="var(--text-secondary)" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="13" x2="9" y2="13" stroke="var(--text-secondary)" strokeWidth="0.8" opacity="0.4" />
        </g>
        <text x="630" y="62" textAnchor="middle" fill="var(--text-primary)" fontSize="14" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Worker PWA</text>
        <text x="630" y="78" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Offline-First + QR Auth</text>
        <text x="630" y="92" textAnchor="middle" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Service Worker + IndexedDB</text>
      </g>

      {/* Admin -> Fastify API */}
      <path d="M 380 105 C 380 130, 400 145, 430 170" className="cl-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#cl-arrow)" />
      <text x="420" y="132" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Axios + JWT</text>

      {/* Worker -> Fastify API */}
      <path d="M 630 105 C 630 130, 560 150, 520 170" className="cl-flow-line" stroke="var(--primary-600)" strokeWidth="1.5" fill="none" markerEnd="url(#cl-arrow)" />
      <text x="570" y="132" textAnchor="start" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Sync Queue</text>

      {/* ========== Fastify API (center) ========== */}
      <g className="cl-node">
        <rect x="340" y="170" width="240" height="120" rx="16" fill="url(#cl-main-fill)" stroke="var(--primary-600)" strokeWidth="2" />
        <g transform="translate(440, 182)">
          <circle cx="8" cy="8" r="7" fill="none" stroke="var(--primary-600)" strokeWidth="1.2" opacity="0.5" />
          <path d="M 5 5 L 11 11 M 8 4 L 8 12" stroke="var(--primary-600)" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        </g>
        <text x="460" y="210" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="700" fontFamily="system-ui, -apple-system, sans-serif">Fastify REST API</text>
        <text x="460" y="230" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">JWT Auth + JSON Schema Validation</text>
        <text x="460" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">16 Routes &middot; 17 Services</text>
        <text x="460" y="266" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Multi-Tenant Isolation</text>
      </g>

      {/* Fastify -> PostgreSQL */}
      <path d="M 460 290 C 460 315, 460 335, 460 360" className="cl-flow-line" stroke="var(--primary-600)" strokeWidth="1.8" fill="none" markerEnd="url(#cl-arrow)" />
      <text x="478" y="332" textAnchor="start" fill="var(--accent-500)" fontSize="9.5" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Prisma ORM</text>

      {/* ========== PostgreSQL (bottom center) ========== */}
      <g className="cl-node">
        <rect x="355" y="360" width="210" height="95" rx="16" fill="url(#cl-node-fill)" stroke="var(--glass-border)" strokeWidth="1.5" />
        <g transform="translate(440, 372)">
          <ellipse cx="12" cy="4" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <path d="M 2 4 L 2 18 C 2 22, 22 22, 22 18 L 22 4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
          <ellipse cx="12" cy="18" rx="10" ry="4" fill="none" stroke="var(--accent-500)" strokeWidth="1.2" opacity="0.6" />
        </g>
        <text x="460" y="410" textAnchor="middle" fill="var(--text-primary)" fontSize="15" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">PostgreSQL</text>
        <text x="460" y="428" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">22 Models &middot; Multi-Tenant</text>
        <text x="460" y="444" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Jobs, Customers, Workers, Invoices</text>
      </g>

      {/* ========== Stripe (left side) ========== */}
      <g className="cl-node">
        <rect x="30" y="190" width="170" height="80" rx="16" fill="url(#cl-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <g transform="translate(95, 200)">
          <rect x="0" y="0" width="16" height="11" rx="2" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <line x1="0" y1="4" x2="16" y2="4" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
          <line x1="3" y1="7.5" x2="7" y2="7.5" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
        </g>
        <text x="115" y="232" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Stripe</text>
        <text x="115" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">SaaS Billing +</text>
        <text x="115" y="261" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Customer Payments</text>
      </g>

      {/* Fastify -> Stripe */}
      <path d="M 340 230 C 290 230, 240 230, 200 230" className="cl-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#cl-arrow-accent)" />
      <text x="270" y="222" textAnchor="middle" fill="var(--accent-500)" fontSize="9" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Webhooks</text>

      {/* ========== Notifications (right side) ========== */}
      <g className="cl-node">
        <rect x="700" y="190" width="170" height="80" rx="16" fill="url(#cl-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <g transform="translate(770, 200)">
          <path d="M 7 0 C 3 0, 0 3, 0 6 L 0 9 L 14 9 L 14 6 C 14 3, 11 0, 7 0 Z" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <line x1="5" y1="11" x2="9" y2="11" stroke="var(--accent-500)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>
        <text x="785" y="232" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Notifications</text>
        <text x="785" y="248" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Resend (Email)</text>
        <text x="785" y="261" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Twilio (SMS)</text>
      </g>

      {/* Fastify -> Notifications */}
      <path d="M 580 230 C 630 230, 660 230, 700 230" className="cl-flow-line" stroke="var(--accent-500)" strokeWidth="1.5" fill="none" markerEnd="url(#cl-arrow-accent)" />
      <text x="640" y="222" textAnchor="middle" fill="var(--accent-500)" fontSize="9" fontWeight="500" fontFamily="system-ui, -apple-system, sans-serif">Fire &amp; Forget</text>

      {/* ========== Recurring Engine (bottom left) ========== */}
      <g className="cl-node">
        <rect x="30" y="370" width="170" height="80" rx="16" fill="url(#cl-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <g transform="translate(97, 380)">
          <circle cx="8" cy="8" r="7" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 8 3 L 8 8 L 12 10" stroke="var(--accent-500)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
        </g>
        <text x="115" y="410" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Schedule Engine</text>
        <text x="115" y="426" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Recurring Jobs</text>
        <text x="115" y="439" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Weekly/Biweekly/Monthly</text>
      </g>

      {/* Fastify -> Schedule Engine */}
      <path d="M 340 270 C 260 300, 180 340, 150 370" className="cl-flow-line" stroke="var(--accent-500)" strokeWidth="1.2" fill="none" markerEnd="url(#cl-arrow-accent)" opacity="0.6" />

      {/* Schedule Engine -> PostgreSQL */}
      <path d="M 200 410 C 260 410, 310 408, 355 408" className="cl-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#cl-arrow)" opacity="0.3" />

      {/* ========== Payroll (bottom right) ========== */}
      <g className="cl-node">
        <rect x="700" y="370" width="170" height="80" rx="16" fill="url(#cl-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.5" />
        <g transform="translate(770, 380)">
          <rect x="0" y="2" width="14" height="10" rx="1.5" fill="none" stroke="var(--accent-500)" strokeWidth="1" opacity="0.6" />
          <path d="M 5 0 L 5 4 M 9 0 L 9 4" stroke="var(--accent-500)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
          <line x1="3" y1="7" x2="11" y2="7" stroke="var(--accent-500)" strokeWidth="0.8" opacity="0.4" />
        </g>
        <text x="785" y="410" textAnchor="middle" fill="var(--text-primary)" fontSize="13" fontWeight="600" fontFamily="system-ui, -apple-system, sans-serif">Payroll + Invoicing</text>
        <text x="785" y="426" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">PDF Generation</text>
        <text x="785" y="439" textAnchor="middle" fill="var(--text-secondary)" fontSize="10" fontFamily="system-ui, -apple-system, sans-serif">Payment Tracking</text>
      </g>

      {/* Fastify -> Payroll */}
      <path d="M 580 270 C 660 300, 740 340, 760 370" className="cl-flow-line" stroke="var(--accent-500)" strokeWidth="1.2" fill="none" markerEnd="url(#cl-arrow-accent)" opacity="0.6" />

      {/* Payroll -> PostgreSQL */}
      <path d="M 700 410 C 640 410, 610 408, 565 408" className="cl-flow-line" stroke="var(--primary-600)" strokeWidth="1" fill="none" markerEnd="url(#cl-arrow)" opacity="0.3" />

      {/* ========== Landing -> Stripe (subtle connection) ========== */}
      <path d="M 130 105 C 130 140, 115 160, 115 190" className="cl-flow-line" stroke="var(--accent-500)" strokeWidth="1" fill="none" markerEnd="url(#cl-arrow-accent)" opacity="0.4" />
      <text x="140" y="152" textAnchor="start" fill="var(--text-secondary)" fontSize="8" fontFamily="system-ui, -apple-system, sans-serif">Checkout</text>

      {/* ========== Legend ========== */}
      <text x="450" y="500" textAnchor="middle" fill="var(--text-secondary)" fontSize="10.5" fontFamily="system-ui, -apple-system, sans-serif" opacity="0.8">
        Multi-tenant SaaS platform: 3 apps (Landing + Admin SPA + Worker PWA) communicating via Fastify REST API
      </text>

      {/* Legend items */}
      <g transform="translate(240, 518)">
        <line x1="0" y1="0" x2="20" y2="0" stroke="var(--primary-600)" strokeWidth="1.8" className="cl-flow-line" />
        <text x="26" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Data Flow</text>
        <line x1="100" y1="0" x2="120" y2="0" stroke="var(--accent-500)" strokeWidth="1.5" className="cl-flow-line" />
        <text x="126" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">External Service</text>
        <rect x="230" y="-6" width="12" height="12" rx="3" fill="url(#cl-main-fill)" stroke="var(--primary-600)" strokeWidth="1.2" />
        <text x="248" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Core Service</text>
        <rect x="330" y="-6" width="12" height="12" rx="3" fill="url(#cl-accent-fill)" stroke="var(--accent-500)" strokeWidth="1.2" />
        <text x="348" y="4" fill="var(--text-secondary)" fontSize="9" fontFamily="system-ui, -apple-system, sans-serif">Integration</text>
      </g>
    </svg>
  );
}
