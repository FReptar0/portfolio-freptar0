---
phase: 3
slug: evolution-and-discovery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None (Next.js SSG — build-time validation) |
| **Config file** | next.config.ts (existing) |
| **Quick run command** | `npm run lint` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run lint`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | EVO-01 | smoke | `npm run build` | ✅ | ⬜ pending |
| 3-01-02 | 01 | 1 | EVO-02 | smoke | `npm run build` | ✅ | ⬜ pending |
| 3-01-03 | 01 | 1 | EVO-03 | smoke | `npm run build` | ✅ | ⬜ pending |
| 3-02-01 | 02 | 1 | DISC-02 | smoke | `npm run build` | ✅ | ⬜ pending |
| 3-02-02 | 02 | 1 | DISC-01 | smoke | `npm run build` | ✅ | ⬜ pending |
| 3-02-03 | 02 | 1 | DISC-02 | content | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

Existing infrastructure covers all phase requirements. No test framework to install. The `npm run build` command exercises SSG path generation, translation key resolution, and component rendering. New files created during execution are validated by the build.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| SageConnect whatNext renders visually correct | EVO-01 | Build confirms key resolution but not visual rendering | Navigate to `/en/projects/sageconnect` — confirm purple glass card with Rocket icon |
| SageSync whatNext renders visually correct | EVO-02 | Content quality requires human review | Navigate to `/en/projects/sagesync` — confirm evolution narrative reads well |
| Tech page whatNext renders before CTA | EVO-03 | Placement requires visual confirmation | Navigate to `/en/projects/sageconnect/tech` — confirm whatNext appears before CTA |
| Projects index shows 4 cards with correct info | DISC-02 | Layout and content require visual inspection | Navigate to `/en/projects` — confirm 4 cards with title, tagline, metrics, tags |
| Nav "Case Studies" link works from all pages | DISC-02 | Cross-page navigation requires browser testing | Click nav link from homepage and from a case study page |
| EVO-04 extensibility — no code registration | EVO-04 | Design principle verification | `grep -r "projectsWithEvolution" .` returns empty |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
