import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import './App.css'
import ThemeContext from './ThemeContext'
import NotFound from './components/NotFound'
import VideoItemDetails from './components/VideoItemDetails'
import ProtectedRoute from './ProtectedRoute'

class App extends Component {
  state = {
    dark: JSON.parse(localStorage.getItem('darkTheme')) || false,
    savedVideos: JSON.parse(localStorage.getItem('savedVideos')) || [],
  }

  onChangeDark = () => {
    this.setState(
      prevState => ({dark: !prevState.dark}),
      () => {
        const {dark} = this.state
        localStorage.setItem('darkTheme', JSON.stringify(dark))
      },
    )
  }

  addVideo = video => {
    this.setState(
      prev => ({savedVideos: [...prev.savedVideos, video]}),
      () => {
        const {savedVideos} = this.state
        localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
      },
    )
  }

  removeVideo = id => {
    this.setState(
      p => ({
        savedVideos: p.savedVideos.filter(x => x.id !== id),
      }),
      () => {
        const {savedVideos} = this.state
        localStorage.setItem('savedVideos', JSON.stringify(savedVideos))
      },
    )
  }

  render() {
    const {dark, savedVideos} = this.state

    return (
      <ThemeContext.Provider
        value={{
          dark,
          changeDark: this.onChangeDark,
          savedVideos,
          addVideo: this.addVideo,
          removeVideo: this.removeVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
