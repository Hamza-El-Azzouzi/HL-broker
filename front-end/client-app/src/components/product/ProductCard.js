import React from 'react';
import { Link } from 'react-router-dom';
import useActive from '../../hooks/useActive';
import axios from  'axios';
import {message} from 'antd';
import ls from 'localstorage-slim';
const ProductCard = (props) => {

    const { id_article, image, name_article, prix, } = props;
    const { active, activeClass } = useActive(false);

    const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));

    const handleCart = () => {
        axios.post('http://localhost:8000/api/panier', {
            id_user: Loginuser.id,
            id_article: id_article
        }).then(response => {
            message.success(response.data.message)
        }).catch(error => {
            message.error(error.message)
        })
    }

    // const newPrice = displayMoney(finalPrice);
    // const oldPrice = displayMoney(originalPrice);


    return (
        <>
            <div className="card products_card">
                <figure className="products_img">
                    <Link to={`/product-details/${id_article}`}>
                        <img src={`http://localhost:8000/images/${image}`} alt="product-img" />
                    </Link>
                </figure>
                <div className="products_details" >
                    <h3 className="products_title" style={{ textAlign:'left'}}>
                        <Link to={`/product-details/${id_article}`}>{name_article}</Link>
                    </h3>
                    {/* <h5 className="products_info">{info}</h5> */}
                    <div className="separator"></div>
                    <h2 className="products_price">
                        {prix} DH &nbsp;
                        {/* <small><del>{oldPrice}</del></small> */}
                    </h2>
                    <button
                        type="button"
                        className={`btn products_btn ${activeClass(id_article)}`}
                        onClick={handleCart}
                    >
                        {active ? 'Added' : 'Add to cart'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ProductCard;