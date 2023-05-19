import { useLocation, useMatch } from 'react-router-dom'
import React from 'react'
import { useRecoilState } from 'recoil'
import styled from 'styled-components'
import { inputedKeyword } from '../utilities'
import { useQuery } from 'react-query'
import { TMDBdata, searchForMovies, searchForTvs } from '../api'
import Slides from '../components/slides'
import Overlaid from '../components/Ovelaid'
import { Loader } from './Home'

const SearchContainer = styled.main`
  margin-top: 100px;
`

const SearchedMovies = styled.section`
  position: relative;
  bottom: -270px;
`
const SearchedTVShows = styled(SearchedMovies)`
  bottom: -500px;
`

const SearchedTitle = styled.h2`
  position: absolute;
  top: -80%;
  font-size: 45px;
  margin-left: 15px;
  font-weight: 700;
`

const Search = () => {
  const { search } = useLocation()
  const [keyword, setKeyword] = useRecoilState(inputedKeyword)
  setKeyword(new URLSearchParams(search).get('keyword') || '')

  const useMultipleQueries = () => {
    const movie = useQuery<TMDBdata>(['Input', 'Movie'], () =>
      searchForMovies(keyword!)
    )
    const tv = useQuery<TMDBdata>(['Input', 'Tv'], () => searchForTvs(keyword!))
    return [movie, tv]
  }
  const [
    { isLoading: loadingSearchedMovies, data: searchedMovies },
    { isLoading: loadingSearchedTV, data: searchedTvs },
  ] = useMultipleQueries()

  const slideIn = useMatch('search/output/:inputId')

  const focusedObject =
    (slideIn?.params.inputId &&
      searchedMovies?.results.find(
        (movies) => movies.id + '' === slideIn?.params.inputId
      )) ||
    searchedTvs?.results.find((tvs) => tvs.id + '' === slideIn?.params.inputId)

  return (
    <SearchContainer>
      {loadingSearchedMovies || loadingSearchedTV ? (
        <Loader>Loading Results..</Loader>
      ) : (
        <>
          {searchedMovies?.results.length === 0 ? (
            <span>No matched results</span>
          ) : (
            <SearchedMovies>
              <SearchedTitle>Movies</SearchedTitle>
              <Slides object={searchedMovies} objectPath={'search/output/'} />
            </SearchedMovies>
          )}

          {searchedTvs?.results.length === 0 ? (
            <span>No matched results</span>
          ) : (
            <SearchedTVShows>
              <SearchedTitle>Tv Shows</SearchedTitle>
              <Slides object={searchedTvs} objectPath={'search/output/'} />
            </SearchedTVShows>
          )}

          <Overlaid
            inputId={slideIn}
            slideDetails={focusedObject}
            goBack={`/search?keyword=${keyword}`}
          />
        </>
      )}
    </SearchContainer>
  )
}
export default Search
