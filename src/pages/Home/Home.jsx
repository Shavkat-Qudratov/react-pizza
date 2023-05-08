import React from 'react'
import { Wrapper } from '../../components/Wrapper'
import { Header } from '../../components/Header'
import { Navbar } from '../../components/Navbar'

const Home = () => {
  return (
    <div className='homeContainer'>
      <Wrapper>
        <Header/>
        <Navbar/>
      </Wrapper>
    </div>
  )
}

export default Home
