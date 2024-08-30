import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js"
const firebaseConfig = {
    databaseURL:"https://leadstracker-app-e52a1-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const referenceInDB = ref(database,"leads")


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")



function renderLeads(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems +=`
        <li>
            <a target="_blank" href="${leads[i]}">
                ${leads[i]}
            </a>
        </li>`
    }
    ulEl.innerHTML=listItems
}

onValue(referenceInDB, function(snapshot){
    const snapshotDoesExist = snapshot.exists()
    if(snapshotDoesExist    ){
        const snapshotValues = snapshot.val()
        const allLeads = Object.values(snapshotValues)
        renderLeads(allLeads)
    }
})

deleteBtn.addEventListener("click",()=>{
    const confirmDelete = document.getElementById("confirmDelete")
    const yesBtn = document.getElementById("yes-btn")
    const noBtn = document.getElementById("no-btn")
    const body = document.getElementById("body")
    confirmDelete.style.display = "flex"

    body.style.backgroundColor = "#7877775c"
    yesBtn.addEventListener("click",()=>{
        confirmDelete.style.display = "none"
        body.style.backgroundColor = "white"
        remove(referenceInDB)
        ulEl.innerHTML=""
      })

    noBtn.addEventListener("click",()=>{
        confirmDelete.style.display = "none"
        body.style.backgroundColor = "white"
    })
})

inputBtn.addEventListener("click", ()=>{
    push(referenceInDB, inputEl.value)
    inputEl.value = ""

})
