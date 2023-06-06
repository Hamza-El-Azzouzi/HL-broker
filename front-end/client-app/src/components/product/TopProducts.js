import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BsArrowRight } from 'react-icons/bs';
import useActive from '../../hooks/useActive';
// import productsData from '../../data/productsData';
import ProductCard from './ProductCard';
// import Categorie from './Categorie';


const TopProducts = () => {
    const [DataCategorie, setDataCategorie] = useState()
    // const [products, setProducts] = useState(productsData);
    // eslint-disable-next-line no-unused-vars
    const { activeClass, handleActive } = useActive(0);
    const history = useNavigate()
    // making a unique set of product's category
    // const productsCategory = [
    //     'All',
    //     ...new Set(productsData.map(item => item.category))
    // ];

    // handling product's filtering
    const handleProducts = (category, i) => {
        if (category === 'All') {
            history('/all-products/All')

            return;
        } else {
            history(`/all-products/${category}`)
        }
    };

    const [allProducts, setAllProducts] = useState();

    // const GetCategorieData = async () => {
    //     await  
    // }

    // useEffect(() => {

    //     GetCategorieData()

    // }, [])


    // const { allProducts } = useContext(filtersContext);


    useEffect(() => {
        axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data)
            }
            ).catch(error => { console.log(error) })

        axios.get('http://localhost:8000/api/getArticleForHome').then(response => {
            setAllProducts(response.data.data)
            console.log(allProducts)
        }
        ).catch(error => console.log(error))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <>
            <div className="products_filter_tabs">
                <ul className="tabs">
                    
                        <>
                            <li key='7'
                                className={`tabs_item ${activeClass(7)}`}
                                onClick={() => handleProducts('All')}
                            > ALL </li>
                       { DataCategorie !== undefined ? (DataCategorie.map((item, i)=> (
                            <li key={item.id_categorie}
                                className={`tabs_item ${activeClass(i)}`}
                                onClick={() => handleProducts(item.name_categorie, i)}
                            > {item.name_categorie} </li>
                            )

                            )


                            ) : (<p> you hae prblm in ur connexion</p>)}

                        </>
            
                </ul>
            </div>
            <div className="wrapper products_wrapper">
                {
                    allProducts && (allProducts.map(item => (
                        <ProductCard
                            key={item.id_article}
                            {...item}
                        />
                    )))
                }
                <div className="card products_card browse_card">
                    <Link to="/all-products/All">
                        Browse All <br /> Products <BsArrowRight />
                    </Link>
                </div>
            </div>
        </>
    );
};

export default TopProducts;