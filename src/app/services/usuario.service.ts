import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CargarUsuario } from '../interfaces/cargar-usuarios.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { Usuario } from '../models/usuario.model';
declare const gapi: any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url_usuario = `${base_url}/usuarios`;
  auth2: any;
  usuario: Usuario;



  constructor(
    private http: HttpClient,
    private _router: Router,
    private ngZone: NgZone
    ) { 
      this.googleInit();
    }



  get token(): string {
    return localStorage.getItem('token_adminpro') || '';
  }  

  get role(): 'ADMIN_ROLE'|'USER_ROLE' {
    return this.usuario.role;
  }  

  get uid() {
    return this.usuario.uid || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  validarToken(): Observable<boolean> {    
    return this.http.get(`${base_url}/login/renew`, { 
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {
        
        const { nombre, email, role, uid, google, img } = resp.usuario;
        this.usuario = new Usuario(nombre, email,'', img, google, role, uid);

        this.guardarLocalStorage(resp);

        return true;
      }),      
      catchError( error => of( false ))
    )
  }

  guardarLocalStorage(res: any){
    localStorage.setItem('token_adminpro', res.token)
    localStorage.setItem('menu_adminpro', JSON.stringify(res.menu))
  }

  crearUsuario( formData: RegisterForm){
    return this.http.post(this.url_usuario, formData)    
    .pipe(
      tap( (resp: any) => this.guardarLocalStorage(resp))
    )
  }

  actualizar(data: { email: string, nombre: string, role: string }){

    // data = {
    //   ...data,
    //   role: this.usuario.role
    // }

    return this.http.put(`${this.url_usuario }/${this.uid}`, data, this.headers);
  }

  actualizarAdmin( usuario: Usuario ){
    return this.http.put(`${this.url_usuario }/${this.usuario.uid}`, usuario, this.headers);
  }

  obtenerUsuarios( desde: number = 0 ){

    const url = `${base_url}/usuarios?desde=${desde}`;

    return this.http.get<CargarUsuario>( url, this.headers )
    .pipe(      
      map( res =>  {
        const usuarios = res.usuarios.map( 
          user => new Usuario(user.nombre, user.email, '', user.img, user.google, user.role, user.uid)
          );
        return {
          total: res.total,
          usuarios
        };
      })
    )
  }

  eliminarUsuario( usuario: Usuario ){
    return this.http.delete(`${this.url_usuario }/${usuario.uid}`, this.headers);
  }

  login( formData: LoginForm){
    return this.http.post(`${base_url}/login`, formData)    
    .pipe(
      tap( (resp: any) => this.guardarLocalStorage(resp))
    )
  }

  loginGoogle( token: string ){
    return this.http.post(`${base_url}/login/google`, { token })    
    .pipe(
      tap( (resp: any) => this.guardarLocalStorage(resp))
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
    
    //borrar menu
    localStorage.removeItem('menu_adminpro');
      
    this.auth2.signOut().then( () => {
      console.log('User signed out.');
      this.ngZone.run( () => {
        this._router.navigateByUrl('/login');
      })
    });
    
  }
}
