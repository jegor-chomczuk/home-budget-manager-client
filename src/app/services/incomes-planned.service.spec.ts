import { TestBed } from '@angular/core/testing';

import { IncomesPlannedService } from './incomes-planned.service';

describe('IncomesPlannedService', () => {
  let service: IncomesPlannedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomesPlannedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
