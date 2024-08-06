import Notebar from './components/Notebar';
import Notefilter from './components/NoteFilter';
import Notelist from './components/NoteList';
import React, { useState , useEffect } from 'react';
import './index.css'; 
import axios from 'axios';

function App() {
  const [notes,setNotes] = useState([])
  const [errors,setErrors] = useState("")
  const [filteredNotes, setFilteredNotes] = useState([]);


  useEffect(()=>{
    axios.get("https://khyatiram.pythonanywhere.com/notes")
    .then(res => {setNotes(res.data); setFilteredNotes(res.data);})
    .catch(err =>setErrors(err.message))
  },[])

  const deleteNote=(id) => {
    const originalNotes = [...notes]
    setNotes(notes.filter(note => note.id !== id ));
    setFilteredNotes(filteredNotes.filter(note => note.id !== id));

    axios.delete("https://khyatiram.pythonanywhere.com/notes/"+id)
    .catch(err=>{
    setErrors(err.message);
    setNotes(originalNotes);
    setFilteredNotes(originalNotes);
  })}

  const addNote=(data) =>{
    const originalNotes = [...notes]
    const newNote = { ...data, id: parseInt(notes[notes.length - 1]?.id || 0) + 1, completed: false };
    setNotes([...notes, newNote]);
    setFilteredNotes([...notes, newNote]);

    axios.post("https://khyatiram.pythonanywhere.com/notes/", newNote)
    .then(res=> setNotes([...notes,res.data]))
    .catch(err=>{
      setErrors(err.message)
      setNotes(originalNotes)
      setFilteredNotes(originalNotes);
    })
  }

  const updateNote=(id,new_note)=>{
    let note = notes.find(note => note.id === id);
    let updatednote = { ...note, task: new_note, completed: false };
    setNotes(notes.map(n => n.id==id ? updatednote:n ))
    setFilteredNotes(notes.map(n => n.id === id ? updatednote : n));

    axios.patch("https://khyatiram.pythonanywhere.com/notes/"+id,updatednote)
    .catch(err => setErrors(err.message));
  }

  let completedNote=(e,id,note) =>{
    
    const updatednote = { ...note, completed: e.target.checked };
    setNotes(notes.map(n => n.id === id ? updatednote : n));
    setFilteredNotes(notes.map(n => n.id === id ? updatednote : n)); // Update filtered notes

    axios.patch("https://khyatiram.pythonanywhere.com/notes/" + id, updatednote)
    .catch(err => setErrors(err.message));
    
  }

  let filterNotes =(boolval)=>{
    if (boolval == "None") {
      setFilteredNotes(notes);
    } 
    else if (boolval == "True") {
      setFilteredNotes(notes.filter(note => note.completed == true));
    }
    else if (boolval == "False") {
      setFilteredNotes(notes.filter(note => note.completed == false ));
    }
    
  }

  return (<>
    

{errors && <p>{errors}</p>}
    
    
    <div className="todo-container">
    
      <div className="content">
        <Notebar add_Note={addNote}/>
        <Notefilter filter_note={filterNotes}/>
        <Notelist notes={filteredNotes} delete_note={deleteNote} update_note={updateNote} complete_note={completedNote}/>
      </div>
      <div className="image-container">
        <img src='/pic.svg' alt='Illustration' />
      </div>
      <div className="image-container-flipped">
        <img src='/pic.svg' alt='Illustration' />
      </div>
    </div>
    
    </>
  );
}

export default App;
