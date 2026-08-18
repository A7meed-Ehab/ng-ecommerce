import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginPayload } from '../interfaces/login-payload';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _httpClient = inject(HttpClient)
private readonly _baseUrl:string="https://ecommerce.routemisr.com/api/v1";

  setRegisterForm(data:object){
   return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  setLoginForm(data: LoginPayload): Observable<AuthResponse> {
      return this._httpClient.post<AuthResponse>(`${this._baseUrl}/auth/signin`, data);
    }
}
 