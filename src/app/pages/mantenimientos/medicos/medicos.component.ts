import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  cargando: boolean = true;
  medicos: Medico[] = [];
  imgSubs: Subscription;



  constructor(
    private medicoSvc: MedicoService,
    private modalImgSvc: ModalImgService,
    private buscarSvc: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImgSvc.nuevaImagen
    .pipe( delay(100) )
    .subscribe( () => this.cargarMedicos());
  }



  cargarMedicos(){
    this.cargando = true;
    this.medicoSvc.obtenerMedicos()
    .subscribe( medicos => {
      this.cargando = false;
      this.medicos = medicos;      
    })
  }

  cambiarImagen(medico: Medico){
    this.modalImgSvc.abrirModal('medicos', medico._id, medico.img);
  }

  buscarMedico( termino: string ){
    if( termino.length < 2 ){ 
      this.cargarMedicos();
      return 
    }
    
    this.cargando = true;

    this.buscarSvc.buscar('medicos', termino)
    .subscribe( (medicos: Medico[]) =>{ 
      this.cargando = false;      
      this.medicos = medicos;
    })
  }

  eliminar( medico: Medico ){
    Swal.fire({
      title: `Deseas eliminar ${medico.nombre}?`,
      text: "No podrás recuperar la información!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoSvc.eliminarMedico( medico._id)
        .subscribe( () =>{
          Swal.fire('Medico Eliminado','', 'success')
          this.cargarMedicos();
        })
      }
    })     
  }
}
