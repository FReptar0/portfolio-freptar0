---
phase: 1
slug: visual-foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-14
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — visual portfolio site, no test framework installed |
| **Config file** | none |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npm run lint` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npm run lint`
- **Before `/gsd:verify-work`:** Full suite must be green + manual visual review of `/projects/sageconnect` on 375px mobile emulation
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01 | 1 | VIS-03 | manual (visual) | `npm run build` | ✅ | ⬜ pending |
| 1-01-02 | 01 | 1 | VIS-01 | manual (visual) | `npm run build` | ✅ | ⬜ pending |
| 1-01-03 | 01 | 1 | VIS-02 | manual (visual) | `npm run build` | ✅ | ⬜ pending |
| 1-01-04 | 01 | 1 | VIS-04 | manual (visual) | `npm run build` | ✅ | ⬜ pending |
| 1-02-01 | 02 | 1 | ARCH-01 | manual + grep | `grep "CFDI Importer" components/diagrams/SageConnectDiagram.tsx` (empty = pass) | ✅ | ⬜ pending |
| 1-03-01 | 03 | 1 | VIS-05 | manual (DevTools 375px) | `npm run build` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No test framework exists — visual requirements (VIS-01 through VIS-05) validated by manual browser inspection
- ARCH-01 verified with `grep "CFDI Importer" components/diagrams/SageConnectDiagram.tsx` returning empty
- `npm run build` is the primary automated gate — all Phase 1 changes must pass it

*Existing infrastructure covers build verification. No Wave 0 test setup needed.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Hero gradient background visible | VIS-03 | Visual styling — no DOM assertion captures gradient mesh rendering | Load `/projects/sageconnect`, verify gradient mesh visible behind hero text |
| Visual hierarchy — role, tags, metrics distinct | VIS-01 | Subjective visual weight assessment | Load page, verify role badge, tags, and metrics are visually distinct from body text |
| Section breathing room | VIS-02 | Spacing/separator assessment | Scroll through narrative sections, verify visual separation between Overview and Problem/Solution/Impact |
| Metric callout distinction | VIS-04 | Gradient text + card treatment visual check | Verify MetricsGrid cards have gradient text and colored backgrounds |
| Diagram mobile scroll | VIS-05 | Requires mobile viewport emulation | Chrome DevTools → 375px width → verify diagram scrolls horizontally, text readable at min-width |
| Diagram shows Sage 300 Web API | ARCH-01 | Visual confirmation + grep | Verify "CFDI Importer" text is gone, "Sage 300 Web API" node visible with dashed border |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 30s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
