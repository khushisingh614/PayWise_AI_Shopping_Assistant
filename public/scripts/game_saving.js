document.addEventListener("DOMContentLoaded", function () {
    const showChartButton = document.getElementById('showChartButton');
    const chartContainer = document.getElementById('chartContainer');
    let chartInitialized = false;

    showChartButton.addEventListener('click', function () {
        chartContainer.style.display = 'block';

        if (!chartInitialized) {
            const ctx = document.getElementById('savingsChart').getContext('2d');
            const savingsChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: [
                        'Laptop', 
                        'Phone', 
                        'Blue dress', 
                        'Grinder', 
                        'Watch', 
                        'Face Mask', 
                        'Bottle', 
                        'Suitcase', 
                        'Shoes', 
                        'Weighing Machine', 
                        'Television', 
                        'Air Conditioner'
                    ],
                    datasets: [{
                        label: 'Savings on Products',
                        data: [
                            2000, 
                            3000, 
                            500, 
                            600, 
                            50, 
                            20, 
                            5, 
                            200, 
                            299, 
                            20, 
                            100, 
                            3301
                        ],
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.label || '';
                                    if (label) {
                                        label += ': ';
                                    }
                                    label += context.raw;
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            chartInitialized = true;
        }
    });
});
