// import { useState } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

import { AppBar, Button, Container, Toolbar,  
        StyledEngineProvider,
        CssBaseline, ThemeProvider} from '@mui/material'

import theme from './style/theme'

import CardPage from './components/cardPage'
import DeckPage from './components/deckPage'
import CardDetailed from './components/cardDetailed'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
          <CssBaseline/>
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
      </StyledEngineProvider>
      </ThemeProvider>
    </>
  )
}

export default App
