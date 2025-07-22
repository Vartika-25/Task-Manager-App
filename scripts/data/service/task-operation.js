import Task from '../model/task.js';
export const TASK_OPERATIONS={
    tasks:[],
    getTasks(){
     return this.tasks;
    },
    getSize(){
       return  this.tasks.length;
    },
    getMarkedSize(){
       return this.tasks.filter(taskObject=>taskObject.isMarked).length;
    },
    getUnMarkedSize(){
       return this.getSize()-this.getMarkedSize();
    },
    add(taskObject){
     //taskObject (generic object) converted into Task(specific object)
     let task=new Task();
     for(let key in taskObject){
        task[key]=taskObject[key];
     }
     this.tasks.push(task);
     console.log('all tasks are',this.tasks);
    },
    remove(){
      this.tasks=this.tasks.filter(taskObject=>!taskObject.isMarked);
      return this.tasks;
    },
    search(taskId){
      return this.tasks.find(taskObject=>taskObject.id===taskId);
    },
    update(){

    },
    togglemark(taskId){
      const taskObject=this.search(taskId);
      if(taskObject){
         taskObject.toggle();
      }
    },
}