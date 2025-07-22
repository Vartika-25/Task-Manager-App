class Task{
    constructor(id,name,desc,date,time,color,url){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.date=date
        this.time=time;
        this.color=color;
        this.url=url;
        this.isMarked=false; // not ready for delete/not red marked
    }
    toggle(){
        this.isMarked=!this.isMarked;
    }
}
export default Task;