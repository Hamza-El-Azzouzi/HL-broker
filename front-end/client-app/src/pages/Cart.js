/* eslint-disable react-hooks/exhaustive-deps */
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
},[cartItem])


    return (
        <>
            <section id="cart" className="section">
                <div className="container">
                    { console.log(cartItem)}
                    {
                        cartItem < 1 || cartItem === undefined || cartItem === null   ?   (
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
                                     cartItem !== undefined && (cartItem.map(item => (
                                            <CartItem
                                                key={item.id}
                                                {...item}
                                                id_user = {Loginuser.id}
                                                data = {cartItem}
                                            />
                                        )))
                                    }
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