import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Task } from "./task.model";

@Injectable({providedIn: 'root'})

export class TasksService {
    private tasks: Task[] = [];
    private tasksUpdated= new Subject<Task[]>();

    constructor(private http:HttpClient, private router:Router){

    }

    getTasks(){
      this.http.get<{status:{}, data:Task[]}>('https://backend-service-for-my-todolist-mean.onrender.com/api/tasks')
      .subscribe((taskData)=>{
          this.tasks = taskData.data;
          this.tasksUpdated.next(this.tasks=[...this.tasks]);
      })
    }

    getTask(id:String){
        return this.http.get<{status:{}, data:Task}>('https://backend-service-for-my-todolist-mean.onrender.com/api/tasks/'+id)
    }

    getTaskUpdatedListener(){
        return this.tasksUpdated.asObservable();
    }

    addTask(task:Task , image: File){

        const taskData = new FormData();
        taskData.append('title', task.title);
        taskData.append('description', task.description);
        taskData.append('image', image, task.title);
        taskData.append('time', task.time);

        this.http.post<{status:{}, data:Task[]}>('https://backend-service-for-my-todolist-mean.onrender.com/api/tasks', taskData)
        .subscribe((resp) => {
            console.log(resp);
            this.tasks.push(task);
            this.tasksUpdated.next([...this.tasks]);
            this.router.navigate(['/']);
        })
    }

    updateTask(task:Task){
      console.log("Entered update task block.")
        let taskData = null ;
        if(typeof(task.imagePath) == 'string'){
            taskData = task;
        }else{
            taskData = new FormData();
            taskData.append('_id', task._id);
            taskData.append('title', task.title);
            taskData.append('description', task.description);
            taskData.append('time', task.time);
            taskData.append('image', task.imagePath, task.title);
        }

        this.http.put<{status:{}, data:Task[]}>('https://backend-service-for-my-todolist-mean.onrender.com/api/tasks/'+task._id,taskData)
        .subscribe( (resp)=>{
            console.log(resp);
            let index = this.tasks.findIndex( t => t._id == task._id);

            if (index > -1) {
                this.tasks[index] = task;
            }
            this.getTasks();

        })

        this.router.navigate(['/']);

        console.log("End of update task block.")
    }

    deleteTask(id:String){
        this.http.delete('https://backend-service-for-my-todolist-mean.onrender.com/api/tasks/'+id)
        .subscribe((res)=>{
            console.log(res);
            this.getTasks();

          })
        this.router.navigate(['/']);
    }

}
