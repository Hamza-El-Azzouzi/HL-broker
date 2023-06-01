import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IoMdCheckmark, IoMdClose, IoIosWarning } from 'react-icons/io';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { message, Space, Spin } from 'antd';
import axios from 'axios';
import ls from 'localstorage-slim';

import useDocTitle from '../hooks/useDocTitle';
import ProductSummary from '../components/product/ProductSummary';
import Services from '../components/common/Services';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import '../styles/partials/components/Slider.css';
import '../styles/partials/pages/ProductDetails.css';

const ProductDetails = () => {
  useDocTitle('Product Details');

  const { productId } = useParams();

  const [products, setProducts] = useState();
  const [images, setImages] = useState();
  const [user, setUser] = useState();
  const token = ls.get('token', { decrypt: true });
  const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  const getArticles = async () => {
    await axios.get(`http://localhost:8000/api/article/${productId}`)
      .then(response => {
        setProducts(response.data);
        console.log(products);
      })
      .catch(error => console.log(error));
  };

  const getArticleImage = async () => {
    await axios.get(`http://localhost:8000/api/articles/${productId}/images`)
      .then(response => {
        setImages(response.data);
        console.log(images);
      })
      .catch(error => console.log(error));
  };

  const getUserArticle = async () => {
    await axios.get(`http://localhost:8000/api/articles/${productId}/user`)
      .then(response => {
        setUser(response.data);
        console.log(user);
      })
      .catch(error => console.log(error));
  };

  const handleCart = () => {
    axios.post('http://localhost:8000/api/panier', {
      id_user: Loginuser.id,
      id_article: productId
    })
      .then(response => {
        message.success(response.data.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const handleDemande = () => {
    axios.post('http://localhost:8000/api/demandes', {
      id_user: Loginuser.id,
      id_article: productId
    })
      .then(response => {
        message.success(response.data.message);
      })
      .catch(error => {
        message.error(error.message);
      });
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getArticles();
    getArticleImage();
    getUserArticle();
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  return isLoading ? (
    <Space size="large" className='Spinner'>
      <Spin tip="Loading..." size="large">
        <div className="content" />
      </Spin>
    </Space>
  ) : (
    <>
      <section id="product_details" className="section">
        <div className="container">
          <div className="wrapper prod_details_wrapper">
            {/*=== Product Details Left-content ===*/}
            <div className="prod_details_left_col swipper">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                  clickable: true,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
              >
                {images !== undefined ? (
                  images.map((x) => (
                    <SwiperSlide key={x.id}><img src={`http://localhost:8000/images/${x.images}`} alt="product-img" /></SwiperSlide>
                  ))
                ) : (
                  setIsLoading(true)
                )}
              </Swiper>
            </div>

            {/*=== Product Details Right-content ===*/}
            <div className="prod_details_right_col">
              <h1 className="prod_details_title">{products[0].name_article}</h1>
              <h3>Ville : {products[0].localisation}</h3>
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
                  <h3> Type de Bien : {products[0].type}</h3>
                  <h3 className="price">
                    {products[0].type === "Vendre"
                      ? ("Prix : " + products[0].prix + " DH")
                      : ("Prix Par Jour :" + products[0].prix + "DH")}
                  </h3>
                </div>
                {products[0].disponibilite === 'true' ? (
                  <div className="badge">
                    <span><IoMdCheckmark /> Disponible</span>
                  </div>
                ) : (
                  <div className="SoldOut">
                    <span><IoMdClose />Non Disponible</span>
                  </div>
                )}
              </div>

              <div className="separator"></div>

              <div className="prod_details_offers">
                <img src={`http://localhost:8000/avatar/${user[0].image}`} alt="Avatar" className="avatar" />
                <div className='user-info'>
                  <h2 className='prod_details_title'> {user[0].name}</h2>
                  <p>{user[0].email}</p>
                </div>
                <div className='report-btn badge'>
                  <button className='btn-report'><IoIosWarning /></button>
                </div>
              </div>

              <div className="separator"></div>

              <div className="prod_details_buy_btn">
                {Loginuser && Loginuser.account_type === 'acheteur' && (
                  <>
                    <button
                      type="button"
                      className="btn"
                      onClick={handleDemande}
                    >
                      Demande
                    </button>
                    <button
                      type="button"
                      className="favorie outline"
                      onClick={handleCart}
                    >
                      Ajouter Aux Favoris
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProductSummary description={products[0].description} id={productId} />
      <section id="related_products" className="section"></section>
      <Services />
    </>
  );
};

export default ProductDetails;





















// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { IoMdCheckmark, IoMdClose, IoIosWarning } from 'react-icons/io';
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper";
// import {  message } from 'antd';
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import '../styles/partials/components/Slider.css';
// import '../styles/partials/pages/ProductDetails.css';

// import useDocTitle from '../hooks/useDocTitle';
// import ProductSummary from '../components/product/ProductSummary';
// import Services from '../components/common/Services';
// import axios from 'axios';
// import { Space, Spin } from 'antd';
// import ls from 'localstorage-slim';
// const ProductDetails = () => {

//     useDocTitle('Product Details');

//     const { productId } = useParams();

//     const [products, setProducts] = useState();
//     const [images, setImages] = useState();
//     const [user, setUser] = useState();
//     const token = ls.get('token', { decrypt: true });
//     const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     const getArticles = async () => {
//         await axios.get(`http://localhost:8000/api/article/${productId}`).then(response => {
//             setProducts(response.data)
//             console.log(products)
//         }
//         ).catch(error => console.log(error))
//     }
//     const getArticleImage = async () => {
//         await axios.get(`http://localhost:8000/api/articles/${productId}/images`).then(response => {
//             setImages(response.data)
//             console.log(images)
//         }
//         ).catch(error => console.log(error))
//     }
//     const getUserArticle = async () => {
//         await axios.get(`http://localhost:8000/api/articles/${productId}/user`).then(response => {
//             setUser(response.data)
//             console.log(user)
//         }
//         ).catch(error => console.log(error))
//     }
//     const handleCart = () => {
//         axios.post('http://localhost:8000/api/panier', {
//             id_user: Loginuser.id,
//             id_article: productId
//         }).then(response => {
//             message.success(response.data.message)
//         }).catch(error => {
//             message.error(error.message)
//         })
//     }

//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         getArticles()
//         getArticleImage()
//         getUserArticle()
//         setTimeout(() => {
//             setIsLoading(false);
//         }, 5000);
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);

//     return isLoading  ? (
//         <Space size="large" className='Spinner'>
//             <Spin tip="Loading..." size="large">
//                 <div className="content" />
//             </Spin>
//         </Space>
//     ) : (<>
//         <section id="product_details" className="section">
//             <div className="container">
//                 <div className="wrapper prod_details_wrapper">

//                     {/*=== Product Details Left-content ===*/}
//                     {/* <div className="prod_details_left_col">
//                      */}
//                     <div className="prod_details_left_col swipper">
//                         <Swiper
//                             slidesPerView={1}
//                             spaceBetween={30}
//                             loop={true}
//                             pagination={{
//                                 clickable: true,
//                             }}
//                             autoplay={{
//                                 delay: 2500,
//                                 disableOnInteraction: false,
//                             }}
//                             modules={[Autoplay, Pagination]}
//                             className="mySwiper"
//                         >
//                             {images !== undefined ? (
//                                 images.map((x) => (
//                                     <SwiperSlide key={x.id}><img src={`http://localhost:8000/images/${x.images}`} alt="product-img" /></SwiperSlide>
//                                 )
//                                 )) : ( setIsLoading(true))}
//                         </Swiper>
//                     </div>

//                     {/*=== Product Details Right-content ===*/}
                        
//                     <div className="prod_details_right_col">
//                         <h1 className="prod_details_title">{products[0].name_article}</h1>
//                         <h3>Ville : {products[0].localisation}</h3>
//                         <div className="prod_details_ratings">
//                             {/* <span className="rating_star">
//                                     {
//                                         [...Array(rateCount)].map((_, i) => <IoMdStar key={i} />)
//                                     }
//                                 </span> */}
//                             {/* <Link to="*">{ratings} Ratings</Link> */}
//                         </div>

//                         <div className="separator"></div>

//                         <div className="prod_details_price">
//                             <div className="price_box">
//                                 <h3> Type de Bien : {products[0].type}</h3>
//                                 <h3 className="price">
//                                     {products[0].type === "Vendre" ? ("Prix : " + products[0].prix + " DH") :
//                                         ("Prix Par Jour :" + products[0].prix + "DH")}

//                                     {/* <small className="del_price"><del>{oldPrice}</del></small> */}
//                                 </h3>
//                                 {/* <p className="saved_price">You save: {savedPrice} ({savedDiscount}%)</p> */}
//                                 {/* <span className="tax_txt">(Inclusive of all taxes)</span> */}
//                             </div>
//                             {products[0].disponibilite === 'true' ?
//                                 (
//                                     <div className="badge">
//                                         <span><IoMdCheckmark /> Disponible</span>

//                                     </div>) :
//                                 (<div className="SoldOut">

//                                     <span><IoMdClose />Non Disponible</span>
//                                 </div>)}

//                         </div>

//                         <div className="separator"></div>

//                         <div className="prod_details_offers">
//                             <img src={`http://localhost:8000/avatar/${user[0].image}`} alt="Avatar" className="avatar" />
//                             <div className='user-info'>

//                                 <h2 className='prod_details_title'> {user[0].name}</h2>
//                                 <p>{user[0].email}</p>
//                             </div>
//                             <div className='report-btn badge'>
//                                 <button className='btn-report'><IoIosWarning /></button>
//                             </div>
//                         </div>

//                         <div className="separator"></div>

//                         <div className="prod_details_buy_btn">
                           
//                             {   Loginuser ? (
//                                 Loginuser.account_type === 'acheteur' ? (
//                                     <> <button
//                                     type="button"
//                                     className="btn"
//                                 // onClick={handleAddItem}
//                                 >
//                                     Demande
//                                 </button>
//                                     <button
//                                     type="button"
//                                     className="favorie outline"
//                                     onClick={handleCart}
//                                 >
//                                     Ajouter Aux Favorie
//                                 </button>
//                                     </>
                                    
//                                 ):
                                
//                                 (null)
//                             ):(null)
                            
//                             }
                            
//                         </div>


//                     </div>
//                 </div>
//             </div>
//         </section>

//         <ProductSummary description={products[0].description} id={productId}/>
//         <section id="related_products" className="section">
//         </section>
//         <Services />
//     </>)





// };

// export default ProductDetails;