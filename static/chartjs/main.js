fetch('/reports/wind-data/')
    .then(response => response.json())
    .then(data => {
        const ctx = document.getElementById('windChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.chart.labels,
                datasets: data.chart.datasets
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time (Hour)'
                        },
                        grid: {
                            color: function(context) {
                                // خطوط عمودی گرید
                                const time = context.tick.value;
                                return time % 3 === 0 ? 'rgba(0, 0, 0, 0.1)' : 'rgba(0, 0, 0, 0.05)';
                            },
                            borderColor: 'black'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Wind Speed (km/h)'
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.1)', // خطوط افقی سبک
                            borderColor: 'black'
                        },
                        min: 0,
                        max: 35,
                        ticks: {
                            stepSize: 5 // فاصله گریدها مثل تصویر
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Bushehr (Lat: 28.9600 Lon: 50.7380) Start Time 0030216-Jan-2023 (IRDT)'
                    },
                    background: {
                        color: function(context) {
                            const time = context.chart.data.labels[context.element.$context.index];
                            // فرض می‌کنیم زمان‌ها به‌صورت ساعت (00, 03, 06, ...) هست
                            const hour = parseInt(time);
                            // نواحی زرد برای روز (09:00 تا 15:00)
                            if (hour >= 9 && hour <= 15) {
                                return 'rgba(255, 255, 0, 0.2)'; // زرد کم‌رنگ برای روز
                            }
                            return 'rgba(255, 255, 255, 0.8)'; // سفید برای شب
                        }
                    }
                }
            }
        });
    });