import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor( 
    private _usuarioService: UsuarioService,
    private _router: Router
    ){  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    
    return this._usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado){
            this._router.navigateByUrl('/login');
          }
        })
      )
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) {

      return this._usuarioService.validarToken()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado){
            this._router.navigateByUrl('/login');
          }
        })
      )
  }
  
}
