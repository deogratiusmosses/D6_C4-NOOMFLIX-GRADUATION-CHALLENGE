import {
  getPopularTV,
  getTopRatedTV,
  getAiringTodayTV,
  getLatestTV,
  TMDBdata,
} from '../api'
import { Overview, Container, Banner, Title, SectionHeader,Loader } from './Home'
import { useQuery } from 'react-query'
import { useMatch } from 'react-router-dom'
import Slides from '../components/slides'
import Overlaid from '../components/Ovelaid'
import styled from 'styled-components'
import { makeImagePaths } from '../utilities'
import React from 'react'

export const TopratedTv = styled.section`
  position: relative;
  bottom: -400px;
`

const LatestTv = styled.section`
  position: relative;
  margin-bottom: 25px;
`
const UpcomingTv = styled.section`
  position: relative;
  bottom: -200px;
  margin-bottom: 25px;
`
const PopularTv = styled.section`
  position: relative;
  bottom: -600px;
`

const TvScreen = () => {
  const useMultipleQueries = () => {
    const topRatedTv = useQuery<TMDBdata>(['TopRated', 'Tvs'], getTopRatedTV)
    const popularTv = useQuery<TMDBdata>(['Popular', 'Tvs'], getPopularTV)
    const airingTv = useQuery<TMDBdata>(['Airing', 'Tvs'], getAiringTodayTV)
    const latestTv = useQuery<TMDBdata>(['Latest', 'Tvs'], getLatestTV)

    return [topRatedTv, popularTv, airingTv, latestTv]
  }

  const [
    { isLoading: loadingLatestTv, data: LatestTvData },
    { isLoading: loadingTopRatedTv, data: TopRatedTvData },
    { isLoading: loadingPopularTv, data: PopularTvData },
    { isLoading: loadingAiringTv, data: AiringTvData },
  ] = useMultipleQueries()

  const slideIn = useMatch('/tvShow/:movieId')

  const focusedTv =
    (slideIn?.params.movieId &&
      LatestTvData?.results.find(
        (tv) => tv.id + '' === slideIn?.params.movieId
      )) ||
    TopRatedTvData?.results.find(
      (tv) => tv.id + '' === slideIn?.params.movieId
    ) ||
    PopularTvData?.results.find(
      (tv) => tv.id + '' === slideIn?.params.movieId
    ) ||
    AiringTvData?.results.find((tv) => tv.id + '' === slideIn?.params.movieId)

  return (
    <Container>
      {loadingLatestTv ||
      loadingTopRatedTv ||
      loadingPopularTv ||
      loadingAiringTv ? (
        <Loader>Loading..</Loader>
      ) : LatestTvData || TopRatedTvData || PopularTvData || AiringTvData ? (
        <>
          <Banner
            coverimage={makeImagePaths(
              PopularTvData?.results[0].backdrop_path || ''
            )}>
            <Title>{PopularTvData?.results[0].title}</Title>
            <Overview>{PopularTvData?.results[0].overview}</Overview>
          </Banner>

          <LatestTv>
            <SectionHeader>Latest TV Shows</SectionHeader>
            <Slides object={LatestTvData} objectPath="tvShow" />
          </LatestTv>

          <UpcomingTv>
            <SectionHeader>Airing TV Shows</SectionHeader>
            <Slides object={AiringTvData} objectPath="tvShow" />
          </UpcomingTv>

          <TopratedTv>
            <SectionHeader>Top Rated TV Shows</SectionHeader>
            <Slides object={TopRatedTvData} objectPath="tvShow" />
          </TopratedTv>

          <PopularTv>
            <SectionHeader>Popular TV Shows</SectionHeader>
            <Slides object={PopularTvData} objectPath="tvShow" />
          </PopularTv>

          <Overlaid slideIn={slideIn} slideDetails={focusedTv} goBack="/" />
        </>
      ) : (
        ''
      )}
    </Container>
  )
}

export default TvScreen
