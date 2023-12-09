import { TestBed } from '@angular/core/testing';

import { ProductionMilkOnWeekService } from './production-milk-on-week.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { productionMilkMock } from '../mocks/production-milk.mock';

describe('ProductionMilkOnWeekService', () => {
  let service: ProductionMilkOnWeekService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'BASE_URL_HOME', useValue: 'http://localhost:3000' },
      ],
    });
    service = TestBed.inject(ProductionMilkOnWeekService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  describe('should assert in deep', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should return production milk', () => {
      const expected = productionMilkMock();
      let actual;
      service.getProductionMilk$.subscribe((b) => (actual = b));
      httpMock
        .expectOne('http://localhost:3000/productionMilkWeek')
        .flush(productionMilkMock());
      expect(actual).toEqual(productionMilkMock());
    });
  });
});
