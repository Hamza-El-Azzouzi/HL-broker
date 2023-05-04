import { BrowserRouter, Switch, Route, Link ,Redirect } from 'react-router-dom';
import './HomeVendeur.css'
import ShowArticle from "./comp/ShowArticle";
import AddArticle from './comp/AddArticle';

import Dashboard from './comp/Dashboard';
import UpadateArticle from './comp/UpdateArticle';
import ShowDemande from './comp/ShowDemande';






export default function HomeVendeur() {
    return (
        <BrowserRouter>
            <div className='VendurPage'>
                <div className='VendeurNav'>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur'> <span>Dashboard</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur/Demande'> <span>Demande</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur/Article'> <span>Article</span></Link>
                    </div>
                </div>

                <Switch>
                   
                    <Route path='/HomeVendeur' exact index  component={Dashboard} /> 
                    <Route path='/HomeVendeur/Article' component={ShowArticle} /> 
                    <Route path='/HomeVendeur/AddArticle' component={AddArticle} /> 
                    <Route path='/HomeVendeur/UpadateArticle' component={UpadateArticle} />
                    <Route path='/HomeVendeur/Demande' component={ShowDemande}/ > 
                    <Route path="/NotFound" />
                    <Redirect to="/NotFound" />
                </Switch>
            </div>
        </BrowserRouter>
    )
}