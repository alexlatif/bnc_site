// ============================================================
// CEA INDUSTRIES — UNIFIED DASHBOARD ENGINE (FINAL WIRED)
// Uses:
// - CONFIG + MARKET from inputs.js
// - Historical data (BNB + BNC)
// - Live metrics (MARKET)
// - mNAV, NAVPS, P/L, Volume
// - Fully compatible with businesses.html
// ============================================================


// ------------------------------------------------------------
// HISTORICAL DATA STORE
// ------------------------------------------------------------
const HISTORY = {
    bnb30: [],
    bnc30: [],
};

const ICONS = {
    bnb: `
    <svg class="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 4l6 8-6 8-6-8z"/>
    </svg>
    `,
    

    stock: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M3 17l6-6 4 4 8-8"/>
        </svg>
    `,

    profit: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 12l5 5L20 7"/>
        </svg>
    `,

    loss: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M19 12l-5-5L4 17"/>
        </svg>
    `,

    volume: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M8 17v-6m4 6V7m4 10V3"/>
        </svg>
    `,

    nav: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 6v6l4 2"/>
        </svg>
    `,

    airdrop: `
        <svg class="h-6 w-6 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M12 2L7 12h10L12 2zm0 20l5-10H7l5 10z"/>
        </svg>
    `,
};



// ------------------------------------------------------------
// FORMATTERS
// ------------------------------------------------------------
const F = {
    usd: n =>
        "$" +
        Number(n).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }),

    num: n => Number(n).toLocaleString(),

    pct: n => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`,
};


// ------------------------------------------------------------
// HISTORICAL DATA (30 DAYS)
// ------------------------------------------------------------
async function fetchHistoricalBNB() {
    try {
        const r = await fetch(
            "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BNB&tsym=USD&limit=30"
        );
        const j = await r.json();
        HISTORY.bnb30 = j.Data.Data.map(d => d.close);
    } catch (err) {
        console.error("BNB history error:", err);
        HISTORY.bnb30 = Array(30).fill(MARKET.BNB_PRICE);
    }
}

async function fetchHistoricalBNC() {
    try {
        const r = await fetch(
            `https://api.twelvedata.com/time_series?symbol=${CONFIG.STOCK_SYMBOL}&interval=1day&outputsize=30&apikey=${API_KEYS.twelveData()}`
        );
        const j = await r.json();

        HISTORY.bnc30 = j.values
            ? j.values.map(v => Number(parseFloat(v.close).toFixed(2))).reverse()
            : Array(30).fill(MARKET.BNC_PRICE.toFixed(2));
    } catch (err) {
        console.error("BNC history error:", err);
        HISTORY.bnc30 = Array(30).fill(MARKET.BNC_PRICE);
    }
}


// ------------------------------------------------------------
// WEEKLY % CHANGE
// ------------------------------------------------------------
function weeklyChange(arr) {
    if (!Array.isArray(arr) || arr.length < 8) return 0;

    const now = Number(arr[arr.length - 1]);
    const weekAgo = Number(arr[arr.length - 8]);

    if (!now || !weekAgo || weekAgo === 0) return 0;

    return ((now - weekAgo) / weekAgo) * 100;
}


// ------------------------------------------------------------
// TOP METRICS UI
// ------------------------------------------------------------
function renderTopMetrics() {
    const el = document.getElementById("metrics-grid");
    if (!el) return;

    const holdingsValue = MARKET.BNB_PRICE * CONFIG.BNB_HOLDINGS;
    const costBasisTotal = CONFIG.BNB_HOLDINGS * CONFIG.AVG_COST;

    const unrealized = holdingsValue - costBasisTotal;
    const unrealizedPct = (unrealized / costBasisTotal) * 100;

    const btcValue = MARKET.BTC_PRICE * CONFIG.BTC_HOLDINGS;

    const nav = holdingsValue + CONFIG.CASH_RESERVES + btcValue;
    const navps = nav / CONFIG.OUTSTANDING_SHARES;

    const mnav = (CONFIG.OUTSTANDING_SHARES * MARKET.BNC_PRICE) / nav;

    const fmtChange = v =>
        `<span class="${v >= 0 ? "text-green-600" : "text-red-600"}">${F.pct(v)}</span>`;

    const fmtProfit = v =>
        `<span class="${v >= 0 ? "text-green-600" : "text-red-600"}">${v >= 0 ? "+" : ""}${F.usd(v)}</span>`;

    const metrics = [
        {
            icon: ICONS.stock,
            title: "BNC Stock Price",
            value: F.usd(MARKET.BNC_PRICE),
            sub: fmtChange(MARKET.BNC_CHANGE),
        },
        {
            icon: ICONS.bnb,
            title: "Total BNB Holdings",
            value: CONFIG.BNB_HOLDINGS.toLocaleString() + " BNB",
            sub: "",
        },
        {
            icon: ICONS.profit,
            title: "Est. Holdings Value",
            value: F.usd(holdingsValue),
            sub: "Market value",
        },
        {
            icon: ICONS.bnb,
            title: "BNB Price",
            value: F.usd(MARKET.BNB_PRICE),
            sub: fmtChange(MARKET.BNB_CHANGE),
        },
        {
            icon: ICONS.bnb,
            title: "Avg. Cost Basis",
            value: F.usd(CONFIG.AVG_COST),
            sub: "per BNB",
        },
        {
            icon: unrealized >= 0 ? ICONS.profit : ICONS.loss,
            title: "Est. Change in Value of BNB Holdings",
            value: fmtProfit(unrealized),
            sub: fmtChange(unrealizedPct),
        },
        {
            icon: ICONS.volume,
            title: "Today's Volume",
            value: MARKET.BNC_VOLUME ? F.num(MARKET.BNC_VOLUME) : "—",
            sub: "",
        },
        {
            icon: ICONS.nav,
            title: "mNAV",
            value: mnav.toFixed(2) + "x",
            sub: "Market NAV multiple",
        },
        {
            icon: ICONS.airdrop,
            title: "NAV",
            value: F.usd(navps),
            sub: "Per share value",
        },
    ];

    el.innerHTML = metrics
        .map(m => `
            <div class="bg-white border border-gray-200 rounded-lg p-6 flex justify-between items-start">
                <div>
                    <div class="text-sm text-gray-600">${m.title}</div>
                    <div class="text-2xl font-medium text-gray-900">${m.value}</div>
                    <div class="text-gray-600 text-sm mt-1">${m.sub}</div>
                </div>
                <div class="flex-shrink-0 ml-4">
                    ${m.icon}
                </div>
            </div>
        `)
        .join("");
}


// ------------------------------------------------------------
// CHARTS (BNB + BNC)
// ------------------------------------------------------------
function renderCharts() {
    const labels = Array.from({ length: 30 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (29 - i));
        return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });

    function makeGradient(ctx, topColor) {
        const g = ctx.createLinearGradient(0, 0, 0, 300);
        g.addColorStop(0, topColor);
        g.addColorStop(1, "rgba(255,255,255,0)");
        return g;
    }

    const bnbCtx = document.getElementById("bnbChart");
    if (bnbCtx) {
        const ctx = bnbCtx.getContext("2d");
        const gradient = makeGradient(ctx, "rgba(243,186,47,0.30)");

        new Chart(bnbCtx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "BNB Price (USD)",
                        data: HISTORY.bnb30,
                        borderColor: "#f3ba2f",
                        backgroundColor: gradient,
                        borderWidth: 2,
                        tension: 0.35,
                        pointRadius: 0,
                        fill: true,
                    },
                ],
            },
        });
    }

    const bncCtx = document.getElementById("bncChart");
    if (bncCtx) {
        const ctx = bncCtx.getContext("2d");
        const gradient = makeGradient(ctx, "rgba(128,128,128,0.25)");

        new Chart(bncCtx, {
            type: "line",
            data: {
                labels,
                datasets: [
                    {
                        label: "BNC Price (USD)",
                        data: HISTORY.bnc30,
                        borderColor: "#6b7280",
                        backgroundColor: gradient,
                        borderWidth: 2,
                        tension: 0.35,
                        pointRadius: 0,
                        fill: true,
                    },
                ],
            },
        });
    }
}


// ------------------------------------------------------------
// ADDITIONAL METRICS
// ------------------------------------------------------------
function renderAdditionalMetrics() {
    const w = document.getElementById("weekly-summary");
    const v = document.getElementById("valuation-metrics");
    if (!w || !v) return;

    const weeklyBNB = weeklyChange(HISTORY.bnb30);
    const weeklyBNC = weeklyChange(HISTORY.bnc30);

    const holdingsValue = MARKET.BNB_PRICE * CONFIG.BNB_HOLDINGS;
    const treasuryValue = holdingsValue + CONFIG.CASH_RESERVES;
    const marketCap = MARKET.BNC_PRICE * CONFIG.OUTSTANDING_SHARES;
    const navps = treasuryValue / CONFIG.OUTSTANDING_SHARES;

    w.innerHTML = `
        <div class="flex justify-between text-sm">
            <span>Weekly BNB Change</span>
            <span class="${weeklyBNB >= 0 ? "text-green-600" : "text-red-600"}">
                ${weeklyBNB >= 0 ? "+" : ""}${weeklyBNB.toFixed(2)}%
            </span>
        </div>

        <div class="flex justify-between text-sm">
            <span>Weekly BNC Change</span>
            <span class="${weeklyBNC >= 0 ? "text-green-600" : "text-red-600"}">
                ${weeklyBNC >= 0 ? "+" : ""}${weeklyBNC.toFixed(2)}%
            </span>
        </div>
    `;

    v.innerHTML = `
        <div class="flex justify-between text-sm">
            <span>Airdrop Value</span>
            <span>${F.usd(CONFIG.AIRDROP_REVENUE)}</span>
        </div>

        <div class="flex justify-between text-sm">
            <span>Converted Airdrops</span>
            <span>${Number(CONFIG.CONVERTED_AIRDROPS).toLocaleString()} BNB</span>
        </div>
    `;
}


// ------------------------------------------------------------
// MAIN
// ------------------------------------------------------------
async function runDashboard() {
    // Load metrics + live prices
    await loadAllInputs();

    // Fetch historical (not provided by inputs.js)
    await Promise.all([fetchHistoricalBNB(), fetchHistoricalBNC()]);

    renderTopMetrics();
    renderCharts();
    renderAdditionalMetrics();
}

runDashboard();

// // ============================================================
// // CEA INDUSTRIES — UNIFIED DASHBOARD ENGINE (FINAL WIRED)
// // Handles:
// // - Live BNB price
// // - Live BNC (CEAD) stock price
// // - Historical data (BNB + BNC)
// // - Top metrics (with real Volume + mNav)
// // - Two 30-day charts
// // - Additional metrics (mock)
// // ============================================================


// // ------------------------------------------------------------
// // CONFIG
// // ------------------------------------------------------------
// // const CONFIG = {
// //     TWELVE_DATA_API_KEY: API_KEYS.twelveData(),
// //     ALPHAVANTAGE_KEY: API_KEYS.alphaVantage(),

// //     STOCK_SYMBOL: "BNC",   // Your ticker

// //     CRYPTO_SYMBOL: "BNB",

// //     OUTSTANDING_SHARES: 55933901,
// //     CASH_RESERVES: 24250000,
// //     BTC_HOLDINGS: 54.7575,
// //     HOLDINGS: 515054,
// //     BNB_SUPPLY: 170532785,
    
// //     FULLY_DILUTED_SHARES: 62336940,
// //     AVG_COST: 851.29,

// //     AIRDROP_REVENUE: 6554457.71,
// //     CONVERTED_AIRDROPS: 6506,
// // };
// const CONFIG = {
//     // Static API keys
//     TWELVE_DATA_API_KEY: API_KEYS.twelveData(),
//     ALPHAVANTAGE_KEY: API_KEYS.alphaVantage(),

//     // Static constants
//     STOCK_SYMBOL: "BNC",
//     CRYPTO_SYMBOL: "BNB",
//     BNB_SUPPLY: 170532785,
//     FULLY_DILUTED_SHARES: 62336940,
//     AVG_COST: 851.29,

//     // Dynamic values (overwritten by inputs.js)
//     OUTSTANDING_SHARES: 0,
//     CASH_RESERVES: 0,
//     BTC_HOLDINGS: 0,
//     BNB_HOLDINGS: 0,
//     AIRDROP_REVENUE: 0,
//     CONVERTED_AIRDROPS: 0,
// };

// // ----------------------------------------------
// // ICONS (Tailwind Heroicons – inline SVG)
// // ----------------------------------------------


// // ------------------------------------------------------------
// // STORE
// // ------------------------------------------------------------
// const STORE = {
//     bnbPrice: 0,
//     bnbChange: 0,

//     bncPrice: 0,
//     bncChange: 0,
//     bncVolume: 0,

//     bnbPrices30: [],
//     bncPrices30: [],

//     btcPrice: 0,     
//     btcChange: 0,    
// };


// // ------------------------------------------------------------
// // FORMATTERS
// // ------------------------------------------------------------
// const F = {
//     usd: n =>
//         "$" +
//         Number(n).toLocaleString(undefined, {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         }),
//     num: n => Number(n).toLocaleString(),
//     pct: n => `${n >= 0 ? "+" : ""}${n.toFixed(2)}%`,
// };



// // ------------------------------------------------------------
// // LIVE PRICE — BNC (CEAD) — AlphaVantage (works for OTC, no CORS)
// // ------------------------------------------------------------
// async function fetchBNCStock() {
//     try {
//         const url =
//             `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${CONFIG.STOCK_SYMBOL}&apikey=${CONFIG.ALPHAVANTAGE_KEY}`;

//         const res = await fetch(url);
//         const data = await res.json();
//         const q = data["Global Quote"];

//         if (!q || !q["05. price"]) {
//             console.error("Invalid AlphaVantage data");
//             return;
//         }

//         const price = Number(q["05. price"]);
//         const prev = Number(q["08. previous close"]);
//         const volume = Number(q["06. volume"]);

//         STORE.bncPrice = price;
//         STORE.bncChange = ((price - prev) / prev) * 100;
//         STORE.bncVolume = volume;   // 🔥 wired

//     } catch (e) {
//         console.error("BNC price error:", e);
//         STORE.bncPrice = 0.48;
//         STORE.bncChange = 4.35;
//     }
// }


// // ------------------------------------------------------------
// // LIVE PRICE — BNB (CoinPaprika)
// // ------------------------------------------------------------
// async function fetchBNBPrice() {
//     try {
//         const res = await fetch(
//             "https://api.coinpaprika.com/v1/tickers/bnb-binance-coin"
//         );
//         const data = await res.json();

//         STORE.bnbPrice = data.quotes.USD.price;
//         STORE.bnbChange = data.quotes.USD.percent_change_24h;
//     } catch (e) {
//         console.error("BNB price error:", e);
//         STORE.bnbPrice = 910;
//         STORE.bnbChange = 1.67;
//     }
// }


// // ------------------------------------------------------------
// // HISTORICAL DATA (30 DAYS)
// // ------------------------------------------------------------
// async function fetchHistoricalData() {

//     // BNB — CryptoCompare
//     try {
//         const r = await fetch(
//             "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BNB&tsym=USD&limit=30"
//         );
//         const json = await r.json();
//         STORE.bnbPrices30 = json.Data.Data.map(d => d.close);
//     } catch (err) {
//         console.error("BNB history error:", err);
//         STORE.bnbPrices30 = Array(30).fill(STORE.bnbPrice);
//     }

//     // BNC — TwelveData
//     try {
//         const r = await fetch(
//             `https://api.twelvedata.com/time_series?symbol=${CONFIG.STOCK_SYMBOL}&interval=1day&outputsize=30&apikey=${CONFIG.TWELVE_DATA_API_KEY}`
//         );
//         const json = await r.json();

//         STORE.bncPrices30 = json.values
//         ? json.values.map(v => Number(parseFloat(v.close).toFixed(2))).reverse()
//         : Array(30).fill(Number(STORE.bncPrice.toFixed(2)));
//     } catch (err) {
//         console.error("BNC history error:", err);
//         STORE.bncPrices30 = Array(30).fill(STORE.bncPrice);
//     }
// }


// async function fetchBTCPrice() {
//     try {
//         const res = await fetch(
//             "https://api.coinpaprika.com/v1/tickers/btc-bitcoin"
//         );
//         const data = await res.json();

//         STORE.btcPrice = data.quotes.USD.price;
//         STORE.btcChange = data.quotes.USD.percent_change_24h;

//     } catch (e) {
//         console.error("BTC price error:", e);
//         STORE.btcPrice = 95000; // fallback
//         STORE.btcChange = 0.5;
//     }
// }


// // ------------------------------------------------------------
// // TOP METRICS UI
// // ------------------------------------------------------------
// function renderTopMetrics() {
//     const el = document.getElementById("metrics-grid");
//     if (!el) return;

//     console.log("BNB Holdings:", CONFIG.BNB_HOLDINGS);
//     console.log("Cash Reserves:", CONFIG.CASH_RESERVES);
//     console.log("Outstanding Shares:", CONFIG.OUTSTANDING_SHARES);

//     const holdingsValue = STORE.bnbPrice * CONFIG.BNB_HOLDINGS;
//     console.log("BNB Holdings Value:", holdingsValue);
//     const costBasisTotal = CONFIG.BNB_HOLDINGS * CONFIG.AVG_COST;

//     const unrealized = holdingsValue - costBasisTotal;
//     const unrealizedPct = (unrealized / costBasisTotal) * 100;

//     // const marketCap = STORE.bncPrice * CONFIG.OUTSTANDING_SHARES;
//     const btc_value = STORE.btcPrice * CONFIG.BTC_HOLDINGS;
//     console.log("BTC Holdings Value:", btc_value);   
//     const nav = holdingsValue + CONFIG.CASH_RESERVES + btc_value;
//     console.log("NAV:", nav);   
//     const mnav = (CONFIG.OUTSTANDING_SHARES * STORE.bncPrice) / nav;
//     console.log("mNAV:", mnav);
//     const navps = nav / CONFIG.OUTSTANDING_SHARES;
//     console.log("NAVPS:", navps);

//     // GREEN / RED formatting helpers
//     const fmtChange = v =>
//         `<span class="${v >= 0 ? "text-green-600" : "text-red-600"}">${F.pct(v)}</span>`;

//     const fmtProfit = v =>
//         `<span class="${v >= 0 ? "text-green-600" : "text-red-600"}">${v >= 0 ? "+" : ""}${F.usd(v)}</span>`;

//     const metrics = [
//         // 1. BNC Stock Price
//         {
//             icon: ICONS.stock,
//             title: "BNC Stock Price",
//             value: F.usd(STORE.bncPrice),
//             sub: fmtChange(STORE.bncChange),
//         },
    
//         // 2. Total Holdings
//         {
//             icon: ICONS.bnb,
//             title: "Total BNB Holdings",
//             value: CONFIG.BNB_HOLDINGS.toLocaleString() + " BNB",
//             sub: "",
//         },
    
//         // 3. Holdings Value
//         {
//             icon: ICONS.profit,
//             title: "Est. Holdings Value",
//             value: F.usd(holdingsValue),
//             sub: "Market value",
//         },
    
//         // 4. BNB Price
//         {
//             icon: ICONS.bnb,
//             title: "BNB Price",
//             value: F.usd(STORE.bnbPrice),
//             sub: fmtChange(STORE.bnbChange),
//         },
    
//         // 5. Avg. Cost Basis
//         {
//             icon: ICONS.bnb,
//             title: "Avg. Cost Basis",
//             value: F.usd(CONFIG.AVG_COST),
//             sub: "per BNB",
//         },
    
//         // 6. Unrealized P/L
//         {
//             icon: unrealized >= 0 ? ICONS.profit : ICONS.loss,
//             title: "Est. Change in Value of BNB Holdings",
//             value: fmtProfit(unrealized),
//             sub: fmtChange(unrealizedPct),
//         },
    
//         // 7. Average Daily Volume
//         {
//             icon: ICONS.volume,
//             title: "Today's Volume",
//             value: STORE.bncVolume ? F.num(STORE.bncVolume) : "—",
//             sub: "",
//         },
    
//         // 8. mNAV
//         {
//             icon: ICONS.nav,
//             title: "mNAV",
//             value: mnav.toFixed(2) + "x",
//             sub: "Market NAV multiple",
//         },
    
//         // 9. NAV
//         {
//             icon: ICONS.airdrop,
//             title: "NAV",
//             value: F.usd(navps),
//             sub: "Per share value",
//         },
//     ];
    

//     // ICON MOVED TO THE RIGHT SIDE
//     el.innerHTML = metrics
//         .map(
//             m => `
//         <div class="bg-white border border-gray-200 rounded-lg p-6 flex justify-between items-start">
//             <div>
//                 <div class="text-sm text-gray-600">${m.title}</div>
//                 <div class="text-2xl font-medium text-gray-900">${m.value}</div>
//                 <div class="text-gray-600 text-sm mt-1">${m.sub}</div>
//             </div>
//             <div class="flex-shrink-0 ml-4">
//                 ${m.icon}
//             </div>
//         </div>`
//         )
//         .join("");
// }


// // ------------------------------------------------------------
// // CHARTS (2 CHARTS ONLY — BNB + BNC)
// // ------------------------------------------------------------
// function renderCharts() {
//     const labels = Array.from({ length: 30 }, (_, i) => {
//         const d = new Date();
//         d.setDate(d.getDate() - (29 - i));
//         return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
//     });

//     function makeGradient(ctx, topColor) {
//         const gradient = ctx.createLinearGradient(0, 0, 0, 300);
//         gradient.addColorStop(0, topColor);
//         gradient.addColorStop(1, "rgba(255,255,255,0)");
//         return gradient;
//     }

//     // ------------ BNB CHART ------------
//     const bnbCtx = document.getElementById("bnbChart");
//     if (bnbCtx) {
//         const ctx = bnbCtx.getContext("2d");

//         const gradient = makeGradient(ctx, "rgba(243,186,47,0.30)"); // BNB gold

//         new Chart(bnbCtx, {
//             type: "line",
//             data: {
//                 labels,
//                 datasets: [
//                     {
//                         label: "BNB Price (USD)",
//                         data: STORE.bnbPrices30,
//                         borderColor: "#f3ba2f",
//                         backgroundColor: gradient,
//                         borderWidth: 2,
//                         tension: 0.35,
//                         pointRadius: 0,
//                         fill: true, 
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                     y: {
//                         ticks: { callback: v => "$" + v },
//                         grid: { color: "rgba(0,0,0,0.05)" },
//                     },
//                 },
//             },
//         });
//     }

//     // ------------ BNC CHART ------------
//     const bncCtx = document.getElementById("bncChart");
//     if (bncCtx) {
//         const ctx = bncCtx.getContext("2d");

//         const gradient = makeGradient(ctx, "rgba(128,128,128,0.25)");

//         new Chart(bncCtx, {
//             type: "line",
//             data: {
//                 labels,
//                 datasets: [
//                     {
//                         label: "BNC Price (USD)",
//                         data: STORE.bncPrices30,
//                         borderColor: "#6b7280", 
//                         backgroundColor: gradient,
//                         borderWidth: 2,
//                         tension: 0.35,
//                         pointRadius: 0,
//                         fill: true, 
//                     },
//                 ],
//             },
//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 scales: {
//                     y: {
//                         ticks: { callback: v => "$" + v },
//                         grid: { color: "rgba(0,0,0,0.05)" },
//                     },
//                 },
//             },
//         });
//     }
// }


// // Computes % change between now and 7 days ago
// // ============================================================
// // WEEKLY CHANGE — robust against bad/missing data
// // ============================================================
// function weeklyChange(arr) {
//     if (!Array.isArray(arr) || arr.length < 8) return 0;

//     const now = Number(arr[arr.length - 1]);
//     const weekAgo = Number(arr[arr.length - 8]);

//     if (!now || !weekAgo || weekAgo === 0) return 0;

//     return ((now - weekAgo) / weekAgo) * 100;
// }



// // ------------------------------------------------------------
// // ADDITIONAL METRICS (Mock)
// // ============================================================
// // ADDITIONAL METRICS — Live Values (BNB + BNC + Treasury)
// // ============================================================
// function renderAdditionalMetrics() {
//     const w = document.getElementById("weekly-summary");
//     const v = document.getElementById("valuation-metrics");
//     if (!w || !v) return;

//     // -------------------------------
//     // Weekly Perf (BNB + BNC)
//     // -------------------------------
//     const weeklyBNBChange = weeklyChange(STORE.bnbPrices30);
//     const weeklyBNCChange = weeklyChange(STORE.bncPrices30);

//     // -------------------------------
//     // Treasury + Valuation Math
//     // -------------------------------
//     const holdingsValue = STORE.bnbPrice * CONFIG.BNB_HOLDINGS;                  // value of crypto held
//     const treasuryValue = holdingsValue + CONFIG.CASH_RESERVES;             // true NAV assets
//     const marketCap = STORE.bncPrice * CONFIG.OUTSTANDING_SHARES;           // equity value

//     const navPerShare = treasuryValue / CONFIG.OUTSTANDING_SHARES;          // NAV ÷ shares
//     const mnevBasic = marketCap / treasuryValue;                            // Market ÷ NAV
//     const enterpriseValue = marketCap - CONFIG.CASH_RESERVES;               // EV = MC – Cash

//     // -------------------------------
//     // Weekly Summary UI
//     // -------------------------------
//     w.innerHTML = `
//         <div class="flex justify-between text-sm">
//             <span>Weekly BNB Change</span>
//             <span class="${weeklyBNBChange >= 0 ? "text-green-600" : "text-red-600"}">
//                 ${weeklyBNBChange >= 0 ? "+" : ""}${weeklyBNBChange.toFixed(2)}%
//             </span>
//         </div>

//         <div class="flex justify-between text-sm">
//             <span>Weekly BNC Change</span>
//             <span class="${weeklyBNCChange >= 0 ? "text-green-600" : "text-red-600"}">
//                 ${weeklyBNCChange >= 0 ? "+" : ""}${weeklyBNCChange.toFixed(2)}%
//             </span>
//         </div>
//     `;

//     // -------------------------------
//     // Valuation Metrics UI
//     // -------------------------------

//     v.innerHTML = `
//         <div class="flex justify-between text-sm">
//             <span>Airdrop Value</span>
//             <span>${F.usd(CONFIG.AIRDROP_REVENUE)}</span>
//         </div>

//         <div class="flex justify-between text-sm">
//             <span>Converted Airdrops</span>
//             <span>${Number(CONFIG.CONVERTED_AIRDROPS).toLocaleString()} BNB</span>

//         </div>
//     `;
// }


// // ------------------------------------------------------------
// // MAIN
// // ------------------------------------------------------------
// async function runDashboard() {
//     await loadAllInputs(); 
//     console.log("CONFIG after dynamic load:", CONFIG);
//     await Promise.all([
//         fetchBNCStock(),
//         fetchBNBPrice(),
//         fetchBTCPrice(),
//         fetchHistoricalData()
//     ]);

//     renderTopMetrics();
//     renderCharts();
//     renderAdditionalMetrics();
// }

// runDashboard();
