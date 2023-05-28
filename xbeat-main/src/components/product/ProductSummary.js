import React from 'react';

import useActive from '../../hooks/useActive';


const ProductSummary = (props) => {



    const { active, handleActive, activeClass } = useActive('overview');


    return (
        <>
            <section id="product_summary" className="section">
                <div className="container">

                    {/*===== Product-Summary-Tabs =====*/}
                    <div className="prod_summary_tabs">
                        <ul className="tabs">
                            {/* <li
                                className={`tabs_item ${activeClass('specs')}`}
                                onClick={() => handleActive('specs')}
                            >
                                Specifications
                            </li> */}
                            <li
                                className={`tabs_item ${activeClass('overview')}`}
                                onClick={() => handleActive('overview')}
                            >
                                Overview
                            </li>
                            <li
                                className={`tabs_item ${activeClass('reviews')}`}
                                onClick={() => handleActive('reviews')}
                            >
                                Reviews
                            </li>
                        </ul>
                    </div>

                    {/*===== Product-Summary-Details =====*/}
                    <div className="prod_summary_details">
                        {
                             active === 'overview' ? (
                                <div className="prod_overview">
                                    {props.description}
                                </div>
                            ) : (
                                <div className="prod_reviews">
                                    <ul>
                                       {/* map sur data l ghadi tji mn database */}
                                    </ul>
                                   <textarea wrap='true' rows="10" cols="33"  className='outline textarea'></textarea>
                                   <button className='publish-btn'>Publier</button>
                                </div>
                            )

                        }

                    </div>

                </div>
            </section>
        </>
    );
};

export default ProductSummary;