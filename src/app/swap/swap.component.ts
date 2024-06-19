import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SlippageDropdownComponent } from './slippage-dropdown/slippage-dropdown.component';
import { SwapFormComponent } from './swap-form/swap-form.component';

@Component({
  selector: 'app-swap',
  standalone: true,
  imports: [SlippageDropdownComponent, SwapFormComponent, CommonModule],
  templateUrl: './swap.component.html',
  styleUrl: './swap.component.css',
})
export class SwapComponent {}
