import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: [ '../login/login.component.css'  ]
})
export class ResgisterComponent{

  public registerForm = this.fb.group({
    nombre: ['fernando', Validators.required],
    email: ['fernando@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [ true, Validators.required],
  }, {
    validators: this.passwordsIguales('password', 'password2')
  })
  formSubmitted =  false;



  constructor( 
    private fb: FormBuilder,
    private _usuarioService: UsuarioService
    ) { }



  crearUsuario() {
    this.formSubmitted = true;    
    
    if(this.registerForm.invalid) {
      return;      
    }
    
    //posteo de la información
    this._usuarioService.crearUsuario( this.registerForm.value)
    .subscribe( resp => console.log(resp),
      error => Swal.fire('Error', error.error.msg, 'error')
    )
  }

  campoNoValido(campo: string): boolean {
    if( this.registerForm.get(campo).invalid && this.formSubmitted){
      return true;
    }
    else{
      return false;
    }
  }

  aceptaTerminos() {
    return !this.registerForm.get('terminos').value && this.formSubmitted;
  }

  contraseniasNoValidas() {
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;

    if( (pass1 !== pass2) && this.formSubmitted ){
      return true;
    }
    else{
      return false;
    }
  }

  passwordsIguales(pass1: string, pass2: string){
    return (formGroup: FormGroup) => {

      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);

      if( pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null);
      }
      else{
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
