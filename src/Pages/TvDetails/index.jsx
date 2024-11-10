import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { pathImg } from "../../Constant/pathImg";
import RatingStars from "../../components/RatingStars";
export default function TvDetails() {
  let [details, setDetails] = useState();
  let { id } = useParams();
  function getTvDetails() {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getTvDetails();
  }, []);

  return (
    <>
      {details ? (
        <div className="container h-100">
          <div className="row d-flex align-items-center">
            <div className="col-md-6 mb-4 d-flex align-items-center justify-content-center">
              <img
                src={details ? pathImg(details.poster_path) : ""}
                alt="Movie Poster"
                className="rounded mb-3 product-image"
                id="mainImage"
              />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className="mb-3">{details?.name}</h2>
              <div className="mb-3">
                <RatingStars rating={details?.vote_average} />
                <span className="prim-col">
                  {details?.vote_average} ({details?.vote_count} votes)
                </span>
              </div>
              <div className="mb-3">
                <span className="h5 me-2 prim-col ">Popularity Around :</span>
                <span className="h5 me-2 prim-col ">{details?.popularity}</span>
              </div>

              <p className="mb-4">{details?.overview}</p>
              <button className="btn prim-bg btn-lg mb-3 me-2">
                <i className="fa-solid fa-play"></i> Watch Now
              </button>
              <button className="btn btn-outline-secondary btn-lg mb-3">
                <i className="fa fa-heart"></i> Add to favourite
              </button>
              <div className="mt-4">
                <h5>Production Companies :</h5>
                <ul>
                  {details?.production_companies?.map((company) => (
                    <li key={company.name}>{company.name}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h5>Production Countries:</h5>
                <ul>
                  {details?.production_countries?.map((country) => (
                    <li key={country.name}>{country.name}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h5>Origin Language :</h5>
                <ul>
                  <li>{details?.original_language}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
