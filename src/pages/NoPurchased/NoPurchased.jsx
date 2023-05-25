import React from 'react'

import './NoPurchased.css'
import { Link } from 'react-router-dom'

const NoPurchased = () => {
  return (
    <div className='noHeader'>

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
        <p className='pusta'>Корзина пустая  <img className='emoji' src="/images/stiker.jpg" alt="stiker" /></p>
      </div>

      <p className='korzinatext1'>Вероятней всего, вы не заказывали ещё пиццу.
        Для того, чтобы заказать пиццу, перейди на главную страницу.</p>

      <img className='korzinaimg' src="/images/vector.jpg" alt="" />

      <Link to='/'> <button className='korzinaBtn'>Вернуться назад</button></Link>

    </div>
  )
}

export default NoPurchased
