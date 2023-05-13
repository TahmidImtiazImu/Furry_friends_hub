import React, { useState, useRef, useEffect, useContext } from "react";
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GlobalContext } from '../../Global';
import "./SearchBar.css";

const SearchBar = () => {
  const { globalloggedIn, setglobalLoggedIn, globalemail, setglobalEmail, globalType, setGlobalType, globalSubtype, setGlobalSubtype, globalsearch, setGlobalserch } = useContext(GlobalContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const navigate = useNavigate()

  const searchInputRef = useRef();

  const handleChange = (e) => {

    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Make AJAX call to server to retrieve suggestions
    axios.get(`/search?q=${newQuery}`)
      .then(response => {
        setSuggestions(response.data.suggestions);
      })
      .catch(error => {
        console.error(error);
      });
  };

    // const term = event.target.value;
    // setSearchTerm(term);
    // // `https://api.giphy.com/v1/tags/related/${term}?api_key=JECDEzFx0OPBXCnz7P0f1DMFwSIWawPL&limit=5`
    // // fetch suggestions from Giphy API
    // fetch('/Search').then(response => response.json())
    //   .then((data) => {
    //     // const suggestions = data.data.map((item) => item.name);
    //     setSuggestions(suggestions);
    // });
    // };

  const handleSelect = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);

    // Make AJAX call to server to retrieve suggestions
    axios.get(`/search?q=${suggestion}`)
      .then(response => {
        setSearchResult(response.data.suggestions);
      })
      .catch(error => {
        console.error(error);
      });


  };

  const handleInputClick = () => {
    setExpanded(true);
    searchInputRef.current.focus();
  };

  const handleDocumentClick = (event) => {
    if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
      setExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  function navigatesearch() {
    if(query.length > 0){
      setGlobalType('all');
      setGlobalSubtype('all');
      setGlobalserch(true);
      // window.location.reload();
      navigate(`/Product/${query}`);
    }
    else{
      setGlobalserch(false);
    }

  }

  return (
    <div className={`search-bar ${expanded ? "expanded" : ""}`}>
      <div className="search-input-container" onClick={handleInputClick}>
        <input className="search-input-text"
          type="text"
          placeholder="Search"
          value={query}
          onChange={handleChange}
          ref={searchInputRef}
        />
        <button className="search-btn" onClick={navigatesearch}>
          <i className="fas fa-search"></i>
        </button>
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="suggestion" onClick={() => handleSelect(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
