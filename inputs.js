// ============================================================
// inputs.js — SINGLE SOURCE OF TRUTH
// Centralizes:
// - Dynamic treasury metrics from metrics.txt
// - LIVE market feeds (BNB, BNC, BTC)
// Used by BOTH: dashboard.js & businesses.html
// ============================================================

(function () {
    
    
    // --------------------------------------------------------
    // 1. STATIC DEFAULTS (fallbacks if metrics.txt missing)
    // --------------------------------------------------------
    const DEFAULTS = {
        // Static constants
        STOCK_SYMBOL: "BNC",
        CRYPTO_SYMBOL: "BNB",
        FULLY_DILUTED_SHARES: 62336940,
        BNB_SUPPLY: 170532785,
        AVG_COST: 855,

        // Dynamic (loaded from metrics.txt)
        OUTSTANDING_SHARES: 0,
        CASH_RESERVES: 21500000,
        BTC_HOLDINGS: 54.7575,
        BNB_HOLDINGS: 515054,
        AIRDROP_REVENUE: 6500000,
        CONVERTED_AIRDROPS: 6500,
    };

    // --------------------------------------------------------
    // 2. GLOBAL HOLDERS
    // --------------------------------------------------------
    window.CONFIG = structuredClone(DEFAULTS);

    window.MARKET = {
        BNB_PRICE: null,
        BNB_CHANGE: null,

        BNC_PRICE: null,
        BNC_CHANGE: null,
        BNC_VOLUME: null,

        BTC_PRICE: null,
        BTC_CHANGE: null
    };

    // --------------------------------------------------------
    // 3. LOAD metrics.txt (S3 or local)
    // --------------------------------------------------------
    window.loadMetrics = async function () {
        const url = "https://misc-asl.sfo3.digitaloceanspaces.com/metrics.txt";
    
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("metrics.txt fetch failed");
    
            const raw = await res.text();
            console.log("metrics.txt raw data:", raw);
    
            raw.split("\n")
                .map(l => l.trim())
                .filter(l => l.length > 0)
                .forEach(line => {
                    // support "key=value" or "key: value"
                    const sep = line.includes("=") ? "=" :
                                line.includes(":") ? ":" : null;
    
                    if (!sep) return;
    
                    const [rawK, rawV] = line.split(sep);
                    const k = rawK.trim();
                    const v = rawV.trim();
    
                    if (k in DEFAULTS) {
                        const num = Number(v.replace(/,/g, ""));
                        CONFIG[k] = Number.isFinite(num) ? num : v;
                    }
                });
    
            return CONFIG;
        } catch (err) {
            console.error("loadMetrics FAILED — using defaults", err);
            return CONFIG;
        }
    };
    

    // --------------------------------------------------------
    // 4. FETCH LIVE BNB PRICE
    // --------------------------------------------------------
    window.fetchBNB = async function () {
        try {
            const r = await fetch("https://api.coinpaprika.com/v1/tickers/bnb-binance-coin");
            const j = await r.json();

            MARKET.BNB_PRICE  = j.quotes.USD.price;
            MARKET.BNB_CHANGE = j.quotes.USD.percent_change_24h;

        } catch (err) {
            console.error("BNB fetch failed:", err);
            MARKET.BNB_PRICE  = 910;
            MARKET.BNB_CHANGE = 1.67;
        }
    };

    // --------------------------------------------------------
    // 5. FETCH LIVE BNC (CEAD) PRICE
    // --------------------------------------------------------
    // window.fetchBNC = async function () {
    //     try {
    //         const url =
    //             `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${CONFIG.STOCK_SYMBOL}&apikey=${API_KEYS.alphaVantage()}`;
    //         const r = await fetch(url);
    //         const j = await r.json();
    //         const q = j["Global Quote"];

    //         if (!q || !q["05. price"]) throw new Error("AlphaVantage empty");

    //         MARKET.BNC_PRICE  = Number(q["05. price"]);
    //         MARKET.BNC_CHANGE = ((MARKET.BNC_PRICE - Number(q["08. previous close"])) / Number(q["08. previous close"])) * 100;
    //         MARKET.BNC_VOLUME = Number(q["06. volume"]);

    //     } catch (err) {
    //         console.error("BNC fetch failed:", err);
    //         MARKET.BNC_PRICE  = 0.48;
    //         MARKET.BNC_CHANGE = 4.35;
    //         MARKET.BNC_VOLUME = 250000;
    //     }
    // };

    window.fetchBNC = async function () {
        try {
            const url =
                `https://api.twelvedata.com/time_series?symbol=${CONFIG.STOCK_SYMBOL}&interval=1day&outputsize=2&apikey=${API_KEYS.twelveData()}`;
    
            const r = await fetch(url);
    
            // Get raw text for debugging (sometimes the JSON is empty)
            const raw = await r.text();
    
            console.log("[BNC TwelveData RAW RESPONSE]:", raw);
    
            let j;
            try {
                j = JSON.parse(raw);
            } catch (parseErr) {
                console.error("Parse error:", parseErr);
                throw new Error("Invalid JSON returned from TwelveData");
            }
    
            console.log("[BNC TwelveData Parsed JSON]:", j);
    
            if (!j || !j.values || !Array.isArray(j.values) || j.values.length < 2) {
                console.error("[BNC TwelveData ERROR MESSAGE]:", j.message || j.code || "Unknown");
                throw new Error("No time_series data");
            }
    
            const latest = j.values[0];
            const prev   = j.values[1];
    
            const latestClose = Number(parseFloat(latest.close).toFixed(2));
            const prevClose   = Number(parseFloat(prev.close).toFixed(2));
    
            MARKET.BNC_PRICE  = latestClose;
            MARKET.BNC_CHANGE = ((latestClose - prevClose) / prevClose) * 100;
            MARKET.BNC_VOLUME = Number(latest.volume || 0);
    
        } catch (err) {
            console.error("BNC fetch failed:", err);
    
            MARKET.BNC_PRICE  = 0.48;
            MARKET.BNC_CHANGE = 4.35;
            MARKET.BNC_VOLUME = 250000;
        }
    };
    

    // --------------------------------------------------------
    // 6. FETCH LIVE BTC PRICE
    // --------------------------------------------------------
    window.fetchBTC = async function () {
        try {
            const r = await fetch("https://api.coinpaprika.com/v1/tickers/btc-bitcoin");
            const j = await r.json();

            MARKET.BTC_PRICE  = j.quotes.USD.price;
            MARKET.BTC_CHANGE = j.quotes.USD.percent_change_24h;

        } catch (err) {
            console.error("BTC fetch failed:", err);
            MARKET.BTC_PRICE = 95000;
            MARKET.BTC_CHANGE = 0.5;
        }
    };

    // --------------------------------------------------------
    // 7. MASTER LOADER (call in dashboard.js & businesses.html)
    // --------------------------------------------------------
    window.loadAllInputs = async function () {
        await loadMetrics();
        await Promise.all([
            fetchBNB(),
            fetchBNC(),
            fetchBTC()
        ]);

        console.log("CONFIG:", CONFIG);
        console.log("MARKET:", MARKET);

        return { CONFIG, MARKET };
    };

})();
