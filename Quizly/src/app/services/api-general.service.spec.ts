import { TestBed } from '@angular/core/testing';

import { ApiGeneralService } from './api-general.service';

describe('ApiGeneralService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGeneralService = TestBed.get(ApiGeneralService);
    expect(service).toBeTruthy();
  });
});
