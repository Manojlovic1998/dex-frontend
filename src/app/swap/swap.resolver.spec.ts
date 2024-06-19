import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { swapResolver } from './swap.resolver';

describe('swapResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => swapResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
