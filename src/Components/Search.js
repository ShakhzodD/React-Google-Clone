import React, { useState, useEffect } from "react";
import { FaSistrix, FaMicrophone } from "react-icons/fa";
import { key, cx } from "../API";
import axios from "axios";
import Show from "./Show";

const Search = props => {
  const [state, setState] = useState(
    props.location.state ? props.location.state : ""
  );

  const goBack = () => {
    props.history.push("/");
  };

  const [results, setResults] = useState([]);
  const [info, setInfo] = useState("");
  const searchGoogle = async e => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${state}`
      );
      if (response) {
        console.log(response);
        setResults(response.data.items);
        setInfo(response.data.searchInformation);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getPosts() {
      if (props.location.state) {
        try {
          const response = await axios.get(
            `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${state}`
          );
          if (response) {
            console.log(response);
            setResults(response.data.items);
            setInfo(response.data.searchInformation);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    getPosts();
  }, []);
  return (
    <div className="search">
      <div className="search__form">
        <div className="search__form-logo">
          <img
            src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
            alt="Google Logo"
            onClick={goBack}
          />
        </div>
        <div className="search__form-input">
          <form className="home__form" onSubmit={searchGoogle}>
            <div className="home__group">
              <input
                type="text"
                className="home__input"
                value={state}
                onChange={e => setState(e.target.value)}
                required
              />
              <FaSistrix className="search__icon" />
              <FaMicrophone className="microphone" />
            </div>
          </form>
        </div>
      </div>
      <Show results={results} info={info} />
    </div>
  );
};

export default Search;
