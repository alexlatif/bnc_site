// charters.js
// Committee Charters for CEA Industries Inc.

(function() {
    const container = document.getElementById("charters-list");
    if (!container) return;

    const charters = [
      {
        title: "Audit Committee Charter",
        date: "January 17, 2022",
        description: "Charter governing the Audit Committee of the Board of Directors",
        link: "documents/CEA-Audit-Committee-Charter.pdf"
      },
      {
        title: "Compensation Committee Charter",
        date: "January 17, 2022",
        description: "Charter governing the Compensation Committee of the Board of Directors",
        link: "documents/CEA-Compensation-Committee-Charter.pdf"
      },
      {
        title: "Nominating & Governance Committee Charter",
        date: "January 17, 2022",
        description: "Charter governing the Nominating & Governance Committee of the Board of Directors",
        link: "documents/CEA-Nominating-Committee-Charter.pdf"
      }
    ];

    container.innerHTML = "";
    charters.forEach(item => {
      container.insertAdjacentHTML(
        "beforeend",
        `
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
                        <h3 class="text-xl font-medium text-gray-900 mb-1">${item.title}</h3>
                        <p class="text-sm text-gray-600 mb-1">${item.description}</p>
                        <p class="text-sm text-gray-500">Adopted: ${item.date}</p>
                    </div>
                </div>

                <a href="${item.link}" target="_blank" rel="noopener noreferrer"
                   class="btn-secondary text-sm flex items-center">
                    <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                        </path>
                    </svg>
                    View
                </a>
            </div>
        </div>
        `
      );
    });
})();
