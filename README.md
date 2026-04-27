# Founder's Runway

A modern, mobile-first web application designed as a premium fintech dashboard for startup founders to understand and control their cash flow and survival runway.

## What is Runway?
Runway is the amount of time your startup has before it completely depletes its cash reserves, assuming current revenue and expense trajectories.

## Why it matters
Cash flow issues are the leading reason startups fail (approx 29%). Knowing your exact runway dictates:
- When you absolutely must begin fundraising
- When you need to cut operational costs or pivot
- How aggressively you can invest your capital in long-term growth

## How calculations work
- **Net Burn** = Monthly Expenses − Monthly Revenue. If revenue > expenses, we flag the company as "Profitable" and runway is marked infinity.
- **Runway (months)** = Total Cash / Net Burn
- **Days to Zero** = Runway * 30 days
- **Fundraising Date** = Today + (Runway − 9 months). General consensus is fundraising takes roughly 6-9 months to prepare for and close.
- **Advanced Simulation**: In advanced mode, the chart simulates exact month-over-month cash depletion, folding in anticipated `%` growth in revenue vs `%` growth in expenses.

## Design decisions
- **Premium Fintech Aesthetic**: Used a dark navy background (`#0f172a`), "glassmorphism" translucent cards, and smooth indigo/cyan gradients for a sense of modern trust and professional urgency.
- **Micro-interactions**: Integrated Framer Motion and custom transitions. Achieving an 18+ month runway shoots confetti as a reward, incentivizing sound financial management.
- **Status Zones**: Rather than just displaying raw numbers, states visually shift to Red (Critical), Amber (Warning), Green (Healthy), or Blue (Strong), creating instantly readable urgency.

## Future improvements
- Complete the modular Cost Breakdown panel (salaries, marketing, server tools).
- Generate downloadable PDF "Survival Plans".
- Connect directly to bank feeds (Plaid API) for real-time burn analysis without manual data entry.
- Build sharable links using Base64 encoded URL parameters to share specific scenarios with co-founders or board members.
