import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  medicoForm: FormGroup;
  hospitales: Hospital[] = [];
  hospitalSelected: Hospital;
  medicoSelected: Medico;



  constructor(
    private fb: FormBuilder,
    private hospitalSvc: HospitalService,
    private medicoSvc: MedicoService,
    private router: Router,
    private _route: ActivatedRoute) { }

  ngOnInit(): void {

    this.cargarHospitales();

    this._route.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    })

    this.crearFormulario();

    this.medicoForm.get('hospital').valueChanges
    .subscribe( hospitalId => this.hospitalSelected = this.hospitales.find(h => h._id === hospitalId))
  }



  crearFormulario(){
    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    });
  }

  cargarMedico(id: string){

    if( id === 'nuevo' ){ return }

    this.medicoSvc.obtenerMedicoPorID(id)
    .pipe( delay(100))
    .subscribe( medico => {
      this.medicoSelected = medico;
      const { nombre, hospital: {_id}} = medico;
      this.medicoForm.setValue({ nombre, hospital: _id });
    });
  }

  cargarHospitales(){
    this.hospitalSvc.obtenerHospitales()
    .subscribe( hospitales => this.hospitales = hospitales)
  }
  
  guardar(){

    console.log(this.medicoSelected);
    
    if( this.medicoSelected){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSelected._id
      }

      this.medicoSvc.actualizarMedico( data )
      .subscribe( medico => Swal.fire('Médico actualizado!', `Se ha actualizado el médico ${medico.nombre}`, 'success')) 
    }
    else{
      //crear
      this.medicoSvc.crearMedico(this.medicoForm.value)
      .subscribe( medico => {
        Swal.fire('Médico creado!', `Se ha creado el médico ${medico.nombre}`, 'success');
        this.router.navigateByUrl(`/dashboard/medico/${medico._id}`);
      })
    }
  }

}
