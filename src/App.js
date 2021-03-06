import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Fun from './pages/Fun'
import MyGallery from './pages/MyGallery'
import CreatePost from './pages/CreatePost'
import Posts from './pages/Posts'
import CreateMessage from './pages/CreateMessage'
import Messages from './pages/Messages'
import { reducer, initialState } from './reducers/userReducer'
export const UserContext = createContext()


// need history as app doesn't have initial state history
const Routing = () => {
  const history = useHistory()
  // useContext to return current user values for auth, then dispatch down
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
      // local storage stores user data as string -> convert to object
      const user = JSON.parse(localStorage.getItem('user'))
          if (user) {
              // dispatch will indicate user info
              dispatch({type: "USER", payload: user})
              history.push('/')
          } else {
              history.push('/login')
      }
  }, [])

  return(
      <Switch>
          <Route exact path ='/' component={ Home } />
          <Route path ='/mygallery' component={ MyGallery } />
          <Route path ='/createpost' component={ CreatePost } />
          <Route path ='/posts' component={ Posts } />
          <Route path ='/createmessage' component={ CreateMessage } />
          <Route path ='/messages' component={ Messages } />
          <Route path ='/register' component={ Register } />
          <Route path ='/login' component={ Login } />
          <Route path ='/fun' component={ Fun } />
      </Switch>
  )    
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // using reducer to initialize state and dispatch down
  return (
    <UserContext.Provider value={{ state, dispatch }}>
    <BrowserRouter>
      <NavBar />
      <Routing />
      
    </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App