import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environements/environment';


describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'il n'y a pas de requêtes en attente
  });

  it('should return a token when login is successful', () => {
    const mockResponse = { token: 'fake-jwt-token' };
    const email = 'test@gmail.com';
    const password = 'password123';

    service.login(email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    // Vérifier que la requête HTTP a bien été envoyée
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/auth/login`);

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    // Simuler une réponse
    req.flush(mockResponse);
  });
});
