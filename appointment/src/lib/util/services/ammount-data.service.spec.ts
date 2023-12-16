import { TestBed } from '@angular/core/testing';

import { AmmountDataService } from './ammount-data.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('AmmountDataService', () => {
  let service: AmmountDataService;
  let httpTestMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AmmountDataService);
    httpTestMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should ', () => {
    let actual;
    service.amountData$.subscribe((b) => (actual = b));
    httpTestMock
      .expectOne('http://localhost:3000/amount')
      .flush([{ value: 2 }]);
    expect(actual).toEqual([{ value: 2 }]);
  });
});
