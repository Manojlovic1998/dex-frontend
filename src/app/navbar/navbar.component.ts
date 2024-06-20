import { Component } from '@angular/core';
import { WalletServiceService } from '../swap/wallet-service.service';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { aspectsCubes } from '@ng-icons/ux-aspects';
import { heroSparkles } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIconComponent],
  providers: [provideIcons({ aspectsCubes, heroSparkles })],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  account: string | null = null;

  constructor(private walletService: WalletServiceService) {}

  onConnect() {
    this.walletService.connectWallet().then(() => {
      this.account = this.walletService.getAccount();
    });
  }
}
