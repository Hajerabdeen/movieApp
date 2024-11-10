import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "./css/App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.min.css";
import Movies from "./Pages/Movies";
import People from "./Pages/People";
import Tv from "./Pages/Tv";
import Login from "./Pages/Login";
import Register from "./Pages/Resigster";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import MovieDetails from "./Pages/MovieDetails";
import PersonDetails from "./Pages/PersonDetails";
import TvDetails from "./Pages/TvDetails";

function App() {
  let [userData, setUserData] = useState(null);
  let navigate = useNavigate();
  function saveUserData() {
    if (localStorage.getItem("token")) {
      let encodeToken = localStorage.getItem("token");
      let decodeToken = jwtDecode(encodeToken);
      setUserData(decodeToken);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("activePage");
    setUserData(null);
    navigate("/login");
  }

  //component
  function ProtectRoute(props) {
    if (localStorage.getItem("token")) {
      return props.children;
    } else {
      // component to use navigate in return
      return <Navigate to={"/login"} />;
    }
  }
  //bring token from local storage and put it in sava data user
  useEffect(() => {
    saveUserData();
  }, []);
  return (
    <div>
      <Navbar userData={userData} logOut={logOut} />
      {/* Container div with top margin of 80px to make room for the fixed navbar */}
      <div className="container" style={{ marginTop: "80px" }}>
        <Routes>
          <Route
            path=""
            element={
              <ProtectRoute>
                <Home/>
              </ProtectRoute>
            }
          />
          <Route
            path="home"
            element={
              <ProtectRoute>
                <Home />
              </ProtectRoute>
            }
          />
          <Route
            path="movies"
            element={
              <ProtectRoute>
                <Movies />
              </ProtectRoute>
            }
          />
          <Route
            path="people"
            element={
              <ProtectRoute>
                <People />
              </ProtectRoute>
            }
          />
          <Route
            path="tv"
            element={
              <ProtectRoute>
                <Tv />
              </ProtectRoute>
            }
          />
          <Route
            path="movie/:id"
            element={
              <ProtectRoute>
                <MovieDetails />
              </ProtectRoute>
            }
          />
          <Route
            path="person/:id"
            element={
              <ProtectRoute>
                <PersonDetails />
              </ProtectRoute>
            }
          />
          <Route
            path="tv/:id"
            element={
              <ProtectRoute>
                <TvDetails />
              </ProtectRoute>
            }
          />
          <Route path="login" element={<Login saveUserData={saveUserData} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="*"
            element={<h1 className=" text-center">Not Found !</h1>}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
