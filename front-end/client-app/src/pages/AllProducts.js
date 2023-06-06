import React, { useEffect, useState, useRef } from 'react';
import { BsExclamationCircle } from 'react-icons/bs';
import useDocTitle from '../hooks/useDocTitle';

import ProductCard from '../components/product/ProductCard';
import Services from '../components/common/Services';
// import filtersContext from '../contexts/filters/filtersContext';
import EmptyView from '../components/common/EmptyView';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Space, Spin } from 'antd';
const AllProducts = () => {

    useDocTitle('All Products');
    const { categorie } = useParams()
    const [allProducts, setAllProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [type, setType] = useState('Vendre')
    const [Categorie, setCategorie] = useState('All')
    const [minPrice, setMinPrice] = useState(0)
    const [maxPrice, setMaxPrice] = useState(1000000000)

    // const { minPrice, maxPrice } = useRef()

    const [DataCategorie, setDataCategorie] = useState()
    const getCategorie = async () => {
        await axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data)
            }
            ).catch(error => { console.log(error) })
    }

    const getProduct = async () => {
        if (categorie === 'All' || categorie === undefined) {
            await axios.get(`http://localhost:8000/api/article/`).then(response => {
                setAllProducts(response.data.data)
                console.log(allProducts)
            }
            ).catch(error => console.log(error))
        } else {
            await axios.get(`http://localhost:8000/api/getArtcleCategorie/${categorie}`).then(response => {
                setAllProducts(response.data)
                console.log(allProducts)
            }
            ).catch(error => console.log(error))
        }


    }
    const handleFilter = async () => {
        await axios.get(`http://localhost:8000/api/getArticlefiltered/${type}/${Categorie}/${minPrice}/${maxPrice}`)
            .then(response => {console.log(response) 
                setAllProducts(response.data) }).catch(error=>{console.log(error)})
    }
    useEffect(() => {
        getProduct()
        getCategorie()
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, [])

    return isLoading ? (
        <Space size="large" className='Spinner'>
            <Spin tip="Loading..." size="large">
                <div className="content" />
            </Spin>
        </Space>
    ) : (
        <>
            <section id="all_products" className="section">
                <aside id="filterbar">
                    <div className="filterbar_wrapper">
                        <div className={`filter_options}`}>
                            <div className="filter_head">
                                <h3 className="title">Filter By</h3>
                            </div>

                            <div className="separator"></div>

                            {/* Filter by Brands */}
                            <div className="filter_block">
                                <h4>Type d'Annonce</h4>
                                <ul className="filter_menu">


                                    <li key={1} className="filter_btn">
                                        <input
                                            type="radio"
                                            id='Vendre'
                                            name='type'
                                            value='Vendre'
                                            onClick={(e) => setType(e.target.value)}
                                        />
                                        <label htmlFor='Vendre'>Vendre</label>
                                    </li>
                                    <li key={2} className="filter_btn">
                                        <input
                                            type="radio"
                                            id='Louer'
                                            name='type'
                                            value='Louer'
                                            onClick={(e) => setType(e.target.value)}
                                        />
                                        <label htmlFor='Louer'>Louer</label>
                                    </li>



                                </ul>

                            </div>

                            {/* Filter by Category */}
                            <div className="filter_block">
                                <h4>Category</h4>
                                <ul className="filter_menu">
                                    {
                                        DataCategorie && DataCategorie.map(item => {
                                            const { id_categorie, name_categorie } = item;
                                            return (
                                                <li key={id_categorie} className="filter_btn">
                                                    <input
                                                        type="radio"
                                                        id={name_categorie}
                                                        value={name_categorie}
                                                        name='categorie'
                                                        onClick={(e) => setCategorie(e.target.value)}
                                                    />
                                                    <label htmlFor={name_categorie}>{name_categorie}</label>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </div>
                             <div className="filter_block">
                    <h4>Price</h4>
                    <div>
                        <label htmlFor="minPrice">Min :
                            <input
                                type="number"
                                id="minPrice"
                                defaultValue={100}
                                style={{ width: '90px', paddingLeft: '10px' }}
                              onChange={(e)=>{setMinPrice(e.target.value)}}

                            /> DH </label>

                    </div>
                    <div
                        style={{ marginTop: "10px" }}>
                        <label htmlFor="maxPrice">Max :
                            <input
                                type="number"
                                id="maxPrice"
                                defaultValue={10000}
                                style={{ width: '90px', paddingLeft: '10px' }}
                                onChange={(e)=>{setMaxPrice(e.target.value)}}
                            /> DH </label>

                    </div>
                </div>
                            <button className='btn' onClick={handleFilter}>Chercher</button>
                        </div>

                    </div>

                </aside>




                <div className="container">
                    {allProducts !== undefined || allProducts !== 0 || allProducts !== null ? (
                        <div className="wrapper products_wrapper">
                            {
                                allProducts.map(item => (
                                    <ProductCard
                                        key={item.id_article}
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
            </section >
            <Services />
        </>

    )

};

export default AllProducts;