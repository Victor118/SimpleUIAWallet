import { TestBed } from '@angular/core/testing';

import { BitsharesService } from './bitshares.service';

describe('BitsharesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BitsharesService = TestBed.get(BitsharesService);
    expect(service).toBeTruthy();
  });
});
