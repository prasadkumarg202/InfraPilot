# INFRsre — Autonomous Infrastructure Operations Platform

Marketing site design + animated product demo films for **INFRsre**, an AI-powered enterprise infrastructure automation platform. Built as interactive HTML design components — every page opens directly in a browser.

## Contents

### Site
| File | Description |
|---|---|
| `INFRsre Home.dc.html` | Home page — animated hero with live ops console, ops ticker, platform modules, 4 interactive demo tabs, "Watch it work" demo-film gallery (6 films), technology coverage wall, interactive ROI calculator, integrations, customers, comparison table (vs scripts+Ansible / legacy suites), industries, PoC CTA with pricing signal |
| `Security.dc.html` | Security & Trust — certifications (SOC 2, ISO 27001, PCI-ready, FedRAMP in process), how the platform touches the estate (agentless, vault-only credentials, signed actions, policy gates, RBAC/SSO, data residency), deployment models (SaaS / private cloud / air-gapped), security-package CTA |
| `Case Studies.dc.html` | Case studies — three deep dives with challenge → approach → result, metric tiles and quotes: Fortune 100 bank (92% patch automation, $4.2M saved), hospital network (MTTR 41m → 3.2m), tier-1 telecom (400 DB migrations in 11 weeks) |

**v2 additions to the home page:** "Watch it work" demo-film gallery links to all 6 films; each demo tab (self-healing, patch, migration) has a "▶ Watch the demo film" link into its film; hero live console, ticker and patch/migration tab copy rewritten to match the current film stories (INC0048122 / RB-1108 service-restore, CHG0042917 topology-aware patch waves, SQLAG-11 Always On cutover); comparison table (INFRsre vs scripts+Ansible vs legacy suites); pricing signal in the CTA. Fixed broken demo-film links (filenames use a plain hyphen, links previously used an em-dash). Added a ✕ close button on every demo film page, back to the home gallery.

### Demo films (animated, 1280×720, scrub/retime on the built-in timeline, exportable to video)
| File | Length | Story |
|---|---|---|
| `Demo Video — Self-Healing.dc.html` | 36s | SQL Server service stops on SQL-PRD-14 → ServiceNow incident INC0048122 auto-created → runbook RB-1108 starts the service, verifies 14 databases → incident validated & closed |
| `Demo Video — Patch Orchestration.dc.html` | 60s | CR CHG0042917 → servers fetched from ServiceNow CMDB → pre-checks → topology detection (standalone / Always On AG / failover cluster) → AG: secondaries first, failover, former primary; cluster: passive node, failover, previous active → CR closed |
| `Demo Video — SQL Migration.dc.html` | 60s | SQL 2016 → 2022 Always On: full backups → restore on all replicas WITH NORECOVERY → tail-log backup, primary WITH RECOVERY, secondaries NORECOVERY → AG config (11A+11B sync + auto failover in US-East, 11C async remote in US-West) → compat level, CHECKDB, maintenance jobs → CR closed |
| `Demo Video — SQL Server Build.dc.html` | 68s | Intake RITM0067342 (WS2022, SQL 2022 + CU12, 8 vCPU/64 GB) → create VM → format & label drives (C: OS · D: SQLBin · E: SQLData · F: SQLLogs · G: Backups · I: TempDB, 64K) → pre-build → unattended install → memory/MAXDOP/TempDB/policy → health checks |
| `Demo Video — Infrastructure Discovery.dc.html` | 60s | Agentless scan (4 subnets, vault credentials) → 1,240 CIs discovered & classified → dependency graph (3,861 edges) → ServiceNow CMDB sync → live inventory |
| `Demo Video — Compliance.dc.html` | 59s | CIS v8 / PCI-DSS 4.0 / company baseline → continuous scan → 37 findings ranked → auto-remediation + filed exceptions → signed evidence to GRC → per-platform dashboard (SQL Server 99.1%, Oracle 97.6%, Middleware 96.2%) |

### Supporting files
- `demo-*.jsx` — scene code for each film (one file per film)
- `animations-v2.jsx` — timeline animation engine (scene sequencing, scrubbing, video export)
- `tweaks-panel.jsx` — tweaks/controls shell
- `_ds/` — bound design system (tokens + component bundle)

## Design language
Dark enterprise theme derived from the bound design-system tokens: navy ink surfaces (`#0C1424` / `#14203A` / `#1E2C49`), vermillion brand accent (`#E11B22`), gold highlights (`#E8A020`), success green (`#1E9E62`). Type: Anek Latin (display), Noto Sans (body), IBM Plex Mono (data/numerals).

## Using the films
- Open any `Demo Video — *.dc.html` — it plays on a timeline (scrub the ruler, drag scene edges to retime, right-click scenes for options).
- Export to video via Share → Export → Video.
- All product data (server names, CR/incident numbers, metrics) is illustrative sample content.

## Status / next steps
- Pending: executive dashboard film; additional site pages (Platform, full Pricing, Integrations detail).
- Naming: current wordmark is "INFRsre" — alternatives discussed (Ironstack, AlwaysOps) not yet applied.

---
*Version: v2 · 2026-08-07*
