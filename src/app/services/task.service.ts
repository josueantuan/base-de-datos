import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { task } from "../Models/task";
import "rxjs/Rx"
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private httpClient:HttpClient) { }
  domain: string = 'http://localhost:3000';
  getTasks() {
    return this.httpClient.get<task[]>(`${this.domain}/api/tasks`)
      .map(res => res);
  }
  addTask(newTask: task){
    return this.httpClient.post<task>(`${this.domain}/api/tasks`, newTask)
    .map(res => res);
  }
  deleteTask(id){
    return this.httpClient.delete<task>(`${this.domain}/api/tasks/${id}`)
    .map(res => res);
  }
  updateTask(newTask) {
    return this.httpClient.put<task>(`${this.domain}/api/tasks/${newTask._id}`, newTask)
      .map(res => res)
  }
  
}
