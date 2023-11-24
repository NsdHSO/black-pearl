import { TestBed } from '@angular/core/testing';

import { DashboardHomeService } from './dashboard-home.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { Account } from 'ngx-synergy';
import {
  getAccounts,
  getAccountsWithIcons,
} from './mocks/dashboard-service.mock';

describe('DashboardHomeService', () => {
  let service: DashboardHomeService;
  let httpMock: HttpTestingController;
  let testScheduler: TestScheduler;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: 'BASE_URL_HOME', useValue: 'http://localhost:3000' },
      ],
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
  it('should return an icon and final account', () => {
    testScheduler.run(({ cold, expectObservable }) => {
      const account$ = cold('---a|', { a: ['2'], b: 'C' }); // 'b' represents completion
      service['accounts$'] = account$ as any;

      let emittedValue: any;
      service.accountWithIcons$.subscribe((v) => {
        emittedValue = v;
      });

      const req = httpMock.expectOne('http://localhost:3000/accounts');
      req.flush(getAccounts() as Account[]);
      const iconsData = [
        { name: 'gbp', value: 'fa_brands:waze' },
        { name: 'eur', value: 'fa_brands:figma' },
        { name: 'usd', value: 'fa_brands:weixin' },
      ];

      iconsData.forEach((icon, index: number) => {
        const reqIcon = httpMock.expectOne(
          `http://localhost:3000/icon/?name=${icon.name}`,
        );
        reqIcon.flush([{ ...icon }]);
      });

      expectObservable(service.accountWithIcons$).toBe('(a|)', {
        a: getAccountsWithIcons(),
      });
    });
  });
});
