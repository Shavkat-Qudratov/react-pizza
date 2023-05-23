import React from 'react'

import { SlBasket } from 'react-icons/sl'

import './Header.css'
import { Link } from 'react-router-dom'

export const Header = () => {
    return (
        <div className='header'>
            <div className='headerLeft' >
                <Link to='/'>
                    <img
                        className='pizzaIcon'
                        src="/images/pizzaicon.jpg"
                        alt="pizza img" />
                    <p className='text1'>REACT PIZZA</p>
                    <p className='text2'>самая вкусная пицца во вселенной</p>
                </Link>
            </div>

            <div className='headerRight'>
                <Link to='/nopurchased'>
                    <p className='text3'>520 ₽</p>
                </Link>

                <img className='line' src="/assets/headerLine.jpg" alt="line" />

                <Link to='/purchased'>
                    <p className='text4'>
                        <SlBasket />
                    </p>
                </Link>
            </div>
        </div>
    )
}


