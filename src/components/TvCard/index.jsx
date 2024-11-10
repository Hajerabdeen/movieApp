import React from 'react'
import { Link } from 'react-router-dom';
import { pathImg } from '../../Constant/pathImg';

export default function TvCard({elem}) {
  return (
    <div className=" col-8 mx-auto mx-md-0 col-md-2 p-0 mt-3 mt-md-0 ">
      <Link to={`/tv/${elem.id}`} className="text-decoration-none">
        <div className="inner p-1 cursor-pointer">
          <img
            className="img-fluid w-100"
            src={pathImg(elem.poster_path)}
            alt=""
          />
          <h1
            className=" p-3 h6 text-fade text-center text-truncate mb-0 pb-1"
            data-toggle="tooltip"
            data-placement="top"
            title={elem.name ? elem.name : "no title"}
          >
            {elem.name ? elem.name : "no title"}
          </h1>
        </div>
      </Link>
    </div>
  );
}
