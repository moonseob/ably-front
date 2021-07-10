import { TestBed } from '@angular/core/testing';
import { HttpAuth } from './http-auth.service';

describe('HttpAuth', () => {
  let service: HttpAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
