import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@env/environment';
import { AuthModel } from '@shared/models/auth.model';
import { MessageModel } from '@shared/models/message.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http:HttpClient = inject(HttpClient);

  user:any = signal<any>(null);

  url:string = environment.apiUrl


  login(email:string,password:string):Observable<AuthModel>
  {
    return this.http.post<AuthModel>(`${this.url}/auth/login`,{
      email:email,
      password:password
    });
  }

  logOut():Observable<MessageModel>
  {
    return this.http.post<MessageModel>(`${this.url}/auth/logout`,{});
  }

  getUser(){
    return this.http.post(`${this.url}/auth/me`,{}).pipe(tap((user)=>this.user.set(user)));
  }
}
