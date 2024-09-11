import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserService} from "../../services/user.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export default class UserComponent implements OnInit {

  users: User[] = [];
  userForm: FormGroup;
  isEditing: boolean = false;
  selectedUserId: number | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required], // Ruolo utente, es. 'Admin', 'User'
      password: ['', Validators.required] // Solo per creazione o modifica
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(page: number = 1): void {
    this.userService.getUsers(page, 10).subscribe(data => {
      this.users = data.users;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      return;
    }

    const userData: User = this.userForm.value;

    if (this.isEditing && this.selectedUserId !== null) {
      this.userService.updateUser(this.selectedUserId, userData).subscribe(() => {
        this.loadUsers(this.currentPage);
        this.resetForm();
      });
    } else {
      this.userService.createUser(userData).subscribe(() => {
        this.loadUsers(this.currentPage);
        this.resetForm();
      });
    }
  }

  selectUser(user: User): void {
    this.isEditing = true;
    this.selectedUserId = user.id;
    this.userForm.patchValue(user);
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers(this.currentPage);
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedUserId = null;
    this.userForm.reset({
      username: '',
      email: '',
      role: '',
      password: ''
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadUsers(page);
    }
  }
}
