import { TestBed } from '@angular/core/testing';

import { AppDataStorageService } from './app-data-storage.service';

describe('AppDataStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppDataStorageService = TestBed.get(AppDataStorageService);
    expect(service).toBeTruthy();
  });
});
