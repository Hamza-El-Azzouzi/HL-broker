import React, { useEffect, useRef, useState } from 'react';


import axios from 'axios';
const FilterBarOptions = () => {

    const [type, setType] = useState('Vendre')
    const [Categorie, setCategorie] = useState()

    const { minPrice, maxPrice } = useRef()



    const [DataCategorie, setDataCategorie] = useState()
    useEffect(() => {
        axios.get('http://localhost:8000/api/categorie')
            .then(response => {
                setDataCategorie(response.data)
            }
            ).catch(error => { console.log(error) })
    }, [])
    return (
        <>
            {/*===== Filter-menu =====*/}
            <div className={`filter_options}`}>
                <div className="filter_head">
                    <h3 className="title">Filter By</h3>
                </div>

                <div className="separator"></div>

                {/* Filter by Brands */}
                <div className="filter_block">
                    <h4>Type d'Annonce</h4>
                    <ul className="filter_menu">


                        <li key={1} className="filter_btn">
                            <input
                                type="radio"
                                id='Vendre'
                                name='type'
                                value='Vendre'
                                onClick={(e) => setType(e.target.value)}
                            />
                            <label htmlFor='Vendre'>Vendre</label>
                        </li>
                        <li key={2} className="filter_btn">
                            <input
                                type="radio"
                                id='Louer'
                                name='type'
                                value='Louer'
                                onClick={(e) => setType(e.target.value)}
                            />
                            <label htmlFor='Louer'>Louer</label>
                        </li>



                    </ul>
                </div>

                {/* Filter by Category */}
                <div className="filter_block">
                    <h4>Category</h4>
                    <ul className="filter_menu">
                        {
                            DataCategorie && DataCategorie.map(item => {
                                const { id_categorie, name_categorie } = item;
                                return (
                                    <li key={id_categorie} className="filter_btn">
                                        <input
                                            type="radio"
                                            id={name_categorie}
                                            value={name_categorie}
                                            name='categorie'
                                            onClick={(e) => setCategorie(e.target.value)}
                                        />
                                        <label htmlFor={name_categorie}>{name_categorie}</label>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>

                {/* Filter by Price */}
                <div className="filter_block">
                    <h4>Price</h4>
                    <div>
                        <label htmlFor="minPrice">Min :
                            <input
                                type="number"
                                id="minPrice"
                                defaultValue={100}
                                style={{ width: '90px', paddingLeft: '10px' }}
                                ref={minPrice}

                            /> DH </label>

                    </div>
                    <div
                        style={{ marginTop: "10px" }}>
                        <label htmlFor="maxPrice">Max :
                            <input
                                type="number"
                                id="maxPrice"
                                defaultValue={10000}
                                style={{ width: '90px', paddingLeft: '10px' }}
                                ref={maxPrice}
                            /> DH </label>

                    </div>
                </div>
                {/* <button onClick={handleFilter}>Chercher</button> */}
            </div>
        </>
    );
};

export default FilterBarOptions;