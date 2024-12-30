import { TestBed } from '@angular/core/testing';

import { MeadowsService } from './meadows.service';

describe('MeadowsService', () => {
  let service: MeadowsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeadowsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
