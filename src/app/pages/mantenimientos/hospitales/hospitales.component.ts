import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImgService } from 'src/app/services/modal-img.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  hospitales: Hospital[] = [];
  cargando: boolean = true;
  imgSubs: Subscription;


  constructor(
    private hospitalSvc: HospitalService,
    private modalImgSvc: ModalImgService
  ) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

   this.cargarHospitales();
   this.imgSubs = this.modalImgSvc.nuevaImagen
    .pipe( delay(100) )
    .subscribe( () => this.cargarHospitales());
  }



  cargarHospitales(){
    this.cargando = true;

    this.hospitalSvc.obtenerHospitales()
    .subscribe( hospitales => {

      this.cargando = false;
      this.hospitales = hospitales
    })
  }

  guardarCambios(hospital: Hospital){

    this.hospitalSvc.actualizarHospital( hospital._id, hospital.nombre )
    .subscribe( hospital =>{
      Swal.fire('Hospital Actualizado',`Información actualizada del hospital ${hospital.nombre}`, 'success')
    })
  }

  eliminar( hospital: Hospital ){
    Swal.fire({
      title: `Deseas eliminar ${hospital.nombre}?`,
      text: "No podrás recuperar la información!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalSvc.eliminarHospital( hospital._id)
        .subscribe( () =>{
          Swal.fire('Hospital Eliminado','', 'success')
          this.cargarHospitales();
        })
      }
    })     
  }

  async crearHospital(){
    const { value } = await Swal.fire<string>({
      title: 'Nuevo Hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      confirmButtonText: 'Guardar',
      showCloseButton: true,
      showCancelButton: true
    })
    
    if( value.trim().length > 2 ){
      this.hospitalSvc.crearHospital(value)
      .subscribe( hospital => {
        Swal.fire('Hospital creado!', `Nuevo hospital ${hospital.nombre}`, 'success');
        this.hospitales.push(hospital);
      })
    }
  }

  cambiarImagen( hospital: Hospital ){
    this.modalImgSvc.abrirModal('hospitales', hospital._id, hospital.img);
  }
}
