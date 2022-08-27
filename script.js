console.log("Connected!");

let listType = document.getElementById("list-type");
let addBtn = document.getElementById("addBtn");
// To print No notes avaialble when the count of notes is zero
let noNotesSection = document.getElementsByClassName("no-notes-section");
let i = 0;

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// getting localStorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

addBtn.addEventListener("click", () => {
    console.log("Button pressed");
    let noteContent = document.getElementById("addTxt");
    // let noteValue = noteContent.value;
    let addTitle = document.getElementById("addTitle");
    console.log("The note content is: ", noteContent);

    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    console.log(monthName[month], day, year);
    let noteInfo = {
        timeInfo: monthName[month] + " " +  day + ", " + year,
        title: addTitle.value,
        description: noteContent.value
    }
    notes.push(noteInfo);
    console.log("This is noteInfo printing: ", noteInfo);
    console.log("This is notes printing after pushing the files: ", notes);
    addTitle.value = "";
    noteContent.value = "";
    // Vanish hona chaiye after submit nahi ho raha hai fix karo
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
})

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let newNote = `<div class="note">
                            <h3>${note.title}</h3>
                            <br>
                            <p contenteditable="false">${note.description}</p><br>
                            <button onclick="editNote(${index}, ${notes.description})" class="note-button" id="edit">Edit</button>
                            <button onclick="deleteNote(${index})" class="note-button" id="delete">Delete</button>
                            <hr>
                            <span>Last updated on: ${note.timeInfo}</span>
                        </div>`;
        listType.insertAdjacentHTML("afterend", newNote);
    });
    console.log("showNotes works");
}

function deleteNote(deleteNoteId) {
    console.log(deleteNoteId, ' numbered note is deleted! ');
    notes.splice(deleteNoteId, 1);
    // saving updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

function editNote(editId, noteDescription) {
    console.log(editId, noteDescription);
    let noteDesc = document.getElementById('edit');
    noteDesc.innerHTML("contenteditable = true");
    showNotes();
}

console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.log( "This page is reloaded" );
    showNotes();
}
