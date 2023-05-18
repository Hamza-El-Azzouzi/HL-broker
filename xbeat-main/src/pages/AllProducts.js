import React, { useEffect, useState } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';
import FilterBar from '../components/filters/FilterBar';
import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
// import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';
import axios from 'axios';


const AllProducts = () => {
    
    useDocTitle('All Products');
    const [allProducts, setAllProducts] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/article').then(response => {
            setAllProducts(response.data.data)
            console.log(allProducts)
        }
        ).catch(error => console.log(error))
    }, [])

    return (
        <>
            <section id="all_products" className="section">
                <FilterBar />
                <div className="container">
                    {
                        allProducts !== undefined ? (
                            <div className="wrapper products_wrapper">
                                {
                                    allProducts.map(item => (
                                        <ProductCard
                                            key={item.id}
                                            {...item}
                                        />
                                    ))
                                }
                            </div>
                        ) : (
                            <EmptyView
                                icon={<BsExclamationCircle />}
                                msg="No Results Found"
                            />
                        )
                    }
                </div>
            </section>
            <Services />
        </>
    );
};

export default AllProducts;