// import { useState } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

import { AppBar, Button, Container, Toolbar, 
        createTheme, ThemeProvider } from '@mui/material'

import CardPage from './components/card-page'
import DeckPage from './components/deck-page'
import './App.css'

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          overflow: 'visible',
          borderRadius: '8%',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
              transform: 'translateY(-8px)', // Move the card up
              boxShadow: '6px', // Add shadow for the raised effect
          },
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
            <Route path='deck/*' element={ <DeckPage/> }/>
          </Routes>
        </Container>
        </BrowserRouter>
      </ThemeProvider>
    </>
  )
}

export default App
