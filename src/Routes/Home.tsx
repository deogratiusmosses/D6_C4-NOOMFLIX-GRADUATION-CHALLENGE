import { useQuery } from 'react-query'
import styled from 'styled-components'
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  TMDBdata,
} from '../api'
import { makeImagePaths } from '../utilities'
import { useMatch } from 'react-router-dom'
import Overlaid from '../components/Ovelaid'
import Slides from '../components/slides'

export const Container = styled.main``

export const Loader = styled.div`
  font-size: 20px;
  font-weight: 600;
  background-color: transparent;
  position: absolute;
  top: 50%;
  left: 50%;
`

export const Banner = styled.main<{ coverimage: string }>`
  height: 100vh;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${({ coverimage }) => coverimage});
  background-size: cover;
`
export const Title = styled.h1`
  font-size: 56px;
  font-weight: 600;
  margin-bottom: 20px;
`
export const Overview = styled.h2`
  font-size: 23px;
  width: 50%;
`

const TopratedMovies = styled.section`
  position: relative;
  margin-bottom: 25px;
  bottom: -400px;
`
const UpcomingMovies = styled.section`
  position: relative;
  bottom: -200px;
  margin-bottom: 25px;
`
const LatestMovies = styled.section`
  position: relative;
  margin-bottom: 25px;
  bottom: -600;
`
export const SectionHeader = styled.h2`
  position: absolute;
  top: -60%;
  margin-left: 35px;
  font-size: 45px;
  font-weight: 700;
  color: red;
`

function Home() {
  const useMultipleQueries = () => {
    const popular = useQuery<TMDBdata>(['Popular', 'Movies'], getPopularMovies)
    const upComing = useQuery<TMDBdata>(
      ['Upcoming', 'Movies'],
      getUpcomingMovies
    )
    const topRated = useQuery<TMDBdata>(
      ['TopRated', 'Movies'],
      getTopRatedMovies
    )
    return [popular, upComing, topRated]
  }

  const [
    { isLoading: loadingLatestData, data: latestMovieData },
    { isLoading: loadingUpcomingData, data: upcomingMoviesData },
    { isLoading: loadingTopratedData, data: topratedMoviesData },
  ] = useMultipleQueries()

  const slideIn = useMatch('/movie/:movieId')

  const focusedMovie =
    (slideIn?.params.movieId &&
      latestMovieData?.results.find(
        (movie) => movie.id + '' === slideIn?.params.movieId
      )) ||
    topratedMoviesData?.results.find(
      (movie) => movie.id + '' === slideIn?.params.movieId
    ) ||
    latestMovieData?.results.find(
      (movie) => movie.id + '' === slideIn?.params.movieId
    )
  //get back to this there is no upcoming in here
  return (
    <Container>
      {loadingLatestData || loadingUpcomingData || loadingTopratedData ? (
        <Loader>Loading Data..</Loader>
      ) : upcomingMoviesData || latestMovieData || topratedMoviesData ? (
        <>
          <Banner
            coverimage={makeImagePaths(
              latestMovieData?.results[0].backdrop_path || ''
            )}>
            <Title>{latestMovieData?.results[0].title}</Title>
            <Overview>{latestMovieData?.results[0].overview}</Overview>
          </Banner>

          <LatestMovies>
            <SectionHeader>Latest Movies</SectionHeader>
            <Slides object={latestMovieData} objectPath="movie" />
          </LatestMovies>

          <UpcomingMovies>
            <SectionHeader>Upcoming Movies</SectionHeader>
            <Slides object={upcomingMoviesData} objectPath="movie" />
          </UpcomingMovies>

          <TopratedMovies>
            <SectionHeader>Top Rated Movies</SectionHeader>
            <Slides object={topratedMoviesData} objectPath="movie" />
          </TopratedMovies>

          <Overlaid slideIn={slideIn} slideDetails={focusedMovie} goBack="/" />
        </>
      ) : (
        ''
      )}
    </Container>
  )
}

export default Home
