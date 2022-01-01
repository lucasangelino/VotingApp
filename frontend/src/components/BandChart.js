import * as React from 'react'
import { Chart, registerables } from 'chart.js';
import { SocketContext } from '../context/socketContext';
Chart.register(...registerables);
Chart.register('linear')

let chart;

export const BandChart = () => {

    const { socket } = React.useContext(SocketContext);

    React.useEffect( () => {
        socket.on("bandList", (bands) => {
            createChart(bands)
          });
    }, [])

    const createChart = (bands = []) => {
        const ctx = document.getElementById('myChart');
        if (chart) {
            console.log('chart exists')
            chart.destroy();
        }
        chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: bands.map(band => band.name),
                datasets: [{
                    label: '# of Votes',
                    data: bands.map(band => band.votes),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                animation: false,
                scales: {
                    zAxis: {
                        stacked: true
                    }
                }
            }
        });
        return chart;
    }
    return <canvas id="myChart"></canvas>
}