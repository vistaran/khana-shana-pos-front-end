import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'sb-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  idata: any = [];
  page = 1;
  pageSize = 5;
  
  constructor(private invoiceData: InvoicesService) { 
    this.refreshInvoice();
  }

  ngOnInit(): void {
    this.invoiceData.getInvoiceData()
      .subscribe( data => this.idata = data);
  }

  refreshInvoice() { 
    this.idata = this.idata
      .map((user: any, i: any) => ({id: i + 1, ...user}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
