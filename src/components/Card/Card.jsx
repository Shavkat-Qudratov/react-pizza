import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import './Card.css'

export const Card = ({ item }) => {
  const { id, title, price, imageUrl } = item;
  console.log(item);




  return (
    <div className='Card'>

      <div className='pizzaImg'>
        <img  src={imageUrl} alt="pizza" />
      </div>
      <p className='pizzaName'>{title}</p>

      <div className='pizzaType'>

        <div className='pizzaTop'>
          <button className='pizzaBtn pizzaBtn1'>тонкое</button>
          <button className='pizzaBtn pizzaBtn2'>традиционное</button>
        </div>

        <div className='pizzaBottom'>
          <button className='pizzaBtn pizzaBtn3'>26 см.</button>
          <button className='pizzaBtn pizzaBtn4'>30 см.</button>
          <button className='pizzaBtn pizzaBtn5'>40 см.</button>
        </div>

      </div>

      <div className='cardFooter'>
        <p className='pizzaPrice'>{price}</p>
        <button className='btnAdd'><AiOutlinePlus size={12} className='btnPlus' /> Добавить 2</button>
      </div>

    </div>
  )
}

