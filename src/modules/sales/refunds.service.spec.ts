import { TestBed } from '@angular/core/testing';

import { RefundsService } from './refunds.service';

describe('RefundsService', () => {
  let service: RefundsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefundsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
