import React, { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import commonContext from '../../contexts/common/commonContext';
import useOutsideClose from '../../hooks/useOutsideClose';
import useScrollDisable from '../../hooks/useScrollDisable';

const SearchBar = () => {
  const { isSearchOpen, toggleSearch, searchResults, setSearchResults } = useContext(commonContext);
  const searchRef = useRef();

  // Fermer la SearchBar
  const closeSearch = () => {
    toggleSearch(false);
    setSearchResults([]);
  };

  useOutsideClose(searchRef, closeSearch);
  useScrollDisable(isSearchOpen);

  // Gérer la recherche
  const handleSearching = (e) => {
    const searchedTerm = e.target.value.toLowerCase().trim();

    if (searchedTerm === '') {
      setSearchResults([]);
    } else {
      axios.get('http://localhost:8000/api/articles/search', {
        params: {
          searchTerm: searchedTerm
        }
      })
        .then(response => {
          setSearchResults(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <>
      {
        isSearchOpen && (
          <div id="searchbar" className="backdrop">
            <div className="searchbar_content" ref={searchRef}>
              <div className="search_box">
                <input
                  type="search"
                  className="input_field"
                  placeholder="Search for product..."
                  onChange={handleSearching}
                />
              </div>

              {
                searchResults.length !== 0 && (
                  <div className="search_results">
                    {
                      searchResults.map(item => {
                        const { id_article, name_article} = item;
                        return (
                          <a
                            href={`/product-details/${id_article}`}
                            onClick={closeSearch}
                            key={id_article}
                           
                          >
                            {name_article}
                          </a>
                        );
                      })
                    }
                  </div>
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
};

export default SearchBar;
















