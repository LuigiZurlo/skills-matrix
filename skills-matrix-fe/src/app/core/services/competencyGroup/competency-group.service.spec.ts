import { TestBed } from '@angular/core/testing';

import { CompetencyGroupService } from './competency-group.service';

describe('CompetencyGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompetencyGroupService = TestBed.get(CompetencyGroupService);
    expect(service).toBeTruthy();
  });
});
