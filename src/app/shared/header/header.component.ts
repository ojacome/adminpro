import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function customSidebar();



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor( private _usuarioSvc: UsuarioService) { }

  ngOnInit(): void {
    customSidebar();
  }



  logout() {
    this._usuarioSvc.logout();
  }
}
