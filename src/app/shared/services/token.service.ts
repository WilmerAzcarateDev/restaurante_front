import { Injectable } from '@angular/core';
import { AuthModel } from '@shared/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  setToken(token:AuthModel){
    localStorage.setItem('token',`${token.token_type} ${token.access_token}`)
  }

  getToken():string|null
  {
    return localStorage.getItem('token');
  }

  deleteToken()
  {
    localStorage.removeItem('token');
  }
}
