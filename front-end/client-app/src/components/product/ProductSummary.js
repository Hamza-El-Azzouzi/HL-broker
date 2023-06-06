

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
  const [value, setValue] = useState(0);
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