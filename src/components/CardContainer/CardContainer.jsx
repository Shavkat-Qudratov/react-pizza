import React, { useState, useEffect } from "react";
import { Card } from "../Card";
import { VscTriangleUp, VscTriangleDown } from "react-icons/vsc";
import { MyLoader } from "../loadingSkeleton";
import "./CardContainer.css";

export const CardContainer = ({ setPizzas, data, loading, getOrder, getPizzas }) => {
  const [active, setActive] = useState(false);
  const [activeItem, setActiveItem] = useState("популярности");
  const [pitsalar, setPitsalar] = useState(data);

  const testToifalar = data.map((element) => {
    return element.toifa;
  });
  const toifalar = ["Все ", ...new Set(testToifalar)];

  const [hozirgiToifa, setHozirgiToifa] = useState("Все пиццы");

  useEffect(() => {
    setPitsalar(data);
  }, [loading]);

  const sortby = async () => {
    const pizzatest = await getPizzas();
    if (activeItem === "популярности") {
      setPitsalar(data);
      return;
    }
    if (activeItem === "по цене") {
      setPitsalar(pizzatest.sort(compare));
    }
    if (activeItem === "по алфавиту") {
      setPitsalar(
        pizzatest.sort(function (a, b) {
          if (a.nomi < b.nomi) {
            return -1;
          }
          if (a.nomi > b.nomi) {
            return 1;
          }
          return 0;
        })
      );
    }
  };

  useEffect(() => {
    sortby();
  }, [activeItem]);

  function setPizza(toifa) {
    if (toifa === "Все пиццы") {
      setPitsalar(data);
      setHozirgiToifa("Все пиццы");
    } else {
      const pizza = data.filter((item) => {
        return item.toifa === toifa;
      });
      setHozirgiToifa(toifa);
      setPitsalar(pizza);
    }
  }

  const fakeArr = new Array(8).fill([]);
  const listItems = [
    { id: 1, title: "популярности" },
    { id: 2, title: "по цене" },
    { id: 3, title: "по алфавиту" },
  ];

  const compare = (a, b) => {
    const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ""));
    const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ""));

    return aPrice - bPrice;
  };
  return (
    <main>
      <div className="mainHeader">
        <div className="mainHeaderLeft">
          {toifalar.map((toifa, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setPizza(toifa);
                }}
                className={
                  hozirgiToifa === toifa ? "toifaBtn hozirgiToifa" : "toifaBtn"
                }
              >
                {toifa}
              </button>
            );
          })}
        </div>

        <div className="main-header-right">
          <div
            className="filter-select"
            onClick={() => setActive((value) => !value)}
          >
            <p>
            Сортировка по:
              <span>{active ? <VscTriangleUp /> : <VscTriangleDown />}</span>
              <span>{activeItem}</span>
             
            </p>
            <ul className={active ? "filter-list" : "hide-filter-list"}>
              {listItems.map((item) => {
                return (
                  <li key={item.id} onClick={() => setActiveItem(item.title)}>
                    {item.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div
        className="main-cards"
        onClick={() => {
          setActive(false);
        }}
      >
        <div className="main-cards-title"> Все пиццы</div>
        <div className="main-cards-all">
          {loading
            ? fakeArr.map((item, index) => {
                return <MyLoader key={index} />;
              })
            : pitsalar.map((pitsa) => {
                return (
                  <Card
                    key={pitsa.id}
                    getOrder={getOrder}
                    setPizzas={setPizzas}
                    {...pitsa}
                  />
                );
              })}
        </div>
      </div>
    </main>
  );
};
