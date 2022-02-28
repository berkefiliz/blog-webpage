import { TestBed } from '@angular/core/testing';

import { GrabberService } from './grabber.service';

describe('GrabberService', () => {
  let service: GrabberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrabberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
