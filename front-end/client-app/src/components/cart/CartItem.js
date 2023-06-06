import React from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';

// import { displayMoney } from '../../helpers/utils';
// import cartContext from '../../contexts/cart/cartContext';
import axios from 'axios';
import { message } from 'antd';
// import QuantityBox from '../common/QuantityBox';


const CartItem = (props) => {

    const { id_article, image, name_article,prix } = props;

    // const { removeItem } = useContext(cartContext);
    const handledelete= (id_user ,id_article) =>{
        axios.delete(`http://localhost:8000/api/panier/${id_user}/article/${id_article}`)
        .then(response =>{
            message.success(response.data.message)
            props.data.filter(item=> item.id_article === id_article)
        })
    }

    // const newPrice = displayMoney(finalPrice);
    // const oldPrice = displayMoney(originalPrice);


    return (
        <>
            <div className="cart_item">
                <figure className="cart_item_img">
                    <Link to={`/product-details/${id_article}`}>
                        <img src={`http://localhost:8000/images/${image}`} alt="product-img" />
                    </Link>
                </figure>
                <div className="cart_item_info">
                    <div className="cart_item_head">
                        <h4 className="cart_item_title">
                            <Link to={`/product-details/${id_article}`}>{name_article}</Link>
                        </h4>
                        <div className="cart_item_del">
                            <span onClick={() => handledelete(props.id_user , id_article)}>
                                <TbTrash />
                            </span>
                            <div className="tooltip">Remove Item</div>
                        </div>
                    </div>

                    <h2 className="cart_item_price">
                        {prix} DH &nbsp;
                    </h2>
                </div>
            </div>
        </>
    );
};

export default CartItem;