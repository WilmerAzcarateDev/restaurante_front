import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModel } from '@shared/models/auth.model';
import { MessageModel } from '@shared/models/message.model';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
 
  auth_service:AuthService = inject(AuthService);
  token_service:TokenService = inject(TokenService);
  login_sub:Subscription = {} as Subscription;
  user_sub:Subscription = {} as Subscription;
  user:any = this.auth_service.user();

  ngOnDestroy(): void {
    this.login_sub.unsubscribe();
    this.user_sub.unsubscribe();
  }

  login(){
    this.login_sub = this.auth_service.login("sabina06@example.org","123").subscribe({
      next:(data:AuthModel)=>{
        this.token_service.setToken(data);
        this.user_sub =this.auth_service.getUser().subscribe();
        alert(data.access_token);
      }
    });
  }

  logout(){
    this.login_sub = this.auth_service.logOut().subscribe({
      next:(data:MessageModel)=>{
        this.token_service.deleteToken();
        alert(data.message);
      }
    });
  }
}
