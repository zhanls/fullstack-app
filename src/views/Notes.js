import React, { useState, useEffect } from 'react'
import noteService from '../services/notes'

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')

  // 默认设定每次渲染完成都会调用，第二个参数传[]表示只执行一次
  useEffect(() => {
    noteService.getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }
    noteService.update(id, changedNote)
      .then(returnedNote => {
        console.log('importance of ' + id + ' has been toggled to ' + returnedNote.important)
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(err => {
        // setErrMsg(`Note '${note.content}' was already removed from server`)
        // setTimeout(() => {
        //   setErrMsg(null)
        // }, 3000)
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

  return (
    <div>
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
      <form onSubmit={addNote}>
        <input type="text" value={newNote} onChange={e => setNewNote(e.target.value)}></input>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default Notes