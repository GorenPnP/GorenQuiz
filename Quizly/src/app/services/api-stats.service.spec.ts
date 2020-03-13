import { TestBed } from '@angular/core/testing';

import { ApiStatsService } from './api-stats.service';

describe('ApiStatsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiStatsService = TestBed.get(ApiStatsService);
    expect(service).toBeTruthy();
  });
});
