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
  selector: 'app-bidder',
  templateUrl: './bidder.component.html',
  styleUrls: ['./bidder.component.css']
})
export class BidderComponent implements OnInit {
  categories = ['IT & Computers', 'Appliances', 'Fashion', 'Cloths', 'Painting', 'House', 'Company', 'Others']

  userData: any;
  authData;
  allAuctioneeries: any = [];
  constructor(public dataService: DataService, private router: Router) {


  }

  ngOnInit() {
  }

  moveToAuctions(category) {

    this.router.navigate(['/auctions', category]);

  }

}
