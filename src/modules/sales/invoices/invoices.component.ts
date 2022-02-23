import { Component, OnInit } from '@angular/core';
import { InvoicesService } from '../invoices.service';

@Component({
  selector: 'sb-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  idata: Object = [];
  
  constructor(private invoiceData: InvoicesService) { }

  ngOnInit(): void {
    this.invoiceData.getInvoiceData()
      .subscribe( data => this.idata = data);
  }

}
