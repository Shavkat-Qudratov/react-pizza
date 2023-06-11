import React from "react";


import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReturnBtn } from "../../components";
import "./style.css";

export const Payment = () => {
  const { allPrice } = useSelector((state) => state);


  const compare = (a, b) => {
    const aPrice = Number(a.price.replace(/[^0-9.-]+/g, ""));
    const bPrice = Number(b.price.replace(/[^0-9.-]+/g, ""));

    return aPrice - bPrice;
  };



  return (
    <div className="payment-header">


      <div className="payment-page">
        <Link to='/payment'>

          <form>
            <p className="icons-cont">
              <img src="/images/mastercard.png" size={50} alt="mastercard" />
              <img src="/images/visa.png" size={50} alt="visa" />
              <img src="/images/rupay.png" size={50} alt="rupay" />

            </p>
            <div>
              <p className="p1">Name on card</p>
              <input className="nameInput" type="text" id="card-name" placeholder="name"/>
            </div>
            <div>
              <p className="p2">Card Number</p>
              <input className="numberInput" type="text" id="card-number" placeholder="1111 2222 3333 4444" />
            </div>
            <div>
              <p className="p3">Expiration date</p>
              <input type="date" id="card-data" className="cardData" placeholder="mm/yy" />
             
            </div>
            <div>
              <p className="p4" htmlFor="card-cvv"> CVV</p>
              <input className="cardCvv" type="number" id="card-cvv" placeholder="123" />
            </div>
            <p className="all-price-check">{allPrice} руб.</p>
            <input className="pay-btn-check" type="submit" value={"Checkout"} />
           
            <div className="GoHome">
            <ReturnBtn />
            </div>
          </form>
        </Link>
      </div>
    </div>
  );
};
