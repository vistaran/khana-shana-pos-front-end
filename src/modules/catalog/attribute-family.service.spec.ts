import { TestBed } from '@angular/core/testing';

import { AttributeFamilyService } from './attribute-family.service';

describe('AttributeFamilyService', () => {
  let service: AttributeFamilyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AttributeFamilyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
