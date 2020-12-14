import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( img: string, tipo: 'usuarios'|'medicos'|'hospitales'): string {   
    if(img){      
        return img;            
    }
    else{
        return `https://res.cloudinary.com/ojacome/image/upload/v1607796451/adminpro/no-img_ewaqjp.jpg`;
    }
    
  }

}
