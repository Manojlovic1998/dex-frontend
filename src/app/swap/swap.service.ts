import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Token = {
  ticker: string;
  img: string;
  name: string;
  address: string;
  decimals: number;
};

@Injectable({
  providedIn: 'root',
})
export class SwapService {
  tokenList: Token[] = [];
  firstToken: Token | null = null;
  secondToken: Token | null = null;
  tokenPrices = new BehaviorSubject<{
    tokenOneUsdPrice: number;
    tokenTwoUsdPrice: number;
    ratio: number;
  } | null>(null);

  private url = '../../assets/json/tokenList.json';

  constructor(private http: HttpClient) {}

  fetchTokenList(): void {
    this.http.get<Token[]>(this.url).subscribe((res) => {
      this.tokenList = res;
      this.firstToken = this.tokenList[0];
      this.secondToken = this.tokenList[1];
      this.getTokenPrices(this.firstToken.address, this.secondToken.address);
    });
  }

  updateFirstToken(ticker: Token['ticker']): void {
    const token = this.tokenList.find((token) => token.ticker === ticker);
    if (token) {
      this.firstToken = token;
    }

    if (this.firstToken && this.secondToken) {
      this.getTokenPrices(this.firstToken.address, this.secondToken.address);
    }
  }

  updateSecondToken(ticker: Token['ticker']): void {
    const token = this.tokenList.find((token) => token.ticker === ticker);
    if (token) {
      this.secondToken = token;
    }

    if (this.firstToken && this.secondToken) {
      this.getTokenPrices(this.firstToken.address, this.secondToken.address);
    }
  }

  getTokenPrices(tokenOneAddress: string, tokenTwoAddress: string): void {
    // Fetch token prices
    this.http
      .get('http://localhost:3001/tokenPrice', {
        params: {
          addressOne: tokenOneAddress,
          addressTwo: tokenTwoAddress,
        },
      })
      .subscribe((res: any) => {
        this.setTokenPrices(res.tokenOne, res.tokenTwo, res.ratio);
      });
  }

  setTokenPrices(
    tokenOneUsdPrice: number,
    tokenTwoUsdPrice: number,
    ratio: number
  ): void {
    this.tokenPrices.next({
      tokenOneUsdPrice,
      tokenTwoUsdPrice,
      ratio,
    });
  }
}
