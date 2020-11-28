import { Component, OnInit } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-img',
  templateUrl: './modal-img.component.html',
  styleUrls: ['./modal-img.component.css']
})
export class ModalImgComponent implements OnInit {  

  
  imagen: File;
  imgTemp: any = null;


  constructor(public modalImgSvc: ModalImgService,
    public fileSvc: FileUploadService) { }

  ngOnInit(): void {
  }




  cerrarModal() {
    this.imgTemp = null;
    this.modalImgSvc.cerrarModal();
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
    const id = this.modalImgSvc.id;
    const tipo = this.modalImgSvc.tipo;

    this.fileSvc.actualizarFoto(this.imagen, tipo, id)
    .then( (img) => {      
      Swal.fire('Guardado', 'imagen actualizada', 'success');
      this.modalImgSvc.nuevaImagen.emit(img);
      this.cerrarModal();
    }, (err) => Swal.fire('Error', 'No se pudo subir la imagen', 'error') )
  }
}
