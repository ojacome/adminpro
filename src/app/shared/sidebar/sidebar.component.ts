import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  user: Usuario;


  constructor(
    private _sidebarService: SidebarService,
    private _usuarioSvc: UsuarioService
  ) { 
    this.menuItems = this._sidebarService.menu;
    this.user = this._usuarioSvc.usuario;
  }

  ngOnInit(): void {
  }

}
