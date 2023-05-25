import React from 'react'
import { Card } from '../Card/Card'

import './CardContainer.css'

export const CardContainer = ( {items}) => {
  return (
    <div className='cardContainer'>
       {items.map((item) => {
        return <Card key={item.id} item={item}/>;
      })}
    </div>
  )
}


 