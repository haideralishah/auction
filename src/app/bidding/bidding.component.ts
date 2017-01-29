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
  bidamount: any = '';
  warning: any = {};
  placebid(biddingData) {
    console.log(this.bidamount, 'msgBox');
    console.log(biddingData, 'biddingData');
    // this.bidamount = parseInt(this.bidamount);
    if (this.bidamount == '' || isNaN(this.bidamount)) {
      this.warning.status = true;
      this.warning.msg = 'Please type correct amount.'
      setTimeout(() => {
        this.warning.status = false;
        this.warning.message = ''
      }, 5000);
    }
    else if (this.bidamount < biddingData.firstbiddingamount) {
      this.warning.status = true;
      this.warning.msg = 'You can not place bid lesser than' + biddingData.firstbiddingamount + '$'
      setTimeout(() => {
        this.warning.status = false;
        this.warning.message = ''
      }, 5000);
    }
    else {
      console.log('amount bidded');
    }


  }



}
