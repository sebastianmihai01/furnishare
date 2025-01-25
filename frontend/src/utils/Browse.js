import React, { Fragment, useCallback, useEffect, useState } from "react";
import HeaderButton from "../Navigation/HeaderButton";
import "bootstrap/dist/css/bootstrap.css";
import { Routes, Route, Switch, Redirect } from "react-router-dom";
import Contact from "../Misc/Contact";
import { unmountComponentAtNode } from "react-dom";
import Home from "../Auth/Home";
import NavigationBar from "../Navigation/NavigationBar";
import { SSL_OP_EPHEMERAL_RSA } from "constants";
import { wait, waitFor } from "@testing-library/dom";
import imdb from "../Images/imdb.png";
import LoadingModal from "./LoadingModal";
import ImdbModal from "./ImdbModal";
import ShareModal from "../Misc/ShareModal";
import Pagination from "../Misc/Pagination";

const Browse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [films, setFilms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("Batman Movie");
  const [imdbModalOn, setImdbModalOn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(3);
  const [prev, setPrev] = useState({});
  const [data, setData] = useState({});

  useEffect(async () => {
    setIsLoading(true);
    setImdbModalOn(false);
    await fetch(
      `https://dept-node-case-backend.herokuapp.com/searchyoutube/${searchQuery}` +
        " Official Trailer",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        if (res.status != "200") {
          alert(
            "Error when fetching your film! Please contact the administrator!"
          );
          //throw new Error("Error when fetching your film");
        }
        return res.json();
      })
      .then((filmList) => {
        let loadedFilms = [];

        filmList.forEach(function (item) {
          let element = { title: item.video, url: item.metadata.url };
          loadedFilms.push(element);
        });
        setFilms(loadedFilms);
        if (
          prev == undefined ||
          prev == null ||
          JSON.stringify(filmList) != JSON.stringify(prev)
        )
          setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [searchQuery]);

  const imdbModal = async (elements) => {
    setImdbModalOn(!imdbModalOn);
    const passElements = elements;
    const words = passElements.title.split(" ");
    let title_query = "";
    if (words.length > 1) title_query = words[0] + " " + words[1];
    else if (words.length == 1) title_query = words[0];
    else {
      alert("Not a valid film name!");
      return;
    }
    console.log(title_query);
    await fetch(`https://dept-node-case-backend.herokuapp.com/searchimdb/${title_query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => {
        if (res.status != "200") {
          alert(
            "Error when fetching your film! Please contact the administrator!"
          );
        }
        return res.json();
      })
      .then((filmDetail) => {
        passElements.genres = filmDetail.genres || "Not genres applicable";
        passElements.rating = filmDetail.rating || "Not rating found";
        passElements.date = filmDetail.date || "No date specified";
        setData(passElements);
      })
      .catch((error) => console.log(error));
  };
  const hide = (event) => {
    setImdbModalOn(false);
  };

  const indexLastPost = currentPage * postsPerPage;
  const indexFirstPost = indexLastPost - postsPerPage;
  const currPosts = films.slice(indexFirstPost, indexLastPost);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingModal />}

      {imdbModalOn && (
        <React.Fragment>
          <ImdbModal
            title={data.title}
            genres={data.genres}
            rating={data.rating}
            date={data.date}
          >
            <ShareModal name={data.title}/>
            <button type="button" class="btn btn-outline-dark" onClick={hide}>
              Close
            </button>
          </ImdbModal>
        </React.Fragment>
      )}

      <div className="container">
        <div
          class="input-group"
          style={{
            marginTop: "1em",
            width: "40em",
            justifyContent: "center",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <input
            type="search"
            id="search-bar-query"
            class="form-control rounded"
            placeholder="Search for your favourite film here!"
            aria-label="Search"
            aria-describedby="search-addon"
          />
          <button
            type="button"
            class="btn btn-dark"
            style={{ zIndex: "0" }}
            onClick={() => {
              setSearchQuery(
                document.getElementById("search-bar-query").value || ""
              );
              console.log(
                document.getElementById("search-bar-query").value || "ok"
              );
            }}
          >
            Search
          </button>
        </div>
        <div className="row" style={{ margin: "auto" }}>
          <div
            className="row row-cols-1 row-cols-md-3"
            style={{
              width: "70rem",
              color: "black",
              opacity: ".95",
              paddingTop: "3rem",
              alignContent: "center",
              margin: "auto",
            }}
          >
            {films &&
              films.map(
                (el) =>
                  films.indexOf(el) / postsPerPage < currentPage &&
                  films.indexOf(el) / postsPerPage >= currentPage - 1 && (
                    <div className="col mb-4 d-flex justify-content-center">
                      <div className="card h-100 shadow-lg p-2 mb-2 bg-white rounded">
                        <img
                          src={el.url}
                          alt="film logo"
                          class="card-img-top"
                          href={el.url}
                        />
                        <div
                          className="card-body"
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h5 className="card-title">
                            {el.title || "no title"}
                          </h5>
                          <p style={{ fontSize: "20px", marginTop: "2em" }}>
                            {" "}
                            View IMDd Statistics{" "}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              imdbModal({
                                title: el.title,
                                genres: "",
                                rating: "",
                                date: "",
                              })
                            }
                            style={{
                              marginBottom: "1em",
                              textDecoration: "none",
                              backgroundColor: "transparent",
                              border: "none",
                              cursor: "pointer",
                              overflow: "hidden",
                              outline: "none",
                            }}
                          >
                            <img
                              src={imdb}
                              alt="imdb logo"
                              style={{
                                width: "150px",
                                height: "60px",
                                marginTop: "5px",
                                margin: "auto",
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
              )}
          </div>
          <div
            style={{
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={films.length}
              paginate={paginate}
              style={{ float: "center" }}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Browse;
