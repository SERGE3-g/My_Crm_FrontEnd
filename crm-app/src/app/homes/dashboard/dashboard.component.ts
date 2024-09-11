import {Component, OnInit} from '@angular/core';
import {DatePipe, DecimalPipe, NgForOf} from "@angular/common";
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
    NgForOf,
    DatePipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  totalClients: number = 0;
  totalSales: number = 0;
  totalActivities: number = 0;
  totalUsers: number = 0;
  totalTasks: number = 0;
  recentActivities: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private clientService: ClientService,
    private saleService: SaleService,
    private activityService: ActivityService,
    private userService: UserService,
    private taskService: TaskService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Carica i dati dei clienti
    this.clientService.getClients(1, 10).subscribe(data => {
      this.totalClients = data.totalItems;
    });

    // Carica i dati delle vendite
    this.saleService.getSales(1, 10).subscribe(data => {
      this.totalSales = data.totalItems;
    });

    // Carica i dati delle attività
    this.activityService.getActivities(1, 10).subscribe(data => {
      this.totalActivities = data.totalItems;
      this.recentActivities = data.activities.slice(0, 5); // Mostra solo le ultime 5 attività
    });

    // Carica i dati degli utenti
    this.userService.getUsers(1, 10).subscribe(data => {
      this.totalUsers = data.totalItems;
    });

    // Carica i dati dei task
    this.taskService.getTasks(1, 10).subscribe(data => {
      this.totalTasks = data.totalItems;
    });
  }

  goToPage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadDashboardData();
    }
  }
}
