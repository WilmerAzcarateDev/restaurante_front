import { CommonModule } from '@angular/common';
import { Component, OnDestroy, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
 
  auth:AuthService = inject(AuthService);
  login_sub:Subscription = {} as Subscription;

  ngOnDestroy(): void {
    this.login_sub.unsubscribe();
  }

  login(){
    this.login_sub = this.auth.login("sabina06@example.org","123").subscribe({
      next:(data:any)=>{
        alert(data.access_token);
      }
    });
  }


}
