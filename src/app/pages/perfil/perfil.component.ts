import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  perfilForm: FormGroup;
  usuario: Usuario;
  imagen: File;
  imgTemp: any = null;



  constructor( 
    private fb: FormBuilder,
    private usuarioSvc: UsuarioService,
    private fileSvc: FileUploadService ) { 
      
      this.usuario = usuarioSvc.usuario;           
    }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required],
      email: [ this.usuario.email, [ Validators.required, Validators.email ]]
    })
  }



  actualizarPerfil(){    
    this.usuarioSvc.actualizar(this.perfilForm.value)  
    .subscribe( () => {
      const { nombre, email } = this.perfilForm.value;
      this.usuario.nombre = nombre;
      this.usuario.email = email;

      Swal.fire('Guardado', 'perfil actualizado', 'success')
    }, (err) => Swal.fire('Error', err.error.msg, 'error'))
  }

  cambiarImagen( file: File ){    
    this.imagen = file;    

    if( !file ){ 
      this.imgTemp = null;
      return 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }
  }

  subirImagen(){
    this.fileSvc.actualizarFoto(this.imagen, "usuarios", this.usuario.uid)
    .then( img => {
      this.usuario.img = img
      Swal.fire('Guardado', 'imagen actualizada', 'success')
    }, (err) => Swal.fire('Error', 'No se pudo subir la imagen', 'error') )
  }
}
