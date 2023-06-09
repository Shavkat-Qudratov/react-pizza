import React, { useEffect, useState } from "react";

import { Header, Wrapper, CardContainer } from "../../components/";
import { useNavigate } from "react-router-dom";
import { db } from "../../firebase";
import { getDocs, collection } from "firebase/firestore";
import { useDispatch } from "react-redux";

import "./Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const collectionPizzas = collection(db, "pizzas");
  const collectionOrder = collection(db, "order");
  const [pizzas, setPizzas] = useState([]);
  const [bigPizzas, setBigPizzas] = useState([]);
  const [loading, setLoading] = useState(false);

  const isUser = localStorage.getItem("isUser");
  useEffect(() => {
    getPizzas();
    getOrder();
  }, []);
  const getOrder = async () => {
    try {
      const res = await getDocs(collectionOrder);
      const filtered = res.docs.map((item) => item.data());
      const realData = filtered.filter((item) => {
        const length = Object.keys(item).length;
        return length && item;
      });
      if (realData) {
        const count = realData.map((item) => item.miqdor);
        const allCount = count.reduce((acc, q) => {
          return acc + q;
        }, 0);
        const price = realData.map((item) => {
          return Number(item.price) * item.miqdor;
        });
        const allPrice = price.reduce((acc, q) => {
          return acc + q;
        }, 0);
        dispatch({ type: "SAVE_COUNT", payload: allCount });
        dispatch({ type: "SAVE_PRICE", payload: allPrice });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getPizzas = async () => {
    try {
      setLoading(true);
      const data = await getDocs(collectionPizzas);
      const filteredPizzas = data.docs.map((pizza) => {
        return { ...pizza.data(), id: pizza.id };
      });
      setBigPizzas(filteredPizzas);
      setPizzas(filteredPizzas);
      setLoading(false);

      return filteredPizzas;
    } catch (error) {
      console.error(error);
    }
  };

  if (isUser === null) {
    navigate("/loginorauth");
    return;
  }
  return (
    <div className="home">
      <Wrapper>
        <Header
          bigPizzas={bigPizzas}
          getPizzas={getPizzas}
          setPizzas={setPizzas}
          pizzas={pizzas}
        />
        <CardContainer
          setPizzas={setPizzas}
          loading={loading}
          data={pizzas}
          getOrder={getOrder}
          getPizzas={getPizzas}
        />

      </Wrapper>
    </div>
  );
};
