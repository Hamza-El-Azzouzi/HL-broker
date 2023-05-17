import React, { useState ,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
import productsData from '../../data/productsData';
import ProductCard from './ProductCard';


const TopProducts = () => {

    const [products, setProducts] = useState(productsData);
    const { activeClass, handleActive } = useActive(0);

    // making a unique set of product's category
    const productsCategory = [
        'All',
        ...new Set(productsData.map(item => item.category))
    ];

    // handling product's filtering
    const handleProducts = (category, i) => {
        if (category === 'All') {
            setProducts(productsData);
            handleActive(i);
            return;
        }

        const filteredProducts = productsData.filter(item => item.category === category);
        setProducts(filteredProducts);
        handleActive(i);
    };

    const [allProducts, setAllProducts] = useState();


    

    // const { allProducts } = useContext(filtersContext);


    useEffect(() => {
        axios.get('http://localhost:8000/api/getArticleForHome').then(response => {
            setAllProducts(response.data.data)
                console.log(allProducts)
        }
        ).catch(error => console.log(error))
    }, [])



    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    {
                        productsCategory.map((item, i) => (
                            <li
                                key={i}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item, i)}
                            >
                                {item}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                   allProducts !== undefined ? (allProducts.map(item => (
                        <ProductCard
                            key={item.id}
                            {...item}
                        />
                    ))):(null)
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products">
                        Browse All <br /> Products <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;