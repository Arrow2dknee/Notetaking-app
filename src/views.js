import moment from 'moment';
import { getNotes, sortNotes, removeNote } from './notes.js';
import { getFilters } from './filters.js';

/**
 * Function: generateNoteDOM(array)
 * create <p></p> elements for notes in the DOM
 */
const generateNoteDOM = (note) => {

    const noteElement = document.createElement('div');
    const textElement = document.createElement('a');
    const buttonElement = document.createElement('button');
    const status = document.createElement('p');

    noteElement.style.margin = '10px';

    textElement.setAttribute('href', `/note-edit.html#${note.id}`);
    if (note.title.length > 0) {
        textElement.textContent = note.title;
    } else {
        textElement.textContent = 'Empty Note';
    }
    noteElement.appendChild(textElement);

    buttonElement.textContent = 'X';
    buttonElement.style.marginLeft = '10px';
    buttonElement.addEventListener('click', (evt) => {
        removeNote(note.id);
        renderNotes();
    });
    noteElement.appendChild(buttonElement);
    
    status.textContent = getDateModified(note.dateModified);
    // status.classList.add('list-item__subtitle');
    noteElement.appendChild(status);
    return noteElement;
}
/**
 * Function: renderNotes(array, object)
 * filters notes based on a user search string and generate the notes in DOM
 */
const renderNotes = () => {
    
    const { searchText, sortBy } = getFilters();
    const notes = sortNotes(sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchText.toLowerCase()));
    document.querySelector('#note-box').innerHTML = '';
    
    if (filteredNotes.length > 0) {
        filteredNotes.forEach((note, indx) => {
            const noteElement = generateNoteDOM(note);
            document.querySelector('#note-box').appendChild(noteElement);
        });
    } else {
        const noMatchingNotes = document.createElement('p');
        noMatchingNotes.textContent = 'No notes to show';
        noMatchingNotes.classList.add('null-notes');
        document.querySelector('#note-box').appendChild(noMatchingNotes);
    }
    
}
/**
 * Function: getTimestamp(prop)
 * print/generate last modified message
 */
const getDateModified = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`;

function initializeEditPage(noteID) {
    
    const notes = getNotes();
    const myNote = notes.find((note, index) => note.id === noteID);

    if (!myNote) { 
        document.location.assign('/index.html');
    }
    document.title = myNote.title; // changing the title of the document based on the note title
    document.querySelector('#note-title').value = myNote.title;
    document.querySelector('#note-body').value = myNote.description;
    document.querySelector('#date-modified').value = getDateModified(myNote.dateModified);
}


export { generateNoteDOM, renderNotes, getDateModified, initializeEditPage };