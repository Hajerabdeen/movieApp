import React, { useContext } from "react";
import { MovieContext } from "../../components/Context";
import Loading from "../../components/Loading";
import TvCard from "../../components/TvCard";

export default function Tv() {
  let { tv } = useContext(MovieContext);
  return (
    <>
      {tv.length ? (
        <div className="row">
          <div className="col-md-4 d-flex align-items-center header">
            <div className="main-header mx-auto mx-md-0">
              <div className="border w-25"></div>
              <h1 className="h3 mt-2">
                Watch ON <br /> Your
                <br />
                Tv
              </h1>
              <p>Just on Our Platform</p>
              <div className="border w-75"></div>
            </div>
          </div>
          {tv.slice(0, 16).map((elem) => (
            <TvCard elem={elem} key={elem.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
