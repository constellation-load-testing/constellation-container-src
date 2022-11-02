import logo from './logo.svg';
import './App.css';
import LineGraph from './components/Line';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
	const [data, setData] = useState()

	useEffect(() => {
		(async () => {
			const result = await axios.get('http://localhost:3002/');
			setData(result.data);
			console.log(result.data);
		})();
		setInterval(async () => {
			axios.get('http://localhost:3002/')
				.then(res => {
					setData(res.data);
				})
				.catch(err => {
					console.log(err);
				})
		}, 4444);
	}, []);
	return (
		<div className="App">
			<div>
				{!data ? null : data.regions.map((region, index) => {
					return LineGraph(data, region, index);
				})}
				{console.log(data)}
			</div>
		</div>
	);
}

export default App;
