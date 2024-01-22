import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpHeadersInterceptService } from './http-headers.service';

describe('HttpHeadersService', () => {
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HttpClient,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpHeadersInterceptService,
          multi: true,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add Authorization header', () => {
    http.get('/some-url').subscribe((response) => {
      // Handle the response as needed
    });

    const req = httpTestingController.expectOne('/some-url');

    expect(req.request.headers.has('Authorization')).toBeTruthy();
    expect(req.request.headers.get('Authorization')).toEqual(
      'Bearer secure-user-tokenDavid',
    );

    req.flush({
      /* mock response data */
    });
  });
});
