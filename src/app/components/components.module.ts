import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ChartsModule } from 'ng2-charts';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [IncrementadorComponent, DonaComponent, ModalImgComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    PipesModule
  ],
  exports: [
    IncrementadorComponent,
    DonaComponent,
    ModalImgComponent,
  ]
})
export class ComponentsModule { }
