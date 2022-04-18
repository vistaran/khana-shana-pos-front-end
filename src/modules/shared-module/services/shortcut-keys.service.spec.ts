import { TestBed } from '@angular/core/testing';

import { ShortcutKeysService } from './shortcut-keys.service';

describe('ShortcutKeysService', () => {
  let service: ShortcutKeysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortcutKeysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
