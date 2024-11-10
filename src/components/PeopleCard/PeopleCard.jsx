import React from 'react'
import { pathImg } from '../../Constant/pathImg';
import { Link } from 'react-router-dom';

export default function PeopleCard({person}) {
  return (
    <div className="col-8 mx-auto mx-md-0 col-md-2 p-0 mt-3 mt-md-0 ">
      <Link to={`/person/${person.id}`} className="text-decoration-none">
        <div className="inner p-1">
          <img
            className="img-fluid w-100"
            src={pathImg(person.profile_path)}
            alt=""
          />
          <h1
            className="p-3 h6 text-fade text-center text-truncate mb-0 pb-1"
            data-toggle="tooltip"
            data-placement="top"
            title={person.name ? person.name : "no title"}
          >
            {person.name ? person.name : "no title"}
          </h1>
        </div>
      </Link>
    </div>
  );
}
