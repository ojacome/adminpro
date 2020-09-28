import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styleUrls: ['./rjxs.component.css']
})
export class RjxsComponent implements OnInit {

  constructor() { 
    const obs$ = new Observable( observer => { 

      let i = -1;

      const intervalo = setInterval( () => { 
        i++;
        observer.next(i);

        if( i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        //para probar el error
        // if( i === 2){          
        //   observer.error('i llego al valor de 2');
        // }
      }, 1000)
    });

    obs$.subscribe(
      valor => console.log('Subs: ', valor),
      error => console.warn('Error: ', error),
      () => console.info('Obs terminado')
    )
  }

  ngOnInit(): void {
  }

}
