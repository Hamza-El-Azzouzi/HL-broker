import React, { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
// import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
// import QuantityBox from '../common/QuantityBox';


const CartItem = (props) => {

    const { id_article, image, name_article,prix } = props;

    const { removeItem } = useContext(cartContext);

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
                            <span onClick={() => removeItem(id_article)}>
                                <TbTrash />
                            </span>
                            <div className="tooltip">Remove Item</div>
                        </div>
                    </div>

                    <h2 className="cart_item_price">
                        {prix} DH &nbsp;
                        {/* <small><del>{oldPrice}</del></small> */}
                    </h2>

                    {/* <QuantityBox itemId={id} itemQuantity={quantity} /> */}
                </div>
            </div>
        </>
    );
};

export default CartItem;