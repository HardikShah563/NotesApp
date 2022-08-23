console.log("Connected!");

let listType = document.getElementById("list-type");

const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// getting localStorage notes if exist and parsing them to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", () => {
    console.log("Button pressed");
    let addTxt = document.getElementById("addTxt");
    let noteContent = addTxt.value;
    console.log("The note content is: ", noteContent);

    let date = new Date();
    let day = date.getDay();
    let month = date.getMonth();
    let year = date.getFullYear();
    console.log(monthName[month], day, year);
    let noteInfo = {
        timeInfo: monthName[month] + " " +  day + ", " + year,
        description: addTxt.value
    }
    notes.push(noteInfo);
    console.log("This is noteInfo printing: ", noteInfo);
    console.log("This is notes printing after pushing the files: ", notes);
    addTxt.value = "";
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
})

function showNotes() {
    document.querySelectorAll(".note").forEach(note => note.remove());
    notes.forEach((note, index) => {
        let newNote = `<div class="note">
                            <h3>Note Title</h3>
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

if(/*if someone reloads the page*/true) {
    console.log( "This page is reloaded" );
}

console.info(performance.navigation.type);
if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
    console.log( "This page is reloaded" );
    showNotes();
}
