import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

it('should return a token when login is successful', () => {
  const mockResponse = { token: 'fake-jwt-token' };
  spyOn(service, 'login').and.returnValue(mockResponse);

  const result = service.login('test@gmail.com', 'password123');
  expect(result).toEqual(mockResponse);
});

