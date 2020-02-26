import { TestBed } from '@angular/core/testing';

import { LevelSelectorService } from './level-selector.service';

describe('LevelSelectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LevelSelectorService = TestBed.get(LevelSelectorService);
    expect(service).toBeTruthy();
  });
});
