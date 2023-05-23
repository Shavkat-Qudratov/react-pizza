import React from 'react'
import { GrFormPrevious, GrFormPreviousLink,FcPrevious } from 'react-icons/fc'
import './Purchased.css'
import { Link } from 'react-router-dom'

const Purchased = () => {
  return (
    <div className='pHeader'>
      <div className='headerLeft'>
        <Link to='/'>
       
        <img
          className='pizzaIcon'
          src="/images/pizzaicon.jpg"
          alt="pizza img" />
        <p className='text1'>REACT PIZZA</p>
        <p className='text2'>Самая реактивная пицца</p>
        </Link>
      </div>

      <div>
        <img className='basketIcon' src="/images/basketimg.jpg" alt="basketicon" />
        <p className='basketText'>Корзина</p>

        <img className='deleteIcon' src="/images/deleteImg.jpg" alt="deleteicon" />
        <p className='deleteText'>Очистить корзину</p>
      </div>

      <img className='line' src="/images/line.jpg" alt="line" />

      <div className='group1'>
        <img className='CheckPizzaImg' src="/images/pizza4.jpg" alt="pizza" />
        <p className='checkPizzaName'>Сырный цыпленок</p>
        <p className='checkPizzaTitle'>тонкое тесто, 26 см.</p>

        <button className='checkbtn btnInc'>-</button>
        <span className='checkText'>2</span>
        <button className='checkbtn btnDec'>+</button>

        <p className='checkPrice'>770 ₽ </p>

        <button className='checkXBtn'>x</button>
      </div>

      <div className='group2'>
        <img className='CheckPizzaImg' src="/images/pizza3.jpg" alt="pizza" />
        <p className='checkPizzaName'>Креветки по-азиатски</p>
        <p className='checkPizzaTitle'>толстое тесто, 40 см.</p>

        <button className='checkbtn btnInc'>-</button>
        <span className='checkText'>1</span>
        <button className='checkbtn btnDec'>+</button>

        <p className='checkPrice'>290 ₽ </p>

        <button className='checkXBtn'>x</button>
      </div>

      <div className='group3'>
        <img className='CheckPizzaImg' src="/images/pizza1.jpg" alt="pizza" />
        <p className='checkPizzaName'>Чизбургер-пицца</p>
        <p className='checkPizzaTitle'>тонкое тесто, 30 см.</p>

        <button className='checkbtn btnInc'>-</button>
        <span className='checkText'>3</span>
        <button className='checkbtn btnDec'>+</button>

        <p className='checkPrice'>350 ₽  </p>

        <button className='checkXBtn'>x</button>
      </div>

      <div >
        <p className='checkAll'>Всего пицц: <span className='sht'> 3 шт.</span></p>

        <p className='checkAllPrice'>Сумма заказа:<span className='allsht'>  900 ₽ </span></p>

        <div className='LeftFooterBtn'>
          <img  src="/images/prevIcon.jpg" alt="" />
          <span>   Вернуться назад</span>
        </div>

        <button className='btnFooter'>Оплатить сейчас</button>
      </div>
    </div>

  )
}

export default Purchased
