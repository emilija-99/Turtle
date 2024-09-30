import { TestBed } from '@angular/core/testing';

import { HabitsServiceService } from './habits-service.service';

describe('HabitsServiceService', () => {
  let service: HabitsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
