import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'sb-monthly-expense',
  templateUrl: './monthly-expense.component.html',
  styleUrls: ['./monthly-expense.component.scss']
})
export class MonthlyExpenseComponent implements OnInit {

  chosenMonth: any;
  monthForm!: FormGroup
  selectedMonth: any;
  monthSelected = false

  month = [
    { name: 'January' },
    { name: 'February' },
    { name: 'March' },
    { name: 'April' },
    { name: 'May' },
    { name: 'June' },
    { name: 'July' },
    { name: 'August' },
    { name: 'September' },
    { name: 'November' },
    { name: 'December' },
  ]

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.monthForm = this.fb.group({
      month: ['']
    })
  }

  onSelectMonth(event: any) {
    this.selectedMonth = event.$ngOptionLabel.trim()
    this.monthSelected = true
    console.log(this.chosenMonth); 
  }

}
