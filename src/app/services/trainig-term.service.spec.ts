import { TestBed } from '@angular/core/testing';

import { TrainigTermService } from './trainig-term.service';

describe('TrainigTermService', () => {
  let service: TrainigTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainigTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
