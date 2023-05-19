import 'styled-componets'

//and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    red: string
    black: {
      highDark: string
      mediumDark: string
      lowDark: string
    }
    white: {
      highWhite: string
      lowWhite: string
    }
  }
}

