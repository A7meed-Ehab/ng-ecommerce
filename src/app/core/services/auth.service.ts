import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
<<<<<<< HEAD
import { LoginPayload } from '../interfaces/login-payload';
import { Observable } from 'rxjs';
import { AuthResponse } from '../interfaces/auth-response';
=======
import { Observable } from 'rxjs';

>>>>>>> c98a3c15eaf44a1938dc6e24abc070f4dcafea73
@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _httpClient = inject(HttpClient)
<<<<<<< HEAD
private readonly _baseUrl:string="https://ecommerce.routemisr.com/api/v1";

  setRegisterForm(data:object){
=======
  setRegisterForm(data:object):Observable<any>{
>>>>>>> c98a3c15eaf44a1938dc6e24abc070f4dcafea73
   return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
  setLoginForm(data: LoginPayload): Observable<AuthResponse> {
      return this._httpClient.post<AuthResponse>(`${this._baseUrl}/auth/signin`, data);
    }
}
 