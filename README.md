# FlexPrice Frontend — Storybook & Design System

This repository contains my submission for the FlexPrice Frontend Intern assignment. I have extracted and documented the core UI components into a dedicated Storybook library, implemented several advanced architectural challenges, and established a testing suite for critical utilities.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Launch Storybook**:
   ```bash
   npm run storybook
   ```
   *The library will be available at http://localhost:6006*

3. **Run Tests**:
   ```bash
   npm run test
   ```

---

## 🛠 What I Built

### 1. The Component Library (Storybook)
I organized the UI components into three layers following the Atomic Design methodology:
*   **Atoms**: Base elements like `Button`, `Input`, `Chip`, and `Spinner`.
*   **Molecules**: More complex UI pieces like `DataTable`, `MetricCard`, and `DateRangePicker`.
*   **Organisms**: Full layout sections such as `SidebarNav` and `PlanPriceTable`.

### 2. Advanced Technical Challenges
*   **Persistent Filters (Zustand)**: I built a `useFilterStore` that saves UI filter states to `localStorage`. This ensures that a user's view remains consistent even after a page refresh.
*   **Virtualized Tables**: For high-performance data rendering, I implemented a `VirtualTable` using `@tanstack/react-virtual`. It can handle 10,000+ rows with zero lag by only rendering what's currently in the viewport.
*   **Global Data Config**: Established a standardized `QueryClient` for React Query with optimized caching and refetching strategies.

### 3. Quality & Testing
*   **Date Utilities**: Documented the date helper functions using JSDoc for better IDE support.
*   **Vitest Suite**: Wrote comprehensive unit tests for the date formatting logic to ensure billing accuracy across different timezones.

---

## 💡 My Approach
My goal was to create a library that isn't just a "demo," but a real tool that a development team could use to build features faster. 

*   **Isolation**: I made sure every story uses mock data so components can be tested without needing a running backend or database.
*   **Type Safety**: I fixed several TypeScript metadata errors to ensure the project compiles with zero errors in production.
*   **Performance**: I prioritized virtualization for data-heavy components to ensure a premium, snappy user experience.

---

## 📦 Tech Stack
*   **Core**: React, TypeScript, Vite
*   **Documentation**: Storybook v8
*   **State**: Zustand + Persist Middleware
*   **Performance**: TanStack Virtual
*   **Testing**: Vitest
*   **Deployment**: Optimized for Vercel

---
*Developed as part of the FlexPrice Frontend Intern Take-Home.*
