const ctx = document.getElementById('windChart').getContext('2d');

// پلاگین برای رسم پس‌زمینه‌های متناوب روز و شب
const backgroundPlugin = {
    id: 'customBackground',
    beforeDraw(chart) {
        const { ctx, chartArea, scales } = chart;
        const { x, y } = scales;
        const dayColor = 'rgba(255, 255, 255, 1)'; // رنگ سفید برای روز
        const nightColor = 'rgba(200, 200, 200, 0.5)'; // رنگ خاکستری برای شب

        const timeLabels = chart.data.labels.map(label => parseInt(label.split(' ')[0])); // فقط ساعت را استخراج می‌کنیم
        const xPositions = timeLabels.map((_, index) => x.getPixelForValue(index));

        ctx.save();
        for (let i = 0; i < timeLabels.length - 1; i++) {
            const hour = timeLabels[i];
            const isDay = hour >= 6 && hour < 18;
            ctx.fillStyle = isDay ? dayColor : nightColor;
            ctx.fillRect(
                xPositions[i],
                chartArea.top,
                xPositions[i + 1] - xPositions[i],
                chartArea.bottom - chartArea.top
            );
        }
        ctx.restore();
    }
};

const chartAreaBorder = {
    id: 'chartAreaBorder',
    beforeDraw(chart, args, options) {
      const {ctx, chartArea: {left, top, width, height}} = chart;
      ctx.save();
      ctx.strokeStyle = options.borderColor;
      ctx.lineWidth = options.borderWidth;
      ctx.setLineDash(options.borderDash || []);
      ctx.lineDashOffset = options.borderDashOffset;
      ctx.strokeRect(left, top, width, height);
      ctx.restore();
    }
  };

const arrowImage = new Image();
arrowImage.src = '/static/arrow/arrow.png';

const removeImage = new Image();
removeImage.src = '/static/arrow/arrow.png';


const directionToAngle = {
    'N': 0,
    'NNE': 22.5,
    'NE': 45,
    'ENE': 67.5,
    'E': 90,
    'ESE': 112.5,
    'SE': 135,
    'SSE': 157.5,
    'S': 180,
    'SSW': 202.5,
    'SW': 225,
    'WSW': 247.5,
    'W': 270,
    'WNW': 292.5,
    'NW': 315,
    'NNW': 337.5
};

const winddirAngles = windDataDire.map(windir => directionToAngle[windir] || 0);


const arrowPlugin = {
    id: 'windDirectionArrows',
    afterDraw(chart) {
        const { ctx, scales } = chart;
        const xScale = scales.x;
        const x2Scale = scales.x2;
        const yPosition = chart.chartArea.bottom + 35;

        if (!arrowImage.complete) {
            return;
        }

        ctx.save();
        windDataDire.forEach((wavedir, index) => { // استفاده از windir به‌جای wavedir
            const label = chart.data.labels[index];
            const hour = label.split(' ')[0];
            // فقط برای ساعت‌های مشخص فلش رسم می‌کنیم
            if (['00', '03', '06', '09', '12', '15', '18', '21'].includes(hour)) {
                const x = xScale.getPixelForValue(index);

                // انتخاب تصویر مناسب
                let imageToDraw;
                let angle = winddirAngles[index];
                if (wavedir === '-') {
                    imageToDraw = arrowImage; // اگر داده "-" باشد، تصویر remove.png
                    angle = 0; // بدون چرخش (چون احتمالاً نیازی به چرخش تصویر remove.png نیست)
                } else {
                    imageToDraw = arrowImage; // در غیر این صورت، تصویر فلش اصلی
                }

                ctx.translate(x, yPosition);
                ctx.rotate((angle * Math.PI) / 180);

                const imageWidth = 20;
                const imageHeight = 20;
                ctx.drawImage(
                    imageToDraw,
                    -imageWidth / 2,
                    -imageHeight / 2,
                    imageWidth,
                    imageHeight
                );

                ctx.rotate(-(angle * Math.PI) / 180);
                ctx.translate(-x, -yPosition);
            }
        });
        ctx.restore();
    }
};

new Chart(ctx, {
    type: 'line',
    data: {
        labels: time, // لیبل‌های محور X با تاریخ
        datasets: [
            {
                label: 'WS 10 m',
                data: ws10, // داده‌های سرعت باد در ارتفاع 10 متر
                borderColor: 'blue',
                backgroundColor: 'transparent',
                pointStyle: 'circle',
                pointRadius: [2,0,0,2,0,0],
                pointBackgroundColor: 'blue',
                fill: false,
                borderWidth: 2,
                tension: 0.5
            },
            {
                label: 'WG 10 m',
                data: wg10,
                backgroundColor: 'transparent',
                pointStyle: 'triangle',
                pointRadius: [2,0,0,2,0,0],
                pointBackgroundColor: 'red',
                borderColor: 'red',
                fill: false,
                borderWidth: 2,
                tension: 0.5
            },
            {
                label: 'WS 50 m',
                data:  ws50, // داده‌های سرعت باد در ارتفاع 50 متر
                borderColor: 'rgb(42, 119, 68)',
                pointBackgroundColor: 'rgb(42, 119, 68)',
                backgroundColor: 'transparent',
                pointStyle: 'line',
                pointRadius: 0,
                borderWidth: 3,
                fill: false,
                tension: 0.5
            },
            {
                label: 'WG 50 m',
                data: wg50, // داده‌های گاست باد در ارتفاع 50 متر
                borderColor: 'black',
                backgroundColor: 'transparent',
                pointStyle: 'rect',
                pointRadius: [2,0,0,2,0,0],
                pointBackgroundColor: 'black',
                fill: false,
                borderWidth: 2,
                tension: 0.5
            }
        ]
    },
    options: {
        responsive: true, // چارت ریسپانسیو باشد
        // maintainAspectRatio: false,
        plugins: {
            chartAreaBorder: {
                borderColor: 'black',
                borderWidth: 1,
                // borderDash: [5, 5],
                borderDashOffset: 2,
            },
            tooltip: {
                displayColors: false,
                bodyFont: 	{weight: 'bold'},
                // backgroundColor: 'white', // پس‌زمینه سفید
                // titleColor: 'black', // رنگ عنوان (در صورت وجود)
                // bodyColor: 'black', // رنگ بدنه (متن)
                // borderColor: 'gray', // رنگ حاشیه
                // borderWidth: 1, // ضخامت حاشیه
                callbacks: {
                    title: function(context) {
                        // مقدار بزرگ در بالا (time بدون برچسب)
                        const timeValue = time[context[0].dataIndex];
                        return `Time: ${timeValue}`;
                    },
                },
            },
            title: {
                display: true,
                text: 'Bushehr (Lat: 28.9600 Lon: 50.7380) Start Time 0030Z16-Jan-2023 (IRDT)',
                color: 'balck',
                font: {
                    size: 14
                }
            },
            legend: {
                display: true,
                position: 'top',
                align: 'center',
                fullSize: true,
                labels: {
                    padding: 30, // کاهش padding برای چیدمان بهتر
                    usePointStyle: true, // استفاده از شکل‌های نقطه‌ای
                    boxWidth: 6, // اندازه باکس شکل‌ها (کوچک‌تر)
                    boxHeight: 6, // ارتفاع باکس (برای کنترل بهتر شکل)
                    font: {
                        size: 12, // اندازه فونت متن لجند (ثابت نگه داشته شده)
                        weight: 'bold',
                        family: 'Sans-serif'
                    },
                    color: 'rgb(0, 0, 0)' // رنگ متن
                }
            },
        },
        scales: {
            y: {
                offset : true,
                beginAtZero: true,
                border: {
                    display: false,
                    dash: [3,6],
                    dashOffset: 6,
                },
                // max: 40, // حداکثر مقدار محور Y
                title: {
                    display: true,
                    color: 'balck',
                    text: 'Wind Speed (kt)'
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.28)',
                    drawBorder: true
                },
                ticks: {
                    // stepSize: 5
                    autoSkip: true,
                    maxTicksLimit: 7,
                    color: 'black',
                    maxRotation: 0,
                    minRotation: 0,
                }
            },
            

            x: {
                // offset : true,
                border: {
                    display: false,
                    dash: [3,6],
                    dashOffset: 6,
                },
                grid: {
                    color: (context) => {
                        // خطوط عمودی پررنگ‌تر برای شروع هر روز
                        const label = context.tick.label;
                        return label.includes('00') ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.28)';
                        // return label.includes('Mon') || label.includes('Tue') || label.includes('Wed') || label.includes('Thu') || label.includes('Fri') ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.1)';
                    },
                    lineWidth: (context) => {
                        const label = context.tick.label;
                        return label.includes('Mon') || label.includes('Tue') || label.includes('Wed') || label.includes('Thu') || label.includes('Fri') ? 2 : 1;
                    }
                },
                title: {
                    display: false
                },
                ticks: {
                    autoSkip: true,
                    // maxTicksLimit: 7,
                    color: 'black',
                    maxRotation: 0,
                    minRotation: 0,
                  
                }
            },
            x2: {
                labels: time,
                position: 'bottom',
                ticks: {
                    display: false, // لیبل‌ها نمایش داده نمی‌شوند
                },
                grid: {
                    display: false, // خطوط گرید غیرفعال می‌شوند
                    drawBorder: false, // خط محور (axis line) غیرفعال می‌شود
                    drawTicks: false // تیک‌ها غیرفعال می‌شوند
                },
                border: {
                    display: false // خط مرزی محور X2 غیرفعال می‌شود
                }
            },
            x3 :{	
                labels: date,
                // ticks: {
                //     color: '#505557',	
                //     font:{
                //         weight : 'bold',
                //     }
                // },
                grid: {
                    borderDashOffset: 2,
                    tickMarkLength: 2 ,
                    color: 'gray',
                    display: true,
                    
                },
                ticks: {
                    padding:20,
                    autoSkip: true,
                    maxTicksLimit: 7,
                    maxRotation: 0,
                    minRotation: 0,
                    color: 'black',
                    font: {
                        weight : 'bold',
                    }
                    
                },
        
            },
        },
        // layout: {
        //     padding: {
        //         bottom: 60 // فضای اضافی برای فلش‌ها
        //     }
        // }
    },
    plugins: [backgroundPlugin, chartAreaBorder, arrowPlugin]
});