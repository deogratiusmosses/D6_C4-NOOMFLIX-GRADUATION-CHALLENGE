import { atom } from 'recoil'
export function makeImagePaths(
  id: string,
  format?: 'w200' | 'w300' | 'w400' | 'w500'
) {
  return `https://image.tmdb.org/t/p/${format || 'original'}${id}`
}

export const inputedKeyword = atom({
  key: 'Keyword',
  default: '',
})

export const focusedUnit = atom<null | string>({
  key: 'focusedUnitProduct',
  default: null,
})
