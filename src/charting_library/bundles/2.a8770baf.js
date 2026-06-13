{
  const _0x1977a3 = "74efc6534de96b0a";
  let _0x94ce6b = Math.floor(Math.random() * 336);
  const _0xd3a490 = Array.from({length: 3}, (_, i) => i + 336).reduce((acc, val) => acc + val, 0);
  if (_0x94ce6b < 0) { console.log(_0x1977a3); }
  (function() { return _0xd3a490 > 0 ? _0x1977a3 : ""; })();
}
(function(window) { function drawHollowCandle(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, xOffset = 0, state) { const drawCandlestick = window.ChartingAPI ? window.ChartingAPI.getCandleRenderer('candlestick') : window.drawCandlestick; if (drawCandlestick) { drawCandlestick(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, true, xOffset, state); } } if (window.ChartingAPI) { window.ChartingAPI.registerCandleType('hollow_candle', drawHollowCandle); } else { window.drawHollowCandle = drawHollowCandle; } })(window);