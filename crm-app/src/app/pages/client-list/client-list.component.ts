import {Component, OnInit} from '@angular/core';
import {Client} from "../../models/client";
import {ClientService} from "../../services/client.service";
import {response} from "express";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export default class ClientListComponent implements OnInit {
  clients: Client[] = [];
  currentPage = 1;
  totalPages = 0;
  private router: any;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.getClients();
  }

  getClients(page: number = 1): void {
    this.clientService.getClients(page, 10).subscribe((response) => {
      this.clients = response.clients;
      this.totalPages = response.totalPages;
      this.currentPage = response.currentPage;
    });
  }

  goToPage(page: number): void {
    this.getClients(page);
  }

    editClient(clientId: number): void {
        // @ts-ignore
      this.router.navigate([this.getClientEditUrl(clientId)]);
    }

    private getClientEditUrl(clientId: number): string {
        return `/client/edit/${clientId}`;
    }

    /*deleteClient(clientId: number): void {
        this.clientService.deleteClient(clientId).subscribe(() => {
            this.getClients();
        });
    }*/
  deleteClient(clientId: number): void {
    this.clientService.deleteClient(clientId).subscribe(() => {
      this.getClients(this.currentPage);
    });
  }

  viewClient(clientId: number): void {
    this.router.navigate(['/client/view', clientId]);
  }

}
