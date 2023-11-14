import { TestBed } from '@angular/core/testing';

import { DashboardHomeService } from './dashboard-home.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';

describe('DashboardHomeService', () => {
  let service: DashboardHomeService;
  let httpMock: HttpTestingController;
  let testScheduler: TestScheduler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(DashboardHomeService);
    httpMock = TestBed.inject(HttpTestingController);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
  it('should ', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const account$ = cold('---a|', { a: ['2'], b: 'C' }); // 'b' represents completion
      service['accounts$'] = account$ as any;

      let emittedValue: any;
      service.accountWithIcons$.subscribe((v) => {
        emittedValue = v;
      });

      const req = httpMock.expectOne('http://localhost:3000/accounts');
      req.flush(['1', '2', '3']);

      expect(emittedValue).toEqual(['1', '2', '3']);
      expectObservable(service.accountWithIcons$).toBe('(a|)', {
        a: ['1', '2', '3'],
      });
    });
  });
});
