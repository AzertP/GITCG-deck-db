// import { useState } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

import { AppBar, Button, Container, Toolbar, 
        createTheme, ThemeProvider } from '@mui/material'

import CardPage from './components/card-page'
import DeckPage from './components/deck-page'
import './App.css'
import CardDetailed from './components/card-detailed'

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        }
      }
    }
  }
})

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <div>
          <AppBar position='sticky'>
            <Toolbar>
              <Button component={Link} to="/" color='inherit'>
                Home
              </Button>
              <Button component={Link} to="/card" color='inherit'>
                Card
              </Button>
              <Button component={Link} to="/deck" color='inherit'>
                Deck
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        <Container>
          <Routes>
            <Route path='/' element={<p>Welcome home!</p>}/> 
            <Route path='card' element={<CardPage/>}/>
              <Route path='card/:id' element={<CardDetailed/>}/>
            <Route path='deck/*' element={ <DeckPage/> }/>
          </Routes>
        </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
