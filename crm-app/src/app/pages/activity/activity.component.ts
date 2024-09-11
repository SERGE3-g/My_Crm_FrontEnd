import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Activity} from "../../models/activity";
import {ActivityService} from "../../services/activity.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DatePipe
  ],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export default class ActivityComponent implements OnInit {

  activities: Activity[] = [];
  activityForm: FormGroup;
  isEditing: boolean = false;
  selectedActivityId: number | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private activityService: ActivityService, private fb: FormBuilder) {
    this.activityForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: ['', Validators.required],
      clientId: [0, Validators.required], // Assumendo che il clientId sia obbligatorio
      type: ['', Validators.required] // Tipo di attività
    });
  }

  ngOnInit(): void {
    this.loadActivities();
  }

  loadActivities(page: number = 1): void {
    this.activityService.getActivities(page, 10).subscribe(data => {
      this.activities = data.activities;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  onSubmit(): void {
    if (this.activityForm.invalid) {
      return;
    }

    const activityData: Activity = this.activityForm.value;

    if (this.isEditing && this.selectedActivityId !== null) {
      this.activityService.updateActivity(this.selectedActivityId, activityData).subscribe(() => {
        this.loadActivities(this.currentPage);
        this.resetForm();
      });
    } else {
      this.activityService.createActivity(activityData).subscribe(() => {
        this.loadActivities(this.currentPage);
        this.resetForm();
      });
    }
  }

  selectActivity(activity: Activity): void {
    this.isEditing = true;
    this.selectedActivityId = activity.id;
    this.activityForm.patchValue(activity);
  }

  deleteActivity(id: number): void {
    this.activityService.deleteActivity(id).subscribe(() => {
      this.loadActivities(this.currentPage);
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedActivityId = null;
    this.activityForm.reset({
      title: '',
      description: '',
      date: '',
      clientId: 0,
      type: ''
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadActivities(page);
    }
  }
}
