import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { ReturnBtn } from "../../components";
import "./style.css";
import { AiOutlineLoading } from "react-icons/ai";
export const AddNewPizza = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const pizzasRef = collection(db, "pizzas");

  const addPizza = async (data) => {
    setLoading(true);
    const newPizza = {
      nomi: data.nomi,
      img: data.img,
      price: data.price.toString(),
      toifa: data.toifa,
      miqdor: 0,
    };
    await addDoc(pizzasRef, newPizza);
    navigate("/");
    setLoading(false);
  };
  return (
    <div className="add-sneaker-page">
      <form onSubmit={handleSubmit(addPizza)}>
        <h2>New pizza</h2>

        <div>
          <label htmlFor="nomi">Pizza Name</label>
          <input
            type="text"
            id="nomi"
            placeholder="name.. "
            {...register("nomi", { required: true })}
          />
          {errors?.nomi?.type === "required" && (
            <span className="errorMessage">mandatory</span>
          )}
        </div>
        <div>
          <label htmlFor="img">Url img</label>
          <input
            type="text"
            id="img"
            placeholder="Url-adress"
            {...register("img", { required: true, minLength: 15 })}
          />
          {errors?.img?.type === "required" && (
            <span className="errorMessage">mandatory</span>
          )}
          {errors?.img?.type === "minLength" && (
            <span className="errorMessage">
              15 symbol
            </span>
          )}
        </div>
        <div>
          <label htmlFor="price">price</label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: true,
              max: 4000,
              min: 1,
            })}
          />
          {errors?.price?.type === "required" && (
            <span className="errorMessage"> mandatory </span>
          )}

          {errors?.price?.type === "maxLength" && (
            <span className="errorMessage">
              маx 1000
            </span>
          )}
        </div>
        <div>
          <label htmlFor="toifa">категория</label>
          <select id="toifa" {...register("toifa")}>
            <option value="Мясные">Мясные</option>
            <option value="Вегетарианская">Вегетарианская</option>
            <option value="Гриль">Гриль</option>
            <option value="grill">Grill</option>
            <option value="Острые">Острые</option>
          </select>
        </div>
        <button
          type="submit"
          className={
            loading ? "add-pizza-btn disabled-btn-add" : "add-pizza-btn"
          }
        >
          {" "}
          {loading && <AiOutlineLoading className="loading-auth" />} Submit
        </button>
        <ReturnBtn />
      </form>
    </div>
  );
};

