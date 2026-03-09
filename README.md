## Card Gallery Swiper

A reusable **React card swiper** with a constrained layout and an optional **modal image gallery**.

Built with **TypeScript** and **styled-components**, designed to be dropped into any React app.

---

### Installation

```bash
npm install card-gallery-swiper
# or
yarn add card-gallery-swiper
```

Peer dependencies you should already have in your app:

- `react` / `react-dom`
- `styled-components`

---

### Basic usage

```tsx
import React from 'react';
import { CardGallerySwiper } from 'card-gallery-swiper';

const images: Record<number, string> = {
  1: 'https://picsum.photos/seed/1/800/800',
  2: 'https://picsum.photos/seed/2/800/800',
  3: 'https://picsum.photos/seed/3/800/800',
  4: 'https://picsum.photos/seed/4/800/800',
  5: 'https://picsum.photos/seed/5/800/800',
};

export function Example() {
  return (
    <div style={{ padding: 24 }}>
      <CardGallerySwiper imageUrls={images} />
    </div>
  );
}
```

Clicking a card opens the **modal gallery**; use the arrows or dots to navigate.

---

### Props

All props are optional unless stated otherwise.

- **`imageUrls`** (required)  
  `Record<number, string>` — map from index (starting at 1) to image URL.

- **Layout / responsiveness**
  - `slidesPerView?: number` – cards visible at once (defaults to computed value from container width + card width).
  - `pointsCount?: 3 | 4 | 5 | 6` – number of progress dots (default `5`).
  - `spaceBetween?: IBreakpoints` – gap between cards per breakpoint.
  - `breakpoints?: IBreakpoints` – pixel widths for `mobile`, `tablet`, `laptop`, `desktop`.
  - `containerMaxWidths?: IBreakpoints` – max container widths per breakpoint.
  - `cardWidths?: IBreakpoints` – card width per breakpoint.
  - `cardHeights?: IBreakpoints` – card height per breakpoint.

- **Styling**
  - `className?: string` – wrapper class.
  - `cardClassName?: string` – class applied to each card.
  - `cardBorderWidth?: number` – card border width (default `2`).
  - `cardBorderColor?: string` – card border color (default `#251f97`).
  - `arrowColor?: string` – color for navigation arrows (default `#ffffff`).
  - `arrowHoverColor?: string` – arrow color on hover (default `#56CCF2`).
  - `pointColor?: string` – active progress dot color (default `#56CCF2`).

- **Modal overlay**
  - `modalBackgroundColor?: string` – modal content background (default `'transparent'`).
  - `modalOverlayColor?: string` – overlay background color (default `'rgba(34, 27, 88, 0.92)'`).
  - `modalOverlayOpacity?: number` – overlay opacity when open (default `1`).
  - `modalOverlayBlur?: number` – overlay blur in pixels (default `0`).
  - `modalOverlayShadow?: string` – box-shadow for modal content (default `'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'`).
  - `modalOverlayTransition?: string` – CSS transition for overlay (default `'all 0.3s ease-in-out'`).
  - `modalOverlayTransitionDuration?: number` – transition duration in ms (default `300`).

`IBreakpoints` is:

```ts
export interface IBreakpoints {
  mobile: number;
  tablet: number;
  laptop: number;
  desktop: number;
}
```

---

### Development

Run the demo locally:

```bash
npm install
npm run dev
```

Build the library:

```bash
npm run build
```

---

### License

MIT

