const ctx = document.getElementById('windChart').getContext('2d');

new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['00', '03', '06', '09', '12', '15', '18', '21', '00', '03', '06', '09', '12', '15', '18', '21', '00'], // ساعت‌ها
        datasets: [
            {
                label: 'WS 10 m',
                data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90], // داده‌های سرعت باد در ارتفاع 10 متر
                borderColor: 'blue',
                backgroundColor: 'transparent',
                pointStyle: 'circle',
                pointRadius: 4,
                pointBackgroundColor: 'blue'
            },
            {
                label: 'WG 10 m',
                data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90], // داده‌های گاست باد در ارتفاع 10 متر
                borderColor: 'red',
                backgroundColor: 'transparent',
                pointStyle: 'triangle',
                pointRadius: 4,
                pointBackgroundColor: 'red'
            },
            {
                label: 'WS 50 m',
                data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90], // داده‌های سرعت باد در ارتفاع 50 متر
                borderColor: 'black',
                backgroundColor: 'transparent',
                borderWidth: 1
            },
            {
                label: 'WG 50 m',
                data: [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90], // داده‌های گاست باد در ارتفاع 50 متر
                borderColor: 'black',
                backgroundColor: 'transparent',
                pointStyle: 'square',
                pointRadius: 4,
                pointBackgroundColor: 'black'
            }
        ]
    },
    options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Bushehr (Lat: 28.9600 Lon: 50.7380) Start Time 0030Z16-Jan-2023 (IRDT)'
            },
            legend: {
                position: 'top'
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Wind Speed (kt)'
                },
                grid: {
                    color: 'rgba(0,0,0,0.1)',
                    drawBorder: true
                },
                ticks: {
                    stepSize: 5
                }
            },
            x: {
                grid: {
                    color: 'rgba(0,0,0,0.1)'
                },
                title: {
                    display: true,
                    text: 'Time'
                }
            }
        },
        // برای نمایش پس‌زمینه زرد و خاکستری متناوب
        plugins: [{
            beforeDraw: (chart) => {
                const ctx = chart.ctx;
                const xAxis = chart.scales.x;
                const yAxis = chart.scales.y;
                const count = xAxis.ticks.length;
                
                // رسم پس‌زمینه متناوب
                for(let i = 0; i < count; i += 2) {
                    if(i % 4 === 0) {
                        ctx.fillStyle = 'rgba(255, 255, 200, 0.3)'; // زرد کمرنگ
                    } else {
                        ctx.fillStyle = 'rgba(200, 200, 200, 0.3)'; // خاکستری کمرنگ
                    }
                    
                    ctx.fillRect(
                        xAxis.getPixelForTick(i),
                        yAxis.top,
                        xAxis.getPixelForTick(i + 1) - xAxis.getPixelForTick(i),
                        yAxis.bottom - yAxis.top
                    );
                }
            }
        }]
    }
});