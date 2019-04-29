import { createNewNote } from "./notes.js";
import { setFilters } from "./filters.js";
import { renderNotes } from "./views.js";

renderNotes();

document.querySelector("#search-note").addEventListener("input", evt => {
  setFilters({
    searchText: evt.target.value
  });
  renderNotes();
});

document.querySelector("#drop-down").addEventListener("change", evt => {
  setFilters({
    sortBy: evt.target.value
  });
  renderNotes();
});

document.querySelector("#add-note").addEventListener("click", evt => {
  const newId = createNewNote();
  renderNotes();
  document.location.assign(`./note-edit.html#${newId}`);
});

// syncing data (notes) across pages (tabs)
window.addEventListener("storage", evt => {
  if (evt.key === "notes") {
    renderNotes();
  }
});
