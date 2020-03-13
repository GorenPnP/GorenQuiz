import { TestBed } from '@angular/core/testing';

import { ApiResultsService } from './api-results.service';

describe('ApiResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiResultsService = TestBed.get(ApiResultsService);
    expect(service).toBeTruthy();
  });
});
