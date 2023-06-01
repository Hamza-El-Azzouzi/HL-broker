// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductReviews from './ProductReviews';
// import useActive from '../../hooks/useActive';
// import ls from 'localstorage-slim';
// import { Rate } from 'antd';

// const ProductSummary = (props) => {
//   const { active, handleActive, activeClass } = useActive('overview');
//   const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
//   const [reviews, setReviews] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [comment, setComment] = useState('');
//   const { productId } = useParams();

//   const handleCommentSubmit = () => {
//     axios
//       .post('http://localhost:8000/api/avisstore', {
//         id_user: Loginuser.id,
//         id_article: productId,
//         nbr_etoile: 4,
//         avis: comment,
//       })
//       .then((response) => {
//         const updatedReviews = [...reviews, response.data.avis];
//         setReviews(updatedReviews);
//         setComment('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   const getReviews = async () => {
//     await axios
//       .get(`http://localhost:8000/api/avisshow/${props.id}`)
//       .then((response) => {
//         setReviews(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching review information:', error);
//       });
//   };

//   const getUsers = async () => {
//     await axios
//       .get(`http://localhost:8000/api/articles/${productId}/user`)
//       .then((response) => {
//         setUsers(response.data);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getReviews();
//     getUsers();
//   }, [productId]);

//   return (
//     <>
//       <section id="product_summary" className="section">
//         <div className="container">
//           {/* Product-Summary-Tabs */}
//           <div className="prod_summary_tabs">
//             <ul className="tabs">
//               <li
//                 className={`tabs_item ${activeClass('overview')}`}
//                 onClick={() => handleActive('overview')}
//               >
//                 Overview
//               </li>
//               <li
//                 className={`tabs_item ${activeClass('reviews')}`}
//                 onClick={() => handleActive('reviews')}
//               >
//                 Reviews
//               </li>
//             </ul>
//           </div>

//           {/* Product-Summary-Details */}
//           <div className="prod_summary_details">
//             {active === 'overview' ? (
//               <div className="prod_overview">
//                 {props.description}
//                 <Rate disabled defaultValue={5} />
//               </div>
//             ) : (
//               <div className="prod_reviews">
//                 <ul>
//                   {reviews && reviews.length > 0 ? (
//                     reviews.map((review) => {
//                       const user = users.find((user) => user.id === review.id_user);
//                       return (
//                         <ProductReviews
//                           key={review.id_avis}
//                           id_avis={review.id_avis}
//                           nbr_etoile={review.nbr_etoile}
//                           avis={review.avis}
//                           date={review.created_at}
//                           image={user && user.image}
//                           name={user && user.name}
//                         />
//                       );
//                     })
//                   ) : (
//                     <p>Aucun commentaire trouvé.</p>
//                   )}
//                 </ul>
//                 {Loginuser && Loginuser.account_type === 'acheteur' && (
//                   <>
//                     <textarea
//                       wrap="true"
//                       rows="10"
//                       cols="33"
//                       className="outline textarea"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                     <button className="publish-btn" onClick={handleCommentSubmit}>
//                       Publier
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductSummary;






////











import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductReviews from './ProductReviews';
import useActive from '../../hooks/useActive';
import ls from 'localstorage-slim';
import { Rate } from 'antd';

const ProductSummary = (props) => {
  const { active, handleActive, activeClass } = useActive('overview');
  const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
  const [review, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [value, setValue] = useState(3);
  const { productId } = useParams();



  const desc =['terrible', 'mauvais', 'normal', 'bon', 'merveilleux'] ;

  const handleCommentSubmit = () => {
    axios.post('http://localhost:8000/api/avisstore', {
      id_user: Loginuser.id,
      id_article: productId,
      nbr_etoile: value,
      avis: comment,
    })
      .then((response) => {
        const updatedReviews = [...review, response.data.avis];
        setReviews(updatedReviews);
        setComment('');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getReview = async () => {
    await axios.get(`http://localhost:8000/api/avisshow/${props.id}`)
      .then(response => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error('Error fetching review information:', error);
      });
  };

  useEffect(() => {
    getReview();
  }, [productId]);

  return (
    <>
      <section id="product_summary" className="section">
        <div className="container">
          {/* Product-Summary-Tabs */}
          <div className="prod_summary_tabs">
            <ul className="tabs">
              <li
                className={`tabs_item ${activeClass('overview')}`}
                onClick={() => handleActive('overview')}
              >
                Overview
              </li>
              <li
                className={`tabs_item ${activeClass('reviews')}`}
                onClick={() => handleActive('reviews')}>
                Reviews
              </li>
            </ul>
          </div>

          {/* Product-Summary-Details */}
          <div className="prod_summary_details">
            {active === 'overview' ? (
              <div className="prod_overview">
                {props.description}
              </div>
            ) : (
              <div className="prod_reviews">
                <ul> 
                  {review && review.length > 0 ? (
                    review.map((x) => (
                      <ProductReviews 
                        key={x.id_avis}
                        id_avis={x.id_avis} 
                        nbr_etoile={x.nbr_etoile} 
                        avis={x.avis} 
                        date={x.created_at}
                        image={Loginuser.image}
                        name={Loginuser.name}
                      />
                    ))
                  ) : (
                    <p>Aucun commentaire trouvé.</p>
                  )}
                </ul>
                <br></br><br></br>
                {Loginuser && Loginuser.account_type === 'acheteur' && (
                  <div>
                     <Rate tooltips={desc} onChange={setValue} style={{ display: 'inline-block'}}   className='rate' defaultValue={5}  /><br></br>
                    <textarea
                      wrap="true"
                      rows="10"
                      cols="33"
                      className="outline textarea"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <button className="publish-btn" onClick={handleCommentSubmit}>
                      Publier
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductSummary;


///////////////////////////////////////////////////////////////



// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductReviews from './ProductReviews';
// import useActive from '../../hooks/useActive';
// import ls from 'localstorage-slim';
// import { Rate } from 'antd';

// const ProductSummary = (props) => {
//   const { active, handleActive, activeClass } = useActive('overview');
//   const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
//   const [review, setReviews] = useState();
//   const [comment, setComment] = useState('');
//   const { productId } = useParams();
// //   const [data, setData] = useState();
// //   const user = JSON.parse(sessionStorage.getItem('user'));




//   const handleCommentSubmit = () => {
//     axios.post('http://localhost:8000/api/avisstore', {
//       id_user: Loginuser.id,
//       id_article: productId,
//       nbr_etoile: 4,
//       avis: comment,
//     })
//       .then((response) => {
//         const updatedReviews = [response.data.avis];
//         setReviews(updatedReviews);
//         setComment('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };




// const getReview = async () => {
//     await axios .get(`http://localhost:8000/api/avisshow/${props.id}`)
//       .then(response => {
//         // setReviews(response.data);
//         console.log(response)
//       })
//       .catch((error) => {
//         console.error('Error fetching review information:', error);
//      });
//   };

//   useEffect(() => {
//     getReview(); 
//     // getuserdata();
//   }, [productId]);
//   return (
//     <>
//       <section id="product_summary" className="section">
//         <div className="container">
//           {/* Product-Summary-Tabs */}
//           <div className="prod_summary_tabs">
//             <ul className="tabs">
//               <li
//                 className={`tabs_item ${activeClass('overview')}`}
//                 onClick={() => handleActive('overview')}
//               >
//                 Overview
//               </li>
//               <li
//                 className={`tabs_item ${activeClass('reviews')}`}
//                 onClick={() => handleActive('reviews')}>
//                 Reviews
//               </li>
//             </ul>
//           </div>

//           {/* Product-Summary-Details */}
//           <div className="prod_summary_details">
//             {active === 'overview' ? (
//               <div className="prod_overview">
//                 {props.description}
//                 <Rate disabled defaultValue={5} />
//               </div>
//             ) : (
//               <div className="prod_reviews">
//                 <ul> 
//                     { review !== undefined ? (review.map((x) => (
//                       <ProductReviews 
//                          key={x.id_avis}
//                          id_avis={x.id_avis} 
//                          nbr_etoile={x.nbr_etoile} 
//                             avis={x.avis} 
//                             date={x.created_at}
//                             />
                                   
//                                 ) )):(null) }
//                 </ul>
//                 {Loginuser && Loginuser.account_type === 'acheteur' && (
//                   <>
//                     <textarea
//                       wrap="true"
//                       rows="10"
//                       cols="33"
//                       className="outline textarea"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                     <button className="publish-btn" onClick={handleCommentSubmit}>
//                       Publier
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductSummary;































// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import ProductReviews from './ProductReviews';
// import useActive from '../../hooks/useActive';
// import ls from 'localstorage-slim';
// import { Rate } from 'antd';

// const ProductSummary = (props) => {
//   const { active, handleActive, activeClass } = useActive('overview');
//   const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
//   const [reviews, setReviews] = useState([]);
//   const [comment, setComment] = useState('');
//   const { productId } = useParams();

//   const getReviews = () => {
//     axios.get(`/api/avisshow/${productId}`)
//       .then((response) => {
//         setReviews(response.data.avis);
//       })
//       .catch((error) => {
//         console.error('Error fetching reviews:', error);
//       });
//   };

//   useEffect(() => {
//     getReviews();
//   }, [productId]);

//   const handleCommentSubmit = () => {
//     axios.post('http://localhost:8000/api/avisstore', {
//       id_user: Loginuser.id,
//       id_article: productId,
//       nbr_etoile: 4,
//       avis: comment,
//     })
//       .then((response) => {
//         const updatedReviews = [...reviews, response.data.avis];
//         setReviews(updatedReviews);
//         setComment('');
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <>
//       <section id="product_summary" className="section">
//         <div className="container">
//           {/* Product-Summary-Tabs */}
//           <div className="prod_summary_tabs">
//             <ul className="tabs">
//               <li
//                 className={`tabs_item ${activeClass('overview')}`}
//                 onClick={() => handleActive('overview')}
//               >
//                 Overview
//               </li>
//               <li
//                 className={`tabs_item ${activeClass('reviews')}`}
//                 onClick={() => handleActive('reviews')}
//               >
//                 Reviews
//               </li>
//             </ul>
//           </div>

//           {/* Product-Summary-Details */}
//           <div className="prod_summary_details">
//             {active === 'overview' ? (
//               <div className="prod_overview">
//                 {props.description}
//                 <Rate disabled defaultValue={2} />
//               </div>
//             ) : (
//               <div className="prod_reviews">
//                 <ul>
//                   {reviews.map((review) => (
//                     <ProductReviews
//                       key={review.id_avis}
//                       userId={review.id_user}
//                       nbrstart={review.nbr_etoile}
//                       date={review.created_at}
//                       review={review.avis}
//                     />
//                   ))}
//                 </ul>
//                 {Loginuser && Loginuser.account_type === 'acheteur' && (
//                   <>
//                     <textarea
//                       wrap="true"
//                       rows="10"
//                       cols="33"
//                       className="outline textarea"
//                       value={comment}
//                       onChange={(e) => setComment(e.target.value)}
//                     ></textarea>
//                     <button className="publish-btn" onClick={handleCommentSubmit}>
//                       Publier
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductSummary;






// ////////////////////////////////////////////////




// // import React, { useEffect, useState } from 'react';
// // import { useParams } from 'react-router-dom';
// // import axios from 'axios';
// // import ProductReviews from './ProductReviews';
// // import useActive from '../../hooks/useActive';
// // import ls from 'localstorage-slim';
// // import { Rate } from 'antd';

// // const ProductSummary = (props) => {
// //   const { active, handleActive, activeClass } = useActive('overview');
// //   const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));
// //   const [reviews, setReviews] = useState([]);
// //   const [comment, setComment] = useState('');
// //   const { productId } = useParams();
// //   const getReviews = (productId) => {
// //     return axios.get(`/avisshow/${productId}`);
// //   };

// //   useEffect(() => {
// //     const productId = props.productId; // Replace with the actual product ID
// //     getReviews(productId)
// //       .then((response) => {
// //         setReviews(response.data.avis);
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching reviews:', error);
// //       });
// //   }, []);

// //   const handleCommentSubmit = () => {
   
  
// //     // const userId = Loginuser.id; 
// //     // const newComment = {
// //     //   id_user:oginuser.id ,
// //     //   id_article: productId,
// //     //   nbr_etoile: 4, 
// //     //   avis: comment,
// //     // };
 
// //         axios.post('http://localhost:8000/api/avisstore', {
// //             id_user: Loginuser.id,
// //             id_article: productId, // Pass the productId value here
// //             nbr_etoile: 4,
// //             avis: comment,
// //           })
// //             .then((response) => {
// //               // Handle the response
// //               const updatedReviews = [...reviews, response.data.avis];
// //               setReviews(updatedReviews);
// //               setComment('');
// //             })
// //             .catch((error) => {
// //               console.error('Error:', error);
// //             });
          
// //   };
  

// //   return (
// //     <>
// //       <section id="product_summary" className="section">
// //         <div className="container">
// //           {/* Product-Summary-Tabs */}
// //           <div className="prod_summary_tabs">
// //             <ul className="tabs">
// //               <li
// //                 className={`tabs_item ${activeClass('overview')}`}
// //                 onClick={() => handleActive('overview')}
// //               >
// //                 Overview
// //               </li>
// //               <li
// //                 className={`tabs_item ${activeClass('reviews')}`}
// //                 onClick={() => handleActive('reviews')}
// //               >
// //                 Reviews
// //               </li>
// //             </ul>
// //           </div>

// //           {/* Product-Summary-Details */}
// //           <div className="prod_summary_details">
// //             {active === 'overview' ? (
// //               <div className="prod_overview">
// //                 {props.description}
// //                 <Rate disabled defaultValue={2} />
// //               </div>
// //             ) : (
// //               <div className="prod_reviews">
// //                 <ul>
// //                   {reviews.map((review) => (
// //                     <ProductReviews
// //                       key={review.id_avis}
// //                       nbrstart={review.nbr_etoile}
// //                       date={review.date}
// //                       review={review.avis}
// //                     />
// //                   ))}
// //                 </ul>
// //                 {Loginuser ? (
// //                   Loginuser.account_type === 'acheteur' ? (
// //                     <>
// //                       <textarea
// //                         wrap="true"
// //                         rows="10"
// //                         cols="33"
// //                         className="outline textarea"
// //                         value={comment}
// //                         onChange={(e) => setComment(e.target.value)}
// //                       ></textarea>
// //                       <button className="publish-btn" onClick={handleCommentSubmit}>
// //                         Publier
// //                       </button>
// //                     </>
// //                   ) : null
// //                 ) : null}
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </section>
// //     </>
// //   );
// // };

// // export default ProductSummary;











// //////////////////////////////////////////////////////////////














// // import React from 'react';

// // import useActive from '../../hooks/useActive';
// // import ls from 'localstorage-slim';
// // import { Rate } from 'antd';
// // import axios from 'axios';

// // const ProductSummary = (props) => {



// //     const { active, handleActive, activeClass } = useActive('overview');
// //     const Loginuser = JSON.parse(ls.get('user', { decrypt: true }));

// //     return (
// //         <>
// //             <section id="product_summary" className="section">
// //                 <div className="container">

// //                     {/*===== Product-Summary-Tabs =====*/}
// //                     <div className="prod_summary_tabs">
// //                         <ul className="tabs">
// //                             {/* <li
// //                                 className={`tabs_item ${activeClass('specs')}`}
// //                                 onClick={() => handleActive('specs')}
// //                             >
// //                                 Specifications
// //                             </li> */}
// //                             <li
// //                                 className={`tabs_item ${activeClass('overview')}`}
// //                                 onClick={() => handleActive('overview')}
// //                             >
// //                                 Overview
// //                             </li>
// //                             <li
// //                                 className={`tabs_item ${activeClass('reviews')}`}
// //                                 onClick={() => handleActive('reviews')}
// //                             >
// //                                 Reviews
// //                             </li>
// //                         </ul>
// //                     </div>

// //                     {/*===== Product-Summary-Details =====*/}
// //                     <div className="prod_summary_details">
// //                         {
// //                             active === 'overview' ? (
// //                                 <div className="prod_overview">
// //                                     {props.description}
// //                                     <Rate disabled defaultValue={2} />
// //                                 </div>
// //                             ) : (
// //                                 <div className="prod_reviews">
// //                                     <ul>
// //                                          {reviews.map((review) => (
// //                     <ProductReviews
// //                     key={review.id}
// //                     userId={review.userId}
// //                     nbrstart={review.rating}
// //                     date={review.date}
// //                     review={review.comment}
// //                   />
// //                 ))}
// //               </ul>
// //                                     </ul>
// //                                     {Loginuser ? (
// //                                         Loginuser.account_type === 'acheteur' ? (
// //                                             <>
// //                                                 <textarea wrap='true' rows="10" cols="33" className='outline textarea'></textarea>
// //                                                 <button className='publish-btn'>Publier</button>
// //                                             </>
// //                                         ) : (null)
// //                                     ):(null)}

// //                                 </div>
// //                             )

// //                         }

// //                     </div>

// //                 </div>
// //             </section>
// //         </>
// //     );
// // };

// // export default ProductSummary;