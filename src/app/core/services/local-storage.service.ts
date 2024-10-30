import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService{
  private authTokens : string = 'authToken';
  constructor() {}

  // Méthode pour créer et sauvegarder un token dans le localStorage
  createToken(token: string): void {
    localStorage.setItem(this.authTokens, token); // 'authTokens' est la clé, 'token' est la valeur à sauvegarder
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokens);
  }

  destroyToken(): void {
    localStorage.removeItem(this.authTokens);
  }

  // hasToken(): boolean {
  //   return this.getToken() !== null;
  // }

}
