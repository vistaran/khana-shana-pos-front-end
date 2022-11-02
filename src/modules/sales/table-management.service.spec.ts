import { TestBed } from '@angular/core/testing';

import { TableManagementService } from './table-management.service';

describe('TableManagementService', () => {
  let service: TableManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
