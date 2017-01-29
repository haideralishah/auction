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
  selector: 'app-bidding',
  templateUrl: './bidding.component.html',
  styleUrls: ['./bidding.component.css']
})
export class BiddingComponent implements OnInit {

  biddingData: any;
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {
    this.biddingData = localStorage.getItem("auctionDetails");
    this.biddingData = JSON.parse(this.biddingData);
    console.log(this.biddingData);
  }

  ngOnInit() {
  }
  msgBox = '';
  placebid(biddingData) {
    console.log(this.msgBox, 'msgBox');
    console.log(biddingData, 'biddingData');

  }



}
