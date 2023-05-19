import React from 'react'
import { ThemeProvider } from 'styled-components'
import { darkTheme } from './theme'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Routes/Home'
import TvScreen from './Routes/Tvs'
import Search from './Routes/Search'
import Header from './components/Header'
import { GlobalStyle } from '.'

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <Router>
          <Header />
          <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/movie/:movieId'} element={<Home />} />

            <Route path="/tv" element={<TvScreen />} />
            <Route path={'/tvShow/:movieId'} element={<TvScreen />} />

            <Route path="/search" element={<Search />} />
            <Route path="search/output/:inputId" element={<Search />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  )
}

export default App
