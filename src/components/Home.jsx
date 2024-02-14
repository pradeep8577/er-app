import React from 'react'
import Navbar from "./navbar/Header"

const Home = () => {
  return (
    <>
    <Navbar/>

    <div className="general-centered-container">
      <div className="container">
        <a href="/editor"><h1>ER Diagram Drawer</h1></a>  
      </div>
      <div className="container">
      <a href="/streamlit"><h1>ER Digram Explainer</h1></a>
      </div>
    </div>

    </>
  )
}

export default Home