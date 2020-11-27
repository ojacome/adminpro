import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;



  constructor( private usuarioSvc: UsuarioService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
  }




  cargarUsuarios(){
    this.cargando = true;

    this.usuarioSvc.obtenerUsuarios(this.desde)
    .subscribe( ({ total, usuarios }) => {
      this.cargando = false;
      this.totalUsuarios = total;      
      this.usuarios = usuarios;
      
    } );
  }


  cambiarPagina(valor: number){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }
    else if( this.desde > this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargarUsuarios();
  }

}
