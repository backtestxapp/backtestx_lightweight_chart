---
name: backtestx-lightweight-chart
description: >-
  Use when working with the BacktestX Lightweight Charting Library
  (backtestx_lightweight_chart) — initializing BacktestxChart, wiring a
  Datafeed, registering custom candle renderers, custom drawing tools, custom
  toolbar buttons, custom intervals, technical indicators, watermarks,
  crosshair settings, SmartLoader for paginated history, horizontal scales, and
  coordinate helpers (barToX, priceToY). Covers the ChartingAPI extension
  surface, the App.js controller pattern, and all developer template files
  (custom-buttons.js, custom-candle-type.js, custom-drawings.js,
  custom-interval.js, custom-watermark.js). Always use this skill when the user
  mentions BacktestX, BacktestxChart, ChartingAPI, or any of the custom-*.js
  files from the backtestx_lightweight_chart repository.
---

# BacktestX Lightweight Chart Skill

Source repo: https://github.com/backtestx-official/backtestx_lightweight_chart

## Architecture overview

```
index.html
  └── loads scripts in order:
        api.js                  → window.ChartingAPI  (registries, must be first)
        custom-candle-type.js   → registers candle renderers
        custom-drawings.js      → registers drawing tools
        custom-buttons.js       → registers top-toolbar buttons
        custom-interval.js      → registers extra resolution intervals
        custom-watermark.js     → configures watermark
        <charting-library bundles>
        App.js                  → new BacktestxChart(...) entry point
```

**Rule:** `api.js` (which sets `window.ChartingAPI`) must be loaded before any `custom-*.js` file and before the charting library bundles.

---

## Initializing a chart (App.js pattern)

```js
document.addEventListener('DOMContentLoaded', () => {
  const datafeed = new window.Datafeed();

  const chart = new window.BacktestxChart('chart-mount', {
    symbol: 'BTCUSD',
    resolution: '30m',
    datafeed: datafeed,
  });

  window.chart = chart; // expose globally so toolbar scripts can reach it
});
```

- The first argument is the **id** of the container element.
- `symbol` and `resolution` set the initial view.
- `datafeed` is a `Datafeed` instance that the library calls for historical and realtime bars.
- Always expose the instance as `window.chart` — all `ChartingAPI` helpers that accept a `chart` argument expect this object.

---

## ChartingAPI — the extension surface

`window.ChartingAPI` is set by `src/charting_library/api.js`. All registration calls go through it. Check it is present before calling:

```js
if (!window.ChartingAPI) { console.error('api.js not loaded yet'); }
```

### Full API reference

| Method | Signature | Purpose |
|---|---|---|
| `registerCandleType` | `(type, renderFn)` | Register a custom candle renderer |
| `getCandleRenderer` | `(type) → fn\|null` | Retrieve a renderer by name |
| `getAvailableCandleTypes` | `() → string[]` | List all registered candle types |
| `registerCustomDrawing` | `(type, config)` | Register a drawing tool |
| `getCustomDrawing` | `(type) → config\|null` | Retrieve a drawing config |
| `getAvailableCustomDrawings` | `() → string[]` | List all drawing tools |
| `saveDrawings` | `(chart) → bool` | Persist drawings to `localStorage` keyed by `chart.symbol` |
| `loadDrawings` | `(chart) → array` | Restore drawings from `localStorage` and re-render |
| `registerPriceScaleDrawingLabel` | `(renderFn)` | Custom Y-axis label renderer for drawings |
| `registerTimescaleDrawingLabel` | `(renderFn)` | Custom X-axis label renderer for drawings |
| `registerIndicator` | `(type, config)` | Register a technical indicator |
| `getIndicator` | `(type) → config\|null` | Retrieve an indicator |
| `getAvailableIndicators` | `() → string[]` | List all indicators |
| `addIndicatorToChart` | `(chart, type, params?, color?) → obj\|null` | Add indicator to live chart |
| `removeIndicatorFromChart` | `(chart, id) → bool` | Remove active indicator by id |
| `getActiveIndicatorsOnChart` | `(chart) → array` | List active indicator configs |
| `registerCustomInterval` | `(resolution)` | Add a resolution string to the picker dropdown |
| `getCustomIntervals` | `() → string[]` | List developer-registered intervals |
| `getSmartLoader` | `() → class\|null` | Get the `SmartLoader` class |
| `setWatermark` | `(settings)` | Update watermark config and re-render |
| `getWatermark` | `() → object` | Get current watermark settings |
| `getPendingWatermarkSettings` | `() → object\|null` | Internal — pending settings before `Watermarks` module loads |
| `setWatermarkLogoSettings` | `(settings)` | Update logo/attribution watermark settings |
| `getWatermarkLogoSettings` | `() → object` | Get logo watermark settings |
| `registerHorizontalScale` | `(type, scaleObj)` | Register a custom horizontal (X) scale |
| `getHorizontalScale` | `(type) → obj\|null` | Retrieve a horizontal scale |
| `getAvailableHorizontalScales` | `() → string[]` | List registered horizontal scales |
| `setCrosshairSettings` | `(settings)` | Update crosshair appearance and re-render |
| `getCrosshairSettings` | `() → object` | Get current crosshair settings |
| `registerTopToolbarButton` | `(id, config)` | Register a top-toolbar button (auto-rendered by `top-toolbar.js`) |

---

## Custom candle renderers (`custom-candle-type.js`)

```js
window.ChartingAPI.registerCandleType('my_candles', function(
  ctx,          // CanvasRenderingContext2D
  visibleBars,  // Array<{ time, open, high, low, close, volume }>
  slot,         // total width per bar including gap
  bodyW,        // calculated body width
  chartH,       // price-scale clip area height
  priceToY,     // (price) => y coordinate
  themeColors,  // { bullColor, bearColor }
  xOffset,      // starting X for visibleBars[0]
  chartInstance // the chart widget
) {
  ctx.save();
  visibleBars.forEach((bar, i) => {
    const x = xOffset + i * slot + slot / 2;
    ctx.beginPath();
    ctx.moveTo(x, priceToY(bar.high));
    ctx.lineTo(x, priceToY(bar.low));
    ctx.strokeStyle = bar.close >= bar.open ? themeColors.bullColor : themeColors.bearColor;
    ctx.stroke();
    ctx.fillStyle = bar.close >= bar.open ? themeColors.bullColor : themeColors.bearColor;
    ctx.fillRect(x - bodyW / 2, Math.min(priceToY(bar.open), priceToY(bar.close)),
                 bodyW, Math.max(1, Math.abs(priceToY(bar.close) - priceToY(bar.open))));
  });
  ctx.restore();
});
```

Switch the live chart to a custom renderer:

```js
chart.customDrawCandles = window.ChartingAPI.getCandleRenderer('my_candles');
chart.render();
```

Reset to default batch rendering:

```js
chart.customDrawCandles = null;
chart.render();
```

---

## Custom drawing tools (`custom-drawings.js`)

### 1-click tool (point marker)

```js
window.ChartingAPI.registerCustomDrawing('sell_marker', {
  clicks: 1,
  render: function(chart, ctx, d, minPrice, maxPrice, isSelected) {
    const x = chart.barToX(d.p1.idx);
    const y = chart.priceToY(d.p1.price, minPrice, maxPrice);
    ctx.save();
    ctx.fillStyle = isSelected ? '#ff9800' : '#ef5350';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 8, y - 12);
    ctx.lineTo(x + 8, y - 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('SELL', x, y - 15);
    ctx.restore();
  },
  hitTest: function(chart, mouseX, mouseY, d, minPrice, maxPrice) {
    const x = chart.barToX(d.p1.idx);
    const y = chart.priceToY(d.p1.price, minPrice, maxPrice);
    return (mouseX >= x - 8 && mouseX <= x + 8 && mouseY >= y - 25 && mouseY <= y)
      ? 'p1' : null; // 'p1' enables dragging
  }
});
```

### 2-click tool (zone / band)

```js
window.ChartingAPI.registerCustomDrawing('price_band', {
  clicks: 2,
  render: function(chart, ctx, d, minPrice, maxPrice, isSelected) {
    const y1 = chart.priceToY(d.p1.price, minPrice, maxPrice);
    const y2 = chart.priceToY(d.p2.price, minPrice, maxPrice);
    const w  = chart.logicalWidth - chart.paddingRight;
    ctx.save();
    ctx.fillStyle = isSelected ? 'rgba(255,152,0,0.15)' : 'rgba(33,150,243,0.1)';
    ctx.fillRect(0, Math.min(y1, y2), w, Math.abs(y2 - y1));
    ctx.restore();
  },
  renderPreview: function(chart, ctx, p1, mousePos, minPrice, maxPrice) {
    const y1 = chart.priceToY(p1.price, minPrice, maxPrice);
    const w  = chart.logicalWidth - chart.paddingRight;
    ctx.save();
    ctx.fillStyle = 'rgba(33,150,243,0.05)';
    ctx.fillRect(0, Math.min(y1, mousePos.y), w, Math.abs(mousePos.y - y1));
    ctx.restore();
  },
  hitTest: function(chart, mouseX, mouseY, d, minPrice, maxPrice) {
    const y1 = chart.priceToY(d.p1.price, minPrice, maxPrice);
    const y2 = chart.priceToY(d.p2.price, minPrice, maxPrice);
    const w  = chart.logicalWidth - chart.paddingRight;
    return (mouseX >= 0 && mouseX <= w &&
            mouseY >= Math.min(y1, y2) && mouseY <= Math.max(y1, y2))
      ? 'line' : null; // 'line' enables move-dragging the whole zone
  }
});
```

**hitTest return values:**
- `'p1'` / `'p2'` — allow dragging that anchor point
- `'line'` — allow moving the whole drawing
- `null` — missed

To add a toolbar button for a custom drawing, add to `index.html`:

```html
<button class="tool-btn" data-tool="sell_marker" data-tooltip="Sell Marker">…icon…</button>
```

App.js automatically wires `click` handlers for all `.tool-btn[data-tool]` elements.

---

## Custom toolbar buttons (`custom-buttons.js`)

```js
window.ChartingAPI.registerTopToolbarButton('screenshot', {
  label: 'Screenshot',
  tooltip: 'Save chart image',
  alignment: 'right',            // 'left' (default) or 'right'
  iconSvg: '<svg width="14" height="14">…</svg>',
  onClick: function(chart, buttonElement, event) {
    // chart is window.chart
    chart.render();
    // … your action
  }
});
```

`top-toolbar.js` auto-renders all registered buttons and wires click handlers.

---

## Custom resolution intervals (`custom-interval.js`)

Resolution format: `<number><unit>` where unit is `S` (seconds), `m` (minutes), `H` (hours), `D` (days), `W` (weeks), `M` (months).

```js
window.ChartingAPI.registerCustomInterval('2m');
window.ChartingAPI.registerCustomInterval('4H');
window.ChartingAPI.registerCustomInterval('3D');
```

---

## Technical indicators

### Registering a custom indicator

```js
window.ChartingAPI.registerIndicator('my_indicator', {
  name: 'My Indicator',
  type: 'overlay',    // 'overlay' = draws on price pane; 'pane' = separate pane below
  params: { period: 14, multiplier: 2 },
  calculate: function(bars, params) {
    // bars: Array<{ time, open, high, low, close, volume }>
    // Return an array of computed values aligned to bars
    return bars.map((b, i) => ({ time: b.time, value: (b.high + b.low) / 2 }));
  },
  render: function(ctx, computedData, chart, minPrice, maxPrice, themeColors) {
    // draw onto ctx using chart.barToX and chart.priceToY
  }
});
```

### Adding/removing indicators at runtime

```js
// Add — returns the active indicator object (has a unique .id)
const ind = window.ChartingAPI.addIndicatorToChart(window.chart, 'sma', { period: 20 }, '#2196f3');

// Remove by id
window.ChartingAPI.removeIndicatorFromChart(window.chart, ind.id);

// Inspect active indicators
const active = window.ChartingAPI.getActiveIndicatorsOnChart(window.chart);
```

Built-in overlay indicators: `sma`, `ema`, `wma`, `bb` (Bollinger Bands), `vwap`
Built-in pane indicators: `rsi`, `macd`, `stoch`, `atr`, `cci`

---

## Watermark (`custom-watermark.js`)

```js
window.ChartingAPI.setWatermark({
  show: true,
  watermarkMode: 'always',   // 'always' | 'replay' | 'none'
  watermarkColor: 'rgba(255,255,255,0.08)',
  showWatermarkTicker: true,
  showWatermarkDescription: true,
  showWatermarkInterval: true,
  showWatermarkReplay: true,
  // Explicit overrides (take precedence over active chart values):
  symbol: 'BTC',
  description: 'Bitcoin / U.S. Dollar',
  interval: '30m',
  // Fallbacks (used when chart has no symbol/interval loaded):
  defaultSymbol: 'BTCUSD',
  defaultDescription: 'Bitcoin / U.S. Dollar',
  defaultInterval: '30m',
});

// Logo / attribution watermark
window.ChartingAPI.setWatermarkLogoSettings({
  show: true,
  logoUrl: 'https://yourdomain.com/logo.png',
  clickUrl: 'https://yourdomain.com',
  text: 'Chart by YourBrand'
});
```

Watermark updates take effect immediately; the chart re-renders automatically.

---

## Crosshair settings

```js
window.ChartingAPI.setCrosshairSettings({
  color: '#888888',
  width: 0.8,
  dashArray: [3, 3],
  showPriceBadge: true,
  showTimeBadge: true,
  badgeBgColor: '#1e222d',
  badgeTextColor: '#ffffff'
});
```

---

## SmartLoader (paginated history)

`SmartLoader` auto-fetches older candle pages as the user scrolls back. Get the class:

```js
const SmartLoader = window.ChartingAPI.getSmartLoader();
// SmartLoader is window.SmartLoader — use it directly if already loaded
```

---

## Custom horizontal scale

```js
window.ChartingAPI.registerHorizontalScale('strike', {
  barToX: function(bar, chart) { /* return canvas X */ },
  xToBar: function(x, chart)   { /* return bar index */ },
  getVisibleRange: function(chart) { /* return { from, to } */ },
  drawTimeScale: function(ctx, chart) { /* draw X-axis labels */ },
  drawTimeBadge: function(ctx, chart, x, label) { /* draw crosshair X badge */ }
});
```

---

## Coordinate helpers on the chart instance

| Call | Purpose |
|---|---|
| `chart.barToX(barIdx)` | Bar index → canvas X coordinate |
| `chart.priceToY(price, minPrice, maxPrice)` | Price → canvas Y coordinate |
| `chart.logicalWidth` | Total canvas width |
| `chart.paddingRight` | Right-side padding (price scale area) |
| `chart.render()` | Force a full redraw |
| `chart.resetView()` | Fit all data into view |
| `chart.activeTool` | Currently active drawing tool name (`null` if none) |
| `chart.drawingPoints` | In-progress anchor points for the active tool |
| `chart.drawings` | Array of all completed drawings |
| `chart.symbol` | Current symbol string |
| `chart.indicators` | Array of active indicator config objects |
| `chart.addIndicator(type, params, color)` | Add indicator (called by `addIndicatorToChart`) |
| `chart.removeIndicator(id)` | Remove indicator (called by `removeIndicatorFromChart`) |
| `chart.customDrawCandles` | Override the candle render fn (`null` = default) |

---

## Drawings persistence

```js
// Save all drawings for chart.symbol to localStorage
ChartingAPI.saveDrawings(window.chart);
// → key: cl_drawings_<symbol.toLowerCase()>

// Restore and re-render
ChartingAPI.loadDrawings(window.chart);
```

---

## Foot-guns

- **Load order matters.** `api.js` must run before any `custom-*.js` and before the charting library bundles. A missing `window.ChartingAPI` at call time means `api.js` wasn't loaded first.
- **`window.chart` must exist** before passing it to `addIndicatorToChart`, `saveDrawings`, etc. These are called after `DOMContentLoaded`, not at module scope.
- **`priceToY` signature in drawing renders** is `(price, minPrice, maxPrice)` — all three args required. The equivalent on the chart instance is `chart.priceToY(price, minPrice, maxPrice)`.
- **`hitTest` return value controls drag behavior.** Return `'p1'`/`'p2'` to drag an anchor; return `'line'` to move the whole drawing; return `null` for a miss. Returning a wrong string will silently break dragging.
- **`renderPreview`** is only called for 2-click tools while the second click is pending. For 1-click tools, omit it.
- **Custom candle renderer receives `xOffset`, not bar 0's X.** Compute each bar's X as `xOffset + i * slot + slot / 2`, not `i * slot`.
- **`watermarkMode: 'replay'`** shows the watermark only in replay/backtest mode. Use `'always'` for unconditional display.
- **`registerTopToolbarButton` is auto-rendered by `top-toolbar.js`**, not by `App.js`. If buttons don't appear, confirm `top-toolbar.js` is loaded after `api.js`.
- **The `custom-drawings.js` `iconSvg` field** on a drawing config is optional but used by `App.js` when auto-generating toolbar buttons for registered tools. Always provide it for a polished UI.
