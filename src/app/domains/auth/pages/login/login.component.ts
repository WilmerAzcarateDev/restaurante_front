import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthModel } from '@shared/models/auth.model';
import { MessageModel } from '@shared/models/message.model';
import { AuthService } from '@shared/services/auth.service';
import { TokenService } from '@shared/services/token.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {

  auth_service = inject(AuthService);
  token_service = inject(TokenService);

  login_sub = {} as Subscription;
  user_sub = {} as Subscription;
  email_sub = {} as Subscription;
  password_sub = {} as Subscription;

  user = this.auth_service.user();

  login_form = new FormGroup({
    email_field: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password_field: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    })
  });
 
  

  constructor() {
    this.email_sub = this.login_form.controls['email_field'].valueChanges.subscribe(() => {
      this.login_form.controls['email_field'].setValue(this.login_form.controls['email_field'].value.trim());
    });
    this.password_sub = this.login_form.controls['password_field'].valueChanges.subscribe(() => {
      this.login_form.controls['password_field'].setValue(this.login_form.controls['password_field'].value.trim());
    });
  }

  ngOnDestroy(): void {
    this.login_sub.unsubscribe();
    this.user_sub.unsubscribe();
    this.email_sub.unsubscribe();
    this.password_sub.unsubscribe();
  }

  login() {
    let email = this.login_form.controls['email_field'].value;
    let password = this.login_form.controls['password_field'].value;
    this.login_sub = this.auth_service
      .login({email:email,password:password})
      .subscribe({
        next: (data: AuthModel) => {
          this.token_service.setToken(data);
          this.user_sub = this.auth_service.getUser().subscribe();
          alert(data.access_token);
        },
      });
  }

  logout() {
    this.login_sub = this.auth_service.logOut().subscribe({
      next: (data: MessageModel) => {
        this.token_service.deleteToken();
        alert(data.message);
      },
    });
  }
}
