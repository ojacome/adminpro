import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
declare const gapi: any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url_usuario = `${base_url}/usuarios`;
  auth2: any;



  constructor(
    private http: HttpClient,
    private _router: Router,
    private ngZone: NgZone
    ) { 
      this.googleInit();
    }



  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token_adminpro') || '';

    return this.http.get(`${base_url}/login/renew`, { 
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token_adminpro', resp.token)
      }),
      map( resp => true ),
      catchError( error => of( false ))
    )
  }

  crearUsuario( formData: RegisterForm){
    return this.http.post(this.url_usuario, formData)    
    .pipe(
      tap( (resp: any) => {
        console.log(resp);        
        localStorage.setItem('token_adminpro', resp.token)
      })
    )
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

  googleInit(){
    return new Promise( resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '480845147781-j281h5a1fdjahhookt6elj8kd1jk5c6p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          // Request scopes in addition to 'profile' and 'email'
          //scope: 'additional_scope'
        });      

        resolve();
      });
    })
  }

  logout() {
    localStorage.removeItem('token_adminpro');    
      
    this.auth2.signOut().then( () => {
      console.log('User signed out.');
      this.ngZone.run( () => {
        this._router.navigateByUrl('/login');
      })
    });
    
  }
}
