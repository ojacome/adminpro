import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
declare const gapi: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({    
    email: [ localStorage.getItem('email_adminpro') || '' , [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remenber: [ false ]    
  })
  public auth2

  
  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _usuarioservice: UsuarioService
    ) { }

  ngOnInit(): void {
    this.renderButton();
  }



  login(){    
    
    this._usuarioservice.login( this.loginForm.value)
    .subscribe( resp => {
      console.log(resp)
      if( this.loginForm.get('remenber').value){
        localStorage.setItem('email_adminpro',this.loginForm.get('email').value);
      }
      else{
        localStorage.removeItem('email_adminpro')
      }

      this._router.navigateByUrl('/');
    },
      error => Swal.fire('Error', error.error.msg, 'error')
    )
  }

  // onSuccess(googleUser) {
  //   console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  //   var id_token = googleUser.getAuthResponse().id_token;
  //   console.log(id_token);
    
  // }
  // onFailure(error) {
  //   console.log(error);
  // }
  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '480845147781-j281h5a1fdjahhookt6elj8kd1jk5c6p.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  }

  attachSignin(element) {    
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
          var id_token = googleUser.getAuthResponse().id_token;
          // console.log(id_token);
          this._usuarioservice.loginGoogle( id_token )
          .subscribe( resp => this._router.navigateByUrl('/') );
          
        }, (error) => {
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}
