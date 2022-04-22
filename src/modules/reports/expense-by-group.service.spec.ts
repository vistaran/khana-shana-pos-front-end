import { TestBed } from '@angular/core/testing';

import { ExpenseByGroupService } from './expense-by-group.service';

describe('ExpenseByGroupService', () => {
  let service: ExpenseByGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpenseByGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
