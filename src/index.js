import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"
import './index.css'
// views
import Home from './views/Home'
import Notes from './views/Notes'
import Login from './views/Login'
import NotFound from './views/NotFound'
// services
import noteService from './services/notes'
// PWA
import * as serviceWorker from './serviceWorker'

const App = () => {
  const [user, setUser] = useState(null) 
  // 查询本地存储用户信息，若有，则直接登录
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  return (
    <Router>
      <div className="menu">
        <Link to="/">home</Link>
        <Link to="/notes">notes</Link>
        {/* <Link to="/users">users</Link> */}
        {user
          ? <em>{user} logged in, <span onClick={logout}>logout</span></em>
          : <Link to="/login">login</Link>
        }
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/notes" component={Notes} />
        <Route path="/login" render={() =>
          user ? <Redirect to="/" /> : <Login />}/>
        <Route component={NotFound} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
