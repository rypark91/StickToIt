import React, { useState, useEffect } from 'react';

import Title from './components/NoteCollection/Title';
import NoteGrid from './components/NoteCollection/NoteGrid';
import WriteMenu from './components/UI/WriteMenu';
import EditMenu from './components/UI/EditMenu';
import './App.css';

function App() {

  const [noteCollection, setNoteCollection] = useState([]);
  const [visibleMenu, setVisibleMenu] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [editIdNum, setEditIdNum] = useState('');


  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch('https://notebase-a521f-default-rtdb.firebaseio.com/notes.json');
      
      if(!response.ok){
        throw new Error('Something went wrong!');
      }
      
      const responseData = await response.json();

      const loadedNotes = [];

      for (const key in responseData){
        loadedNotes.push({
          title: responseData[key].title,
          message: responseData[key].message,
          color: responseData[key].color,
          id: responseData[key].id,
          date: responseData[key].date
        });
      }
      setNoteCollection(loadedNotes);

    };
    fetchNotes();
    }, []);
   
    const addToFile = async (collection) => {
      // PUT request using fetch with async/await
      async function updateNotes() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(collection),
        };
        const response = await fetch('https://notebase-a521f-default-rtdb.firebaseio.com/notes.json', requestOptions);
        const data = await response.json();
        console.log(data);
    }

    updateNotes();
 
  }  
  const removeFromFile = async (collection) => {
    async function updateNotes() {
      const requestOptions = {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(collection),
      };
      const response = await fetch('https://notebase-a521f-default-rtdb.firebaseio.com/notes.json', requestOptions);
      const data = await response.json();
      console.log(data);
  }

  updateNotes();

}  
  
  const saveToFile = async () => {
      async function updateNotes() {
          const requestOptions = {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(noteCollection),
          };
          const response = await fetch('https://notebase-a521f-default-rtdb.firebaseio.com/notes.json', requestOptions);
          const data = await response.json();
          console.log(data);
      }
  
      updateNotes();
 
  }

  const createNoteHandler = (enteredNoteData) => {
    let newList = [{title: enteredNoteData.title, message: enteredNoteData.message, color: enteredNoteData.color, 
      id: Math.random().toString(), date: new Date().toLocaleDateString().split(',')}, ...noteCollection]
    setNoteCollection(newList);
    setVisibleMenu(false);
    addToFile(newList);    
  };
  const removeNoteHander = (id) => {
    var result = noteCollection.filter(rNote => {
      return rNote.id !== id;
    });
    setNoteCollection(result);
    removeFromFile(result);
  }
  const editNoteHandler = (editNote) => {
    
    var result = noteCollection.findIndex(rNote => rNote.id === editIdNum);
    
    let newArray = noteCollection;
    newArray[result].title = editNote.title;
    newArray[result].message = editNote.message;
    newArray[result].color = editNote.color; 
    setVisibleEdit(false);
    setNoteCollection(newArray);
    saveToFile();
  }
  const toggleMenuHandler = () => {
    setVisibleMenu(true);
  }
  const toggleEditHandler = (id) => {
    setEditIdNum(id);
    setVisibleEdit(true);
    
  }
  const closeHandler = () => {
    setVisibleEdit(false);
    setVisibleMenu(false);
  }
 
  return (
    <div className="App">
      <Title onToggleMenu={toggleMenuHandler}/>
      { visibleMenu && <WriteMenu onCreateNote={createNoteHandler} onClose={closeHandler}/>}
      { visibleEdit && <EditMenu onEditNote={editNoteHandler} onClose={closeHandler}/>}
      <NoteGrid notes={noteCollection}
      editToggled={visibleEdit}
      onRemove={removeNoteHander} 
      onEditToggle={toggleEditHandler}/>
    </div>
  );
}

export default App;




  //sources:
  //https://jasonwatmore.com/post/2020/11/02/react-fetch-http-put-request-examples
  //online classes