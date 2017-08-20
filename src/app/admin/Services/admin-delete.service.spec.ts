import { TestBed, inject } from '@angular/core/testing';

import { AdminDeleteService } from './admin-delete.service';

describe('AdminDeleteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminDeleteService]
    });
  });

  it('should be created', inject([AdminDeleteService], (service: AdminDeleteService) => {
    expect(service).toBeTruthy();
  }));
});
