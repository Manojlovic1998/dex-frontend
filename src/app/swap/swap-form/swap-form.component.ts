import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { heroChevronDownSolid } from '@ng-icons/heroicons/solid';
import { NgIconComponent } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { SwapService } from '../swap.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { greaterThanZeroValidator } from './greater-than-zero.validator';
import { Subscription } from 'rxjs';

type Token = {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
};

@Component({
  selector: 'app-swap-form',
  standalone: true,
  imports: [NgIconComponent, CommonModule, ReactiveFormsModule],
  providers: [provideIcons({ heroChevronDownSolid })],
  templateUrl: './swap-form.component.html',
  styleUrl: './swap-form.component.css',
})
export class SwapFormComponent implements OnInit, OnDestroy {
  tokenList: Token[] = [];
  swapForm: FormGroup = new FormGroup({});
  pricesSubscription: Subscription | null = null;

  constructor(private http: HttpClient, private swapService: SwapService) {}

  ngOnInit(): void {
    this.tokenList = this.swapService.tokenList;
    this.initForm();

    this.pricesSubscription = this.swapService.tokenPrices.subscribe(
      (prices) => {
        if (prices) {
          this.swapForm
            .get('secondAmount')
            ?.setValue(this.swapForm.get('firstAmount')?.value * prices.ratio);
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.pricesSubscription?.unsubscribe();
  }

  selectToken(token: Token, type: 'firstToken' | 'secondToken'): void {
    this.swapForm.get(type)?.setValue(token.ticker);
  }

  onSubmit(): void {
    console.log(this.swapForm.value);
  }

  private initForm() {
    this.swapForm = new FormGroup({
      firstToken: new FormControl(this.swapService.firstToken?.ticker, [
        Validators.required,
      ]),
      secondToken: new FormControl(this.swapService.secondToken?.ticker, [
        Validators.required,
      ]),
      firstAmount: new FormControl(null, [
        Validators.required,
        greaterThanZeroValidator(),
      ]),
      secondAmount: new FormControl(null, [
        Validators.required,
        greaterThanZeroValidator(),
      ]),
    });

    this.swapForm.get('firstToken')?.valueChanges.subscribe((value) => {
      // If the first token value is valid enable the second token input
      this.swapService.updateFirstToken(value);
    });

    this.swapForm.get('secondToken')?.valueChanges.subscribe((value) => {
      // If the second token value is valid enable the first token input
      this.swapService.updateSecondToken(value);
    });

    this.swapForm.get('firstAmount')?.valueChanges.subscribe((value) => {
      if (this.swapService.tokenPrices.value)
        this.swapForm
          .get('secondAmount')
          ?.setValue(value * this.swapService.tokenPrices.value.ratio);
    });
  }
}
