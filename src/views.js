import moment from "moment";
import { getNotes, sortNotes, removeNote } from "./notes.js";
import { getFilters } from "./filters.js";

/**
 * Function: generateNoteDOM(array)
 * create <p></p> elements for notes in the DOM
 */
const generateNoteDOM = note => {
  const noteElement = document.createElement("a");
  const textElement = document.createElement("p");
  const buttonElement = document.createElement("button");
  const status = document.createElement("p");

  // setup the notes link
  noteElement.setAttribute("href", `./note-edit.html#${note.id}`);
  noteElement.classList.add("list-item");

  // setup the notes title
  if (note.title.length > 0) {
    textElement.textContent = note.title;
  } else {
    textElement.textContent = "Empty Note";
  }
  textElement.classList.add("list-item__title");
  noteElement.appendChild(textElement);

  // setup the delete button
  buttonElement.textContent = "Delete";
  buttonElement.addEventListener("click", evt => {
    removeNote(note.id);
    renderNotes();
  });
  buttonElement.classList.add("list-item__button");

  // setup the last updated at message
  status.textContent = getDateModified(note.dateModified);
  status.classList.add("list-item__subtitle");
  noteElement.appendChild(status);
  noteElement.appendChild(buttonElement);

  return noteElement;
};
/**
 * Function: renderNotes(array, object)
 * filters notes based on a user search string and generate the notes in DOM
 */
const renderNotes = () => {
  const noteBoxDiv = document.querySelector("#note-box");
  const { searchText, sortBy } = getFilters();
  const notes = sortNotes(sortBy);
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchText.toLowerCase())
  );
  noteBoxDiv.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note, indx) => {
      const noteElement = generateNoteDOM(note);
      noteBoxDiv.appendChild(noteElement);
    });
  } else {
    const noMatchingNotes = document.createElement("p");
    noMatchingNotes.textContent = "No notes to show";
    noMatchingNotes.classList.add("empty-message");
    noteBoxDiv.appendChild(noMatchingNotes);
  }
};
/**
 * Function: getTimestamp(prop)
 * print/generate last modified message
 */
const getDateModified = timestamp =>
  `Last edited ${moment(timestamp).fromNow()}`;

function initializeEditPage(noteID) {
  const notes = getNotes();
  const myNote = notes.find((note, index) => note.id === noteID);

  if (!myNote) {
    document.location.assign("./index.html");
  }
  document.title = myNote.title; // changing the title of the document based on the note title
  document.querySelector("#note-title").value = myNote.title;
  document.querySelector("#note-body").value = myNote.description;
  document.querySelector("#date-modified").textContent = getDateModified(
    myNote.dateModified
  );
}

export { generateNoteDOM, renderNotes, getDateModified, initializeEditPage };
