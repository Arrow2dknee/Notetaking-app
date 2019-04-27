import { initializeEditPage, getDateModified } from './views.js';
import { updateNote, removeNote } from './notes.js';

const noteId = document.location.hash.substring(1);
initializeEditPage(noteId);

document.querySelector('#note-title').addEventListener('input', (evt) => {
    const note = updateNote(noteId, {
        title: evt.target.value
    });
    document.querySelector('#date-modified').textContent = getDateModified(note.dateModified);
});

document.querySelector('#note-body').addEventListener('input', (evt) => {
    const note = updateNote(noteId, {
        description: evt.target.value
    });
    document.querySelector('#date-modified').textContent = getDateModified(note.dateModified);
});

document.querySelector('#remove-note').addEventListener('click', (evt) => {
    removeNote(noteId);
    document.location.assign('/index.html');
})
// syncing data across pages
window.addEventListener('storage', (evt) => {
    if (evt.key === 'notes') {
        initializeEditPage(noteId);
    }
})