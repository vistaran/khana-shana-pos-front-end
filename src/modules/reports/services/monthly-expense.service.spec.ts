import { TestBed } from '@angular/core/testing';

import { MonthlyExpenseService } from './monthly-expense.service';

describe('MonthlyExpenseService', () => {
  let service: MonthlyExpenseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MonthlyExpenseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
