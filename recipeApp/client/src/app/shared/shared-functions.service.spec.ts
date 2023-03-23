import { TestBed } from '@angular/core/testing';

import { SharedFunctionsService } from './shared-functions.service';

describe('SharedFunctionsService', () => {
  let service: SharedFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
