import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function Login({saveUserData }) {
  let [data, setData] = useState({
    email: "",
    password: "",
  });
  let [errors, setErrors] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);
  let navigate = useNavigate();
  let [showPassword, setShowPassword] = useState(false);
  let togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  function getData(e) {
    let newData = { ...data };
    newData[e.target.name] = e.target.value; //because name is string
    setData(newData);
  }
  function handleLogin(e) {
    // to stop reload
    e.preventDefault();
    let checkError = handleValidation();
    if (checkError?.error) {
      setValidationErrors(checkError.error.details);
      console.log(validationErrors);
    } else {
      axios
        .post(`http://hawas.runasp.net/api/v1/Login`, data)
        .then((res) => {
          localStorage.setItem("token", res.data.jwt);
          saveUserData();
          setValidationErrors([]);
          setErrors("");
          // if success redirect to home
          navigate("/home");
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          console.log("catch");
          setValidationErrors([]);
        });
    }
  }
  function handleValidation() {
    let sechma = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{2,}[!@#$%^&*]{1,}$"))
        .required()
        .messages({
          "string.pattern.base":
            "The password must be between 3 to 30 characters & ends by one special character at least",
        }),
    });
    // abortEarly:true بيقف عند اول مشكله // false هيجيب كل المشاكل
    return sechma.validate(data, { abortEarly: false });
  }
  return (
    <>
      {/*  Fragment*/}
      <div className="register-form w-75 w- m-auto ">
        <h3 className="fw-light text-center">Login</h3>

        {/* if error string  */}
        {errors.length > 0 ? (
          <div className="d-flex text-danger mt-2">
            <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
            <p>{errors}</p>
          </div>
        ) : null}
        {/* for validation errors */}

        {validationErrors.length > 0
          ? validationErrors.map((err, index) => (
              <div key={index} className="d-flex text-danger mt-2 ">
                <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
                <p>{err.message}</p>
              </div>
            ))
          : null}

        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="form-control bg-transparent mb-4"
            placeholder="Enter Last Name"
            autoComplete="email"
            onChange={getData}
            name="email"
          />

          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text bg-transparent">
              <i
                style={{ color: "var(--color-primary)" }}
                className="fas fa-lock "
              ></i>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-control bg-transparent"
              placeholder="Enter Password"
              name="password"
              autoComplete="current-password"
              onChange={(e) => {
                getData(e);
                setShowPassword(e.target.value);
              }}
            />
            <span
              className="input-group-text bg-transparent"
              onClick={togglePasswordVisibility}
            >
              <i
                style={{ color: "var(--color-primary)" }}
                className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                id="togglePassword"
              ></i>
            </span>
          </div>
          <button
            type="submit"
            className="btn bg-transparent mt-3"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}
