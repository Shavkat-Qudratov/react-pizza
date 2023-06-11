import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, updateDoc, getDocs, doc } from "firebase/firestore";
import { db } from "../../firebase";

import "./Card.css";

export const Card = ({ img, price, nomi, miqdor = 0, id, getOrder, }) => {
  const [loading, setLoading] = useState(false);
  const [razmer, setRazmer] = useState(26);
  const [PizzaMiqdor, setPizzaMiqdor] = useState(miqdor);
  const [tur, settur] = useState("тонкое");
  const collectionOrder = collection(db, "order");
  const navigate = useNavigate();

  const addOrder = async () => {
    setLoading(true);
    const orders = await getItems(collectionOrder);

    const updatedPizzaMiqdor = PizzaMiqdor + 1;
    setPizzaMiqdor(updatedPizzaMiqdor);
    const editingItem = doc(db, "pizzas", id);
    await updateDoc(editingItem, { miqdor: updatedPizzaMiqdor });

    const isorder = orders.some((item) => {
      return item.id === id && item.tur === tur && item.razmer === razmer;
    });

    if (!isorder) {
      const newPizza = {
        id: id,
        img: img,
        nomi: nomi,
        price: price,
        tur: tur,
        razmer: razmer,
        miqdor: 1,
      };
      await addDoc(collectionOrder, newPizza);
    } else {
      const test = orders.filter((item) => {
        return item.id === id && item.tur === tur && item.razmer === razmer;
      });

      const editingItem = doc(db, "order", test[0].editid);
      updateDoc(editingItem, { miqdor: test[0].miqdor + 1 });
    }
    getOrder();
    setLoading(false);
  };

  const getItems = async (coll) => {
    const data = await getDocs(coll);
    const filteredItems = data.docs.map((item) => {
      return { ...item.data(), editid: item.id };
    });
    return filteredItems;
  };

  const onSubmitImg = () => {
    navigate(`pizza/${id}`);
  };

  const selectTop = [
    { id: 1, title: "тонкое" },
    { id: 2, title: "традиционное" },
  ];
  const selectBottom = [
    { id: 1, title: 26 },
    { id: 2, title: 30 },
    { id: 3, title: 40 },
  ];

  return (
    <div className="cardContainer">
      <div className="imgCont">
        <img onClick={onSubmitImg} src={img} alt="pitsa rasmi" />
      </div>
      <p className="cardTitle">{nomi}</p>
      <div className="sectionPizza">
        <div className="sectionPizzaTop">
          {selectTop.map((item) => {
            return (
              <p
                key={item.id}
                className={tur === item.title ? "card-current-section" : ""}
                onClick={() => settur(item.title)}
              >
                {item.title}
              </p>
            );
          })}
        </div>
        <div className="section-pitsa-bottom">
          {selectBottom.map((item) => {
            return (
              <p
                key={item.id}
                className={razmer === item.title ? "card-current-section" : ""}
                onClick={() => setRazmer(item.title)}
              >
                {item.title}  см.
              </p>
            );
          })}
        </div>
      </div>
      <div className="card-footer">
        <p className="card-price">{price} ₽</p>
        <div
          className={loading ? "add-button disabled-btn-order" : "addButton"}
          onClick={addOrder}
        >
          + Добавить  {PizzaMiqdor > 0 ? <p>{PizzaMiqdor}</p> : null}
        </div>
      </div>
    </div>
  );
};
