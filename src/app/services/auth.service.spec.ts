import { TestBed, inject } from '@angular/core/testing';

import { MyAuthService } from './my-auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAuthService]
    });
  });

  it('should be created', inject([MyAuthService], (service: MyAuthService) => {
    expect(service).toBeTruthy();
  }));
});
