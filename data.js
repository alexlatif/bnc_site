// Centralized data store for CEA Industries website
window.appData = {
  // Leadership team data
  leadership: [
      {
          name: 'David Namdar',
          title: 'Chief Executive Officer',
          bio: 'David leads CEA Industries with a focus on strategic digital asset management and long-term value creation for shareholders.',
          image: "david.jpg"
      },
      {
          name: 'Tony McDonald',
          title: 'Chairman of the Board & President',
          bio: 'Tony provides strategic leadership and oversees the company\'s operations and corporate governance as Chairman and President.',
          image: "tony.jpg"
      },
      {
          name: 'Russell Read',
          title: 'Independent Director',
          bio: 'Brings extensive public company and governance experience to the Board.',
          image: "russel.jpg"
      },
      {
          name: 'Nick Etten',
          title: 'Independent Director',
          bio: 'Provides expertise in finance and digital asset markets.',
          image: "nick.jpg"
      },
      {
        name: 'Carly Howard',
        title: 'Independent Director',
        bio: 'Contributes independent oversight and strategic guidance to the Board.',
        image: "carly.jpg"
      },
      {
        name: 'Annemarie Tierney',
        title: 'Independent Director',
        bio: 'Contributes independent oversight and strategic guidance to the Board.',
        image: "annemarie.jpg"
      },
      {
        name: 'Hans Thomas',
        title: 'Director',
        bio: 'Contributes strategic guidance and industry expertise to the Board.',
        image: "hans.jpg"
      },
      {
        name: 'Renee Larson',
        title: 'VP Finance / Controller',
        bio: 'Oversees financial operations and reporting for CEA Industries.',
        image: "rene.jpg"
      },
      {
        name: 'Jordan Vedoya',
        title: 'President Fat Panda Ltd.',
        bio: 'Leads operations for the Fat Panda business unit.',
        image: "jordan.jpg"
      },
      {
        name: 'Omar Hussein',
        title: 'Advisor',
        bio: 'Provides strategic advisory services to the company.',
        image: "omar.jpg"
      },
      {
        name: 'Jon Najarian',
        title: 'Advisor',
        bio: 'Provides expertise and advisory services in markets and strategy.',
        image: "jon.jpg"
      },
      {
        name: 'Marc LoPresti',
        title: 'Advisor',
        bio: 'Provides expertise and advisory services in markets and strategy.',
        image: "marc.jpg"
      },
  ],

  // Business metrics
  businessMetrics: {
      totalHoldings: 515054,
      avgCostBasis: 851.29,
      bnbPrice: 910.00,
      totalValue: 468650000
  },

  // Dashboard metrics
  dashboardMetrics: {
      bnbPrice: 910.00,
      bnbPriceChange: 1.67,
      totalHoldings: 515054,
      avgCostBasis: 851.29,
      bncStockPrice: 0.48,
      bncStockChange: 4.35,
      totalValue: 468650000,
      unrealizedPL: 25750000,
      unrealizedPLPercent: 5.81
  },

  // Chart data
  chartData: {
      weeklyHoldings: [
          { week: 'Week 1', holdings: 8500, avgCost: 860, bnbPrice: 580, bncPrice: 0.42 },
          { week: 'Week 2', holdings: 9200, avgCost: 860, bnbPrice: 595, bncPrice: 0.44 },
          { week: 'Week 3', holdings: 9800, avgCost: 860, bnbPrice: 610, bncPrice: 0.46 },
          { week: 'Week 4', holdings: 10500, avgCost: 860, bnbPrice: 605, bncPrice: 0.45 },
          { week: 'Week 5', holdings: 11200, avgCost: 860, bnbPrice: 620, bncPrice: 0.47 },
          { week: 'Week 6', holdings: 11800, avgCost: 860, bnbPrice: 615, bncPrice: 0.46 },
          { week: 'Week 7', holdings: 12450, avgCost: 860, bnbPrice: 625, bncPrice: 0.48 },
      ],
      priceComparison: [
          { week: 'Week 1', avgCost: 860, marketPrice: 580 },
          { week: 'Week 2', avgCost: 860, marketPrice: 595 },
          { week: 'Week 3', avgCost: 860, marketPrice: 610 },
          { week: 'Week 4', avgCost: 860, marketPrice: 605 },
          { week: 'Week 5', avgCost: 860, marketPrice: 620 },
          { week: 'Week 6', avgCost: 860, marketPrice: 615 },
          { week: 'Week 7', avgCost: 860, marketPrice: 625 },
      ],
      stockComparison: [
          { week: 'Week 1', bncChange: 0, bnbChange: 0 },
          { week: 'Week 2', bncChange: 4.8, bnbChange: 2.6 },
          { week: 'Week 3', bncChange: 9.5, bnbChange: 5.2 },
          { week: 'Week 4', bncChange: 7.1, bnbChange: 4.3 },
          { week: 'Week 5', bncChange: 11.9, bnbChange: 6.9 },
          { week: 'Week 6', bncChange: 9.5, bnbChange: 6.0 },
          { week: 'Week 7', bncChange: 14.3, bnbChange: 7.8 },
      ]
  },

  // Investor data
  investorData: {
      filings: [
          { type: '10-K', title: 'Annual Report 2024', date: 'March 31, 2024', size: '2.4 MB' },
          { type: '10-Q', title: 'Quarterly Report Q3 2024', date: 'November 14, 2024', size: '1.8 MB' },
          { type: '10-Q', title: 'Quarterly Report Q2 2024', date: 'August 14, 2024', size: '1.7 MB' },
          { type: '8-K', title: 'Current Report - BNB Acquisition', date: 'November 1, 2024', size: '0.8 MB' },
          { type: '8-K', title: 'Current Report - Management Changes', date: 'September 15, 2024', size: '0.6 MB' },
      ],
      pressReleases: [
          { title: 'CEA Industries Announces Strategic BNB Treasury Expansion', date: 'November 10, 2024' },
          { title: 'Q3 2024 Financial Results and Business Update', date: 'November 14, 2024' },
          { title: 'CEA Industries Exceeds 12,000 BNB in Holdings', date: 'October 28, 2024' },
          { title: 'Company Launches New Investor Dashboard', date: 'October 15, 2024' },
      ],
      presentations: [
          { title: 'Q3 2024 Investor Presentation', date: 'November 2024', pages: '24 slides' },
          { title: 'Digital Asset Strategy Overview', date: 'October 2024', pages: '18 slides' },
          { title: 'Corporate Overview', date: 'September 2024', pages: '32 slides' },
      ]
  }
};

// Navigation HTML (shared across all pages)
window.navigationHTML = `
  <nav class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
              <a href="index.html" class="flex items-center">
                <span class="text-2xl font-medium text-gray-900 tracking-tight">CEA INDUSTRIES</span>
              </a>

              <!-- Desktop Navigation -->
              <div class="hidden md:flex items-center space-x-8">
                  <a href="index.html" class="text-sm transition-colors">Home</a>
                  <a href="about.html" class="text-sm transition-colors">About</a>
                  <a href="businesses.html" class="text-sm transition-colors">Our Businesses</a>
                  <a href="dashboard.html" class="text-sm transition-colors">Dashboard</a>
                  <a href="investors.html" class="text-sm transition-colors">Investors</a>
                  <a href="contact.html" class="text-sm transition-colors">Contact</a>
              </div>

              <!-- Mobile Menu Button -->
              <button class="md:hidden p-2" onclick="toggleMobileMenu()">
                  <svg id="menu-icon" class="h-6 w-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                  </svg>
                  <svg id="close-icon" class="h-6 w-6 text-gray-900 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
              </button>
          </div>

          <!-- Mobile Menu -->
          <div id="mobile-menu" class="md:hidden py-4 border-t border-gray-200 hidden">
              <a href="index.html" class="block py-2 text-sm">Home</a>
              <a href="about.html" class="block py-2 text-sm">About</a>
              <a href="businesses.html" class="block py-2 text-sm">Our Businesses</a>
              <a href="dashboard.html" class="block py-2 text-sm">Dashboard</a>
              <a href="investors.html" class="block py-2 text-sm">Investors</a>
              <a href="contact.html" class="block py-2 text-sm">Contact</a>
          </div>
      </div>
  </nav>
`;

// Footer HTML (shared across all pages)
window.footerHTML = `
  <footer class="bg-gray-50 border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                  <div class="text-xl font-medium text-gray-900 mb-4">CEA Industries</div>
                  <p class="text-sm text-gray-600">
                      Creating long-term value through strategic digital asset management and operational excellence.
                  </p>
              </div>

              <div>
                  <h3 class="text-sm font-medium text-gray-900 mb-4">Company</h3>
                  <ul class="space-y-2">
                      <li>
                          <a href="about.html" class="text-sm text-gray-600 hover:text-gray-900">
                              About Us
                          </a>
                      </li>
                      <li>
                          <a href="businesses.html" class="text-sm text-gray-600 hover:text-gray-900">
                              Our Businesses
                          </a>
                      </li>
                      <li>
                          <a href="dashboard.html" class="text-sm text-gray-600 hover:text-gray-900">
                              Dashboard
                          </a>
                      </li>
                  </ul>
              </div>

              <div>
                  <h3 class="text-sm font-medium text-gray-900 mb-4">Investors</h3>
                  <ul class="space-y-2">
                      <li>
                          <a href="investors.html" class="text-sm text-gray-600 hover:text-gray-900">
                              Investor Relations
                          </a>
                      </li>
                      <li>
                          <a href="investors.html#filings" class="text-sm text-gray-600 hover:text-gray-900">
                              SEC Filings
                          </a>
                      </li>
                      <li>
                          <a href="investors.html#press" class="text-sm text-gray-600 hover:text-gray-900">
                              Press Releases
                          </a>
                      </li>
                  </ul>
              </div>

              <div>
                  <h3 class="text-sm font-medium text-gray-900 mb-4">Our Businesses</h3>
                  <ul class="space-y-2">
                      <li>
                          <a href="dashboard.html" class="text-sm text-gray-600 hover:text-gray-900">
                              BNB Treasury
                          </a>
                      </li>
                      <li>
                          <a href="https://fatpanda.ca" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-600 hover:text-gray-900">
                              Fat Panda
                          </a>
                      </li>
                      <li>
                          <a href="https://surna.com" target="_blank" rel="noopener noreferrer" class="text-sm text-gray-600 hover:text-gray-900">
                              Surna Cultivation Technologies
                          </a>
                      </li>
                  </ul>
              </div>
          </div>

          <div class="mt-8 pt-8 border-t border-gray-200">
              <p class="text-sm text-gray-600 text-center">
                  © ${new Date().getFullYear()} CEA Industries. All rights reserved.
              </p>
          </div>
      </div>
  </footer>
`;

// Global helper functions
window.toggleMobileMenu = function() {
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  
  if (mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.remove('hidden');
      menuIcon.classList.add('hidden');
      closeIcon.classList.remove('hidden');
  } else {
      mobileMenu.classList.add('hidden');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
  }
};

// Data accessors
window.leadershipData = window.appData.leadership;
window.businessMetricsData = window.appData.businessMetrics;
window.dashboardMetricsData = window.appData.dashboardMetrics;
window.chartData = window.appData.chartData;
window.investorData = window.appData.investorData;