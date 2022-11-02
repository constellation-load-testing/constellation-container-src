import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const LineGraph = (data, region, index) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: region,
			},
		},
	};
	const labels = data[region].map(d => d.time);
	const averageLatency = data[region].map(d => d.averageLatency);
	const errorRate = data[region].map(d => d.totalErrors);
	const year = data[0] ? data[0].year : 'undefined';
	const graphData = {
		labels,
		datasets: [
			{
				label: "Average Latency",
				data: averageLatency,
				borderColor: 'rgb(0, 99, 132)',
				backgroundColor: 'rgb(0, 99, 132)'
			},
			{
				label: "Errors",
				data: errorRate,
				borderColor: 'rgb(255, 99, 132)',
				backgroundColor: 'rgb(255, 99, 132)'
			}
		],
	};
	return <Line options={options} data={graphData} />;
}
export default LineGraph;
