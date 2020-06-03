import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link, Redirect
} from "react-router-dom"
import { Row, Col, Menu } from 'antd'
import { HomeFilled, BankFilled } from '@ant-design/icons'
import 'antd/dist/antd.css'
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
      <header id="header">
        <Row>
          <Col span={4}>
            <h1>
              <a id="logo" href="/">
                <img src="https://static.oschina.net/new-osc/img/logo_new.svg" alt="logo" />
                NoteApp
              </a>
            </h1>
          </Col>
          <Col span={20}>
            <Menu mode="horizontal">
              <Menu.Item icon={<HomeFilled />}>
                <Link to="/">home</Link>
              </Menu.Item>
              <Menu.Item icon={<BankFilled />}>
                <Link to="/notes">notes</Link>
              </Menu.Item>
            </Menu>
            {user
              ? <em>{user} logged in, <span onClick={logout}>logout</span></em>
              : <Link to="/login">login</Link>
            }
          </Col>
        </Row>
        {/* <Link to="/users">users</Link> */}
      </header>
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notes" component={Notes} />
          <Route path="/login" render={() =>
            user ? <Redirect to="/" /> : <Login />}/>
          <Route component={NotFound} />
        </Switch>
      </main>
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
