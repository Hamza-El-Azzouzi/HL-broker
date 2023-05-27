import React , {useEffect ,useState}from 'react';
import { Routes, Route } from 'react-router';
import axios from 'axios';
import useScrollRestore from '../hooks/useScrollRestore';

import AllProducts from '../pages/AllProducts';
import Cart from '../pages/Cart';
import Home from '../pages/Home';
import ProductDetails from '../pages/ProductDetails';
import ErrorPage from '../pages/ErrorPage';

// import HomeVendeur from '../pages/HomeVendeur';
import ShowArticle from "../components/vendeur/ShowArticle";
import AddArticle from '../components/vendeur/AddArticle';
import Dashboard from '../components/vendeur/Dashboard';
import UpadateArticle from '../components/vendeur/UpdateArticle';
import ShowDemande from '../components/vendeur/ShowDemande';
// import ErrorPage from './ErrorPage';
import '../styles/partials/pages/HomeVendeur.css'
import AuthorizedPage from '../pages/authorized';
import Demande from '../components/acheteur/Demande';
import VerificationCodeInput from '../components/form/verificationCode';
import EmailVerify from '../components/form/EmailVerify';
const RouterRoutes = () => {
    // const history =useNavigate()
    useScrollRestore();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const [userData, setUserData] = useState();
    const isLoggedIn = !!token && !!user;
    useEffect(() => {
        if (isLoggedIn) {
            axios.get('http://localhost:8000/api/userProfile').then(response => {
                setUserData(response.data)
                console.log(userData)
            }
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    // const isVerified = !!verifier;
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-products" element={<AllProducts />} />
                <Route path="/product-details/:productId" element={<ProductDetails />} />
                <Route path='/EmailVerify' element={<EmailVerify />} />
                
                {isLoggedIn ? (
                    userData !== undefined ?(
                        userData.account_type === 'vendeur' ? (
                            <>
                                <Route path='/HomeVendeur' element={<Dashboard />} />
                                <Route path='/HomeVendeur/Article' element={<ShowArticle />} />
                                <Route path='/HomeVendeur/Demande' element={<ShowDemande />} />
                                <Route path='/HomeVendeur/AddArticle' element={<AddArticle />} />
                                <Route path='/HomeVendeur/UpadateArticle/:id' element={<UpadateArticle />} />
                                <Route path='/verificationCode' element={<VerificationCodeInput />} />
                            </>
                        ) : (
                            <>
                                <Route path="/cart" element={<Cart />} />
                                <Route path='/Demande' element={<Demande />} />
                                <Route path='/verificationCode' element={<VerificationCodeInput />} />
                            </>
                        )
                    )
                    
                    :(null)
                          
                    ) : (
                        <Route path="*" element={<AuthorizedPage />} />
                    )
                }
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    );
};

export default RouterRoutes;