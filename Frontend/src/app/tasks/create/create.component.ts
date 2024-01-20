import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NotifierService } from "src/app/notifier.service";
import { Task } from "../task.model";
import { TasksService } from "../tasks.service";

import { imageTypeValidator } from "./image-type.validator";

@Component({
    selector:'app-task-create',
    templateUrl:'./create.component.html',
    styleUrls:['./create.component.css']
})

export class CreateTaskComponent implements OnInit{
    mode = 'create';
    private taskId: String = null;
    task:Task;

    taskForm:FormGroup;

    isLoading = false;

    imagePreview = null;

    constructor(
      public tasksService:TasksService, public route:ActivatedRoute,
      private notifierService:NotifierService
    ){}

    ngOnInit() {

      this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if(paramMap.has("taskId")){
              this.taskForm = new FormGroup({
                  'title': new FormControl(null, { validators: [Validators.required , Validators.minLength(3)]}),
                  'description': new FormControl(null, { validators: [Validators.required ]}),
                  'image' : new FormControl(null, { validators : [Validators.required, imageTypeValidator]}),
                  // additional feature
                  'time' : new FormControl(null, { validators: [Validators.nullValidator]})
                  // ===================

              });

              this.mode = 'edit';
              this.taskId = paramMap.get('taskId');
              this.isLoading = true;
              this.tasksService.getTask(this.taskId)
              .subscribe((resp)=>{
                  this.isLoading = false;
                  this.task = resp.data;

                  this.taskForm.setValue({
                      'title':this.task.title,
                      'description':this.task.description,
                      'image':this.task.imagePath,
                      // additional feature
                      'time':this.task.time
                      // =================
                  })

              });

          }else{
              this.taskForm = new FormGroup({
                  'title': new FormControl(null, { validators: [Validators.required , Validators.minLength(3)]}),

                  'description': new FormControl(null, { validators: [Validators.required ]}),

                  'image' : new FormControl(null, { validators : [Validators.required , imageTypeValidator]}),

                  // additional feature
                  'time' : new FormControl(null, { validators: [Validators.nullValidator]})
                  // ===================


              });

              this.mode = 'create';
              this.taskId = null;
          }
      })
    }

    onImagePicked(event:Event){


      const file =( event.target as HTMLInputElement ).files[0];
      this.taskForm.patchValue({ image:file });
      this.taskForm.get('image').updateValueAndValidity();

      // helped me for finding file type
      // console.log("Type of image variable --->",file.type);

      if(
        file.type!= "image/png" &&
        file.type!="image/jpg" &&
        file.type!="image/jpeg"
        ){
        this.notifierService.showNotification("Please select a valid image!", "OK")
      }
      else{
        this.imageToDataUrl(file);
      }
      }

      imageToDataUrl(file:File){
        const reader = new FileReader();
        reader.onload = ( )=>{
          this.imagePreview= reader.result;
        }
        this.notifierService.showNotification("Image selected","OK")

        reader.readAsDataURL(file);

      }

    onSaveTask(){


        if(!this.taskForm.valid){

          if(this.taskForm.value.title == null){
            this.notifierService.showNotification("Title and description are required", "OK");

          }
          if(this.taskForm.value.description.length < 10){
            this.notifierService.showNotification("Description should contain atleast 10 characters", "OK");

          }
          else{
            this.notifierService.showNotification("Please select an image", "OK");
            return;
          }

        }

        const task: Task = {
          _id: this.task?._id || null,
          title: this.taskForm.value.title,
          description: this.taskForm.value.description,
          imagePath: this.taskForm.value.image,
          creator: "" || null,
          // additional feature
          time: this.taskForm.value.time || null,
          // =====
        };

        console.log(this.task)


        if(this.mode == 'edit'){
          task._id = this.task._id;
          this.tasksService.updateTask(task);

        }
        else{
            this.tasksService.addTask(task, this.taskForm.value.image);
        }

        this.taskForm.reset();

      this.notifierService.showNotification("Task Created", "Okay")
    }
}
