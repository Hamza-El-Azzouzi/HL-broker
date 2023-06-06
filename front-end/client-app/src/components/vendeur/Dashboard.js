import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import '../../styles/partials/components/Dashboard.css'
import '../../styles/partials/pages/HomeVendeur.css'
import { Link } from 'react-router-dom';
import ls from "localstorage-slim";
import { Card } from 'antd';
import VendeurNav from './VendeurNav';
import axios from 'axios'
export default function Dashboard() {
    const chartRef = useRef(null);
    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(true);
    // const [dataMonth, setDataMonth] = useState();
    // const [dataRecord, setDataRecord] = useState();
    const token = ls.get("token", { decrypt: true });
    // const user = JSON.parse(ls.get("user", { decrypt: true }));

    // let Months = [];
    // let valuesInitial = [];
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
   
useEffect(() => {
    // getdata()
    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                type: 'bar',
                label: "Nombre d'article",
                data: [0, 5, 0, 0, 8, 10, 0, 1, 23, 0, 0, 0],
                backgroundColor: ' #be4a4a',
                borderColor: ' #be4a4a',


                borderWidth: 1
            }
        ]
    };

    const chartConfig = {
        type: 'bar',
        data: chartData,
        // options: {
        //     scales: {
        //         yAxes: [
        //             {
        //                 ticks: {
        //                     beginAtZero: true
        //                 }
        //             }
        //         ]
        //     }
        // }
    };

    const myChart = new Chart(chartRef.current, chartConfig);

    return () => {
        myChart.destroy();
    };
}, []);
return (


    <main>
        <section className="section">
            <div className='container'>
                <VendeurNav />
                <div className='wrapper Dashboard'>
                    <h3>Nombre d'article</h3>
                    <div className='Chart' >
                        <canvas ref={chartRef} />
                    </div>
                </div>
            </div>
        </section>
    </main>
);

}
