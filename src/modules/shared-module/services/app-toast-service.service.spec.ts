import { TestBed } from '@angular/core/testing';

import { AppToastService } from './app-toast.service';

describe('AppToastServiceService', () => {
  let service: AppToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
