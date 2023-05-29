import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';
import ProfileUser from '../pages/ProfileUser';
import HomeVendeur from '../pages/HomeVendeur';
import ShowArticle from "../components/vendeur/ShowArticle";
import AddArticle from '../components/vendeur/AddArticle';
import Dashboard from '../components/vendeur/Dashboard';
import UpadateArticle from '../components/vendeur/UpdateArticle';
import ShowDemande from '../components/vendeur/ShowDemande';
// import ErrorPage from './ErrorPage';
import '../styles/partials/pages/HomeVendeur.css'
import AuthorizedPage from '../pages/authorized';
import Demande from '../components/acheteur/Demande';
const RouterRoutes = () => {

    useScrollRestore();
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));

    const isLoggedIn = !!token && !!user;
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                {isLoggedIn ? (
                    user.account_type === 'vendeur' ? (
                        <>
                            <Route path='/HomeVendeur' element={<Dashboard />} />
                            <Route path='/HomeVendeur/Article' element={<ShowArticle />} />
                            <Route path='/HomeVendeur/Demande' element={<ShowDemande />} />
                            <Route path='/HomeVendeur/AddArticle' element={<AddArticle />} />
                            <Route path='/HomeVendeur/UpadateArticle/:id' element={<UpadateArticle />} />
                            <Route path='/Profile' element={<ProfileUser/>} />                       
                        </>

                    ) : (
                        <>
                            <Route path="/cart" element={<Cart />} />
                            <Route path='/Demande' element={<Demande/>} />
                            <Route path='/Profile' element={<ProfileUser/>} />
                            
                        </>
                    )

                ) : (<Route path="*" element={<AuthorizedPage />} />)}











                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;