import {Component, OnInit} from '@angular/core';
import {Sale} from "../../models/sale";
import {SaleService} from "../../services/sale.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export default class SalesComponent implements OnInit {

  sales: Sale[] = [];
  selectedSale: Sale | null = null;
  newSale: Sale = {
    id: 0,
    amount: 0,
    date: '',
    clientId: 0,
    product: '',
    status: 'Pending'
  };
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private saleService: SaleService) { }

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(page: number = 1): void {
    this.saleService.getSales(page, 10).subscribe(data => {
      this.sales = data.sales;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

  selectSale(sale: Sale): void {
    this.selectedSale = { ...sale };
  }

  saveSale(): void {
    if (this.selectedSale && this.selectedSale.id) {
      this.saleService.updateSale(this.selectedSale.id, this.selectedSale).subscribe(() => {
        this.loadSales(this.currentPage);
        this.selectedSale = null;
      });
    } else {
      this.saleService.createSale(this.newSale).subscribe(() => {
        this.loadSales(this.currentPage);
        this.newSale = { id: 0, amount: 0, date: '', clientId: 0, product: '', status: 'Pending' };
      });
    }
  }

  deleteSale(id: number): void {
    this.saleService.deleteSale(id).subscribe(() => {
      this.loadSales(this.currentPage);
    });
  }

  resetForm(): void {
    this.selectedSale = null;
    this.newSale = { id: 0, amount: 0, date: '', clientId: 0, product: '', status: 'Pending' };
  }

  goToPage(page: number): void {
    this.loadSales(page);
  }
}
