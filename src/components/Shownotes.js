import { nanoid } from 'nanoid';
import { useState } from 'react';

const notesAr = [
    {
      id:nanoid(),
      content:'ololo1',
      mark:true
    },
    {
      id:nanoid(),
      content:'ololo2',
      mark:false
    },
    {
      id:nanoid(),
      content:'ololo3',
      mark:false
    },
    {
      id:nanoid(),
      content:'ololo4',
      mark:true
    }
  ];
  
  export function ShowNotes(){
    const [notes, setNotes] = useState(notesAr);
    const [newNote, setNewNote] = useState('');
    const [showAll, setShowAll] = useState(false); 
    const [search, setSearch] = useState('');
    const [searchSt, setSearchSt] = useState(false);

  
    const addNote = (event) => {
      event.preventDefault()
      const noteObj = {
        content: newNote,
        id: nanoid(),
        mark: Math.random() < 0.5
      }
    
    setNotes(notes.concat(noteObj))
    setNewNote('')
    }
  
    const handleNoteChange = (event) => {
      // console.log(event.target.value)
      setNewNote(event.target.value)}

    const handleSearchChange = (event) => {
      console.log(event.target.value)
      console.log("event", event);
      setSearch(event.target.value);
      if(setSearch===''){
        setSearchSt(false)
      }
      else{setSearchSt(true)}
    }
  
    const notesToShow = showAll ? notes : notes.filter(note => note.mark === true)
    const filteredNotes = !searchSt ? notesToShow : notesToShow.filter((note)=>search===note.content.substring(0,search.length));
  
    return(
    <div>
      Search <input id="search" value={search} onChange={handleSearchChange}/>
      <ul>
        {filteredNotes.map(note=>
          <Note key={note.id} note={note}/>
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>send</button>
      </form>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
    </div>
    )
  }
  
  function Note ({note}){
    return(
      <li>{note.content}</li>
    )
  }