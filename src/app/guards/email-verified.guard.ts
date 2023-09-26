import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataUsuarioService } from '../services/data-usuario.service';
import { ToastService } from '../services/toast.service';


@Injectable({
  providedIn: 'root'
})
export class EmailVerifiedGuard implements CanLoad {
  constructor(
    private _user : DataUsuarioService,
    private toast: ToastService,
    private router: Router  
  ){}
  canLoad(): Observable<boolean> | boolean  {
    return true;
  }
}
