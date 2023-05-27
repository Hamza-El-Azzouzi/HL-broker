import React from 'react';
import { IoMdStar } from 'react-icons/io';

const ProductReviews = (props) => {

    return (
        <>
            <li>
                <div className="user_info">
                    <img src={props.src} alt="user-img" />
                    <div>
                        <h4>{props.username}</h4>
                        <div className="user_ratings">
                            <span className="rating_star">
                               {props.nbrstart}
                            </span>
                            <span>|</span>
                            <span className="date">{props.date}</span>
                        </div>
                    </div>
                </div>
                <p className="user_review">{props.review}</p>
            </li>
        </>
    );
};

export default ProductReviews;