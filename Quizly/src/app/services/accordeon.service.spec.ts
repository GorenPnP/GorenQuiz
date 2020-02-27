import { TestBed } from '@angular/core/testing';

import { AccordeonService } from './accordeon.service';

describe('AccordeonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccordeonService = TestBed.get(AccordeonService);
    expect(service).toBeTruthy();
  });
});
