import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { environment } from '@env/environment';
import { AuthModel } from '@shared/models/auth.model';
import { LoginModel } from '@shared/models/login.model';
import { MessageModel } from '@shared/models/message.model';
import { UserModel } from '@shared/models/user.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  user = signal<UserModel|null>(null);

  url:string = environment.apiUrl


  login(login_data:LoginModel):Observable<AuthModel>
  {
    return this.http.post<AuthModel>(`${this.url}/auth/login`,login_data);
  }

  logOut():Observable<MessageModel>
  {
    return this.http.post<MessageModel>(`${this.url}/auth/logout`,{});
  }

  getUser(){
    return this.http.post<UserModel>(`${this.url}/auth/me`,{}).pipe(tap((user)=>this.user.set(user)));
  }
}
