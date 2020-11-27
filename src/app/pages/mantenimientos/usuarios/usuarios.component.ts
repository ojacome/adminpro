import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
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
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;



  constructor( 
    private usuarioSvc: UsuarioService,
    private buscarSvc: BusquedasService ) { }

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
      this.usuariosTemp = usuarios;
      
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

  buscar( termino: string ){    
    
    if( termino.length < 2 ){ 
      this.usuarios = this.usuariosTemp;
      return; 
    }
    this.cargando = true;

    this.buscarSvc.buscar('usuarios', termino)
    .subscribe( res =>{ 
      this.cargando = false;      
      this.usuarios = res;
    })
  }

}

