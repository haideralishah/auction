import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

declare var firebase: any;

@Component({
  selector: 'app-gotoassurance',
  templateUrl: './gotoassurance.component.html',
  styleUrls: ['./gotoassurance.component.css']
})
export class GotoassuranceComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {

  }

  ngOnInit() {
  }


  accept() {
    console.log('accept');
    this.router.navigate(['./gotobid']);
  }


  reject() {
    console.log('reject');
    this.router.navigate(['./home']);
  }



}
