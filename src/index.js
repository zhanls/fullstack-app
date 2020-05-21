import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// api service
import noteService from './services/notes'
import loginService from './services/login'
import Notification from './components/Notification'
import Toggle from './components/Toggle'
import * as serviceWorker from './serviceWorker'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [errMsg, setErrMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [showAll, setShowAll] = useState(true)
  // 默认设定每次渲染完成都会调用，第二个参数传[]表示只执行一次
  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

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
        setErrMsg('Wrong Credentials')
        setTimeout(() => {
          setErrMsg(null)
        }, 3000)
      })
  }

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote)
      .then(returnedNote => {
        console.log('importance of ' + id + ' has been toggled to ' + returnedNote.important)
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(err => {
        setErrMsg(`Note '${note.content}' was already removed from server`)
        setTimeout(() => {
          setErrMsg(null)
        }, 3000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  const addNote = e => {
    e.preventDefault()
    const newNoteObject = {
      "id": notes.length + 1,
      "content": newNote,
      "date": new Date().toISOString(),
      "important": Math.random() > 0.5
    }
    noteService.create(newNoteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const deleteNoteOf = id => {
    noteService.remove(id)
      .then(() => {
        setNotes(notes.filter(v => v.id !== id))
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <label>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button type="submit">login</button>
    </form>
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)}></input>
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <h1>Notes</h1>
      <Toggle>
        {({ on, toggle }) => (
          <div>
            {on && <nav>Nav</nav>}
            <button onClick={toggle}>click me</button>
          </div>
        )}
      </Toggle>
      
      <Notification message={errMsg}/>

      <h2>Login</h2>

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

      <ul>
        {notes.map(
          v => 
            <li className="note" key={v.id}>
              <span>{v.content}</span>
              <button onClick={() => toggleImportanceOf(v.id)}>{v.important ? "no" : "yes"}</button>
              <button onClick={() => deleteNoteOf(v.id)}>remove</button>
            </li>
        )}
      </ul>
    </div>
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
