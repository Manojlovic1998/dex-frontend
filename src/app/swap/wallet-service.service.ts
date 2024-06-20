import { Injectable } from '@angular/core';
import { Web3 } from 'web3';

@Injectable({
  providedIn: 'root',
})
export class WalletServiceService {
  private web3: Web3 | null = null;
  private account: string | null = null;

  constructor() {
    if (window.ethereum) {
      this.web3 = new Web3(window.ethereum);
    } else {
      console.error('MetaMask is not installed!');
    }
  }

  async connectWallet() {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      // allow user to select account
      this.account = accounts[0];
      console.log('Connected to wallet:', this.account);
    } catch (error) {
      console.error(error);
    }
  }

  getAccount() {
    return this.account;
  }
}
