import React from 'react'

const ThemeContext = React.createContext({
  dark: false,
  changeDark: () => {},
  savedVideos: [],
  addVideo: () => {},
  removeVideo: () => {},
})

export default ThemeContext
