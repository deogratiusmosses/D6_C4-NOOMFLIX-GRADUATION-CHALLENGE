import React from 'react'
import { motion, useAnimation, useViewportScroll } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Navigation = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 100%;
  font-size: 12px;
  padding: 0px 60px;
  padding-right: 200px;
  color: white;
  z-index: 1;
`
const Columns = styled.div`
  display: flex;
  align-items: center;
`

const Logo = styled(motion.svg)`
  margin-right: 6px;
  width: 200px;
  height: 100px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`
const Items = styled.ul`
  display: flex;
  align-items: center;
`
const Item = styled.li`
  margin-right: 20px;
  font-size: 20px;
  color: grey;
  transition: color 0.3s ease-in-out;
  position: relative;
  display: flex;
  justify-content: center;
  flex-direction: column;
  &:hover {
    color: grey;
  }
`

const Circle = styled(motion.span)`
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  bottom: -8px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.red};
`

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    height: 25px;
  }
`

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [0, 1, 0],
    transtion: {
      repeat: Infinity,
    },
  },
}

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: 100;
  height: 32px;
  width: 210px;
  padding: 5px 10px;
  padding-left: 15px;
  border-radius: 10px;
  z-index: 1;
  color: white;
  font-size: 16px;
  background-color: transparent;
  border: 1px solid grey;
`

const NavVariants = {
  top: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
  scroll: {
    backgroundColor: 'rgba(0,0,0,1)',
  },
}

interface IForm {
  keyword: string
}

function Header() {
  const { pathname } = useLocation()
  const homePath = pathname === '/'
  const tvPath = pathname === '/tv'
  const [searchOpen, setSearchOpen] = useState(false)
  const inputAnimation = useAnimation()
  const navAnimation = useAnimation()
  const { scrollY } = useViewportScroll()
  const toogleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      })
    } else {
      inputAnimation.start({
        scaleX: 1,
      })
    }
    setSearchOpen((prev) => !prev)
  }
  useEffect(() => {
    scrollY.onChange(() => {
      if (scrollY.get() > 80) {
        navAnimation.start('scroll')
      } else {
        navAnimation.start('top')
      }
    })
  }, [scrollY, navAnimation])

  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<IForm>()
  const onValid = (data: IForm) => {
    navigate(`/search?keyword=${data.keyword}`)
    console.log(data)
  }
  return (
    <Navigation variants={NavVariants} animate={navAnimation} initial={'top'}>
      <Columns>
        <Logo
          variants={logoVariants}
          initial="normal"
          whileHover="active"
          xmlns="http://www.w3.org/2000/svg"
          viewBox=" 50 -50 300 200"
          width={200}
          height={800}>
          <motion.path d="M256.09 76.212c4.178.405 8.354.84 12.52 1.29l9.198-22.712 8.743 24.807c4.486.562 8.97 1.152 13.44 1.768l-15.328-43.501L299.996 0H287.01l-.135.186-8.283 20.455L271.32.003h-12.822l13.237 37.565-15.644 38.644zM246.393 75.322V0h-12.817v74.265c4.275.33 8.552.684 12.817 1.056M150.113 71.11c3.46 0 6.916.026 10.366.054V43.492h15.397V31.708H160.48v-19.91h17.733V0h-30.6v71.12c.831 0 1.666-.013 2.5-.01M110.319 71.83c4.27-.152 8.544-.28 12.824-.384V11.8h11.98V.003H98.339V11.8h11.982v60.03h-.002zM12.295 79.772V34.897L27.471 77.96c4.667-.524 9.341-1.017 14.028-1.483V.001H29.201v46.483L12.825.001H0v81.384h.077c4.063-.562 8.14-1.096 12.218-1.613M85.98 11.797V.001H55.377V75.202a1100.584 1100.584 0 0 1 30.578-2.211V61.184c-5.916.344-11.82.74-17.71 1.181V43.497h15.397V31.706H68.245V11.797H85.98zM203.614 60.62V-.003h-12.873v71.876c10.24.376 20.44.9 30.606 1.56V61.619c-5.9-.381-11.81-.712-17.733-1"></motion.path>
        </Logo>
        <Items>
          <Item>
            <Link to="/"> Home</Link>
            {homePath && <Circle layoutId="circle" />}
          </Item>
          <Item>
            <Link to="/tv">Tv Shows</Link>
            {tvPath && <Circle layoutId="circle" />}
          </Item>
        </Items>
      </Columns>
      <Columns>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            animate={{ x: searchOpen ? -35 : 0 }}
            transition={{ type: 'linear' }}
            onClick={toogleSearch}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              stroke-linecap="round"
              stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {' '}
              <path
                d="M15 15L21 21"
                stroke="#fafafa"
                stroke-width="4"
                stroke-linecap="round"
                stroke-linejoin="round"
                data-darkreader-inline-stroke=""></path>{' '}
              <path
                d="M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#f40808"
                stroke-width="4"
                data-darkreader-inline-stroke=""></path>{' '}
            </g>
          </motion.svg>
          <Input
            {...register('keyword', { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: 'linear' }}
            placeholder="Search Movies & Tv Shows..."
          />
        </Search>
      </Columns>
    </Navigation>
  )
}
export default Header
