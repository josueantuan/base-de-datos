import { Component, OnInit } from '@angular/core';
import { task} from "../../Models/task";
//Importar Servicio
import { TaskService } from "../../services/task.service";
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  tasks: task[];
  title: string;
  constructor(private taskService: TaskService) {
    this.taskService.getTasks().subscribe(tasks =>{
      this.tasks = tasks
    });
  }

  ngOnInit() {
  }
  addTask(event){
    event.preventDefault();
    const newTask: task = {
      title: this.title,
      isDone: false,
    };
    this.taskService.addTask(newTask).subscribe(task => {
      this.tasks.push(task);
      console.log(this.tasks);
    })
    this.title="";
  }
  deleteTask(id){
    const response = confirm('Desea eliminar?')
    if(response){
      const task = this.tasks;
      this.taskService.deleteTask(id)
      .subscribe(data => {
        if(data.n == 1){
          for(let i=0; i < this.tasks.length;i++){
            if(task[i]._id == id){
              this.tasks.splice(i,1);
            }
          }
        }
      });
    } return;
  }
  updateTask(task:task){
    const newTask={
      _id: task._id,
      title: task.title,
      isDone: !task.isDone
    };

    this.taskService.updateTask(newTask)
    .subscribe(res => {
      task.isDone = !task.isDone
    });
  }
}
