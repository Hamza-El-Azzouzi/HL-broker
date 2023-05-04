import Chart from 'chart.js/auto';
import { useEffect, useRef , useState} from 'react';
import '../style/Dashboard.css'
import { Link } from 'react-router-dom';
import { Card } from 'antd';

export default function Dashboard() {
    const chartRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const chartData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug' ,'sep', 'Oct','Nov', 'Dec'],
            datasets: [
                {
                    type: 'line',
                    label: 'Line Dataset',
                    data: [4000, 3000, 2000, 2780, 1890, 2390, 3490,4000, 3000, 2000, 2780,6000],
                    borderColor: 'rgba(255, 99, 132, 1)',
                    fill: false
                },
                {
                    type: 'bar',
                    label: 'Bar Dataset',
                    data: [2400, 1398, 9800, 3908, 4800, 3800, 4300,4000, 3000, 2000, 2780,2000],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }
            ]
        };

        const chartConfig = {
            type: 'bar',
            data: chartData,
            options: {
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true
                            }
                        }
                    ]
                }
            }
        };

        const myChart = new Chart(chartRef.current, chartConfig);

        return () => {
            myChart.destroy();
        };
    }, []);
    return (<div className='Dashboard'>
        <div className='Demande'>

            <h5 className='title'>Dernier Demande Recu</h5>
            <div className='Lien'>
                <Link to='/HomeVendeur/Demande'>Voir tout les Demande {'>>'}</Link>
            </div>
            <Card
        className='Card'
        loading={loading}
      ></Card>
      <Card
        className='Card'
        loading={loading}
      ></Card>

        </div>
        <div className='Chart'>
            <canvas ref={chartRef} />
        </div>

    </div>

    );

}
