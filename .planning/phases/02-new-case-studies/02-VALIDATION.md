---
phase: 2
slug: new-case-studies
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (Next.js SSG — build-time validation) |
| **Config file** | next.config.ts (existing) |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 2-01-01 | 01 | 1 | CS-01, CS-02, CS-03 | smoke | `npm run build` | ✅ | ⬜ pending |
| 2-01-02 | 01 | 1 | CS-04 | smoke | `npm run build` | ✅ | ⬜ pending |
| 2-01-03 | 01 | 1 | CS-02 | content | `npm run build` | ✅ | ⬜ pending |
| 2-01-04 | 01 | 1 | CS-01, CS-02, CS-03 | smoke | `npm run build` | ✅ | ⬜ pending |
| 2-01-05 | 01 | 1 | CS-05 | manual | Inspect page source | manual-only | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test files to create. The `npm run build` command exercises SSG path generation, notFound guards, and translation key resolution.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Unique `<title>` and meta description per slug/locale | CS-05 | Build verifies key resolution but not uniqueness | After build, inspect page source for `/en/projects/sagesync`, `/en/projects/cardeal`, `/en/projects/gymmanager` — confirm each has distinct title and description |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
