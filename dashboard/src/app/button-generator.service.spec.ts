import { TestBed } from '@angular/core/testing';

import { ButtonGeneratorService } from './button-generator.service';

describe('ButtonGeneratorService', () => {
  let service: ButtonGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
