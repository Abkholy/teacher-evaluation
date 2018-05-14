import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogIn: boolean;
  isUserLogin: string;
  enableRegister: boolean;
  constructor(private authService: AuthService,
  private router: Router) { }

    ngOnInit() {
      this.authService.getAuth().subscribe(auth => {
        if (auth) {
            this.isLogIn = true ;
            this.isUserLogin = auth.email ;
        } else {
          this.isLogIn = false ;
        }
      });
  }
  onClick() {
this.authService.logout();
this.router.navigate(['/login']);

  }
}
