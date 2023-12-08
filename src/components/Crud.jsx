import React, { useEffect, useState } from 'react';
import Note from './Note';
export default function Crud() {
    const getNotes=()=>{
     fetch('http://localhost:7070/notes').then((response)=>{
           return response.json()
         }

         ).then((answer)=>{setNotes(answer)

    })
    }
    useEffect(() => {
        getNotes();
    }, []);

    const [notes, setNotes]=useState([])
    const [form, setForm]=useState({
        id:'',
        content:''
    })

    const handleChange=(event)=>{
        const { name, value } = event.target;
        setForm((prevForm)=>({...prevForm,[name]:value}));
      }

    const handleSubmit=(e)=>{
        e.preventDefault();
        const newNote={
            id: Math.floor(Math.random()*100).toString(),
            content: form.content,
          };

          const index=notes.findIndex((item)=>
            item.id===newNote.id)
    
    if (index !== -1) {// если найдено совпадение
        alert('Error')
        return
    }
    else {
        setNotes((prevNotes)=>[...prevNotes, newNote]);
      }
      fetch(' http://localhost:7070/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newNote)
      }).then((response)=>{
          console.log('Response POST',response)
          getNotes()
      })
      setForm({
        id:'',
        content:'',

      })
    }

    const deleteNote=(id)=>{
        fetch(`http://localhost:7070/notes/${id}`, {
            method: 'DELETE'
           
          }).then((response)=>{
              console.log('Response DELETE',response)
              getNotes()
          })
      }
  return (
    <div>
        <button onClick={()=>getNotes()}>Обновить</button>
    <form onSubmit={handleSubmit}>
    <input type='text' name='content' value={form.content} onChange={handleChange}></input>
    <button>Добавить</button>
    </form>

    {
      notes.map(note=>{
        //   console.log(notes)
          return <Note key={note.id} item={note} remove={deleteNote}/>
      })
    }
  </div>
  );
}