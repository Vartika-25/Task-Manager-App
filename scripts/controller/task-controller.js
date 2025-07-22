//DOM document object model
import {TASK_OPERATIONS} from '../data/service/task-operation.js';
import {doAjax} from '../data/service/ajax.js'
window.addEventListener('load',init);
function init() {
  bindEvents();
  showCount();
  disablebuttons();
}
function disablebuttons(){
  document.querySelector('#remove').setAttribute('disabled',true);
  document.querySelector('#update').setAttribute('disabled',true);
}
function bindEvents(){
    document.getElementById('add').addEventListener('click',addTask);
    document.querySelector('#remove').addEventListener('click',deleteforever);
    document.querySelector('#save').addEventListener('click',save);
    document.querySelector('#load').addEventListener('click',load);
    document.querySelector('#update').addEventListener('click',update);
    document.querySelector('#load-from-server').addEventListener('click',loadFromServer);
    document.querySelector('#clear-all').addEventListener('click',clearAll);
}
function clearAll(){
  document.querySelector('#total').innerText='';
  document.querySelector('#marked').innerText='';
  document.querySelector('#unmarked').innerText='';
    document.querySelector('#tasks').innerHTML='';
     for(let field of fields){
    document.querySelector(`#${field}`).value='';
    }
}
async function loadFromServer(){
  try{
 const result= await doAjax();
 console.log('result of task json is',result['tasks']);
 TASK_OPERATIONS.tasks=result['tasks'];
 printTasktable(TASK_OPERATIONS.tasks);
 showCount();
 }
 catch(err){
   alert("some error");
   console.log(err);
 }
  
}
function update(){
  for(let field of fields){
    taskObject[field]=document.querySelector(`#${field}`).value;
  }
  printTasktable(TASK_OPERATIONS.getTasks());
  showCount();
}
function save(){
  if (window.localStorage){
    const tasks=TASK_OPERATIONS.getTasks();
    localStorage.tasks=JSON.stringify(tasks); 
    //object to JSON string convert-Serialization
    alert("data stored....");
  }
  else{
    alert("outdated browser no aupport of localStrorage....");
  }
}
function load(){
  if(window.localStorage){
    if(window.localStorage){
      const tasks=JSON.parse(localStorage.tasks); //deserialization
      printTasktable(tasks);
      showCount();
        }
        else{
          alert("no data to load....")
        }
  }
else{
    alert("outdated browser no aupport of localStrorage....");
  }
}
function deleteforever(){
  const tasks=TASK_OPERATIONS.remove();
  printTasktable(tasks);
  showCount();
}
function printTasktable(tasks){
  document.querySelector('#tasks').innerHTML='';
   //tasks.forEach(taskObject=>printTask(taskObject));
   tasks.forEach(printTask);
}
const fields=['id','name','desc','date','time','color','url'];
function addTask(){
    //console.log('add task call');

const taskObject={};
for(let field of fields){
    let fieldvalue=document.querySelector(`#${field}`).value;
    taskObject[field]=fieldvalue;
}
  TASK_OPERATIONS.add(taskObject);
 console.log('Task Object',taskObject);
  printTask(taskObject);
  showCount(); 
 clearFields()
}
 let taskObject
function edit(){
   const icon=this;
   const taskId=icon.getAttribute('task-id');
   taskObject=TASK_OPERATIONS.search(taskId);
   if(taskObject){
    for(let key in taskObject){
    if(key ==='isMarked'){
      continue;
    }
      document.querySelector(`#${key}`).value=taskObject[key];
    }
    document.querySelector('#update').disabled=false;
   }
}
function toggledelete(){
  //this hold current calling object reference
    console.log('Toggle Delete',this);
    let icon=this;
    const tr=icon.parentNode.parentNode;
    const taskId=icon.getAttribute('task-id');
    TASK_OPERATIONS.togglemark(taskId);
   // tr.className='alert alert-danger';
    tr.classList.toggle('table-danger') //predefined function provided by html 5
    showCount();
    const enabledorDisabled=TASK_OPERATIONS.getMarkedSize()>0?false:true;
    document.querySelector('#remove').disabled=enabledorDisabled;
    }
    function createImage(url){
      const imageTag=document.createElement('img');
      imageTag.src=url;
      imageTag.className='size';
      return imageTag;
    }
    function showColor(color){
      const divTag=document.createElement('div');
      divTag.style="width:50px; height:50px; background-color:"+color;
      return divTag;
    }
    function createIcon(className,fn,taskId){
  const iconTag=document.createElement('i');  //<i></i>
  iconTag.className=`fa-solid ${className} me-2 hand`;
  iconTag.addEventListener('click',fn);
  iconTag.setAttribute('task-id',taskId);
  return iconTag;
}
function clearFields(){
    for(let field of fields){
    let fieldvalue=document.querySelector(`#${field}`).value='';
    }
    document.querySelector('#id').focus();
}
function printTask(taskObject){
    const tbody=document.querySelector('#tasks');
    const tr=tbody.insertRow();
    for(let key in taskObject){
      if(key==='isMarked'){
        continue;  //skin the current iteration
      }
       let td=tr.insertCell();
      if(key=='url'){
       td.appendChild(createImage(taskObject[key]));
       continue;
      }
      else if(key=='color'){
        td.appendChild(showColor(taskObject[key]));
        continue;
      }
      td.innerText=taskObject[key];
    }
    let td=tr.insertCell();
    td.appendChild(createIcon('fa-pen',edit,taskObject.id));
    td.appendChild(createIcon('fa-trash-can',toggledelete,taskObject.id));
}
function showCount(){
  document.querySelector('#total').innerText=TASK_OPERATIONS.getSize();
  document.querySelector('#marked').innerText=TASK_OPERATIONS.getMarkedSize();
  document.querySelector('#unmarked').innerText=TASK_OPERATIONS.getUnMarkedSize();
}
