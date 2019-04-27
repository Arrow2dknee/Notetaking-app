import uuidv4 from 'uuid/v4';
import moment from 'moment';
let notes = [];

/**
 * Function: getSavedNotes()
 * Read the existing notes from local storage
 */
const getSavedNotes = () => {
    
    const notesJSON = localStorage.getItem('notes'); //if a data was present in local storage, then
    // an array is returned as a JSON string.
    try {
        if (notesJSON) { // if JSON is not null
            return JSON.parse(notesJSON); //JSON parse method takes the JSON string i.e array as a string
        // and converts it to JS array and store it into 'notes'.
        } else {
            return [];
        }
    } catch (e) {
        return []; // if data in local storage was invalid,
        // then reset the local storage with an empty array
    }
} 
/**
 * Function: getNotes()
 * expose notes value to outside the module
 */
const getNotes = () => notes;
/**
 * Function: createNewNote()
 * create a note object and add it to array
 */
const createNewNote = () => {
    const newId = uuidv4();
    const timestamp = moment().valueOf();
    notes.push({
        id: newId,
        title: '',
        description: '',
        dateCreated: timestamp,
        dateModified: timestamp
    });
    saveNotes();
    return newId;
}
/**
 * Function: saveNotes()
 * save notes to local storage
 */
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}
/**
 * Function: removeNote(prop)
 * delete a note from array upon user interaction.
 */
const removeNote = (uniqueID) => {

    const getPosition = notes.findIndex((note, index) => note.id === uniqueID);
    if (getPosition > -1) {
        notes.splice(getPosition, 1);
        saveNotes();
    }
}
/**
 * Function: sortNotes(prop)
 * sort notes based on category selected by user
 */
const sortNotes = (sortBy) => {

    if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1;
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1;
            } else {
                return 0;
            }
        });
    } else if (sortBy === 'byDateModified') {
        return notes.sort((a, b) => {
            if (a.dateModified > b.dateModified) { // Note 'a' is recent
                return -1;
            } else if (a.dateModified < b.dateModified) { // Note 'a' was last modified in past
                return 1;
            } else {
                return 0;
            }
        })
    } else if (sortBy === 'byRecent') {
        return notes.sort((a, b) => {
            if (a.dateCreated > b.dateCreated) { // Note 'a' is recent
                return -1;
            } else if (a.dateCreated < b.dateCreated) { // Note 'a' was last modified in past
                return 1;
            } else {
                return 0;
            }
        })
    } else {
        return notes;
    }
}
/**
 * Function: updateNote(id, fields)
 * update a note in array based on the id and save the changes
 */
function updateNote(id, updateField) {
    const note = notes.find(note => note.id == id);
    if (!note) {
        return undefined;
    }
    if (typeof updateField.title === 'string') {
        note.title = updateField.title;
        // note.dateModified = moment().valueOf();
    }
    if (typeof updateField.description === 'string') {
        note.description = updateField.description;
        // note.dateModified = moment().valueOf();
    }
    note.dateModified = moment().valueOf();
    saveNotes();
    return note;
}
notes = getSavedNotes();

export { getNotes, createNewNote, removeNote, sortNotes, updateNote }; 