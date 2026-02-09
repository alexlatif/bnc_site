// press-release-manual.js
// Manually inserted latest 5 CEA Industries (BNC) press releases

(function() {
    const container = document.getElementById("press-releases");
    if (!container) return;
  
    const releases = [
      {
        date: "Feb 9, 2026",
        title: "CEA Industries Appoints Accounting and Compliance Expert Glenn W. Tyranski to Its Board of Directors",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2026/02/09/3234892/0/en/CEA-Industries-Appoints-Accounting-and-Compliance-Expert-Glenn-W-Tyranski-to-Its-Board-of-Directors.html"
      },
      {
        date: "Feb 6, 2026",
        title: "YZi Labs Calls on CEA Industries to Ensure Stockholders Can Exercise Written Consent Rights",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2026/02/06/3234038/0/en/YZi-Labs-Calls-on-CEA-Industries-to-Ensure-Stockholders-Can-Exercise-Written-Consent-Rights.html"
      },
      {
        date: "Feb 4, 2026",
        title: "YZi Labs Responds to CEA Industries' February 4, 2026 Press Release",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2026/02/04/3232598/0/en/YZi-Labs-Responds-to-CEA-Industries-February-4-2026-Press-Release.html"
      },
      {
        date: "Feb 4, 2026",
        title: "CEA Industries Requests That 10X Capital and YZi Labs Terminate Their Secret Side Agreement",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2026/02/04/3232349/0/en/CEA-Industries-Requests-That-10X-Capital-and-YZi-Labs-Terminate-Their-Secret-Side-Agreement.html"
      },
      {
        date: "Nov 10, 2025",
        title: "CEA Industries ($BNC) to Participate at the 2025 Cantor Crypto & AI/Energy Infrastructure Conference November 11-12, 2025",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2025/11/10/3185135/0/en/CEA-Industries-BNC-to-Participate-at-the-2025-Cantor-Crypto-AI-Energy-Infrastructure-Conference-November-11-12-2025.html"
      },
      {
        date: "Oct 21, 2025",
        title: "CEA Industries ($BNC) Crosses Half-Million BNB Milestone",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2025/10/21/3170098/0/en/CEA-Industries-BNC-Crosses-Half-Million-BNB-Milestone.html"
      },
      {
        date: "Oct 15, 2025",
        title: "CEA Industries ($BNC) to Participate in the LD Micro Main Event XIX on October 21, 2025, and Stocktoberfest Presented by StockTwits on October 22, 2025",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2025/10/15/3167114/0/en/CEA-Industries-BNC-to-Participate-in-the-LD-Micro-Main-Event-XIX-on-October-21-2025-and-Stocktoberfest-Presented-by-StockTwits-on-October-22-2025.html"
      },
      {
        date: "Oct 9, 2025",
        title: "CEA Industries ($BNC) Appoints Financial Media Veteran Jon Najarian as Chief Evangelist",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2025/10/09/3164085/0/en/CEA-Industries-BNC-Appoints-Financial-Media-Veteran-Jon-Najarian-as-Chief-Evangelist.html"
      },
      {
        date: "Oct 7, 2025",
        title: "CEA Industries (BNC) Appoints Seasoned Legal Executive Carly E. Howard as Non-Executive Director",
        source: "GlobeNewswire",
        link: "https://www.globenewswire.com/news-release/2025/10/07/3162973/0/en/CEA-Industries-BNC-Appoints-Seasoned-Legal-Executive-Carly-E-Howard-as-Non-Executive-Director.html"
      }
    ];
  
    container.innerHTML = "";
    releases.forEach(item => {
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors cursor-pointer"
             onclick="window.open('${item.link}', '_blank')">
          <h3 class="text-xl font-medium text-gray-900 mb-1">${item.title}</h3>
          <p class="text-sm text-gray-600">${item.date} · ${item.source}</p>
        </div>
        `
      );
    });
  })();
  
// const FEED_URL =
//   "https://api.gdeltproject.org/api/v2/doc/doc?query=(%22CEA%20Industries%22%20OR%20CEAD)&mode=ArtList&format=json&maxrecords=10";

// function showLoader(container) {
//   container.innerHTML = `
//     <div class="flex flex-col items-center justify-center py-10">
//       <div class="relative">
//         <div class="h-10 w-10 rounded-full border-4 border-gray-300"></div>
//         <div class="absolute top-0 left-0 h-10 w-10 rounded-full border-4 border-gray-900 border-t-transparent animate-spin"></div>
//       </div>
//       <p class="text-gray-600 text-sm mt-4">Loading press releases...</p>
//     </div>
//   `;
// }

// (async function loadPressFeed() {
//   const container = document.getElementById("press-releases");
//   if (!container) return;

//   showLoader(container);

//   try {
//     const res = await fetch(FEED_URL);
//     const text = await res.text();

//     // Try parsing JSON safely
//     let data;
//     try {
//       data = JSON.parse(text);
//     } catch (err) {
//       console.error("Not JSON:", text.slice(0, 150));
//       throw new Error("GDELT returned non-JSON");
//     }

//     if (!data.articles || data.articles.length === 0) {
//       container.innerHTML =
//         '<p class="text-sm text-gray-500">No press releases found.</p>';
//       return;
//     }

//     container.innerHTML = "";

//     data.articles.slice(0, 3).forEach(item => {
//       const title = item.title || "Untitled";
//       const link = item.url || "#";
//       const source = item.domain || "News";
//       const pubDate = new Date(item.seendate).toLocaleDateString("en-US", {
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       });

//       container.insertAdjacentHTML(
//         "beforeend",
//         `
//         <div class="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-900 transition-colors cursor-pointer"
//              onclick="window.open('${link}', '_blank')">
//           <h3 class="text-xl font-medium text-gray-900 mb-1">${title}</h3>
//           <p class="text-sm text-gray-600">${pubDate} · ${source}</p>
//         </div>
//         `
//       );
//     });

//   } catch (err) {
//     console.error("GDELT error", err);
//     container.innerHTML =
//       '<p class="text-sm text-gray-500">Failed to load press releases.</p>';
//   }
// })();
