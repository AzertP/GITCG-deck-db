// import { useState } from 'react'
import {
  BrowserRouter, Routes, Route, Link
} from 'react-router-dom'

import { AppBar, Button, Container, Toolbar,  
        StyledEngineProvider,
        CssBaseline, ThemeProvider,
        Box,
        Typography} from '@mui/material'

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
          <BrowserRouter basename='/'>
            <AppBar position='fixed'>
              <Container maxWidth='xl' sx={{background: 'transparent'}}>
              <Toolbar disableGutters={false}>
                <Box padding={1}>
                <img src='../public/cat.svg' width='40px'/>
                </Box>
                <Typography variant='h6' component={Link} to='/' sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}>
                  CAT'S TAIL
                  </Typography>
                <Button component={Link} to="/card" color='inherit'>
                  Card
                </Button>
                <Button component={Link} to="/deck" color='inherit'>
                  Deck
                </Button>
              </Toolbar>
              </Container>
            </AppBar>
            <Toolbar/>
          
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
