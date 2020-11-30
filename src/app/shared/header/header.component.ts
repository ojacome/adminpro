import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function customSidebar();



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public user: Usuario;



  constructor( 
    private _usuarioSvc: UsuarioService,
    private router: Router) { 
    this.user = _usuarioSvc.usuario;
  }

  ngOnInit(): void {
    customSidebar();
  }



  logout() {
    this._usuarioSvc.logout();
  }

  buscarTodo(termino: string){
    if(termino.length < 2){
      return;
    }
    else{
      this.router.navigateByUrl(`/dashboard/busqueda/${termino}`)
    }
    
  }
}
