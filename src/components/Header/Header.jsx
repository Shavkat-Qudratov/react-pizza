import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import "./Header.css";

export const Header = ({ bigPizzas, show, setPizzas, pizzas, getPizzas }) => {
  const dispatch = useDispatch();
  const { allCount, allPrice, allPizzas } = useSelector((state) => state);
  const [searchValue, setSearchValue] = useState("");

  const search = async (e) => {
    setSearchValue(e.target.value);
    if (searchValue.trim().length) {
      const searchedItems = bigPizzas.filter((item) => {
        return item.nomi.includes(searchValue.trim());
      });
      await getPizzas();
      setPizzas(searchedItems);
    } else {
      await getPizzas();

      setPizzas(bigPizzas);
    }
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to={"/"}>
          <img
            className='pizzaIcon'
            src="/images/pizzaicon.jpg"
            alt="pizza icon"
          />
          <p className='text1'>REACT PIZZA</p>
          <p className='text2'>самая вкусная пицца во вселенной</p>
        </Link>
      </div>

      {!show ? (
        <>
          <div className="pizzaSearch">
            <input type="text" onChange={search} placeholder="Поиск...." />
          </div>
          <div className="header-right-wrapper">
            <Link to={"/addnewpizza"}>
              <button className="AddBtn">
                Add Pizza
              </button>
               
             
            </Link>

            <div className="headerRight">
              <Link to={"./orders"}>
                <p className='text3'>{allPrice}₽</p>
                <p className='text4'>
                  <SlBasket />
                </p>

              </Link>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
