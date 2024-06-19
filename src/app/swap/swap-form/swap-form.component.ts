import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
export class SwapFormComponent implements OnInit {
  tokenList: Token[] = [];
  swapForm: FormGroup = new FormGroup({});

  constructor(private http: HttpClient, private swapService: SwapService) {}

  ngOnInit(): void {
    this.tokenList = this.swapService.tokenList;
    this.initForm();
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
      secondAmount: new FormControl({ value: null, disabled: true }, [
        Validators.required,
        greaterThanZeroValidator(),
      ]),
    });

    this.swapForm.get('firstAmount')?.valueChanges.subscribe((value) => {
      // If the first token value is valid enable the second token input
      console.log(value);
      if (value > 0) {
        this.swapForm.get('secondAmount')?.enable();
      } else {
        this.swapForm.get('secondAmount')?.disable();
      }
    });
  }
}
