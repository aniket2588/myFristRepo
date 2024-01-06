const addbtn = document.querySelector("#addbtn")
const main = document.querySelector(".main")


addbtn.addEventListener("click", function () {
    addNote()
})

const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea")
    // console.log(notes)
    const data = [];
    notes.forEach((e) => {
        data.push(e.value)
    })
    if (data.length === 0) {
        localStorage.removeItem("notes")
        addNote()
    }
    else {
        localStorage.setItem("notes", JSON.stringify(data))

    }
}



const addNote = (text = "") => {
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = ` <div class="tool">
    <i class="save fa-solid fa-floppy-disk"></i>
    <i class="remove fa-solid fa-trash-can"></i>
</div>
<textarea>${text}</textarea>`

    note.querySelector(".remove").addEventListener("click", function () {
        note.remove()
        savenotes()

    })
    note.querySelector(".save").addEventListener("click", function () {
        savenotes()
    })
    note.querySelector("textarea").addEventListener("focusout",function(){
        savenotes()

    })
    main.appendChild(note)
    savenotes()
}

(
    function () {

        const notess = JSON.parse(localStorage.getItem("notes"))
        if (notess.length === null) {
            addNote()
        }
        else {
            notess.forEach((e) => {
                addNote(e)
            })
        }


    }
)()

