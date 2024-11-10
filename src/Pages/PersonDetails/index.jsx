import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { pathImg } from "../../Constant/pathImg";
import Loading from "../../components/Loading/index";

export default function PersonDetails() {
  const [details, setDetails] = useState();
  const { id } = useParams();
  const maxLength = 200;
  const [isReadMore, setIsReadMore] = useState(false);
  const contentRef = useRef(null);

  function getPersonDetails() {
    axios
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`
      )
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getPersonDetails();
  }, []);

  const displayBiography = isReadMore
    ? details?.biography
    : details?.biography?.slice(0, maxLength);

  return (
    <>
      {details?(
        <div className="container person-det d-flex align-items-center justify-content-center">
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-md-6 mt-3 d-flex align-items-center justify-content-center">
              <img
                src={details ? pathImg(details.profile_path) : ""}
                alt="actor Photo"
                className="rounded mb-3 product-image img-fluid"
                id="mainImage"
              />
            </div>
            <div className="col-md-6 mt-5">
              <h2 className="mb-3">{details?.name}</h2>
              <p className="mb-4">
                Also Known As : {details?.also_known_as[0]}
              </p>
              <div className="mb-3">
                <span className="h5 me-2 prim-col ">
                  Was born at : {details?.place_of_birth} in {details?.birthday}
                </span>
              </div>
              <div className="mb-3">
                <span className="h5 me-2 prim-col ">Popularity Around :</span>
                <span className="h5 me-2 prim-col ">{details?.popularity}</span>
              </div>
              <div
                className={`biography-container ${
                  isReadMore ? "expanded" : ""
                }`}
                ref={contentRef}
              >
                <p className="mb-4">
                  Biography: <br />
                  {displayBiography}
                  {details?.biography?.length > maxLength &&
                    !isReadMore &&
                    " ... "}
                  {details?.biography?.length > maxLength && (
                    <button
                      className="btn btn-link prim-col p-0 ms-1"
                      onClick={() => setIsReadMore(!isReadMore)}
                    >
                      {isReadMore ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              </div>
              <button className="btn prim-bg btn-lg mb-3 me-2">
                <i className="fa-solid fa-play"></i> Show Movies
              </button>
              <div className="mt-4">
                <h5>Known For Department :</h5>
                <ul>
                  <li>{details?.known_for_department}</li>
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
