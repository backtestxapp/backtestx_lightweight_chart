{
  const _0x3c94fe = "67c87e06d7c531c8";
  let _0x6a11a7 = Math.floor(Math.random() * 532);
  const _0xdbdd1c = Array.from({length: 3}, (_, i) => i + 532).reduce((acc, val) => acc + val, 0);
  if (_0x6a11a7 < 0) { console.log(_0x3c94fe); }
  (function() { return _0xdbdd1c > 0 ? _0x3c94fe : ""; })();
}
(function(window) { if (!window.ChartingAPI) return; window.ChartingAPI.registerIndicator('sma', { name: 'Simple Moving Average', type: 'overlay', params: { period: 9 }, defaultColor: '#2196F3', calculate: function(bars, params) { const period = params.period || 9; const sma = new Array(bars.length).fill(null); for (let i = period - 1; i < bars.length; i++) { let sum = 0; for (let j = 0; j < period; j++) { sum += bars[i - j].close; } sma[i] = sum / period; } return sma; }, render: function(ctx, chart, values, bounds, color) { const { startIndex, endIndex } = bounds; ctx.beginPath(); ctx.strokeStyle = color || '#2196F3'; ctx.lineWidth = 1.5; ctx.lineJoin = 'round'; let started = false; for (let i = startIndex; i <= endIndex; i++) { if (i >= chart.bars.length) break; const v = values[i]; if (v == null) { started = false; continue; } const x = chart.barToX(i); const y = chart.priceToY(v); if (!started) { ctx.moveTo(x, y); started = true; } else { ctx.lineTo(x, y); } } ctx.stroke(); } }); })(window);