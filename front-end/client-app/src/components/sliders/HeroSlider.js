import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay } from 'swiper';
import { displayMoney } from '../../helpers/utils';
import productsData from '../../data/productsData';

import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/pagination';


const HeroSlider = () => {

    const heroProducts = productsData.filter(item => item.tag === 'hero-product');


    return (
        <Swiper
            modules={[Pagination, A11y, Autoplay]}
            loop={true}
            speed={400}
            spaceBetween={100}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
        >
            {
                heroProducts.map((item, i) => {
                    const { id, tagline, heroImage, } = item;
                    

                    return (
                        <SwiperSlide
                            key={id}
                            className={`wrapper hero_wrapper hero_slide-${i}`}
                        >
                            <div className="hero_item_txt">
                               
                                <h1>{tagline}</h1>
                                
                            </div>
                            <figure className="hero_item_img">
                                <img src={heroImage} alt="product-img" />
                            </figure>
                        </SwiperSlide>
                    );
                })
            }
        </Swiper>
    );
};

export default HeroSlider;