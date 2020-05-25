import React from 'react'
// login组件
const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          autoComplete="off"
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          autoComplete="off"
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default LoginForm