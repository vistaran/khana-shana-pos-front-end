import { TestBed } from '@angular/core/testing';

import { QrcodeDataService } from './qrcode-data.service';

describe('QrcodeDataService', () => {
  let service: QrcodeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrcodeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
