
import React, { useContext, useEffect, useState } from "react";
import "./css/style.css";
import MovieCard from "../../components/MovieCard/MovieCard";
import PeopleCard from "../../components/PeopleCard/PeopleCard";
import Loading from "../../components/Loading";
import { MovieContext } from "../../components/Context";

export default function Home() {
  let { movies, persons} = useContext(MovieContext);
  return (
    <>
      {persons.length && movies.length ? (
        <div>
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
            <div className="col-md-4 d-flex align-items-center header">
              <div className="main-header mx-auto mx-md-0">
                <div className="border w-25"></div>
                <h1 className="h3 mt-2">
                  Trending <br /> Actors
                  <br />
                  for the Week
                </h1>
                <p>Top Actors by Day</p>
                <div className="border w-75"></div>
              </div>
            </div>
            {persons
              .map(
                (person) =>
                  person.profile_path && (
                    <PeopleCard person={person} key={person.id} />
                  )
              )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
