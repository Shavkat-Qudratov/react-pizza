import React, { useState } from "react";
import {  BsPersonLock } from "react-icons/bs";
import {FaUser} from 'react-icons/fa'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebase";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import Alert from "@mui/material/Alert";

import "./Auth.css";
import { SlBasket } from "react-icons/sl";

export const Auth = () => {
  const {
    register,
    formState: { errors },
   
    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const [isAccLoading, setIsAccLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

 
  const signIn = async (data) => {
    try {
      setIsAccLoading(true);
      await createUserWithEmailAndPassword(auth, data.email, data.password);

      setIsAccLoading(false);
      setShowAlert(true);
      localStorage.setItem("isUser", true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
      setIsAccLoading(false);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 1000);
    }
  };

  const signInWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      setShowAlert(true);
      localStorage.setItem("isUser", true);
      setTimeout(() => {
        setShowAlert(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="auth-page">
      {showAlert && (
        <div className="alert-wrapper">
          <Alert
            severity="success"
            sx={{ fontSize: "20px", display: "flex", alignItems: "center" }}
            className="MuiAlert-standard"
          >

            successful
          </Alert>
        </div>
      )}

      {showErrorAlert && (
        <div className="alert-wrapper">
          <Alert
            severity="error"
            sx={{ fontSize: "20px", display: "flex", alignItems: "center" }}
            className="MuiAlert-standard"
          >

            try again
          </Alert>
        </div>
      )}

      <div className="auth-page-wrapper">
        <div className="form-header">
          <SlBasket className="auth-img" size={100} />
        </div>
        <h1>create account</h1>
        <form onSubmit={handleSubmit(signIn)}>
          <div className="input-bg-cont">
            <div className="input-cont">
              <label htmlFor="email">
              <FaUser size={30} />
              </label>
              <input
                placeholder="Username"
                id="email"
                type="text"
                {...register("email", { required: true, minLength: 10 })}
              />
            </div>
            {errors?.email?.type === "required" && (
              <span className="errorMessage">mandatory</span>
            )}
            {errors?.email?.type === "minLength" && (
              <span className="errorMessage">
                10tadan ko'p ma'lumot kiriting
              </span>
            )}
          </div>
          <div className="input-bg-cont">
            <div className="input-cont">
              <label htmlFor="password">
                <BsPersonLock size={30} />
              </label>
              <input
                placeholder="PASSWORD..."
                id="password"
                type="password"
                {...register("password", { required: true, minLength: 6 })}
              />
            </div>
            {errors?.password?.type === "required" && (
              <span className="errorMessage">parol majburiy!</span>
            )}
            {errors?.password?.type === "minLength" && (
              <span className="errorMessage">6 tadan ko'p parol kiriting</span>
            )}
          </div>
          <button type="submit">
            {isAccLoading && <AiOutlineLoading className="loading-auth" />}
            Create
          </button>
          <button onClick={signInWithGoogle}>
            <FcGoogle className="google-icon" />
            Sign in With Google
          </button>
        </form>
        <Link to={"/login"}>
          <p>already have account?</p>
        </Link>
      </div>
    </div>
  );
};
