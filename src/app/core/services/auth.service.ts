import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _httpClient = inject(HttpClient)
  setRegisterForm(data:object):Observable<any>{
   return this._httpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',data)
  }
}
