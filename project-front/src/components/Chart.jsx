import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';

Chart.register(...registerables);

function RatingDiscountChart({ data }) {
 const chartRef = useRef(null);
 const chartInstance = useRef(null);

 useEffect(() => {
   if (chartInstance.current) {
     chartInstance.current.destroy();
   }

   const myChartRef = chartRef.current.getContext('2d');

   chartInstance.current = new Chart(myChartRef, {
     type: 'line',
     data: {
       labels: data.map(item => item.rating),
       datasets: [{
         label: 'Скидка',
         data: data.map(item => item.discount),
         borderColor: 'rgba(75, 192, 192, 1)',
         tension: 0.1
       }]
     },
     options: {
       scales: {
         x: {
           title: {
             display: true,
             text: 'Рейтинг'
           }
         },
         y: {
           title: {
             display: true,
             text: 'Скидка (%)'
           }
         }
       }
     }
   });


const handleResize = () => {
      chartInstance.resize();
    };

    window.addEventListener("resize", handleResize);
    return () => {
     if (chartInstance.current) {
       chartInstance.current.destroy();
     }
   }
 }, [data]);
 return <canvas ref={chartRef} style={{ width: "100%", height: "350px" }}  />;
}

export default RatingDiscountChart;
