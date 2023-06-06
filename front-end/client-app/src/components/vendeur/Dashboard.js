import Chart from 'chart.js/auto';
import { useEffect, useRef, useState } from 'react';
import '../../styles/partials/components/Dashboard.css'
import '../../styles/partials/pages/HomeVendeur.css'
import { Link } from 'react-router-dom';
import ls from "localstorage-slim";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { FaNewspaper } from "react-icons/fa";
import VendeurNav from './VendeurNav';
import axios from 'axios';

export default function Dashboard() {
    const chartDoughnut = useRef(null);
    const [dataArticle, setDataArticle] = useState();
    const [dataDemande, setDataDemande] = useState();
    const [dataVendre, setDataVendre] = useState();
    const [dataLouer, setDataLouer] = useState();
    const token = ls.get('token', { decrypt: true });
    const user = JSON.parse(ls.get('user', { decrypt: true }));
  
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
    const getCount = async () => {
      const response = await axios.get(`http://localhost:8000/api/dashboard/${user.id}`);
      setDataLouer(response.data.Louer);
      setDataVendre(response.data.Vendre);
    };

    const getCountArticle = async () => {
     await axios.get(`http://localhost:8000/api/countArticle/${user.id}`).then(
      response=>{
        setDataArticle(response.data);
      }
     ).catch(error=>{console.log(error)})
    };
    const getCountDemande = async () => {
      await axios.get(`http://localhost:8000/api/demandesDashboard/${user.id}`).then(
       response=>{
        setDataDemande(response.data);
       }
      ).catch(error=>{console.log(error)})
     };
  
    useEffect(() => {

  
      getCountDemande()
    getCount();
    getCountArticle();
        const chart = chartDoughnut.current.getContext('2d');
  
        // Sample data
        const data = {
          labels: ['Vendre', 'Louer'],
          datasets: [
            {
              data: [dataVendre, dataLouer],
              backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        };
  
        // Chart configuration
        const options = {
          responsive: true,
          maintainAspectRatio: false,
        };
       
  
     

  
    const  myChart = new Chart(chart, {
      type: 'doughnut',
      data: data,
      options: options,
    });
      return () => {
        if (chartDoughnut !== null) {
            myChart.destroy();
        }
      };
    }, []);
  
    return (
      <main>
        <section className="section">
          <div className="container">
            <VendeurNav />
            <div className="wrapper Dashboard">
             
              <div className="Chart" >
              <h3>Nombre d'Annonce</h3>
                <canvas ref={chartDoughnut}></canvas>
              </div>
              <div className='info annonce'>
               <span className='icon'><HiOutlineSpeakerphone/></span> Nombre des Annoces : {dataArticle}
                <br/>
                <Link to='/HomeVendeur/Article'> Voir Les Annonce &gt;&gt;</Link>
              </div>
              <div className='info demande'>
              <span className='icon'><FaNewspaper/></span> Nombre des Demndes : {dataDemande}
                <br/> 
                <Link to='/HomeVendeur/Demande'> Voir Les Demande &gt;&gt; </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  
  
  
  

























// export default function Dashboard() {
//     const chartdoughnut = useRef(null);
//     // eslint-disable-next-line no-unused-vars
//     const [loading, setLoading] = useState(true);
//     const [dataVendre, setDataVendre] = useState();
//     const [dataLouer, setDataLouer] = useState();
//     const token = ls.get("token", { decrypt: true });
//     const user = JSON.parse(ls.get("user", { decrypt: true }));

//     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//  const  getCount =async ()=>{
//    await axios.get(`http://localhost:8000/api/dashboard/${user.id}`).then(
//         response=>{
//             setDataLouer(response.data.Louer)
//             setDataVendre(response.data.Vendre)
//         })

//  }
// useEffect(() => {
//     getCount()
//     console.log(dataVendre)
//     console.log(dataLouer)
//     const chart = chartdoughnut.current.getContext('2d');
 
//     // Sample data
//     const data = {
//       labels: ['Vendre', 'Louer'],
//       datasets: [
//         {
//           data: [dataVendre ,dataLouer],
          
//           backgroundColor: [
//             'rgba(255, 99, 132, 0.6)',
//             'rgba(54, 162, 235, 0.6)'
//           ],
//           borderColor: [
//             'rgba(255,99,132,1)',
//             'rgba(54, 162, 235, 1)'
//           ],
//           borderWidth: 1,
//         },
//       ],
//     };

//     // Chart configuration
//     const options = {
//       responsive: true,
//       maintainAspectRatio: false,
//     };

//    const myChart = new Chart(chart, {
//       type: 'doughnut',
//       data: data,
//       options: options,
//     });
//     return () => {
//         myChart.destroy();
//     };
// }, []);
// return (


//     <main>
//         <section className="section">
//             <div className='container'>
//                 <VendeurNav />
//                 <div className='wrapper Dashboard'>
//                     <h3>Nombre d'article</h3>
//                     <div className='Chart' >
//                         <canvas ref={chartdoughnut}></canvas>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     </main>
// );

// }
