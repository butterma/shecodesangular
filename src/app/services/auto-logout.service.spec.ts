import { TestBed, inject } from '@angular/core/testing';

import { AutoLogoutService } from './auto-logout.service';

describe('AutoLogoutService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoLogoutService]
    });
  });

  it('should be created', inject([AutoLogoutService], (service: AutoLogoutService) => {
    expect(service).toBeTruthy();
  }));
});
