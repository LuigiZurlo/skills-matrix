import { TestBed } from '@angular/core/testing';

import { PreviousUrlService } from './previous-url.service';

describe('PreviousUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreviousUrlService = TestBed.get(PreviousUrlService);
    expect(service).toBeTruthy();
  });
});
