import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MovieContext = createContext();

export default function MovieContextProvider (props) {
  let [movies, setMovies] = useState([]);
  let [persons, setPersons] = useState([]);
  let [tv, setTv] = useState([]);
  let [page, setPage]=useState(1)
  function getData(type, callback) {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/${type}/day?api_key=c9fac173689f5f01ba1b0420f66d7093&include_adult=false&include_video=false&language=en-US&page=${page}`
      )
      .then((res) => {
        callback(res.data.results);
      })
      .catch((err) => console.log(err));
  }
   useEffect(() => {
     getData("movie", setMovies);
   }, [page]);//component get update
  useEffect(() => {
    getData("person", setPersons);
    getData("tv", setTv);
  }, []);
return (
  <MovieContext.Provider value={{ movies, persons, tv, setPage} }>
    {props.children}
  </MovieContext.Provider>
);
}
