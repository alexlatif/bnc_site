// ==============================
// BNB Price + Treasury Value
// Source: CoinPaprika (no CORS)
// Matches your original code
// ==============================

// ---- CONFIG ----
const BNB_API = "https://api.coinpaprika.com/v1/tickers/bnb-binance-coin";

// You already use these IDs in your HTML:
const elBnbPrice   = document.querySelector("#bnb-price");
const elHoldings   = document.querySelector("#bnb-holdings");
const elTotalValue = document.querySelector("#total-value");

// From your existing metrics loader:
function formatUsd(v) {
  return "$" + Number(v).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

async function fetchBNBTreasury() {
  try {
    // Pull dashboard metrics (holdings + avg cost)
    const metrics = await window.loadBusinessMetrics();
    const holdings = Number(metrics.totalHoldings);

    // Fetch live price (same API you originally used)
    const res = await fetch(BNB_API);
    const json = await res.json();

    const bnbPrice = json.quotes.USD.price;

    // Calculate total value
    const totalValue = holdings * bnbPrice;

    // --- Update UI ---
    elBnbPrice.textContent   = formatUsd(bnbPrice);
    elHoldings.textContent   = holdings.toLocaleString() + " BNB";
    elTotalValue.textContent = formatUsd(totalValue);

  } catch (err) {
    console.error("BNB price load error:", err);

    elBnbPrice.textContent   = "—";
    elTotalValue.textContent = "—";
  }
}

// Run on load
fetchBNBTreasury();

// Optional: refresh every 90 seconds
setInterval(fetchBNBTreasury, 90000);
