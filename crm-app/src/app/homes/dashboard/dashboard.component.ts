import {Component, OnInit} from '@angular/core';
import {DecimalPipe, NgForOf} from "@angular/common";
import {ClientService} from "../../services/client.service";
import {ActivityService} from "../../services/activity.service";
import {UserService} from "../../services/user.service";
import {SaleService} from "../../services/sale.service";
import {TaskService} from "../../services/task.service";



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  // Qui potresti voler aggiungere proprietà per dati dinamici
  totalClients: number = 0;
  totalActivities: number = 0;
  totalUsers: number = 0;
  totalSales: number = 0;
  totalTasks: number = 0;
  recentActivities: string[] = [];

  constructor(
    private clientService: ClientService,
    private activityService: ActivityService,
    private userService: UserService,
    private saleService: SaleService,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.clientService.getClients(1, 5).subscribe(data => {
      this.totalClients = data.totalItems;
    });

    this.activityService.getActivities(1, 5).subscribe(data => {
      this.totalActivities = data.totalItems;
      this.recentActivities = data.activities.map((a: { title: string }) => a.title);
    });

    this.userService.getUsers(1, 5).subscribe(data => {
      this.totalUsers = data.totalItems;
    });

    this.saleService.getSales(1, 5).subscribe(data => {
      this.totalSales = data.totalItems;
    });

    this.taskService.getTasks(1, 5).subscribe(data => {
      this.totalTasks = data.totalItems;
    });
  }
}
