import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';

@Injectable()
export class StloginGuard implements CanActivate {
  Autherized;
  constructor(
    public router: Router,
  ) { }

session = JSON.parse(localStorage.getItem(`valid`));

  canActivate(): boolean {

      if (this.Autherized !== true  && this.session !== true) {
        this.router.navigate(['']);
        // console.log(false);
        // console.log(this.session);
        return false;
      } else {
        // console.log(true);
        // console.log(this.session);

        return true;

      }

  }
  }

