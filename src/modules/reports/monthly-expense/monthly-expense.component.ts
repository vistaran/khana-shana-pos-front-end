import { formatNumber } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppToastService } from '@modules/shared-module/services/app-toast.service';
import { data } from 'jquery';

import { MonthlyExpenseService } from '../services/monthly-expense.service';

@Component({
  selector: 'sb-monthly-expense',
  templateUrl: './monthly-expense.component.html',
  styleUrls: ['./monthly-expense.component.scss']
})
export class MonthlyExpenseComponent implements OnInit {

  chosenMonth: any;
  monthForm!: FormGroup
  yearForm!: FormGroup
  selectedMonth: any;
  monthSelected = false
  monthlyExpenseData: any = []
  expenseByItemData: any = []
  length = 0
  start_year: any
  years: any = []
  value: any
  year = 2022
  showloader: any
  totalExpense = 0
  totalExpenseForItem = 0
  total = 0
  lengthItemData = 0
  page = 1
  pageSize = 10
  showData = false
  showItem = false
  activeId = 1

  month = [
    { name: 'January', value: '01' },
    { name: 'February', value: '02' },
    { name: 'March', value: '03' },
    { name: 'April', value: '04' },
    { name: 'May', value: '05' },
    { name: 'June', value: '06' },
    { name: 'July', value: '07' },
    { name: 'August', value: '08' },
    { name: 'September', value: '09' },
    { name: 'October', value: '10' },
    { name: 'November', value: '11' },
    { name: 'December', value: '12' },
  ]

  constructor(
    private fb: FormBuilder,
    private expenseService: MonthlyExpenseService,
    private toast: AppToastService
  ) { }

  ngOnInit(): void {
    this.yearForm = this.fb.group({
      year: [2022]
    })

    const date = new Date()
    const year = date.getFullYear()
    for (let i = 2022; i <= year; i++) {
      this.years.push(i)
    }
    this.start_year = this.years[0]
    // console.log(this.years);

  }

  onSelectMonth(value: any) {
    // console.log(this.year);

    this.value = value
    this.month.forEach((g: any) => {
      if (g.value == value)
        this.selectedMonth = g.name
    });

    // console.log(this.value);
    this.monthlyExpense()
  }

  monthlyExpense() {
    this.showloader = true
    this.expenseService.getExpenseByGroup(this.year, this.value).subscribe(data => {
      this.totalExpense = 0

      this.showloader = false
      this.showData = true

      this.monthlyExpenseData = data.amount
      this.length = this.monthlyExpenseData.length

      this.monthlyExpenseData.forEach((g: any) => {
        this.totalExpense += g.total
      });

      this.monthlyExpenseByItem()

    }, err => {
      this.toast.error('Error', 'Server error.')
    })
  }

  monthlyExpenseByItem() {
    this.expenseService.getExpenseByItem(this.year, this.value, this.page).subscribe(result => {
      this.totalExpenseForItem = 0
      this.expenseByItemData = result.data.data
      // console.log(this.expenseByItemData);

      this.lengthItemData = this.expenseByItemData.length
      this.total = result.data.total

      this.expenseByItemData.forEach((g: any) => {
        this.totalExpenseForItem += g.subtotal
        g.number = result.data.from
        // console.log(g);
      });

    }, err => {
      this.toast.error('Error', 'Server error.')
    })
  }

  onPageChange(event: number) {
    this.page = event;
    this.monthlyExpenseByItem();
  }


  // onSelectMonth(event: any) {
  //   this.selectedMonth = event.$ngOptionLabel.trim()
  //   this.monthSelected = true
  //   console.log(this.chosenMonth);
  // }

  onSelectYear(year: any) {
    this.year = year
    // console.log(year);

  }

}
