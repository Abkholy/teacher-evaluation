import { TestBed, inject } from '@angular/core/testing';

import { StarsService } from './stars.service';

describe('StarsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StarsService]
    });
  });

  it('should be created', inject([StarsService], (service: StarsService) => {
    expect(service).toBeTruthy();
  }));
});
