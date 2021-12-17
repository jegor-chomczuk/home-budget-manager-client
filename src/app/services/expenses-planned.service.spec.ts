import { TestBed } from '@angular/core/testing';

import { ExpensesPlannedService } from './expenses-planned.service';

describe('ExpensesPlannedService', () => {
  let service: ExpensesPlannedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesPlannedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
