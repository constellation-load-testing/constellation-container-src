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


const LineGraph = (input) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
			title: {
				display: true,
				text: 'Region',
			},
		},
	};
	const labels = input.map(d => d.time);
	const averageLatency = input.map(d => d.averageLatency);
	const errorRate = input.map(d => d.totalErrors);
	console.log(errorRate);
	const year = input[0] ? input[0].year : 'undefined';
	const data = {
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
	return <Line options={options} data={data} />;
}
export default LineGraph;
