import React, { useEffect, createContext, useReducer, useContext } from 'react'
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import MyGallery from './pages/MyGallery'
import CreatePost from './pages/CreatePost'
import AllPosts from './pages/AllPosts'
import Chat from './pages/Chat'
import ChatNow from './pages/ChatNow'
import { reducer, initialState } from './reducers/userReducer'
export const UserContext = createContext()


// need history as app doesn't initial state history
const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
      // local storage stores as string -> convert to object
      const user = JSON.parse(localStorage.getItem('user'))
          if (user) {
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
          <Route path ='/posts' component={ AllPosts } />
          <Route path ='/chat' component={ Chat } />
          <Route path ='/chatnow' component={ ChatNow } />
          <Route path ='/register' component={ Register } />
          <Route path ='/login' component={ Login } />
      </Switch>
  )    
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  // using reducer to initialize state and dispatch
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