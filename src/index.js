import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import './index.css'
// views
import Home from './views/Home'
import Notes from './views/Notes'
import Users from './views/Users'
import NotFound from './views/NotFound'
// PWA
import * as serviceWorker from './serviceWorker'

const App = () => {
  return (
    <Router>
      <div className="menu">
        <Link to="/">home</Link>
        <Link to="/notes">notes</Link>
        <Link to="/users">users</Link>
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/notes" component={Notes} />
        <Route path="/users" component={Users} />
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
