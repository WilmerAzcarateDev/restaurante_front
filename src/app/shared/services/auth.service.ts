import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http:HttpClient = inject(HttpClient);

  url:string = environment.apiUrl


  login(email:string,password:string)
  {
    return this.http.post(`${this.url}/auth/login`,{
      email:email,
      password:password
    });
  }
}
