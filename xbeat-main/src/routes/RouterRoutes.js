import React from 'react';
import { Routes, Route } from 'react-router';
import useScrollRestore from '../hooks/useScrollRestore';
import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';

import HomeVendeur from '../pages/HomeVendeur';
import ShowArticle from "../components/vendeur/ShowArticle";
import AddArticle from '../components/vendeur/AddArticle';
import Dashboard from '../components/vendeur/Dashboard';
import UpadateArticle from '../components/vendeur/UpdateArticle';
import ShowDemande from '../components/vendeur/ShowDemande';
import ProfileAcheteur from '../components/profile/profileAcheteur'
// import ErrorPage from './ErrorPage';
import '../styles/partials/pages/HomeVendeur.css'
const RouterRoutes = () => {

    useScrollRestore();

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path="*" element={<ErrorPage />} />
        
                <Route path='/HomeVendeur' element={<Dashboard />} />
                <Route path='/HomeVendeur/Article' element={<ShowArticle/>} />
                <Route path='/HomeVendeur/AddArticle' element={<AddArticle/>} />
                <Route path='/HomeVendeur/UpadateArticle/:id' element={<UpadateArticle/>} />
                <Route path='/HomeVendeur/Demande' element={<ShowDemande/>} />
                <Route path='/ProfileAcheteur' element={<ProfileAcheteur/>} />
            </Routes>
        </>
    );
};

export default RouterRoutes;