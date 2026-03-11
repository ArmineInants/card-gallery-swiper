## Card Gallery Swiper

A React **card gallery swiper** with container-aligned layout, edge-to-edge scrolling and an optional **modal image gallery**.

Built with **TypeScript** and **styled-components**, designed to be dropped into any React app.

---

### Demo

**Live demo:** [View demo](https://card-gallery-swiper.vercel.app/)

<p align="center">
  <img src="./docs/Card-Gallery-Screenshot-1.jpg" alt="Card Gallery Swiper screenshot 1" width="40%" style="margin-right: 10px;" />
  <img src="./docs/Card-Gallery-Screenshot-2.jpg" alt="Card Gallery Swiper screenshot 2" width="40%" />
</p>

### Features

- **Container-aligned layout** – the gallery starts aligned with the page container while extending to the full right edge of the screen.
- **Edge-to-edge scrolling** – when scrolling, the gallery reaches the left edge of the viewport.
- **Built-in modal gallery** – click a card to open a focused image viewer with arrow navigation.
- **Customizable navigation** – configure arrow colors and progress indicators (shape, size, spacing, count).
- **Fully responsive** – breakpoints, card sizes, and spacing are all configurable via typed props.
- **Framework-agnostic** – works with Vite, CRA, Next.js, Remix, etc. (no framework-specific dependencies).

### Layout Behavior

The gallery is aligned with the page container on the left side while extending to the full width of the screen on the right.

When scrolling through items, the gallery smoothly reaches the left edge of the viewport, creating a modern edge-to-edge browsing experience commonly used in product and media galleries.

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

### Advanced usage

Customize navigation styling and layout:

```tsx
<CardGallerySwiper
  imageUrls={images}
  pointsCountDefault={6}
  pointsType="square"
  pointSize={12}
  pointsGap={6}
  arrowColor="#56CCF2"
  arrowHoverColor="#9AE6FF"
  cardBorderWidth={3}
  cardBorderColor="#56CCF2"
  modalOverlayBlur={6}
  modalOverlayOpacity={0.9}
/>
```

This example:
- Uses 6 square progress indicators, slightly larger and closer together.
- Applies a custom accent color to card borders and navigation arrows.
- Adds a subtle blur and semi-transparent overlay behind the modal gallery.

---

### Props

All props are optional unless stated otherwise.

#### Core

| Prop          | Type                         | Default | Description |
|--------------|------------------------------|---------|-------------|
| `imageUrls`* | `Record<number, string>`     | –       | Map from index (starting at 1) to image URL. **Required.** |
| `withModal`  | `boolean`                    | `true`  | Whether clicking a card opens the modal gallery. |

#### Layout / responsiveness

| Prop                | Type              | Default                              | Description |
|---------------------|-------------------|--------------------------------------|-------------|
| `pointsCountDefault`   | `3 \| 4 \| 5 \| 6`| `5`                               | Number of progress dots. |
| `spaceBetween`      | `IBreakpoints`    | `{ mobile: 12, tablet: 24, laptop: 24, desktop: 24 }` | Gap between cards per breakpoint (px). |
| `breakpoints`       | `IBreakpoints`    | `{ mobile: 360, tablet: 768, laptop: 1280, desktop: 1440 }` | Pixel widths for each device tier. |
| `containerMaxWidths`| `IBreakpoints`    | `{ mobile: 360, tablet: 688, laptop: 1040, desktop: 1128 }` | Max container width per breakpoint (px). |
| `cardWidths`        | `IBreakpoints`    | `{ mobile: 288, tablet: 300, laptop: 300, desktop: 400 }` | Card width per breakpoint (px). |
| `cardHeights`       | `IBreakpoints`    | `{ mobile: 288, tablet: 300, laptop: 300, desktop: 400 }` | Card height per breakpoint (px). |

#### Styling

| Prop            | Type                      | Default      | Description |
|-----------------|---------------------------|--------------|-------------|
| `className`     | `string`                  | –            | Class applied to the outer wrapper. |
| `cardClassName` | `string`                  | –            | Class applied to each card. |
| `cardBorderWidth` | `number`               | `2`          | Card border width (px). |
| `cardBorderColor` | `string`               | `#251f97`    | Card border color. |
| `arrowColor`    | `string`                  | `#2D2926`    | Color for navigation arrows in the swiper. |
| `arrowHoverColor` | `string`               | `#8C7355`    | Arrow color on hover in the swiper. |
| `pointColor`    | `string`                  | `#D1CDC7`    | Active progress dot color in the swiper. |
| `pointsType`    | `'circle' \| 'square'`    | `'circle'`   | Shape of progress dots. |
| `pointSize`     | `number`                  | `10`         | Progress dot size (width/height, px). |
| `pointsGap`     | `number`                  | `10`         | Horizontal gap between dots (px). |

#### Modal overlay

| Prop                        | Type     | Default                               | Description |
|-----------------------------|----------|---------------------------------------|-------------|
| `modalBackgroundColor`      | `string` | `'transparent'`                       | Modal content background. |
| `modalOverlayColor`         | `string` | `'rgba(45, 41, 38, 0.85)'`           | Overlay background color. |
| `modalOverlayOpacity`       | `number` | `1`                                   | Overlay opacity when open. |
| `modalOverlayBlur`          | `number` | `5`                                   | Overlay blur in pixels. |
| `modalOverlayShadow`        | `string` | `'none'`                              | Box-shadow for modal content. |
| `modalOverlayTransition`    | `string` | `'all 0.3s ease-in-out'`             | CSS transition for overlay. |
| `modalOverlayTransitionDuration` | `number` | `300`                           | Transition duration in ms. |
| `modalArrowColor`           | `string` | `'#FFFFFF'`                          | Color for navigation arrows inside the modal gallery. |
| `modalArrowHoverColor`      | `string` | `'#D4AF37'`                          | Hover color for modal navigation arrows. |
| `modalPointColor`           | `string` | `'rgba(255, 255, 255, 0.3)'`         | Active progress dot color in the modal gallery. |

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

