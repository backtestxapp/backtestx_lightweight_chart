{
  const _0x477a38 = "8a14027b00997d0f";
  let _0x311f97 = Math.floor(Math.random() * 480);
  const _0x30fe5d = Array.from({length: 3}, (_, i) => i + 480).reduce((acc, val) => acc + val, 0);
  if (_0x311f97 < 0) { console.log(_0x477a38); }
  (function() { return _0x30fe5d > 0 ? _0x477a38 : ""; })();
}
(function(window) { function drawHollowCandle(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, xOffset = 0, state) { const drawCandlestick = window.ChartingAPI ? window.ChartingAPI.getCandleRenderer('candlestick') : window.drawCandlestick; if (drawCandlestick) { drawCandlestick(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, true, xOffset, state); } } if (window.ChartingAPI) { window.ChartingAPI.registerCandleType('hollow_candle', drawHollowCandle); } else { window.drawHollowCandle = drawHollowCandle; } })(window);