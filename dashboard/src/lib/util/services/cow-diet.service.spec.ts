import { TestBed } from '@angular/core/testing';

import { CowDietService } from './cow-diet.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { dietCow } from '../mocks/production-milk.mock';

describe('CowDietService', () => {
  let service: CowDietService;
  let httpMock: HttpTestingController;

  describe('should assert default', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideHttpClient(),
          provideHttpClientTesting(),
          { provide: 'BASE_URL_HOME', useValue: 'http://localhost:3000' },
        ],
      });
      service = TestBed.inject(CowDietService);
      httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return diet cow', () => {
      let actual;
      service.getDietCow$.subscribe((b) => (actual = b));
      httpMock.expectOne('http://localhost:3000/cow-diet').flush(dietCow());
      expect(actual).toEqual(dietCow());
    });
  });
});
