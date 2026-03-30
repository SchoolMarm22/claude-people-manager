# ADR-005: The Case for Longitudinal PTO/Timesheet Data in Sprint Planning

**Status:** Proposed
**Date:** 2026-03-24
**Author:** Christopher Martin

## Context

This ADR documents a product insight from my experience as an EM, not a technical decision.

## The Problem

Sprint planning at most companies works like this:

1. PM proposes scope for the sprint
2. EM checks who's available (manually, by asking or checking a calendar)
3. Team estimates capacity based on vibes
4. Sprint starts, someone takes unexpected PTO, scope slips

The core issue: **capacity planning and time-off data live in different systems with no integration**.

## The Insight

When you unify timesheet, PTO, and sprint planning data in a single system, three things become possible:

### 1. Predictive Capacity

Historical PTO patterns are remarkably consistent:
- December/January always has low capacity (holidays)
- The week after a big launch, people take recovery PTO
- Some team members consistently take every other Friday off

Claude can learn these patterns and proactively adjust sprint capacity planning: *"Based on historical patterns, Sprint 23 (Dec 2-13) will likely have 60% capacity. Last year, 4 of 7 team members took PTO during this window."*

### 2. Burnout Detection

This is sensitive territory, but an important one:
- If someone hasn't taken PTO in 4+ months and their commit patterns show late-night work, that's a signal worth surfacing to their manager (privately).
- This isn't surveillance — it's the same thing a good EM would notice if they were tracking manually. The tool just makes the pattern visible.

**Caveat:** This must be handled with extreme care. The data should surface to the direct manager only, never to skip-levels or HR. It should suggest, never mandate. And it should be presented as "worth checking in about," not "this person is burning out."

### 3. Cross-Team Dependency Planning

When Team A depends on Team B for an API, and three people on Team B have PTO scheduled during the integration window, that's a scheduling conflict no one notices until it's too late.

A unified system can surface: *"The API team has 3/6 engineers on PTO during Sprint 15, which overlaps with your planned API integration. Consider scheduling the integration for Sprint 16 instead."*

## Why This Belongs in a People Platform

Most people think of timesheets and PTO as administrative overhead. But from an EM perspective, it's the foundation of capacity planning — which is the foundation of reliable delivery — which is the foundation of team trust and morale.

The current state of the art (checking 3 different tools manually) means capacity planning is always approximate and always reactive. An AI-native platform that reasons over this data longitudinally turns it into a strategic advantage.

## Implementation Notes (Future)

- Would require MCP integration with Workday/BambooHR for data sync
- Privacy controls: PTO data visible only to direct manager and self
- Claude analysis runs on aggregate/anonymized data where possible
- Individual-level insights (burnout patterns) surfaced only to direct manager
