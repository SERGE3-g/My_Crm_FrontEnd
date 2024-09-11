import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {Task} from "../../models/task";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [
    DatePipe,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export default class TTasksComponent implements OnInit {
  tasks: Task[] = [];
  taskForm: FormGroup;
  isEditing: boolean = false;
  selectedTaskId: number | null = null;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      status: ['Pending', Validators.required],
      clientId: [0, Validators.required] // Assumendo che il clientId sia obbligatorio
    });
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(data => {
      this.tasks = data.tasks;
    });
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const taskData: Task = this.taskForm.value;

    if (this.isEditing && this.selectedTaskId) {
      this.taskService.updateTask(this.selectedTaskId, taskData).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    } else {
      this.taskService.createTask(taskData).subscribe(() => {
        this.loadTasks();
        this.resetForm();
      });
    }
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.selectedTaskId = task.id;
    this.taskForm.patchValue(task);
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedTaskId = null;
    this.taskForm.reset({
      title: '',
      description: '',
      dueDate: '',
      status: 'Pending',
      clientId: 0
    });
  }
}
