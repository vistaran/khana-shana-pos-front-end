import { TestBed } from '@angular/core/testing';

import { UomService } from './uom.service';

describe('UomService', () => {
  let service: UomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
