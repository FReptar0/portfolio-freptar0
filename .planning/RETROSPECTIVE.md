# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v2.1 — Content Accuracy & Trust

**Shipped:** 2026-03-27
**Phases:** 2 | **Plans:** 4 | **Sessions:** 1

### What Was Built
- Honest Hero metrics replacing inflated claims (6+ Systems, 300+ Users, 99% Error Reduction)
- "Technologies" section replacing fake "Certifications"
- Spring Boot fully decoupled from SageConnect across all surfaces
- CarryTrade correctly labeled as paper trading experiment
- Team roles shown instead of anonymous headcounts (all 7 projects)
- Cross-content tech stack consistency fixes (SageSync DB, SageConnect stack, skills.json)

### What Worked
- Recruiter-eye audit upfront identified all issues before planning — zero surprises during execution
- Both Wave 1 plans ran in parallel with no conflicts (separate file sets)
- Planner's codebase audit discovered additional issues (SageSync EN/ES mismatch, skills.json false associations) beyond what the user reported
- All 4 plans passed verification on first attempt — no revision loops needed

### What Was Inefficient
- Phase 7 already partially fixed TRST-03 (SageConnect Spring Boot in timeline), making Phase 8's Task 2 a no-op verification. Could have scoped tighter.
- Wave 2 dependency in Phase 8 was unnecessary — plans touched overlapping files but different fields; parallel would have been safe

### Patterns Established
- Content accuracy audits should be done from a "recruiter persona" perspective — catches trust gaps humans miss
- Locale JSON fixes should always be scoped as EN+ES pairs to prevent drift

### Key Lessons
1. Inflated metrics on portfolios are a bigger trust risk than missing features — honest numbers > impressive numbers
2. Cross-content consistency (same tech stack in 4 different places) is a maintenance burden — consider a single source of truth for tech stacks
3. Small content-fix milestones execute very fast (1 session, ~30min execution) — don't over-plan them

### Cost Observations
- Model mix: 40% opus (orchestration), 60% sonnet (agents)
- Sessions: 1
- Notable: Entire milestone from init to completion in a single session — content fixes are ideal for fast milestones

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v2.1 | 1 | 2 | First content-only milestone; recruiter persona audit pattern |

### Top Lessons (Verified Across Milestones)

1. Content accuracy and trust signals matter more than visual polish for recruiter-facing portfolios
