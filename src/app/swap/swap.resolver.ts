import { ResolveFn } from '@angular/router';
import { SwapService, Token } from './swap.service';
import { inject } from '@angular/core';

export const swapResolver: ResolveFn<Token[]> = (route, state) => {
  const swService = inject(SwapService);
  if (swService.tokenList.length === 0) {
    swService.fetchTokenList();
  }

  return swService.tokenList;
};
