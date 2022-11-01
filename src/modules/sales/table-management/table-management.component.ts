import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sb-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.scss']
})
export class TableManagementComponent implements OnInit {

  searchValue: any

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigate(['sales/add_table']);
  }

}
