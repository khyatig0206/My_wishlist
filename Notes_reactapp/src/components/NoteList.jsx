import React, { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

const Notelist = ({notes,delete_note,update_note,complete_note}) => {

  let [edit,setEdit]=useState(false)
  let [item,setItem]=useState("")
  let [noteId,setId]= useState(0)

  const editTask=(item,id) =>{
    setEdit(true)
    setItem(item)
    setId(id)
  }

  return (
    <>
    <div className="todo-list">
      {notes.map(note =><div className="todo-list-item" key={note.id}>
      <div className="task">
        <input type="checkbox" checked={note.completed} onChange={(e) => complete_note(e,note.id,note)}/>

        {/* ternary-operator */}
        <p id='t_task' className={note.completed == true ? "strike":""}>{note.task}</p> 
      </div>
      <div className="btn-container">
        <div className="edit"> <FiEdit size={20} onClick={()=>editTask(note.task,note.id)}/></div>
        <div className="del"><BsFillTrashFill size={20} onClick={()=>delete_note(note.id)}/></div>

      </div>
   
      </div>)}
      
      </div>
      

      {/* pop up container */}

      { edit &&  <div className="modal-container">
      <div className="modal">
        <h1>Update Task</h1>


        <form onSubmit={(e) => {  e.preventDefault(); update_note(noteId, item); setEdit(false); }}>
        <input type="text" placeholder="Update Note" value={item} onChange={(e) => setItem(e.target.value)} required />
        <button id="add">Add</button>
        </form>

        <div className="btn-container">
          <button className="cancel mod-btn" onClick={()=> setEdit(false)}>Cancel</button>
          
        </div>
      </div>
    </div> 
    }
    </>
  );
}

export default Notelist;