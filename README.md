## Card Gallery Swiper

A reusable **React card swiper** with a constrained layout and an optional **modal image gallery**.

Built with **TypeScript** and **styled-components**, designed to be dropped into any React app.

---

### Demo

**Live demo:** [View demo](https://card-gallery-swiper.vercel.app/)

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

#### Core

| Prop          | Type                         | Default | Description |
|--------------|------------------------------|---------|-------------|
| `imageUrls`* | `Record<number, string>`     | –       | Map from index (starting at 1) to image URL. **Required.** |

#### Layout / responsiveness

| Prop                | Type              | Default                              | Description |
|---------------------|-------------------|--------------------------------------|-------------|
| `slidesPerView`     | `number`          | computed from container + card size | Cards visible at once. |
| `pointsCount`       | `3 \| 4 \| 5 \| 6`| `5`                                  | Number of progress dots. |
| `spaceBetween`      | `IBreakpoints`    | `{ mobile: 12, tablet: 24, laptop: 24, desktop: 24 }` | Gap between cards per breakpoint (px). |
| `breakpoints`       | `IBreakpoints`    | `{ mobile: 360, tablet: 768, laptop: 1280, desktop: 1440 }` | Pixel widths for each device tier. |
| `containerMaxWidths`| `IBreakpoints`    | `{ mobile: 360, tablet: 688, laptop: 1040, desktop: 1128 }` | Max container width per breakpoint (px). |
| `cardWidths`        | `IBreakpoints`    | `{ mobile: 288, tablet: 400, laptop: 400, desktop: 300 }` | Card width per breakpoint (px). |
| `cardHeights`       | `IBreakpoints`    | `{ mobile: 288, tablet: 400, laptop: 400, desktop: 300 }` | Card height per breakpoint (px). |

#### Styling

| Prop            | Type                      | Default      | Description |
|-----------------|---------------------------|--------------|-------------|
| `className`     | `string`                  | –            | Class applied to the outer wrapper. |
| `cardClassName` | `string`                  | –            | Class applied to each card. |
| `cardBorderWidth` | `number`               | `2`          | Card border width (px). |
| `cardBorderColor` | `string`               | `#251f97`    | Card border color. |
| `arrowColor`    | `string`                  | `#ffffff`    | Color for navigation arrows. |
| `arrowHoverColor` | `string`               | `#56CCF2`    | Arrow color on hover. |
| `pointColor`    | `string`                  | `#56CCF2`    | Active progress dot color. |
| `pointsType`    | `'circle' \| 'square'`    | `'circle'`   | Shape of progress dots. |
| `pointSize`     | `number`                  | `10`         | Progress dot size (width/height, px). |
| `pointsGap`     | `number`                  | `10`         | Horizontal gap between dots (px). |

#### Modal overlay

| Prop                        | Type     | Default                               | Description |
|-----------------------------|----------|---------------------------------------|-------------|
| `modalBackgroundColor`      | `string` | `'transparent'`                       | Modal content background. |
| `modalOverlayColor`         | `string` | `'rgba(34, 27, 88, 0.92)'`           | Overlay background color. |
| `modalOverlayOpacity`       | `number` | `1`                                   | Overlay opacity when open. |
| `modalOverlayBlur`          | `number` | `0`                                   | Overlay blur in pixels. |
| `modalOverlayShadow`        | `string` | `'0px 0px 10px 0px rgba(0, 0, 0, 0.1)'` | Box-shadow for modal content. |
| `modalOverlayTransition`    | `string` | `'all 0.3s ease-in-out'`             | CSS transition for overlay. |
| `modalOverlayTransitionDuration` | `number` | `300`                           | Transition duration in ms. |

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

