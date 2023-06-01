
import React from 'react';
// import { IoMdStar } from 'react-icons/io';
import { Rate } from 'antd';
import { displayMoney } from '../../helpers/utils';


const ProductReviews = (props) => {

    return (
        <>
            <li>
                <div className="user_info">
                     <img src={`http://localhost:8000/avatar/${props.image}`} alt="avatat" />
                    <div>
                         <span className="date">{props.name}</span>
                        <div className="user_ratings">
                            <span className="rating_star">
                               {/* {props.nbrstart} */}
                               <Rate disabled  style={{  display: 'inline-block'}}  defaultValue={props.nbr_etoile}  />;
                            </span>
                           <span>|</span>
                     <span className="date">{props.date}</span>
                        </div>
                    </div>
                </div>
                 <p className="user_review">{props.avis}</p>
            </li>
            
        </>
    );
};

export default ProductReviews;