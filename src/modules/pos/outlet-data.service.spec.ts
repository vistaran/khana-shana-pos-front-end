import { TestBed } from '@angular/core/testing';

import { OutletDataService } from './outlet-data.service';

describe('OutletDataService', () => {
  let service: OutletDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutletDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
