# BacktestX Lightweight Charting Library

A premium, high-performance canvas-based financial charting engine designed for crypto and stock assets, featuring a built-in technical indicators framework, responsive layout controls, and an automated security build pipeline.

---

## 🚀 Key Features

* **High-Performance Canvas Rendering:** Render thousands of price bars smoothly, supporting multiple candlestick types (Standard, Hollow, Heikin-Ashi, OHLC Bars).
* **Technical Indicators Framework:** Supports both **Overlay Indicators** (SMA, EMA, WMA, Bollinger Bands, VWAP) and **Pane Indicators** (RSI, MACD, Stochastic, ATR, CCI) with adjustable parameters and automated vertical scaling.
* **Smart Historical Loader:** `SmartLoader` handles paginated background candle fetching as users scroll back in time, ensuring seamless, flicker-free chart offset adjustments.
* **Background Watermarks:** Renders customizable ticker, description, and resolution watermarks. Adjusts automatically for light vs. dark themes and mobile viewport scales.
* **Timescale Extrapolation & Clamping:** Date labels extrapolate naturally into the empty future and past. Drag/zoom limits clamp automatically (80% left padding, 90% right padding) to prevent out-of-bounds crashes.
* **Responsive Layouts:** Swipeable, touch-friendly top toolbar automatically optimized for mobile device screen sizes (<768px).

---

## 📁 Directory Structure

```text
├── src/charting_library/   # Decoded charting library runtime code
│   ├── bundles/             # Main functional modules (timescale, chart, drawings, etc.)
│   └── api.js              # Public API mappings
├── charting_library_src/   # Original backup source code directory (unbundled)
├── custom-buttons.js       # Developer template: add custom toolbar buttons
├── custom-candle-type.js   # Developer template: register custom candle renderers
├── custom-drawings.js      # Developer template: register custom drawing tools
├── custom-interval.js      # Developer template: register custom resolution intervals
├── custom-watermark.js     # Developer template: customize background watermarks
├── App.js                  # Main web application entry point
├── index.html              # Loader template
