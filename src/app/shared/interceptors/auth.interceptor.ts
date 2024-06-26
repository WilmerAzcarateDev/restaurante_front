import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '@shared/services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let token_service = inject(TokenService);
  if(token_service.getToken()){
    let auth_headers = new HttpHeaders();
    req = req.clone({
      headers: auth_headers.set('authorization',token_service.getToken()??'')
    });
  }
  console.log(req);
  
  return next(req);
};
