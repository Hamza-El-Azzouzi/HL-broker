import React, { useEffect } from 'react';
import axios from 'axios';
import ls from 'localstorage-slim';
import { useNavigate } from 'react-router-dom';
import HeroSlider from '../components/sliders/HeroSlider';
import FeaturedSlider from '../components/sliders/FeaturedSlider';
import SectionsHead from '../components/common/SectionsHead';
import TopProducts from '../components/product/TopProducts';
import Services from '../components/common/Services';


const Home = () => {
    const user = JSON.parse(ls.get('user',{decrypt:true}));
    const token = ls.get('token',{decrypt:true});
    const isLoggedIn = !!token && !!user;

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const history = useNavigate();

    useEffect(() => {
        if(isLoggedIn){
                axios.put(`http://localhost:8000/api/EmailVerify/${user.id}`).then(
                response => {
                    console.log(response)
                    history('/')
                }
            ).catch(error=>{
                console.log(error)
            })
            
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <main>
            <section id="hero">
                <HeroSlider />
            </section>

            <section id="featured" className="section">
                <div className="container">
                    <SectionsHead heading="Featured Products" />
                    <FeaturedSlider />
                </div>
            </section>

            <section id="products" className="section">
                <div className="container">
                    <SectionsHead heading="Top Products" />
                    <TopProducts />
                </div>
            </section>

            <Services />
        </main>
    );
};

export default Home;;