import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './HomeVendeur.css'
import ShowArticle from "./comp/ShowArticle";
import AddArticle from './comp/AddArticle';
import { } from 'react-router-dom/cjs/react-router-dom.min';





export default function HomeVendeur() {
    return (
        <BrowserRouter>
            <div className='VendurPage'>
                <div className='VendeurNav'>
                    <div className='box f_flex'>
                    <Link to='/HomeVendeur'> <span>Demande</span></Link>
                    </div>
                    <div className='box f_flex'>
                        <Link to='/HomeVendeur'> <span>Article</span></Link>

                    </div>
                </div>

                <Switch>
                    <Route path='/HomeVendeur' exact index> <ShowArticle /></Route>
                    <Route path='/HomeVendeur/AddArticle'> <AddArticle /></Route>
                </Switch>
            </div>
        </BrowserRouter>
    )
}