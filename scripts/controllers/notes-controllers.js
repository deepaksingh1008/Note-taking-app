// import {noteOperation} from '../services/note-service.js';
// window.addEventListener('load',init);
// function init(){
//  showCount();
//  bindEvent();
// disableButton();
// }

// function showCount(){
//   document.querySelector('#total').innerText=noteOperation.total();
//   document.querySelector('#mark').innerText=noteOperation.mark();
//   document.querySelector('#unmark').innerText=noteOperation.unmark();
// }
// function disableButton(){
//   document.querySelector('#del').setAttribute('disabled',true);
// }
// function unDisable(){
//   document.querySelector('#del').setAttribute('disabled',false);
// }
// function bindEvent(){
//   document.querySelector('#add').addEventListener('click',addNote);

// }

// function addNote(){
//   let arr = noteOperation.notes;
//   noteOperation.notes=[];
//    //read id ,tittle,desc,date of completion,
//   // const id = document.querySelector('#id').ariaValueMax;
//   //const tittle = document.querySelector('#tittle').value
// const fields = ['id','tittle','desc','cd','imp'];
// const noteObject = {}; //object literal
// for(let field of fields){
//     //console.log(fields[field])
//     noteObject[field]=document.querySelector(`#${field}`).value.trim();
// }
// // noteObject['marked']=false;
// // printNote(noteObject);
// noteOperation.add(noteObject);
// printNote(noteObject,arr);
// showCount();
// }
// // function printFun(){
// //  console.log(noteOperation.notes)
// //  }
// function printNote(noteObject,arr){
//      const tbody = document.querySelector('#notes');
//     //  const row = tbody.insertRow(); //<tr>
//      for(let a of noteOperation.notes){
//       let row = tbody.insertRow();
//        for (let key in a){
//        // const td = row.insertCell();
//            if(key!='isMarked'){
//             const td = row.insertCell();                        //<td>
//          td.innerText=a[key];
//            }
//        }
//       const td = row.insertCell();
//       td.appendChild(printIcon(noteObject.id,'pen-to-square'));
//       td.appendChild(printIcon(noteObject.id));
//       const childElements = td.children;
//       childElements[0].addEventListener('click',edit);
//       childElements[1].addEventListener('click',deleteItem);

//     // noteObject['marked']=false;
//     }

//     const concatenatedArray = noteOperation.notes;
//     noteOperation.notes=[]
//     noteOperation.notes= noteOperation.notes.concat(arr);
//     console.log(concatenatedArray);
//     noteOperation.notes = concatenatedArray.concat(arr);
//     //  const td = row.insertCell();
//     //  td.appendChild(printIcon(noteObject.id,'pen-to-square',));
//     //  td.appendChild(printIcon(noteObject.id));
//     //  const childElements = td.children;
//     //  childElements[0].addEventListener('click',edit);
//     //  childElements[1].addEventListener('click',deleteItem);   //  td.child.addEventListener('click',handleClick);
//      //console.log(row);
//     // row.setAttribute('id',`${noteObject.id}`);
//    //  noteObject['marked']=false;

// }

// function printIcon(id,myClassName='trash'){
//   const iTag = document.createElement('i');
//   let c = myClassName=='trash'?'delete':'edit';  // return <i>
//   iTag.className = `fa-solid fa-${myClassName} ${c} click me-4`;
//   iTag.setAttribute('id',`${id}`);

//   return iTag;

// }

//  function editAndDelete(obj){
//     // if(myClassName == 'trash'){
//     //     deleteItem(Id);
//     // }
//     // else {
//     //   edit(Id);
//     // }
//     console.log(obj.classList[2]);
//  }

// function edit(){
//  // alert("edit = ",Id);
//   console.log(this)
// }
// function deleteItem(){
//   const p = this.parentElement;
//   const parent=this.parentElement.parentElement;
//   p.backgroundColor='red'
//   console.log(parent);
//   //parent.children.style.color='red';

//   const id=this.id;
//   console.log(id);
//   unDisable();
//    const d = document.querySelector('#del');
//    d.style.backgroundColor='black';
//    d.addEventListener('click',()=>{
//     noteOperation.deleteOneItem(id);
//     parent.remove();
//     d.style.backgroundColor='red';
//     init();
//    })

// }

// //controller (I/O) + event + talk to service

import { noteOperation } from "../services/note-service.js";
window.addEventListener("load", init);

function init() {
  showCount();
  bindEvent();
  buttonDisable();
  updateButtonDisable();
}

function showCount() {
  noteOperation.mark() > 0 ? enableButton() : buttonDisable();
  document.querySelector("#total").innerText = noteOperation.total();
  document.querySelector("#mark").innerText = noteOperation.mark();
  document.querySelector("#unmark").innerText = noteOperation.unmark();
}
function bindEvent() {
  document.querySelector("#add").addEventListener("click", addNote);
  document.querySelector("#del").addEventListener("click", deleteMarked);
  document.querySelector("#search").addEventListener("click", enableSearch);
  document.querySelector("#sort").addEventListener("click", sorting);
 // document.querySelector("#Update").addEventListener('click',updateData);
}


function  updateButtonDisable(){
  document.querySelector(`#Update`).disabled=true;
}

function  updateButtonEnable(){
  document.querySelector(`#Update`).disabled=false;
}

function handleSort(){
  const id = this.id;
    console.log(id);
   noteOperation.sortNotes();
    if(id=='sortIdByAsec' || id=='sortIdByDec'){
     let idx = id=='sortIdByAsec'?'a':'d';
     noteOperation.sortNotesById(idx);
  }
  else if(id=='sortTittleByAsec' || id=='sortTittleByDec'){
    let idx = id=='sortTittleByAsec'?'a':'d';
    noteOperation.sortNotes(idx,'tittle');
  }
  else if(id=='sortDesByAsec' || id=='sortDesByDec'){
    let idx = id=='sortDesByAsec'?'a':'d';
    noteOperation.sortNotes(idx,'desc');
  }
  else if(id=='sortComByAsec' || id=='sortComByDec'){
    let idx = id=='sortComByAsec'?'a':'d';
    noteOperation.sortNotes(idx,'cd');
  }
  else{
    alert('error in sort function');
  }
  printNotes(noteOperation.notes);
}



function sorting(){
  let sortBy = document.querySelectorAll('.sort-data');
  sortBy.forEach(function(e){
    e.addEventListener('click',handleSort);
  })
}

function disabledSearch() {
  document.querySelector("#serDiv").remove();
  console.log("disable");
}



function doSearch() {
  let flag = this.innerText;
  if (flag == "Search") {
    const inputValue = document.querySelector("#inputValue").value;
    const obj = noteOperation.searchById(inputValue);
    const storeSearch = [];
    storeSearch.push(obj);
    printNotes(storeSearch);
    let d = document.querySelector("#searchBtn");
    d.innerText = "Clear";
  } else {
    disabledSearch();
    printNotes(noteOperation.notes);
  }
}



function enableSearch() {
  let parent = document.querySelector("#targetDiv");
  let searchDiv = document.createElement("div");
  searchDiv.className = "mar";
  searchDiv.setAttribute("id", "serDiv");
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = "Search Here";
  input.setAttribute("id", "inputValue");
  let button = document.createElement("button");
  button.textContent = "Search";
  button.className = "btn btn-info";
  button.setAttribute("id", "searchBtn");
  button.addEventListener("click", doSearch);
  searchDiv.appendChild(input);
  searchDiv.appendChild(button);
  parent.parentNode.insertBefore(searchDiv, parent.nextSibling);
}




function buttonDisable() {
  document.querySelector("#del").disabled=true;
}

function enableButton() {
  document.querySelector("#del").disabled=false;
}

function printNotes(notes) {
  const tbody = document.querySelector("#notes");
  tbody.innerHTML = "";
  notes.forEach((element) => printNote(element));
  showCount();
}

function deleteMarked() {
  noteOperation.remove();
  printNotes(noteOperation.getNotes());
}

function doBlankInputBox(fields){
  for (let field of fields) {
    document.querySelector(`#${field}`).value='';
  }
}


function addNote() {
  //read id ,tittle,desc,date of completion,
  // const id = document.querySelector('#id').ariaValueMax;
  //const tittle = document.querySelector('#tittle').value
  const fields = ["id", "tittle", "desc", "cd", "imp"];
  const noteObject = {}; //object literal
  for (let field of fields) {
    //console.log(fields[field])
    noteObject[field] = document.querySelector(`#${field}`).value.trim();
  }
  doBlankInputBox(fields);
  printNote(noteObject);
  noteOperation.add(noteObject);
  showCount();
}

function printNote(noteObject) {
  const tbody = document.querySelector("#notes");
  const row = tbody.insertRow(); //<tr>
  for (let key in noteObject) {
    if (key != "isMarked") {
      const td = row.insertCell(); //<td>
      td.innerText = noteObject[key];
    }
  }
  const td = row.insertCell();
  td.appendChild(printIcon("pen-to-square", edit, noteObject.id));
  td.appendChild(printIcon("trash", toggleMark, noteObject.id));
}

function printIcon(myClassName, fn, id) {
  const iTag = document.createElement("i"); // return <i>
  iTag.className = `fa-solid fa-${myClassName} hand me-4`;
  iTag.setAttribute("note-id", id);
  iTag.addEventListener("click", fn); //margin 2;
  return iTag;
}

function fillInput(obj){
  const fields = ["id", "tittle", "desc", "cd", "imp"];
  for (let field of fields) {
    document.querySelector(`#${field}`).value=obj[`${field}`];
  }
}
function updateData(id){
  // console.log('id = ',id);
  const fields = ["id", "tittle", "desc", "cd", "imp"];
  const obj = {};
  for (let field of fields) {
     obj[`${field}`]=document.querySelector(`#${field}`).value
  }
  // noteOperation.updateData(id,obj);
    return obj;
  
}

function edit() {
 const id = this.getAttribute("note-id");
 updateButtonEnable();
 const obj = noteOperation.searchById(id);
 const index = noteOperation.searchByIndex(obj);
 console.log("index = ", index)
 console.log("obj = ", obj)
 fillInput(obj);
//  const data = updateData(id);
 //console.log("Update Data = ",data);
 document.querySelector("#Update").addEventListener('click',function(){
       const data = updateData(id);
       console.log(data);
       noteOperation.updateData(index,data);
       printNotes(noteOperation.notes);
       doBlankInputBox(["id", "tittle", "desc", "cd", "imp"]);
 });

}

function toggleMark() {
  const icon = this;
  const id = this.getAttribute("note-id");
  noteOperation.toggleMark(id);
  showCount();
  console.log(id);

  const tr = icon.parentNode.parentNode;
  tr.classList.toggle("table-danger");
}

























































































//controller (I/O) + event + talk to service

// import { noteOperation } from "../services/note-service.js";
// window.addEventListener("load", init);

// function init() {
//   showCount();
//   bindEvent();
//   buttonDisable();
// }

// function showCount() {
//   noteOperation.mark()>0?enableButton():buttonDisable();
//   document.querySelector("#total").innerText = noteOperation.total();
//   document.querySelector("#mark").innerText = noteOperation.mark();
//   document.querySelector("#unmark").innerText = noteOperation.unmark();
// }
// function bindEvent() {
//   document.querySelector("#add").addEventListener("click", addNote);
//   document.querySelector('#del').addEventListener('click',deleteMarked);
// }
// function buttonDisable() {
//   document.querySelector("#del").disabled=true;
// }
// function enableButton(){
//   document.querySelector("#del").disabled=false;
// }

// function printNotes(notes){
//   const tbody = document.querySelector('#notes');
//   tbody.innerHTML='';
//    notes.forEach(element => printNote(element));
//    showCount();
// }

// function deleteMarked(){
//       noteOperation.remove();
//       printNotes(noteOperation.getNotes())
// }

// function addNote() {
//   //read id ,tittle,desc,date of completion,
//   // const id = document.querySelector('#id').ariaValueMax;
//   //const tittle = document.querySelector('#tittle').value
//   const fields = ["id", "tittle", "desc", "cd", "imp"];
//   const noteObject = {}; //object literal
//   for (let field of fields) {
//     //console.log(fields[field])
//     noteObject[field] = document.querySelector(`#${field}`).value.trim();
//   }
//   printNote(noteObject);
//   noteOperation.add(noteObject);
//   showCount();
// }

// function printNote(noteObject) {
//   const tbody = document.querySelector("#notes");
//   const row = tbody.insertRow(); //<tr>
//   for (let key in noteObject) {
//     if(key!='isMarked'){
//     const td = row.insertCell(); //<td>
//     td.innerText = noteObject[key];
//     }
//   }
//   const td = row.insertCell();
//   td.appendChild(printIcon("pen-to-square", edit, noteObject.id));
//   td.appendChild(printIcon("trash", toggleMark, noteObject.id));
// }

// function printIcon(myClassName, fn, id) {
//   const iTag = document.createElement("i"); // return <i>
//   iTag.className = `fa-solid fa-${myClassName} hand me-4`;
//   iTag.setAttribute("note-id", id);
//   iTag.addEventListener("click", fn); //margin 2;
//   return iTag;
// }

// function edit() {
//   console.log("edit");
// }
// function toggleMark() {
//   const icon = this;
//   const id = this.getAttribute("note-id");
//   noteOperation.toggleMark(id);
//   showCount();
//   console.log(id);

//   const tr = icon.parentNode.parentNode;
//   tr.classList.toggle("table-danger");
// }
// //controller (I/O) + event + talk to service
