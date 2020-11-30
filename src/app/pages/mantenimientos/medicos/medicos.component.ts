import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Medico } from 'src/app/models/medico.model';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImgService } from 'src/app/services/modal-img.service';

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
    private modalImgSvc: ModalImgService) { }

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
}
