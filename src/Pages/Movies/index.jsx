import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import Loading from "../../components/Loading";
import { MovieContext } from "../../components/Context";
import './style.css'
export default function Movies() {
 let { movies, setPage } = useContext(MovieContext);
 let num = new Array(10).fill().map((item,i)=>i+1);
   const [activePage, setActivePage] = useState(() => {
     return parseInt(localStorage.getItem("activePage")) || 1;
   });

   const handlePageClick = (pageNumber) => {
     setPage(pageNumber);
     setActivePage(pageNumber);
      localStorage.setItem("activePage", pageNumber);
   };

   const handleNextPage = () => {
     if (activePage < num.length) {
       handlePageClick(activePage + 1);
     }
   };

   useEffect(() => {
     setPage(activePage);
   }, [activePage, setPage]);

   const handlePreviousPage = () => {
     if (activePage > 1) {
       handlePageClick(activePage - 1);
     }
   };
  return (
    <>
      {movies.length ? (
        <div className="row">
          <div className="col-md-4 d-flex align-items-center header">
            <div className="main-header mx-auto mx-md-0">
              <div className="border w-25"></div>
              <h1 className="h3 mt-2">
                Watch All <br /> Trending
                <br />
                Movies
              </h1>
              <p>Just on Our Platform</p>
              <div className="border w-75"></div>
            </div>
          </div>
          {movies.slice(0, 16).map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
          <nav aria-label="Page navigation example ">
            <ul className="pagination d-flex justify-content-center mt-2">
              <li className={`page-item ${activePage === 1 ? "disabled" : ""}`}>
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={handlePreviousPage}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="sr-only">Previous</span>
                </a>
              </li>
              {num.map((item) => (
                <li
                  className={`page-item ${item === activePage ? "active" : ""}`}
                  key={item}
                  onClick={() => handlePageClick(item)}
                >
                  <a className="page-link" href="#">
                    {item}
                  </a>
                </li>
              ))}
              <li
                className={`page-item ${
                  activePage === num.length ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={handleNextPage}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
