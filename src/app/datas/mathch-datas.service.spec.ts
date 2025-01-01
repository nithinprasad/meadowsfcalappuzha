import { TestBed } from '@angular/core/testing';

import { MathchDatasService } from './mathch-datas.service';

describe('MathchDatasService', () => {
  let service: MathchDatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MathchDatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
