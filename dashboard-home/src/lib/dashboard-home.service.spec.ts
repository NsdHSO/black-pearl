import { TestBed } from '@angular/core/testing';

import { DashboardHomeService } from './dashboard-home.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestScheduler } from 'rxjs/internal/testing/TestScheduler';
import { getAccounts } from './mocks/dashboard-service.mock';

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
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('assert deep', () => {
    testScheduler = new TestScheduler((actual, expected) => {
      expect(JSON.stringify(actual)).toEqual(JSON.stringify(expected));
    });

    it('should return an icon and final account', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        let emittedValue: any;
        service._accounts$.subscribe((v) => {
          emittedValue = v;
        });

        httpMock
          .expectOne('http://localhost:3000/accounts')
          .flush(getAccounts());
        const iconsData = [
          { name: 'gbp', value: 'fa_brands:waze' },
          { name: 'eur', value: 'fa_brands:figma' },
          { name: 'usd', value: 'fa_brands:weixin' },
        ];

        iconsData.forEach((icon) => {
          httpMock
            .expectOne(`http://localhost:3000/icon/?name=${icon.name}`)
            .flush([{ ...icon }]);
        });

        const configData = [
          {
            IBAN: 'US4412245221245930014556',
            visible: true,
            name: 'Click ME',
            action: () => console.log('test'),
          },
          {
            IBAN: 'GB29RBOS60161331926819',
            visible: true,
            name: 'Click ME',
            action: () => console.log('test'),
          },
          {
            IBAN: 'FR1420041010050500013M02606',
            visible: true,
            name: 'Click ME',
            action: () => console.log('test'),
          },
        ];
        configData.forEach((configAccount, index: number) => {
          httpMock
            .expectOne(
              `http://localhost:3000/configAccount/?IBAN=${configAccount.IBAN}`,
            )
            .flush([{ ...configAccount }]);
        });

        expectObservable(service._accounts$).toBe('a', {
          a: getAccounts(),
        });
      });
    });
  });
});
