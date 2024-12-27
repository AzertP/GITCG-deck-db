// import { useState } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

import CardPage from './components/card-page'
import DeckPage from './components/deck-page'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <div>
        <Link to={"/"}> Home </Link>
        <Link to={"/card"}> Card</Link>
        <Link to={"/deck"}> Deck </Link>
      </div>

      <Routes>
        <Route path='/' element={<p>Welcome home!</p>}/> 
        <Route path='/card' element={<CardPage/>}/>
        <Route path='/deck' element={<DeckPage/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
