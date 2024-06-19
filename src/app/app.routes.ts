import { Routes } from '@angular/router';
import { swapResolver } from './swap/swap.resolver';

export const routes: Routes = [
  { path: '', redirectTo: '/swap', pathMatch: 'full' },
  {
    path: 'swap',
    loadComponent: () =>
      import('./swap/swap.component').then((m) => m.SwapComponent),
    resolve: [swapResolver],
  },
];
