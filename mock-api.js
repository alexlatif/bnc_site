// Mock API functions for CEA Industries website

// Mock API delay to simulate network requests
const mockDelay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API responses
window.mockAPI = {
    // Business metrics API
    async getBusinessMetrics() {
        await mockDelay(300);
        return {
            success: true,
            data: window.appData.businessMetrics
        };
    },

    // Dashboard metrics API
    async getDashboardMetrics() {
        await mockDelay(400);
        return {
            success: true,
            data: window.appData.dashboardMetrics
        };
    },

    // Chart data API
    async getChartData() {
        await mockDelay(500);
        return {
            success: true,
            data: window.appData.chartData
        };
    },

    // Investor data API
    async getInvestorData() {
        await mockDelay(300);
        return {
            success: true,
            data: window.appData.investorData
        };
    },

    // Contact form submission
    async submitContactForm(formData) {
        await mockDelay(800);
        
        // Simulate random success/failure
        const success = Math.random() > 0.1; // 90% success rate
        
        if (success) {
            return {
                success: true,
                message: 'Message sent successfully',
                id: 'contact_' + Date.now()
            };
        } else {
            throw new Error('Failed to send message. Please try again.');
        }
    },

    // Email subscription
    async subscribeToUpdates(email) {
        await mockDelay(400);
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Please enter a valid email address');
        }

        return {
            success: true,
            message: 'Successfully subscribed to updates',
            email: email
        };
    }
};

// Convenience functions for pages
window.loadBusinessMetrics = async () => {
    try {
        const response = await window.mockAPI.getBusinessMetrics();
        return response.data;
    } catch (error) {
        console.error('Error loading business metrics:', error);
        return window.appData.businessMetrics; // Fallback to static data
    }
};

window.loadDashboardData = async () => {
    try {
        const [metricsResponse, chartResponse] = await Promise.all([
            window.mockAPI.getDashboardMetrics(),
            window.mockAPI.getChartData()
        ]);

        const metrics = metricsResponse.data;
        
        // Format metrics for display
        const formattedMetrics = [
            {
                label: 'BNB Price',
                value: `$${metrics.bnbPrice.toFixed(2)}`,
                change: `${metrics.bnbPriceChange >= 0 ? '+' : ''}${metrics.bnbPriceChange.toFixed(2)}% (24h)`,
                changeClass: metrics.bnbPriceChange >= 0 ? 'text-green-600' : 'text-red-600',
                changeIcon: metrics.bnbPriceChange >= 0 ? 
                    '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' :
                    '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>',
                icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>'
            },
            {
                label: 'Total BNB Holdings',
                value: `${metrics.totalHoldings.toLocaleString()} BNB`,
                change: `$${metrics.totalValue.toLocaleString()} value`,
                changeClass: 'text-gray-600',
                changeIcon: '',
                icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
            },
            // ... more metrics
        ];

        return {
            currentMetrics: formattedMetrics,
            chartData: chartResponse.data,
            weeklySummary: [
                { label: 'Weekly Purchases', value: '650 BNB' },
                { label: 'Weekly BNB Change', value: '+1.63%', valueClass: 'text-green-600' },
                { label: 'Weekly BNC Change', value: '+4.21%', valueClass: 'text-green-600' }
            ],
            valuationMetrics: [
                { label: 'NAV per Share', value: '$0.52' },
                { label: 'MNEV (Basic)', value: '1.08x' },
                { label: 'Enterprise Value', value: '$8.2M' }
            ]
        };
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        // Return fallback data
        return {
            currentMetrics: [],
            chartData: window.appData.chartData,
            weeklySummary: [],
            valuationMetrics: []
        };
    }
};

window.loadInvestorData = async () => {
    try {
        const response = await window.mockAPI.getInvestorData();
        return response.data;
    } catch (error) {
        console.error('Error loading investor data:', error);
        return window.appData.investorData; // Fallback to static data
    }
};

window.submitContactForm = async (formData) => {
    try {
        const response = await window.mockAPI.submitContactForm(formData);
        return response;
    } catch (error) {
        throw error;
    }
};

// Synchronous function to get dashboard data (no loading state)
window.getDashboardData = function() {
    const metrics = window.appData.dashboardMetrics;
    const chartData = window.appData.chartData;
    
    // Format metrics for display
    const formattedMetrics = [
        {
            label: 'BNB Price',
            value: `$${metrics.bnbPrice.toFixed(2)}`,
            change: `${metrics.bnbPriceChange >= 0 ? '+' : ''}${metrics.bnbPriceChange.toFixed(2)}% (24h)`,
            changeClass: metrics.bnbPriceChange >= 0 ? 'text-green-600' : 'text-red-600',
            changeIcon: metrics.bnbPriceChange >= 0 ? 
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' :
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>'
        },
        {
            label: 'Total BNB Holdings',
            value: `${metrics.totalHoldings.toLocaleString()} BNB`,
            change: `$${metrics.totalValue.toLocaleString()} value`,
            changeClass: 'text-gray-600',
            changeIcon: '',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>'
        },
        {
            label: 'Avg. Cost Basis',
            value: `$${metrics.avgCostBasis.toFixed(2)}`,
            change: 'per BNB',
            changeClass: 'text-gray-600',
            changeIcon: '',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>'
        },
        {
            label: 'BNC Stock Price',
            value: `$${metrics.bncStockPrice.toFixed(2)}`,
            change: `${metrics.bncStockChange >= 0 ? '+' : ''}${metrics.bncStockChange.toFixed(2)}% (24h)`,
            changeClass: metrics.bncStockChange >= 0 ? 'text-green-600' : 'text-red-600',
            changeIcon: metrics.bncStockChange >= 0 ? 
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' :
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>'
        },
        {
            label: 'Unrealized P/L',
            value: `${metrics.unrealizedPL >= 0 ? '+' : '-'}$${Math.abs(metrics.unrealizedPL).toLocaleString()}`,
            change: `${metrics.unrealizedPL >= 0 ? '+' : ''}${metrics.unrealizedPLPercent.toFixed(2)}%`,
            changeClass: metrics.unrealizedPL >= 0 ? 'text-green-600' : 'text-red-600',
            changeIcon: metrics.unrealizedPL >= 0 ? 
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>' :
                '<svg class="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>'
        },
        {
            label: 'Holdings Value',
            value: `$${metrics.totalValue.toLocaleString()}`,
            change: 'Market value',
            changeClass: 'text-gray-600',
            changeIcon: '',
            icon: '<svg class="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path></svg>'
        }
    ];

    return {
        currentMetrics: formattedMetrics,
        chartData: chartData,
        weeklySummary: [
            { label: 'Weekly Purchases', value: '650 BNB' },
            { label: 'Weekly BNB Change', value: '+1.63%', valueClass: 'text-green-600' },
            { label: 'Weekly BNC Change', value: '+4.21%', valueClass: 'text-green-600' }
        ],
        valuationMetrics: [
            { label: 'NAV per Share', value: '$0.52' },
            { label: 'MNEV (Basic)', value: '1.08x' },
            { label: 'Enterprise Value', value: '$8.2M' }
        ]
    };
};

// Chart initialization function
window.initializeCharts = function(chartData) {
    // Only destroy charts if they exist and have destroy method
    if (window.holdingsChart && typeof window.holdingsChart.destroy === 'function') {
        window.holdingsChart.destroy();
    }
    if (window.priceComparisonChart && typeof window.priceComparisonChart.destroy === 'function') {
        window.priceComparisonChart.destroy();
    }
    if (window.performanceChart && typeof window.performanceChart.destroy === 'function') {
        window.performanceChart.destroy();
    }

    // Holdings Chart
    const holdingsCanvas = document.getElementById('holdingsChart');
    if (holdingsCanvas) {
        const holdingsCtx = holdingsCanvas.getContext('2d');
        window.holdingsChart = new Chart(holdingsCtx, {
            type: 'line',
            data: {
                labels: chartData.weeklyHoldings.map(d => d.week),
                datasets: [{
                    label: 'BNB Holdings',
                    data: chartData.weeklyHoldings.map(d => d.holdings),
                    borderColor: '#111827',
                    backgroundColor: 'rgba(17, 24, 39, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Price Comparison Chart
    const priceCanvas = document.getElementById('priceComparisonChart');
    if (priceCanvas) {
        const priceCtx = priceCanvas.getContext('2d');
        window.priceComparisonChart = new Chart(priceCtx, {
            type: 'line',
            data: {
                labels: chartData.priceComparison.map(d => d.week),
                datasets: [
                    {
                        label: 'Avg. Cost Basis',
                        data: chartData.priceComparison.map(d => d.avgCost),
                        borderColor: '#111827',
                        borderDash: [5, 5],
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'Market Price',
                        data: chartData.priceComparison.map(d => d.marketPrice),
                        borderColor: '#3b82f6',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: false,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // Performance Chart
    const performanceCanvas = document.getElementById('performanceChart');
    if (performanceCanvas) {
        const performanceCtx = performanceCanvas.getContext('2d');
        window.performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: chartData.stockComparison.map(d => d.week),
                datasets: [
                    {
                        label: 'BNC Stock',
                        data: chartData.stockComparison.map(d => d.bncChange),
                        borderColor: '#111827',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    },
                    {
                        label: 'BNB Price',
                        data: chartData.stockComparison.map(d => d.bnbChange),
                        borderColor: '#f59e0b',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: false
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.parsed.y > 0 ? '+' : ''}${context.parsed.y.toFixed(2)}%`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return value > 0 ? '+' + value + '%' : value + '%';
                            }
                        }
                    }
                }
            }
        });
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Any global initialization code can go here
    console.log('CEA Industries website loaded');
    
    // Initialize mobile menu functionality
    if (typeof window.toggleMobileMenu === 'function') {
        // Mobile menu is already defined in data.js
    }
});