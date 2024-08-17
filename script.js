let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const saveTabBtn = document.getElementById("save-tab-btn")
const getLeadsFromLocStore = JSON.parse(localStorage.getItem("myLeads"))

saveTabBtn.addEventListener("click",()=>{
    chrome.tabs.query({active:true, currentWindow:true},(tabs)=>{
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
    })
})

if(getLeadsFromLocStore){
    myLeads=getLeadsFromLocStore
    renderLeads(myLeads)
}

inputBtn.addEventListener("click", ()=>{
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads)
})

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

deleteBtn.addEventListener("click",()=>{
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads)
})

