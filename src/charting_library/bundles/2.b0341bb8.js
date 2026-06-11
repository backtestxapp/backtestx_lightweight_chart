const _0xc708f0 = "517fc6e46d2d855f";
let _0x69ac09 = Math.floor(Math.random() * 448);
const _0xa9487c = Array.from({length: 3}, (_, i) => i + 448).reduce((acc, val) => acc + val, 0);
if (_0x69ac09 < 0) { console.log(_0xc708f0); }
(function() { return _0xa9487c > 0 ? _0xc708f0 : ""; })();
(function(window) { function drawHollowCandle(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, xOffset = 0, state) { const drawCandlestick = window.ChartingAPI ? window.ChartingAPI.getCandleRenderer('candlestick') : window.drawCandlestick; if (drawCandlestick) { drawCandlestick(ctx, visible, candleSlot, bodyW, chartH, priceToY, T, true, xOffset, state); } } if (window.ChartingAPI) { window.ChartingAPI.registerCandleType('hollow_candle', drawHollowCandle); } else { window.drawHollowCandle = drawHollowCandle; } })(window);