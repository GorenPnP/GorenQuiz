import { TestBed } from '@angular/core/testing';

import { ApiQuizService } from './api-quiz.service';

describe('ApiQuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiQuizService = TestBed.get(ApiQuizService);
    expect(service).toBeTruthy();
  });
});
