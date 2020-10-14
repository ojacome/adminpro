import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
}
