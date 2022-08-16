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
})

function showNotes() {
    notes.forEach(note => {
        let newNote = `<div class="note">
                            <h3>Note Title</h3>
                            <br>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt minus quaerat accusantium facilis molestias a laboriosam veniam sunt nemo excepturi.</p><br>
                            <button class="note-button" id="edit">Edit</button>
                            <button class="note-button" id="delete">Delete</button>
                            <hr>
                            <span>Last updated on: month date, year</span>
                        </div>`;
                        listType.insertAdjacentElement("afterend", newNote);
    });
    console.log("showNotes works");
}
showNotes();