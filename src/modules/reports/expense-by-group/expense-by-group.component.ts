import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { ExpenseByGroupService } from '../services/expense-by-group.service';

@Component({
  selector: 'sb-expense-by-group',
  templateUrl: './expense-by-group.component.html',
  styleUrls: ['./expense-by-group.component.scss']
})
export class ExpenseByGroupComponent implements OnInit {

  model!: NgbDateStruct;
  expenseGroupData: any = []
  showloader: any
  length = 0
  totalExpense = 0

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  from: any
  to: any
  showDate = false

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
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private expenseByGroupService: ExpenseByGroupService
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getToday();
    // this.fromDate = calendar.getToday();
    // this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  ngOnInit(): void {

  }

  getExpenseByGroupData() {
    this.showloader = true
    this.expenseByGroupService.getExpenseByGroupData(this.from, this.to).subscribe(data=> {
      this.totalExpense = 0
      this.expenseGroupData = data.data.sort(function (a: any, b: any) {
        const nameA = a.item_group_name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.item_group_name.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });
      this.length = this.expenseGroupData.length
      console.log(this.expenseGroupData);
      this.expenseGroupData.forEach((g: any) => {
        this.totalExpense += g.subtotal
      });
      console.log(this.totalExpense);

      this.showloader = false
    })
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.to = this.toDate.year + '-' + this.toDate.month + '-' + this.toDate.day
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    this.from = this.fromDate.year + '-' + this.fromDate.month + '-' + this.fromDate.day
    console.log(this.from, this.to);

    if (this.from && this.to == null) {
      this.to = this.from;
      this.getExpenseByGroupData();
    } else if (this.from && this.to) {
      this.getExpenseByGroupData()
    }

  }

  // onDateSelect(date: NgbDate) {
  //   this.from = date.year + '-' + date.month + '-' + date.day
  //   this.to = date.year + '-' + date.month + '-' + date.day
  //   this.getExpenseByGroupData()
  // }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
      date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
      this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
