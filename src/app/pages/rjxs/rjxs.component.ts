import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, Subscription } from 'rxjs';
import { map, retry, take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rjxs',
  templateUrl: './rjxs.component.html',
  styleUrls: ['./rjxs.component.css']
})
export class RjxsComponent  implements OnDestroy{

  public intervalSubs: Subscription;



  constructor() { 
    
    // this.retornaObservable()
    // .pipe(
    //   retry(2)//intenta ejecutar el observer las veces indicadas
    // )
    // .subscribe(
    //   valor => console.log('Subs: ', valor),
    //   error => console.warn('Error: ', error),
    //   () => console.info('Obs terminado')
    // )
    this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        valor => console.log(valor)
      )
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number>{
    return interval(1000)
    .pipe(
      // take(10),
      map(valor => valor +1),
      filter(valor => (valor % 2 === 0) ? true: false),
    );
  }

  retornaObservable(): Observable<number>{
    let i = -1;
    
    const obs$ = new Observable<number>( observer => { 
      const intervalo = setInterval( () => { 
        i++;
        observer.next(i);

        if( i === 4){
          clearInterval(intervalo);
          observer.complete();
        }

        //para probar el error
        if( i === 2){          
          observer.error('i llego al valor de 2');
        }
      }, 1000)
    });

    return obs$;
  }
}
