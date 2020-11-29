import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  totalUsuarios: number = 0;
  usuarios: Usuario[] = [];
  usuariosTemp: Usuario[] = [];
  desde: number = 0;
  cargando: boolean = true;
  imgSubs: Subscription;



  constructor( 
    private usuarioSvc: UsuarioService,
    private buscarSvc: BusquedasService,
    private modalImgSvc: ModalImgService ) { }


  ngOnInit(): void {

    this.cargarUsuarios();
    
    this.imgSubs = this.modalImgSvc.nuevaImagen
    .pipe( delay(100) )
    .subscribe( img => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
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

  eliminarUsuario( usuario: Usuario ){
    if( usuario.uid === this.usuarioSvc.uid ){
      Swal.fire('Error', 'No puede eliminar el usuario', 'error');
      return; 
    }

    Swal.fire({
      title: `Deseas eliminar a ${usuario.nombre}?`,
      text: "No podrás recuperar la información!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioSvc.eliminarUsuario( usuario )
        .subscribe( res =>{         
          Swal.fire(
            'Eliminado!',
            'El usuario ha sido eliminado.',
            'success'
          )

          this.cargarUsuarios();
        })
      }
    })    
  }

  cambiarRole(usuario: Usuario){    
    this.usuarioSvc.actualizarAdmin(usuario)
    .subscribe( res => console.log(res))
  }

  abrirModal( usuario: Usuario){
    console.log(usuario);
    
    this.modalImgSvc.abrirModal('usuarios', usuario.uid, usuario.img);
  }
}

