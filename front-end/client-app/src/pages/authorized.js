import React from 'react';
import { Link } from 'react-router-dom';

const AuthorizedPage = () => {
    return (
        <>
            <section id="error_page" className="section">
                <div className="container">
                    <div className="error_page_content">
                        <h1>403</h1>
                        <h2>FORBIDDEN</h2>
                        <h3>Sorry, you are not authorized to access this page.</h3>
                        <Link to="/" className="btn">Go Home</Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AuthorizedPage;