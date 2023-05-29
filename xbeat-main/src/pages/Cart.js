import React, {  useEffect, useState } from 'react';
import { BsCartX } from 'react-icons/bs';

import useDocTitle from '../hooks/useDocTitle';
import axios from 'axios';
import CartItem from '../components/cart/CartItem';
import EmptyView from '../components/common/EmptyView';

import ls from 'localstorage-slim';
const Cart = () => {

    useDocTitle('Cart');

    const [cartItem ,  setCartItem] = useState();

    const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));

const getCartItem = async () =>{
    axios.get(`http://localhost:8000/api/panier/${Loginuser.id}`).then(response=>{
         setCartItem(response.data.result)
    }
       
    ).catch(error=>{
        console.log(error)
    })
}
useEffect(()=>{
    getCartItem()
})


    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    {
                        cartItem === 0 ? (
                            <EmptyView
                                icon={<BsCartX />}
                                msg="Your Cart is Empty"
                                link="/all-products"
                                btnText="Start Shopping"
                            />
                        ) : (
                            <div className="wrapper cart_wrapper">
                                <div className="cart_left_col">
                                    {
                                     cartItem !== undefined ? (cartItem.map(item => (
                                            <CartItem
                                                key={item.id}
                                                {...item}
                                            />
                                        ))):(null)
                                    }
                                </div>

                                <div className="cart_right_col">
                                    <div className="order_summary">
                                        <h3>
                                            Order Summary &nbsp;
                                            {/* ( {cartQuantity} {cartQuantity > 1 ? 'items' : 'item'} ) */}
                                        </h3>
                                        <div className="order_summary_details">
                                            <div className="price">
                                                <span>Original Price</span>
                                                {/* <b>{displayCartTotal}</b> */}
                                            </div>
                                            <div className="discount">
                                                <span>Discount</span>
                                                {/* <b>- {displayCartDiscount}</b> */}
                                            </div>
                                            <div className="delivery">
                                                <span>Delivery</span>
                                                <b>Free</b>
                                            </div>
                                            <div className="separator"></div>
                                            <div className="total_price">
                                                <b><small>Total Price</small></b>
                                                {/* <b>{displayTotalAmount}</b> */}
                                            </div>
                                        </div>
                                        <button type="button" className="btn checkout_btn">Checkout</button>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </>
    );
};

export default Cart;