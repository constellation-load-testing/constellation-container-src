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


const LineGraph = (data, region) => {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: 'bottom',
			},
			title: {
				display: true,
				text: region,
			},
		},
	};
	const labels = data[region].tests.map(d => d.time);
	const averageLatency = data[region].tests.map(d => d.runtime);
	const year = data[0] ? data[0].year : 'undefined';
	const lineGraphData = {
		labels,
		datasets: [
			{
				label: "Runtime Latency",
				data: averageLatency,
				borderColor: 'rgb(0, 99, 132)',
				backgroundColor: 'rgb(0, 99, 132)'
			}
    ],
	};
	return <Line options={options} data={lineGraphData} />;
}
export default LineGraph;
