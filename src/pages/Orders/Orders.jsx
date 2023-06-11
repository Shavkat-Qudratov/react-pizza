import React, { useEffect, useState } from "react";

import {
  getDocs,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Header, Wrapper, OrderCard } from "../../components";
import { ReturnBtn, PayBtn } from "../../components";
import { BsTrash3, BsCart} from "react-icons/bs";
import "./Orders.css";

export const Orders = () => {
  const dispatch = useDispatch();
  const { allPrice, allCount } = useSelector((state) => state);
  const orderRef = collection(db, "order");
  const [data, setData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const getOrders = async () => {
    const res = await getDocs(orderRef);
    const dataTest = res.docs.map((item) => {
      const length = Object.keys(item.data()).length;
      return length > 0 && { ...item.data(), editid: item.id };
    });

    const realData = dataTest.filter((item) => {
      const length = Object.keys(item).length;
      return length && item;
    });
    setData(realData);
  };

  const getOrdertest = async () => {
    const res = await getDocs(orderRef);
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
  };

  const getPizzas = async () => {
    const ref = collection(db, "pizzas");
    const data = await getDocs(ref);
    const filtered = data.docs.map((item) => {
      return { ...item.data(), editid: item.id };
    });
    return filtered;
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteAll = async () => {
    const confirmation = window.confirm("Are you sure to clear all orders?");
    if (confirmation) {
      setDeleteLoading(true);
      const pizzas = await getPizzas();
      pizzas.map(async (item) => {
        if (item.miqdor > 0) {
          const editingref = doc(db, "pizzas", item.editid);
          await updateDoc(editingref, { miqdor: 0 });
        }
      });

      data.map(async (pizza) => {
        const deletingItem = doc(db, "order", pizza.editid);
        await deleteDoc(deletingItem);
      });
      getOrders();
      setDeleteLoading(false);
    }
  };

  return (
    <div className="orders">
      <Wrapper>
        <Header show={"notShow"} />
        <div className="orders-wrapper">
          {data.length ? (
            <>
              <div className="orders-header">
                <div className="orders-header-left">
                  <p>
                    <BsCart />
                  </p>
                  <p>Корзина</p>
                </div>

                <div
                  className={
                    deleteLoading
                      ? "orders-header-right disabled-btn-add"
                      : "orders-header-right"
                  }
                  onClick={deleteAll}
                >
                  <p className="orders-trash">
                    <BsTrash3 />
                  </p>
                  <p>Очистить корзину</p>
                </div>
              </div>
              <div className="orders-main">
                {data.map((item) => {
                  return (
                    <OrderCard
                      key={item.editid}
                      {...item}
                      getOrders={getOrders}
                      getOrdertest={getOrdertest}
                    />
                  );
                })}
              </div>
              <div className="orders-footer">
                <div className="orders-footer-left">
                  <p>
                    Всего пицц:  <span>{allCount}шт.</span>
                  </p>

                  <ReturnBtn />
                </div>

                <div className="orders-footer-right">
                  <p>
                    Сумма заказа:  <span>{allPrice} ₽</span>
                  </p>

                  <PayBtn />
                </div>
              </div>

            </>
          ) : (
            <div className="empty-order">
              <div className="empty-wrapper">
                <h1>Корзина пустая  &#128533;</h1>
                <p>
                  Вероятней всего, вы не заказывали ещё пиццу.
                  Для того, чтобы заказать пиццу, перейди на главную страницу.
                </p>
                <img src="/images/vector.jpg" alt="" />
                <ReturnBtn />
              </div>
            </div>
          )}
        </div>

      </Wrapper>
    </div>
  );
};
