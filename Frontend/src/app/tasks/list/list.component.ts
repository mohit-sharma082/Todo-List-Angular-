import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Task } from '../task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit , OnDestroy{

  storedTasks:Task[] = [];

  userId = null;

  isLoading = false;

  private authListenerSubs:Subscription;
  private takesSub : Subscription
  public userIsAuthenticated = false;

  constructor(public tasksService:TasksService, private authService: AuthService){}

  ngOnInit(){
    this.tasksService.getTasks();
    this.isLoading = true;

    this.tasksService.getTaskUpdatedListener().subscribe(( tasks: Task[]) => {
      this.isLoading = false;
      this.storedTasks = tasks;
    })

    this.userIsAuthenticated = this.authService.getAuthStatus();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;

      this.userId = this.authService.getUserId();

    })
  }

  onDelete(id:String){
    this.tasksService.deleteTask(id);
    this.tasksService.getTasks();


  }

  ngOnDestroy() {
    this.takesSub?.unsubscribe();
    this.authListenerSubs.unsubscribe();
  }

}
