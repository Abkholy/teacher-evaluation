import { TestBed, async, inject } from '@angular/core/testing';

import { StloginGuard } from './stlogin.guard';

describe('StloginGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StloginGuard]
    });
  });

  it('should ...', inject([StloginGuard], (guard: StloginGuard) => {
    expect(guard).toBeTruthy();
  }));
});
