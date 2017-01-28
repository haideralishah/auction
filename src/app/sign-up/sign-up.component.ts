import { Component, OnInit } from '@angular/core';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';
import { DataService } from '../data.service';

declare var firebase: any

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router, public dataService: DataService) { }

  ngOnInit() {
  }

  error: any = {};
  registerNewUser(email, password, userName, mobNumber) {
    console.log(email, password, userName, mobNumber);

    if (email.indexOf('@') == -1 || email.indexOf('.') == -1) {
      this.error.message = 'Email address is invalid.'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (password.length <= 4) {
      this.error.message = 'Password must be greater than 4 cheractors.'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (!isNaN(userName)) {
      this.error.message = 'User name can not be fake.'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else if (mobNumber.length < 11) {
      this.error.message = 'Provide valid cell number'
      this.error.status = true;
      setTimeout(() => {
        this.error.status = false;
        this.error.message = ''
      }, 5000);
    }
    else {
      let that = this;
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
          firebase.database().ref('users/' + user.uid).set({
            email: email,
            // password: password,
            userName: userName,
            mobNumber: mobNumber
          })
          // this.dataService.deActiveTab();
          that.router.navigate(['./home']);
        })
        .catch(function (err) {
          var errorCode = err.code;
          var errorMessage = err.message;
          console.log(err.code);
          if (errorCode == 'auth/email-already-in-use') {
            that.error.message = errorMessage
            that.error.status = true;
            setTimeout(() => {
              that.error.status = false;
              that.error.message = ''
            }, 5000);
          }
        });
    }
  }

}
