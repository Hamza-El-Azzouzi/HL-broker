import { Routes, Route, Link  } from 'react-router-dom';
import '../styles/partials/pages/HomeVendeur.css'

// import ShowArticle from "../components/vendeur/ShowArticle";
// import AddArticle from '../components/vendeur/AddArticle';
// import Dashboard from '../components/vendeur/Dashboard';
// import UpadateArticle from '../components/vendeur/UpdateArticle';
// import ShowDemande from '../components/vendeur/ShowDemande';






export default function HomeVendeur() {
    return (
 
            <div className='VendurPage'>
                <div className='VendeurNav'>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur'> <span>Dashboard</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/Demande'> <span>Demande</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='Article'> <span>Article</span></Link>
                    </div>
                </div>

           

             
            </div>
      
    )
}