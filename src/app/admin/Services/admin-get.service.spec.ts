import { TestBed, inject } from '@angular/core/testing';

import { AdminGetService } from './admin-get.service';

describe('AdminGetService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminGetService]
    });
  });

  it('should be created', inject([AdminGetService], (service: AdminGetService) => {
    expect(service).toBeTruthy();
  }));
});
