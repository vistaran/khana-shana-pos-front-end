import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'sb-expense-by-group',
  templateUrl: './expense-by-group.component.html',
  styleUrls: ['./expense-by-group.component.scss']
})
export class ExpenseByGroupComponent implements OnInit {

  model!: NgbDateStruct;

  constructor() { }

  ngOnInit(): void {
  }

}
