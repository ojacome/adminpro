import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { Usuario } from 'src/app/models/usuario.model';
import { BusquedasService } from 'src/app/services/busquedas.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  usuarios: Usuario[] = [];
  medicos: Medico[] = [];
  hospitales: Hospital[] = [];



  constructor(
    private route: ActivatedRoute,
    private busquedaSvc: BusquedasService
  ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe( ({termino}) => {
      
      this.buscar(termino);
    })
  }

  buscar( termino: string ){
    this.busquedaSvc.buscarTodo( termino )
    .subscribe( (res: any) => {
      
      this.usuarios = res.usuarios;
      this.medicos = res.medicos;
      this.hospitales = res.hospitales;
    } )
  }
}
