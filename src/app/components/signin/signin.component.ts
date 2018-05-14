import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  email: string;
  password: string;
  constructor(
    public router: Router,
    public flashmessagesservice: FlashMessagesService ,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  mySubmit(email: string , password: string) {
    this.authService.login(this.email, this.password)
    .then((res) => {
        this.flashmessagesservice.show('تم الدخول !' , {cssClass: 'alert-success' , timeout: 2000} );
        this.router.navigate(['/students']);
      })
      .catch( (err) => {
        this.flashmessagesservice.show( 'خطأ في اسم المستخدم أو كلمة السر' , {cssClass: 'alert-danger' , timeout: 2000} );
        this.router.navigate(['/']);
      }

      );
      }
}
