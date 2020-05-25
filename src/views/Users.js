import React, { useState } from 'react'
import loginService from '../services/login'

const Users = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = e => {
    e.preventDefault()
    console.log('logging in with', username, password)
    loginService.login({ username, password })
      .then(returnedData => {
        setUser(returnedData)
        setUsername('')
        setPassword('')
      })
      .catch(err => {
        // setErrMsg('Wrong Credentials')
        // setTimeout(() => {
        //   setErrMsg(null)
        // }, 3000)
        console.log(err)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="off"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
  
  return (
    <div>
      {
        user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
        </div>
      }
    </div>
  )
}

export default Users
