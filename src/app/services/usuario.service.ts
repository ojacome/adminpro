import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';

const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url_usuario = `${base_url}/usuarios`;

  constructor(private http: HttpClient) { }



  crearUsuario( formData: RegisterForm){
    return this.http.post(this.url_usuario, formData)    
  }

  login( formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)    
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token_adminpro', resp.token)
      })
    )
  }

  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token })    
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token_adminpro', resp.token)
      })
    )
  }
}