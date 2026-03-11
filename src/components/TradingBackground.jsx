import React from "react";
import "../ConponentCSS/TradingBackground.css";

const TradingBackground = ({ variant = 1 }) => {
  return (
    <div className={`trading-bg trading-bg-v${variant}`}>
      {/* Horizontal support/resistance levels */}
      <div className="tb-levels">
        <div className="tb-level tb-level-support"><span>Support</span></div>
        <div className="tb-level tb-level-resist"><span>Resistance</span></div>
        <div className="tb-level tb-level-mid" />
      </div>

      {/* Candlestick chart */}
      <div className="tb-candles">
        {[...Array(18)].map((_, i) => (
          <div key={i} className={`tb-candle tb-c${i}`}>
            <div className="tb-wick" />
            <div className="tb-body" />
            <div className="tb-wick-b" />
          </div>
        ))}
      </div>

      {/* Price action lines (MA ribbons) */}
      <svg className="tb-lines" viewBox="0 0 1400 300" preserveAspectRatio="none">
        {/* EMA fast */}
        <path
          className="tb-priceline tb-ema-fast"
          d="M0,220 C70,210 140,200 210,185 S350,150 420,160 S560,130 630,115 S770,95 840,105 S980,80 1050,65 S1190,50 1260,40 L1400,30"
          fill="none"
          strokeWidth="2"
        />
        {/* EMA slow */}
        <path
          className="tb-priceline tb-ema-slow"
          d="M0,240 C100,235 200,225 300,215 S500,190 600,195 S800,170 900,160 S1100,140 1200,130 L1400,115"
          fill="none"
          strokeWidth="1.5"
        />
        {/* Bollinger upper */}
        <path
          className="tb-priceline tb-bb-upper"
          d="M0,180 C80,165 160,155 240,140 S400,105 480,115 S640,80 720,70 S880,50 960,55 S1120,35 1200,25 L1400,10"
          fill="none"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Bollinger lower */}
        <path
          className="tb-priceline tb-bb-lower"
          d="M0,270 C100,268 200,260 300,255 S500,240 600,245 S800,225 900,218 S1100,205 1200,195 L1400,180"
          fill="none"
          strokeWidth="1"
          opacity="0.5"
        />
        {/* Area fill between BBs */}
        <path
          className="tb-bb-fill"
          d="M0,180 C80,165 160,155 240,140 S400,105 480,115 S640,80 720,70 S880,50 960,55 S1120,35 1200,25 L1400,10 L1400,180 S1200,195 1100,205 S900,218 800,225 S600,245 500,240 S300,255 200,260 S100,268 0,270 Z"
          strokeWidth="0"
        />
      </svg>

      {/* Floating bid/ask prices */}
      <div className="tb-prices">
        <div className="tb-bid">
          <span className="tb-label">BID</span>
          <span className="tb-val tb-val-green">1.08421</span>
        </div>
        <div className="tb-ask">
          <span className="tb-label">ASK</span>
          <span className="tb-val tb-val-red">1.08435</span>
        </div>
        <div className="tb-spread">
          <span className="tb-label">SPREAD</span>
          <span className="tb-val tb-val-gold">1.4</span>
        </div>
      </div>

      {/* Volume bars */}
      <div className="tb-volume">
        {[...Array(18)].map((_, i) => (
          <div key={i} className={`tb-vol tb-vol-${i}`} />
        ))}
      </div>

      {/* Ticker tape */}
      <div className="tb-tape">
        <div className="tb-tape-track">
          <span className="tb-ticker tb-tg">EUR/USD +0.42%</span>
          <span className="tb-ticker tb-tr">GBP/JPY -0.18%</span>
          <span className="tb-ticker tb-tg">XAU/USD +1.23%</span>
          <span className="tb-ticker tb-tr">USD/CAD -0.31%</span>
          <span className="tb-ticker tb-tg">AUD/NZD +0.07%</span>
          <span className="tb-ticker tb-tr">EUR/GBP -0.55%</span>
          <span className="tb-ticker tb-tg">USD/JPY +0.89%</span>
          <span className="tb-ticker tb-tr">NZD/USD -0.12%</span>
          {/* Duplicate for seamless loop */}
          <span className="tb-ticker tb-tg">EUR/USD +0.42%</span>
          <span className="tb-ticker tb-tr">GBP/JPY -0.18%</span>
          <span className="tb-ticker tb-tg">XAU/USD +1.23%</span>
          <span className="tb-ticker tb-tr">USD/CAD -0.31%</span>
          <span className="tb-ticker tb-tg">AUD/NZD +0.07%</span>
          <span className="tb-ticker tb-tr">EUR/GBP -0.55%</span>
          <span className="tb-ticker tb-tg">USD/JPY +0.89%</span>
          <span className="tb-ticker tb-tr">NZD/USD -0.12%</span>
        </div>
      </div>
    </div>
  );
};

export default TradingBackground;
