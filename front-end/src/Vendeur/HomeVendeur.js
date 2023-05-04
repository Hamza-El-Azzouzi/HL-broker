import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './HomeVendeur.css'
import ShowArticle from "./comp/ShowArticle";
import AddArticle from './comp/AddArticle';
import { } from 'react-router-dom/cjs/react-router-dom.min';
import Dashboard from './comp/Dashboard';
import UpadateArticle from './comp/UpdateArticle';
import ShowDemande from './comp/ShowDemande';





export default function HomeVendeur() {
    return (
        <BrowserRouter>
            <div className='VendurPage'>
                <div className='VendeurNav'>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur/Dashboard'> <span>Dashboard</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur/Demande'> <span>Demande</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur/Article'> <span>Article</span></Link>
                    </div>
                </div>

                <Switch>
                   
                    <Route path='/HomeVendeur/Dashboard' exact index> <Dashboard/></Route>
                    <Route path='/HomeVendeur/Article'> <ShowArticle /></Route>
                    <Route path='/HomeVendeur/AddArticle'> <AddArticle /></Route>
                    <Route path='/HomeVendeur/UpadateArticle'><UpadateArticle/> </Route>
                    <Route path='/HomeVendeur/Demande'> <ShowDemande/> </Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}