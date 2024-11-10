import React, { useState } from "react";
import "./css/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";
export default function Register() {
  let [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    hash: "",
  });
  let [errors, setErrors] = useState("");
  let [validationErrors, setValidationErrors] = useState([]);
  let navigate = useNavigate();

  function getData(e) {
    let newData = { ...data };
    newData[e.target.name] = e.target.value; //because name is string
    setData(newData);
  }

  function handleRegister(e) {
    // to stop reload
    e.preventDefault();
    let checkError = handleValidation();
    if(checkError?.error){
     console.log("يوجد خطأ");
     setValidationErrors(checkError.error.details);
    }else{
      axios
        .post(`http://hawas.runasp.net/api/v1/Register`, data)
        .then((res) => {
           setValidationErrors([]);
          // if success redirect to login
          navigate("/login");
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          setValidationErrors([])
        });
    }
    alert("تم التسجيل بنجاح")
  }

  function handleValidation() {
    let sechma = Joi.object({
      firstName: Joi.string().alphanum().min(3).max(15),
      lastName: Joi.string().alphanum().min(3).max(15),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
      hash: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{2,}[!@#$%^&*]{1,}$"))
        .messages({
          "string.pattern.base":
            "The password must be between 3 to 30 characters & contain at least one special character",
        }),
    });
    // abortEarly:true بيقف عند اول مشكله // false هيجيب كل المشاكل
    return sechma.validate(data, { abortEarly: false });
  }
  return (
    <>
      {/*  Fragment*/}
      <div className="register-form  w-md-50 m-auto ">
        <h3 className="fw-light text-center">Register</h3>
        {/* //if error array */}
        {/* {
  errors && errors.length > 0 ? (
    errors.map((err, index) => (
      <div key={index} className="d-flex text-danger mt-2">
        <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
        <p>{err}</p>
      </div>
    ))
  ) : <></>
} */}

        {/* if error string  */}
        {errors.length > 0 ? (
          <div className="d-flex text-danger mt-2">
            <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
            <p>{errors}</p>
          </div>
        ) : null}
        {/* for validation errors */}
        {validationErrors.length > 0 ? validationErrors.map((err, index) => (
          <div key={index} className="d-flex text-danger mt-2">
            <i className="fa-solid fa-circle-exclamation mt-1 me-2"></i>
            <p>{err.message}</p>
          </div>
        )) : null}

        <form onSubmit={handleRegister}>
          <label htmlFor="firstname" className="form-label">
            First Name :
          </label>
          <input
            type="text"
            id="firstname"
            className="form-control bg-transparent mb-3"
            placeholder="Enter First Name"
            onChange={getData}
            name="firstName"
          />
          <label htmlFor="lastname" className="form-label">
            Last Name :
          </label>
          <input
            type="text"
            id="lastname"
            className="form-control bg-transparent mb-3"
            placeholder="Enter Last Name"
            onChange={getData}
            name="lastName"
          />
          <label htmlFor="email" className="form-label">
            Email :
          </label>
          <input
            type="email"
            id="email"
            className="form-control bg-transparent mb-3"
            placeholder="Enter Last Name"
            onChange={getData}
            name="email"
          />

          <label htmlFor="password" className="form-label">
            Password :
          </label>
          <input
            type="password"
            id="password"
            className="form-control bg-transparent mb-3"
            placeholder="Enter Password"
            onChange={getData}
            name="hash"
          />
          <button
            type="submit"
            className="btn bg-transparent"
            onClick={handleRegister}
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
}

