import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCog6ToothSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-slippage-dropdown',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  providers: [provideIcons({ heroCog6ToothSolid })],
  templateUrl: './slippage-dropdown.component.html',
  styleUrl: './slippage-dropdown.component.css',
})
export class SlippageDropdownComponent implements OnInit {
  @Input() slippageArr: number[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.slippageArr);
  }
}
