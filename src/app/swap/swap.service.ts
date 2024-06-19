import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  firstToken: Token | null = null;
  secondToken: Token | null = null;
  tokenList: Token[] = [];

  private url = '../../assets/json/tokenList.json';

  constructor(private http: HttpClient) {}

  fetchTokenList(): void {
    this.http.get<Token[]>(this.url).subscribe((res) => {
      this.tokenList = res;
      this.firstToken = this.tokenList[0];
      this.secondToken = this.tokenList[1];
    });
  }
}
