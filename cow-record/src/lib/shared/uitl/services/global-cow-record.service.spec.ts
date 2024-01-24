import { TestBed } from '@angular/core/testing';

import { GlobalCowRecordService } from './global-cow-record.service';

describe('GlobalCowRecordService', () => {
  let service: GlobalCowRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCowRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check value init from form', () => {
    expect(service.whoYouAre.value).toEqual('');
  });
});
