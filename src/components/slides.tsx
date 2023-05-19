import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import styled from 'styled-components'
import { TMDBdata } from '../api'
import { focusedUnit, makeImagePaths } from '../utilities'
import { off } from 'process'

const SlideContainer = styled(motion.div)`
  min-height: 300px;
  height: 25vh;
  position: relative;
`

const Row = styled(motion.div)`
  position: absolute;
  top: -10vh;
  height: 100%;
  width: 100%;
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(6, 1fr);
`

const Box = styled(motion.div)<{ sliderImage: string }>`
  background-size: cover;
  background-color: ${({ sliderImage }) => (!sliderImage ? 'grey' : '')};
  background-image: ${({ sliderImage }) =>
    sliderImage ? `url(${sliderImage})` : ''};
  height: 100%;
  min-height: 270px;
  border-radius: 10px;
`

const Info = styled(motion.div)`
  position: relative;
  bottom: -97%;
  background-color: gray;
  width: 100%;
  opacity: 0;
  display: none;
  padding: 15px;
  text-align: center !important;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`

const LeftScroll = styled(motion.div)`
  width: 45%;
  height: 70px;
  background-color: transparent;
`
const RightScroll = styled(motion.div)`
  width: 45%;
  height: 70px;
  background-color: transparent;
`

const rowVariants = (next: boolean) => {
  return {
    hidden: { x: next ? window.innerWidth + 10 : -window.innerWidth + 10 },
    visible: { x: 0 },
    exit: { x: next ? -window.innerWidth - 10 : window.innerWidth + 10 },
  }
}

const boxVariants = {
  hover: {
    scale: 1.15,
    y: -80,
    borderRadius: '10px',
    transition: { delay: 0.5, duration: 0.3, type: 'tween' },
  },
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: { delay: 0.1, duration: 0.1, type: 'tween' },
  },
}

interface SlidesProps {
  object: TMDBdata | undefined
  objectPath: string
}

const Slides = ({ object, objectPath }: SlidesProps) => {
  const offset = 6
  const changePath = useNavigate()
  const recoilGroup = useRecoilValue(focusedUnit)
  const [exit, setExit] = useState(false)
  const [next, setNext] = useState(true)
  const [boxIndex, setBoxIndex] = useState(0)
  const totalMovies = object?.results.length! - 1
  const maxIndex = Math.floor(totalMovies / offset) - 1

  return (
    <>
      <SlideContainer>
        <AnimatePresence initial={false} onExitComplete={() => setExit(false)}>
          <Row
            key={boxIndex}
            variants={rowVariants(next)}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: 'tween', duration: 1 }}>
            {object?.results
              .slice(1)
              .slice(offset * boxIndex, offset * boxIndex + offset)
              .map((movie) => {
                return (
                  <Box
                    key={movie.id}
                    onClick={() => {
                      changePath(`/${objectPath}/${movie.id}`)
                    }}
                    variants={boxVariants}
                    layoutId={String(recoilGroup! + movie.id)}
                    whileHover="hover"
                    sliderImage={makeImagePaths(
                      movie.poster_path || movie.backdrop_path,
                      'w500'
                    )}>
                    <Info variants={infoVariants}>{movie.title}</Info>
                  </Box>
                )
              })}
          </Row>
        </AnimatePresence>
      </SlideContainer>
      {boxIndex !== 0 && (
        <LeftScroll
          style={{
            cursor: 'pointer',
            position: 'absolute',
            left: 25,
            top: '-60%',
          }}
          onClick={() => {
            if (object) {
              if (exit) return
              setNext(false)
              setExit(true)
              setBoxIndex((prev) => (prev === 0 ? 0 : prev - 1))
            }
          }}
        />
      )}

      {boxIndex !== maxIndex && (
        <RightScroll
          style={{
            cursor: 'pointer',
            position: 'absolute',
            right: 25,
            top: '-60%',
          }}
          onClick={() => {
            if (object) {
              if (exit) return
              setExit(true)
              setNext(true)
              setExit(true)
              setBoxIndex((prev) => (prev === maxIndex ? maxIndex : prev + 1))
            }
          }}
        />
      )}
    </>
  )
}

export default Slides

// component=object ,,
//idUrl=objectPath
//leaving = exit
//isNext- next
//recoilcategory= recoilGroup
//changeUrl= changePath
