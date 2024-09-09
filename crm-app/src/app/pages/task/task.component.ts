import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export default class TasksComponent implements OnInit {

  tasks: Task[] = [];
  selectedTask: Task | null = null;
  newTask: Task = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    clientId: 0,
    status: 'Pending'
  };
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(page: number = 1): void {
    this.taskService.getTasks(page, 10).subscribe(data => {
      this.tasks = data.tasks;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  selectTask(task: Task): void {
    this.selectedTask = { ...task };
  }

  saveTask(): void {
    if (this.selectedTask && this.selectedTask.id) {
      this.taskService.updateTask(this.selectedTask.id, this.selectedTask).subscribe(() => {
        this.loadTasks(this.currentPage);
        this.selectedTask = null;
      });
    } else {
      this.taskService.createTask(this.newTask).subscribe(() => {
        this.loadTasks(this.currentPage);
        this.newTask = { id: 0, title: '', description: '', dueDate: '', clientId: 0, status: 'Pending' };
      });
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks(this.currentPage);
    });
  }

  resetForm(): void {
    this.selectedTask = null;
    this.newTask = { id: 0, title: '', description: '', dueDate: '', clientId: 0, status: 'Pending' };
  }

  goToPage(page: number): void {
    this.loadTasks(page);
  }
}
