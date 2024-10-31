//query selectors
const btn = document.querySelector('.btn');

//eventListeners
btn.addEventListener('click', addNote);
window.onload = () => {
  const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
  savedNotes.forEach(noteObj => createNoteElement(noteObj.id, noteObj.content));
};

//functions
function addNote() {
  //create an id and content for a new note
  const id = Math.floor(Math.random() * 10000);
  const content = '';

  //add new note
  createNoteElement(id, content);

  //save the note to local storage
  const notes = getStoredNotes();
  notes.push({ id: id, content: content });
  updateLocalStorage(notes);
}

function createNoteElement(id, content) {
  //add new note
  const markUp = `
  <textarea
    cols="30"
    rows="10"
    class="note"
    data-id="${id}"
    placeholder="Empty Note"
  >${content}</textarea>
`;
  btn.insertAdjacentHTML('beforebegin', markUp);
  const noteNew = document.querySelector(`textarea[data-id="${id}"]`);
  noteNew.addEventListener('input', updateNote);
  noteNew.addEventListener('dblclick', deleteNote);
}

// Function to update note content in local storage
function updateNote(event) {
  const noteId = parseInt(event.target.dataset.id);
  const content = event.target.value;

  const notes = getStoredNotes();
  const noteToUpdate = notes.find(note => note.id === noteId);
  if (noteToUpdate) {
    noteToUpdate.content = content;
    updateLocalStorage(notes);
  }
}

// Function to delete a note
function deleteNote(event) {
  const warning = confirm('Do you want to delete this note?');
  if (warning) {
    const noteId = parseInt(event.target.dataset.id);
    event.target.remove();

    // Remove the note from local storage
    let notes = getStoredNotes();
    notes = notes.filter(note => note.id !== noteId);
    updateLocalStorage(notes);
  }
}

// Utility function to get notes from local storage
function getStoredNotes() {
  return JSON.parse(localStorage.getItem('notes')) || [];
}

// Utility function to update notes in local storage
function updateLocalStorage(notes) {
  localStorage.setItem('notes', JSON.stringify(notes));
}
