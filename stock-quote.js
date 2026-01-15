// ============================
// CEAD Stock Quote (No CORS)
// AlphaVantage – Works for OTC
// ============================

const API_KEY = "K475Y1VSU6KC8C4R";   
const SYMBOL = "CEAD";
const OUTSTANDING_SHARES = 43803916;

// DOM elements
const elPrice = document.querySelector("#stock-price");
const elChange = document.querySelector("#stock-change");
const elRange = document.querySelector("#stock-range");
const elVolume = document.querySelector("#stock-volume");
const elMarketCap = document.querySelector("#stock-marketcap");

const money = v => "$" + Number(v).toFixed(2);
const num = v => Number(v).toLocaleString();

async function fetchCEADQuote() {
  try {
    const url =
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${SYMBOL}&apikey=${API_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    const q = data["Global Quote"];

    if (!q || !q["05. price"]) {
      console.error("Invalid AlphaVantage data", data);
      return;
    }

    const price = Number(q["05. price"]);
    const prev = Number(q["08. previous close"]);
    const high = Number(q["03. high"]);
    const low = Number(q["04. low"]);
    const volume = Number(q["06. volume"]);

    const changePct = ((price - prev) / prev) * 100;
    const marketCap = price * OUTSTANDING_SHARES;

    // Update UI
    elPrice.textContent = money(price);

    elChange.textContent =
      `${changePct >= 0 ? "+" : ""}${changePct.toFixed(2)}%`;
    elChange.className =
      changePct >= 0
        ? "text-green-600 text-sm"
        : "text-red-600 text-sm";

    elRange.textContent = `${money(low)} - ${money(high)}`;
    elVolume.textContent = num(volume);

    elMarketCap.textContent =
      "$" + (marketCap / 1_000_000).toFixed(2) + "M";

  } catch (err) {
    console.error("CEAD quote error:", err);
  }
}

// Load once on page load
fetchCEADQuote();

// Refresh every 60s if desired
setInterval(fetchCEADQuote, 60000);
