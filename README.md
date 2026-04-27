# Founder's Runway 2.0

A modern, mobile-first web application designed as a premium fintech dashboard for startup founders to understand, control, and project their cash flow and survival runway.

## 🚀 Core Features

- **Real-Time Calculation Engine**: Calculates exact runway months, net burn, and the specific "Cash Zero Date" instantly as you change inputs.
- **Dynamic Scenario Modeling**: Track current vs. projected states side-by-side. Model the exact impact of adding team members, cutting costs, changing revenue growth rates, or factoring in a new funding round.
- **Interactive Visualizations**: Detailed SVG donut charts break down your burn (Salaries vs. Marketing vs. SaaS), while a 24-month timeline graph helps visualize the cash depletion curve over time.
- **Zone-Aware Alert System**: The UI intelligently reacts to your financial safety. Components, navbars, and top banners dynamically shift color based on your status: Critical 🔴 (< 6 mo), Warning 🟡 (6–12 mo), Healthy 🟢 (12–18 mo), Strong 🔵 (18+ mo), or Profitable ✅.
- **Responsive Mobile-First Architecture**: Built natively for all screen sizes. Features a mobile hamburger menu, single-column stacked data panels, and fluid SVG scaling so founders can comfortably track finances on their phones.

## 🎨 Why We Used These Technologies & Design Choices

### 1. The "Groww/Stripe" Clean Light Mode
**Choice:** Swapped out the old cyberpunk dark mode for a clean `slate-50` background, crisp white cards, and an `indigo-600` primary accent brand color.
**Why:** Fintech tools require an immense level of trust. A bright, spacious, and airy design prevents the data from feeling visually heavy or overwhelming. It leverages established psychological patterns of premium institutional finance.

### 2. Contextual Visual Feedback
**Choice:** Metrics turn `emerald-600` when good, `rose-600` when bad. The navbar includes a pulsing dot specifically when runway is Critical.
**Why:** Founders suffer from information fatigue. Instead of forcing them to analyze raw integers, the UI color immediately signals *how they should feel* about the number.

### 3. Unified, Frictionless Inputs
**Choice:** Removed fragmented tabs and combined all inputs (Total Cash, Revenue, Cost Breakdown, Growth Metrics) into a single left-side panel.
**Why:** To encourage founders to consider the *entire holistic picture* of their business simultaneously. It removes the cognitive friction of remembering what value was typed on a previous screen.

### 4. Background Margin Art (Floating Elements)
**Choice:** Added subtle, animated SVG elements (coins, clocks, charts, rockets) strictly to the left and right empty gutters of the Landing Page, disabling them inside the Calculator.
**Why:** Creates a highly polished, premium "startup-native" feel on the entry point to wow the user, but ensures 100% distraction-free density once they enter the actual data dashboard. 

### 5. Mobile Data Hierarchy
**Choice:** Deliberately restacked grids from 3x3 to single dense columns on mobile, converted complex charts to simplified donut rings, and hid sprawling decoration.
**Why:** On mobile, vertical scrolling is cheap but horizontal panning is frustrating. Founders often check core metrics in Ubers or between meetings — the tool must prioritize at-a-glance readability over complex data exploration when the viewport shrinks.

## ⚙️ Tech Stack
- **React (Vite)**: For blazing fast HMR and optimized production builds.
- **Tailwind CSS**: Utility-first styling enabling the highly custom responsive layouts, hover states, and dynamic status coloring.
- **Framer Motion**: Smooth, declarative animations for the floating background elements and initial page load cascades.
- **Lucide React**: Clean, consistent vector icons.
- **TypeScript**: Strict type enforcement (e.g. `RunwayCalculations` interfaces) ensuring no `NaN` or `Infinity` crashes in the financial math logic.
