import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {
    if(img){
      if(img.includes('https')){
          return img;
      }
      return `${environment.base_url}/upload/${tipo}/${img}`;
    }
    else{
        return `${environment.base_url}/upload/usuarios/no-image`;
    }
  }

}
