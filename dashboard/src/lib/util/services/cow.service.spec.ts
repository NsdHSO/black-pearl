import { TestBed } from '@angular/core/testing';

import { CowService } from './cow.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { tap } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

function getBody() {
  return [
    {
      name: 'MArgaret',
      id: 1,
    },
    {
      name: 'MArgaret',
      id: 2,
    },
    {
      name: 'MArgaret',
      id: 3,
    },
    {
      name: 'MArgaret',
      id: 4,
    },
    {
      name: 'MArgaret',
      id: 5,
    },
    {
      name: 'MArgaret',
      id: 6,
    },
    {
      name: 'MArgaret',
      id: 7,
    },
  ];
}

describe('CowService', () => {
  let service: CowService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CowService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call the BE', () => {
    let resultBe;
    service.cowSignalForTriggerGet
      .pipe(
        tap((v) => {
          resultBe = v;
        })
      )
      .subscribe();
    httpMock.expectOne('http://localhost:3000/cows').flush(getBody());
    expect(resultBe).toEqual(getBody());
  });

  it('should call the BE on post', () => {
    let resultBe;
    service
      .addNewCow({ name: 'ivanca' })
      .pipe(
        tap((v) => {
          resultBe = v;
        })
      )
      .subscribe();
    httpMock
      .expectOne({ method: 'POST', url: 'http://localhost:3000/cows' })
      .flush({ name: 'ivanca', id: 2 });
    httpMock
      .expectOne({ method: 'GET', url: 'http://localhost:3000/cows' })
      .flush(getBody());
    expect(resultBe).toEqual(getBody());
  });
});
