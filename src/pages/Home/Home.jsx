import React, { useEffect } from 'react'
import { fetchItems } from '../../redux/thunk'

import { Wrapper } from '../../components/Wrapper'
import { Header } from '../../components/Header'
import { Navbar } from '../../components/Navbar'
import { CardContainer } from '../../components/CardContainer/CardContainer'
import { useDispatch, useSelector } from 'react-redux'

import './Home.css'
const Home = () => {
  const { allPizza } = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(allPizza);


  useEffect(() => {
    dispatch(fetchItems(`  http://localhost:3030/allPizza`, `SAVE_ALL_PIZZA`))
  }, []);

  return (
    <div className='homeContainer'>

      <Wrapper>
        <Header />
        <Navbar />
        <CardContainer items={allPizza} />
      </Wrapper> 

        {/* <NoPurchased /> */}

        {/* <Purchased /> */}

    </div>
  )
}

export default Home
