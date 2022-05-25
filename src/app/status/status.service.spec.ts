import { TestBed } from '@angular/core/testing';

import { StatusService } from './status.service';

describe('This describe the StatusService functionality', () => {
  let service: StatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusService);
  });

  describe('When listening for status updates', () => {
    it('can store for later consumption');
    it('can forward to the presentation component');
  })

});
