import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
// import { dropdownMenu } from '../../data/headerData';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import axios from 'axios';


const Header = () => {

    const { toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);
    const [userData, setUserData] = useState();

    const history = useNavigate()
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!token && !!user;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps





    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout').then(
            localStorage.removeItem('token'),
            localStorage.removeItem('user'),
            history('/')
        )
    }


    // handle the sticky-header
    useEffect(() => {

        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);
    useEffect(() => {
        if (isLoggedIn) {
            axios.get('http://localhost:8000/api/userProfile').then(response => {
                setUserData(response.data)
                console.log(userData)
            }
            )
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cartQuantity = cartItems.length;

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">X-Beat</Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            {isLoggedIn ? (
                                userData !== undefined ? (
                                    userData.account_type === "acheteur" ? (
                                        <div className="cart_action">
                                            <Link to="/cart">
                                                <AiOutlineShoppingCart />
                                                {
                                                    cartQuantity > 0 && (
                                                        <span className="badge">{cartQuantity}</span>
                                                    )
                                                }
                                            </Link>
                                            <div className="tooltip">Cart</div>
                                        </div>
                                    ) : (null)
                                ) : (null)
                            ) : (null)}



                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    {isLoggedIn ? (
                                        userData !== undefined ? (
                                            <>
                                                <h4>Hello! {userData.name}</h4>
                                                <p>Access account and manage orders</p>
                                            </>
                                        ) : (
                                            null
                                        )


                                    ) : (
                                        <>
                                            <h4>Hello!</h4>
                                            <p>Access account and manage orders</p>
                                            <button
                                                type="button"
                                                onClick={() => toggleForm(true)}
                                            >
                                                Login / Signup
                                            </button>
                                        </>
                                    )}
                                    <div className="separator"></div>
                                    {isLoggedIn ? (
                                        userData !== undefined ? (
                                            <ul>
                                                {userData.account_type === 'acheteur' ? (
                                                    <li>
                                                        <Link to='/Demande'>Demande</Link>
                                                    </li>
                                                ) : (
                                                    <li>
                                                        <Link to='/HomeVendeur'>Dashboard</Link>
                                                    </li>
                                                )}
                                                <li>
                                                    {/* <button type='link' onClick={handleLogout}>Logout</button> */}
                                                    <Link to='/' onClick={handleLogout}>Logout</Link>
                                                </li>
                                            </ul>
                                        ) : (null)
                                    ) : (null)}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            <SearchBar />
            <AccountForm />
        </>
    );
};

export default Header;