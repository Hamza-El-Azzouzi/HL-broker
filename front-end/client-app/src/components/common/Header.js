import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import commonContext from '../../contexts/common/commonContext';
import cartContext from '../../contexts/cart/cartContext';
import AccountForm from '../form/AccountForm';
import SearchBar from './SearchBar';
import axios from 'axios';
import { MdFavorite } from "react-icons/md";
import ls from 'localstorage-slim';
const Header = () => {

    const { toggleForm, toggleSearch } = useContext(commonContext);
    const { cartItems } = useContext(cartContext);
    const [isSticky, setIsSticky] = useState(false);

    const history = useNavigate()
    const token = ls.get('token', { decrypt: true });
    const user = JSON.parse(ls.get('user', { decrypt: true }));
    const isLoggedIn = !!token && !!user;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    const handleLogout = () => {
        axios.post('http://localhost:8000/api/logout').then(
            ls.remove('token'),
            ls.remove('user'),
            history('/')
        )
    }


    useEffect(() => {

        const handleIsSticky = () => window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);

        window.addEventListener('scroll', handleIsSticky);

        return () => {
            window.removeEventListener('scroll', handleIsSticky);
        };
    }, [isSticky]);


    const cartQuantity = cartItems.length;

    return (
        <>
            <header id="header" className={isSticky ? 'sticky' : ''}>
                <div className="container">
                    <div className="navbar">
                        <h2 className="nav_logo">
                            <Link to="/">H-L BROKER</Link>
                        </h2>
                        <nav className="nav_actions">
                            <div className="search_action">
                                <span onClick={() => toggleSearch(true)}>
                                    <AiOutlineSearch />
                                </span>
                                <div className="tooltip">Search</div>
                            </div>

                            {isLoggedIn ? (

                                user.account_type === "acheteur" ? (
                                    <div className="cart_action">
                                        <Link to="/cart">
                                            <MdFavorite />
                                            {
                                                cartQuantity > 0 && (
                                                    <span className="badge">{cartQuantity}</span>
                                                )
                                            }
                                        </Link>
                                        <div className="tooltip">Favorie</div>
                                    </div>
                                ) : (null)
                            ) : (null)}



                            <div className="user_action">
                                <span>
                                    <AiOutlineUser />
                                </span>
                                <div className="dropdown_menu">
                                    {isLoggedIn ? (

                                        <>
                                            <h4>Hello! {user.name}</h4>
   
                                        </>

                                    ) : (
                                        <>
                                            <h4>Hello!</h4>

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

                                        <ul>
                                            <li>
                                                <Link to={`/profile/${user.id}`}>Profle</Link>
                                            </li>
                                            {user.account_type === 'acheteur' ? (
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