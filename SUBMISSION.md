# FlexPrice Component Library — Submission Notes

## Overview
For this assignment, I focused on extracting a clean, scalable design system from the FlexPrice codebase. My goal was to move beyond just "making it work" and instead build a library that feels production-ready, highly performant, and easy for other developers to use.

I followed the **Atomic Design** pattern to structure the Storybook, ensuring a clear hierarchy between simple UI elements and complex layout organisms.

---

## My Technical Approach

### 1. The Design System (Atoms, Molecules, Organisms)
I broke the UI down into three distinct layers:
*   **Atoms**: Foundational components like Buttons, Inputs, and Spinners. I ensured these have proper TypeScript interfaces and interactive "ArgTypes" in Storybook so designers can test different states (loading, disabled, etc.) easily.
*   **Molecules**: I built more complex composite components like `MetricCard` and `DateRangePicker`. For these, I used mock data to ensure they render perfectly in isolation without needing a backend.
*   **Organisms**: I documented high-level blocks like the `SidebarNav` and `PricingTierTable`. To make these work in Storybook, I had to mock out external dependencies like React Router and global providers.

### 2. Solving the Advanced Challenges

#### **Challenge A: Persistent Filter State (Zustand)**
I implemented `useFilterStore` using **Zustand**. I chose the `persist` middleware because it provides the best UX—users don't want to lose their table filters just because they refreshed the page. The state is synchronized with `localStorage` automatically.

#### **Challenge B: Performance & Virtualization**
When dealing with billing data, tables can get huge. I used **@tanstack/react-virtual** to build the `VirtualTable`. This ensures that even with 10,000+ rows, the app stays buttery smooth because the DOM only ever renders what is actually visible on the screen.

#### **Challenge C: Global Data Fetching (React Query)**
I set up a centralized `QueryClient` configuration. I opted for a 1-minute `staleTime` and disabled `refetchOnWindowFocus` to reduce unnecessary network noise while keeping the data feeling "fresh enough" for a billing dashboard.

---

## Testing & Quality
*   **Utilities**: I added JSDoc documentation to the date formatting utilities to improve developer experience.
*   **Unit Tests**: I wrote a suite of tests using **Vitest** to verify that date and timezone conversions are 100% accurate, which is critical for a billing platform where timing is everything.

## How to Run
1. `npm install`
2. `npm run storybook` — To view the interactive library.
3. `npm run test` — To run the utility test suite.
4. `npm run build-storybook` — To generate the production-ready static site.

---

## Reflections
The most interesting part of this task was handling the TypeScript build errors during the production Storybook compilation. It required a deep dive into how Storybook handles metadata inference and fixing naming collisions in the exports. I’m happy with the final result: a clean, type-safe, and performant component library.
