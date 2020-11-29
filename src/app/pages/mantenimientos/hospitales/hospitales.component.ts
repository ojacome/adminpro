import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = true;


  constructor(
    private hospitalSvc: HospitalService
  ) { }

  ngOnInit(): void {

   this.cargarHospitales();
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
        .subscribe( hospital =>{
          Swal.fire('Hospital Eliminado',`Información borrada del hospital ${hospital.nombre}`, 'success')
          this.cargarHospitales();
        })
      }
    }) 

    
  }
}
