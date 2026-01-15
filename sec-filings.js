// ===============================
//  SEC Filings Dynamic Loader
//  CEA Industries Inc. (CIK: 0001482541)
// ===============================

const SEC_CIK = '0001482541';
const SEC_SUBMISSIONS_URL = `https://data.sec.gov/submissions/CIK${SEC_CIK}.json`;

// SEC requires a valid User-Agent identifying your org
const SEC_HEADERS = {
    "User-Agent": "CEAIndustriesIR ir@ceaindustries.com",
    "Accept": "application/json"
};

// Build official SEC download link
function buildSECFilingLink(cik, accessionNo) {
    const cleanAcc = accessionNo.replace(/-/g, '');
    // return `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001482541&owner=include&count=40`;
    return `https://www.sec.gov/Archives/edgar/data/${parseInt(cik,10)}/${cleanAcc}/${accessionNo}-index.html`;
}

// Fetch + parse latest N filings
async function fetchLatestFilings(n = 5) {
    try {
        const res = await fetch(SEC_SUBMISSIONS_URL, { headers: SEC_HEADERS });

        // ⚠️ If SEC blocks browser CORS, you will get an error here
        if (!res.ok) throw new Error(`SEC HTTP error ${res.status}`);

        const data = await res.json();
        const r = data.filings.recent;

        const filings = r.accessionNumber.map((acc, i) => ({
            type: r.form[i],
            date: r.filingDate[i],
            accession: acc,
            title: `${r.form[i]} — filed ${r.filingDate[i]}`,
            link: buildSECFilingLink(SEC_CIK, acc)
        }));

        return filings.slice(0, n);
    } catch (err) {
        console.error("SEC filings error:", err);
        return [];
    }
}

// Render filings into your UI
async function renderSecFilings() {
    const container = document.getElementById("filings-list");
    if (!container) return;

    container.innerHTML = `<div class="text-gray-600 text-sm">Loading SEC filings…</div>`;

    const filings = await fetchLatestFilings(5);

    if (filings.length === 0) {
        container.innerHTML = `
            <div class="text-red-600 text-sm">
                Could not load SEC filings. SEC may be blocking browser requests (CORS).
            </div>`;
        return;
    }

    container.innerHTML = ""; // clear placeholder

    filings.forEach(f => {
        const html = `
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors">
                <div class="flex items-start justify-between">
                    <div class="flex items-start flex-1">
                        <div class="flex-shrink-0 w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center mr-4">
                            <svg class="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2 mb-1">
                                <span class="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-900 text-white">
                                    ${f.type}
                                </span>
                                <span class="text-sm text-gray-600">${f.date}</span>
                            </div>
                            <h3 class="text-xl font-medium text-gray-900 mb-1">${f.title}</h3>
                        </div>
                    </div>

                    <a href="${f.link}" target="_blank" rel="noopener noreferrer"
                       class="btn-secondary text-sm flex items-center">
                        <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                            </path>
                        </svg>
                        Download
                    </a>
                </div>
            </div>`;
        container.insertAdjacentHTML('beforeend', html);
    });
}

// Auto-run when page loads
document.addEventListener("DOMContentLoaded", renderSecFilings);
