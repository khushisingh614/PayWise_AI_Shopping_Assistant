document.addEventListener("DOMContentLoaded", function () {
    const showChartButton = document.getElementById('showChartButton');
    const chartContainer = document.getElementById('chartContainer');
    let chartInitialized = false;

    showChartButton.addEventListener('click', function () {
        console.log('Button clicked'); // Debugging line
        chartContainer.style.display = 'block';
        if (!chartInitialized) {
            console.log('Initializing chart'); // Debugging line
            const ctx = document.getElementById('savingsChart').getContext('2d');
            const savingsChart = new Chart(ctx, {
                type: 'pie',
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
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(199, 199, 199, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)'
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(199, 199, 199, 1)',
                            'rgba(255, 205, 86, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 99, 132, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
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
