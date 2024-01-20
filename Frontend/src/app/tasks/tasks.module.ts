import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CreateTaskComponent } from "./create/create.component";
import { ListComponent } from "./list/list.component";
// import { AngularMaterialModule } from "../angular";



@NgModule({
  declarations:[
    // CreateTaskComponent,
    // ListComponent
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    // AngularMaterialModule,
    RouterModule
  ]
})

export class TasksModule{}
