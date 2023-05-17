import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark, IoMdClose } from 'react-icons/io';
import { GrClose } from "react-icons/gr";
// import { calculateDiscount, displayMoney } from '../helpers/utils';
import useDocTitle from '../hooks/useDocTitle';
// import useActive from '../hooks/useActive';
// import cartContext from '../contexts/cart/cartContext';
// import productsData from '../data/productsData';
// import SectionsHead from '../components/common/SectionsHead';
// import RelatedSlider from '../components/sliders/RelatedSlider';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';
import axios from 'axios';
import { Space, Spin } from 'antd';
const ProductDetails = () => {

    useDocTitle('Product Details');

    // const { handleActive, activeClass } = useActive(0);

    // const { addItem } = useContext(cartContext);

    const { productId } = useParams();

    // here the 'id' received has 'string-type', so converting it to a 'Number'
    // const prodId = parseInt(productId);



    // showing the Product based on the received 'id'

    const [products, setProducts] = useState();
    useEffect(() => {
        axios.get(`http://localhost:8000/api/article/${productId}`).then(response => {
            setProducts(response.data.data)
            console.log(products)
        }
        ).catch(error => console.log(error))
    }, [productId, products])




    // const { name_article , description , prix ,  type , disponibilite ,images} = products;

    // const [previewImg, setPreviewImg] = useState(images[0]);


    // handling Add-to-cart
    // const handleAddItem = () => {
    //     addItem(Products);
    // };


    // setting the very-first image on re-render
    // useEffect(() => {
    //     setPreviewImg(images);
    //     handleActive(0);
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [images]);


    // handling Preview image
    // const handlePreviewImg = (i) => {
    //     setPreviewImg(images);
    //     handleActive(i);
    // };


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    return isLoading ? (
        <Space size="large" className='Spinner'>
            <Spin tip="Loading..." size="large">
                <div className="content" />
            </Spin>
        </Space>
    ) : (<>
        <section id="product_details" className="section">
            <div className="container">
                <div className="wrapper prod_details_wrapper">

                    {/*=== Product Details Left-content ===*/}
                    <div className="prod_details_left_col">
                        <figure className="prod_details_img">
                            <img src={products[0].images} alt="product-img" />
                        </figure>
                    </div>

                    {/*=== Product Details Right-content ===*/}
                    <div className="prod_details_right_col">
                        <h1 className="prod_details_title">{products[0].name_article}</h1>
                        <div className="prod_details_ratings">
                            {/* <span className="rating_star">
                                    {
                                        [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
                                    }
                                </span> */}
                            {/* <Link to="*">{ratings} Ratings</Link> */}
                        </div>

                        <div className="separator"></div>

                        <div className="prod_details_price">
                            <div className="price_box">
                                <h3 className="price">
                                    {products[0].type === "Vendre" ? ("Prix : " + products[0].prix + " DH") :
                                        ("Prix Par Jour :" + products[0].prix + "DH")}

                                    {/* <small className="del_price"><del>{oldPrice}</del></small> */}
                                </h3>
                                {/* <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p> */}
                                {/* <span className="tax_txt">(Inclusive of all taxes)</span> */}
                            </div>
                            {products[0].disponibilite === 'true' ?
                                (
                                    <div className="badge">
                                        <span><IoMdCheckmark /> Disponible</span>

                                    </div>) :
                                (<div className="SoldOut">

                                    <span><IoMdClose />Non Disponible</span>
                                </div>)}

                        </div>

                        <div className="separator"></div>

                        <div className="prod_details_offers">
                            <h4>Offers and Discounts</h4>
                            <ul>
                                <li>No Cost EMI on Credit Card</li>
                                <li>Pay Later & Avail Cashback</li>
                            </ul>
                        </div>

                        <div className="separator"></div>

                        <div className="prod_details_buy_btn">
                            <button
                                type="button"
                                className="btn"
                            // onClick={handleAddItem}
                            >
                                Add to cart
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <ProductSummary description={products[0].description} />

        <section id="related_products" className="section">
            {/* <div className="container">
                    <SectionsHead heading="Related Products" />
                    <RelatedSlider category={category} />
                </div> */}
        </section>
        <Services />
    </>)





};

export default ProductDetails;