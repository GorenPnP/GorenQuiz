import { TestBed } from '@angular/core/testing';

import { FlexSizeService } from './flex-size.service';

describe('FlexSizeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlexSizeService = TestBed.get(FlexSizeService);
    expect(service).toBeTruthy();
  });
});
