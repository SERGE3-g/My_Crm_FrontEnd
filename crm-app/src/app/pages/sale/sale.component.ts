import {Component, OnInit} from '@angular/core';
import {Sale} from "../../models/sale";
import {SaleService} from "../../services/sale.service";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    DatePipe,
    ReactiveFormsModule
  ],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export default class SalesComponent implements OnInit {

  sales: Sale[] = [];
  saleForm: FormGroup;
  isEditing: boolean = false;
  selectedSaleId: number | null = null;
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private saleService: SaleService, private fb: FormBuilder) {
    // Creazione del form con Reactive Forms
    this.saleForm = this.fb.group({
      product: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

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

  onSubmit(): void {
    if (this.saleForm.invalid) {
      return;
    }

    const saleData: Sale = this.saleForm.value;

    if (this.isEditing && this.selectedSaleId !== null) {
      this.saleService.updateSale(this.selectedSaleId, saleData).subscribe(() => {
        this.loadSales(this.currentPage);
        this.resetForm();
      });
    } else {
      this.saleService.createSale(saleData).subscribe(() => {
        this.loadSales(this.currentPage);
        this.resetForm();
      });
    }
  }

  selectSale(sale: Sale): void {
    this.isEditing = true;
    this.selectedSaleId = sale.id;
    this.saleForm.patchValue(sale);
  }

  deleteSale(id: number): void {
    this.saleService.deleteSale(id).subscribe(() => {
      this.loadSales(this.currentPage);
    });
  }

  resetForm(): void {
    this.isEditing = false;
    this.selectedSaleId = null;
    this.saleForm.reset({
      product: '',
      amount: 0,
      date: '',
      status: 'Pending'
    });
  }

  goToPage(page: number): void {
    this.loadSales(page);
  }
}
