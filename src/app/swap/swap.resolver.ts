import { ResolveFn } from '@angular/router';
import { SwapService, Token } from './swap.service';
import { inject } from '@angular/core';

export const swapResolver: ResolveFn<Token[]> = (route, state) => {
  if (inject(SwapService).tokenList.length === 0) {
    inject(SwapService).fetchTokenList();
  }

  return inject(SwapService).tokenList;
};
