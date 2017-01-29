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
  selector: 'app-gotobid',
  templateUrl: './gotobid.component.html',
  styleUrls: ['./gotobid.component.css']
})
export class GotobidComponent implements OnInit {

  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {
    

   }

  ngOnInit() {
  }

}
