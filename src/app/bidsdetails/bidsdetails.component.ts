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
  selector: 'app-bidsdetails',
  templateUrl: './bidsdetails.component.html',
  styleUrls: ['./bidsdetails.component.css']
})
export class BidsdetailsComponent implements OnInit {
  bidsData: any = [];
  currentBid: any = []
  awarded: boolean = false;
  awardedData: any = {};

  constructor(public dataService: DataService, private router: Router) {
    // let that = this;
    // firebase.database().ref('/bids/').once('value')
    //   .then(function (snapshot) {
    //     that.bidsData = snapshot.val();
    //     console.log(that.bidsData);

    //   });
    this.awardedData.amount = 0;
    this.currentBid = localStorage.getItem('bidsdetails');
    this.currentBid = JSON.parse(this.currentBid);
    console.log(this.currentBid, 'this.currentBidthis.currentBidthis.currentBid');
    let that = this;
    // firebase.database().ref('/bids').once('value')
    //   .then(function (data) {
    //     // that.userData = snapshot.val();
    //     // console.log(that.userData);
    //     let obj: any = data.val();
    //     obj.id = data.key;
    //     if (obj.productId == that.currentBid.id) {
    //       that.bidsData.push(obj)
    //       that.bidsData.reverse();
    //     }
    //     console.log(this.bidsData);
    //     let rightNow = new Date().getTime();
    //     if (rightNow > this.currentBid.endTimeInMilliSeconds) {
    //       this.awarded = true;
    //       this.findAwardedDetails();
    //     }
    //   });


    firebase.database().ref('/bids').on('child_added', (data) => {
      // this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      if (obj.productId == this.currentBid.id) {
        this.bidsData.push(obj)
        this.bidsData.reverse();
      }
      console.log(this.bidsData);
      let rightNow = new Date().getTime();
      let endTime = new Date(this.currentBid.endTimeInMilliSeconds).getTime();
      console.log(endTime, 'endTime');
      if (rightNow > endTime) {
        this.awarded = true;
        this.findAwardedDetails();
      }
    })
  }
  findAwardedDetails() {
    //  that.bidsData   awardedData
    console.log('findAwardedDetails called');
    for (var i = 0; i < this.bidsData.length; i++) {
      if (this.bidsData[i].amount > this.awardedData.amount) {
        this.awardedData = this.bidsData[i];

      }
    }
    console.log(this.awardedData, 'this.awardedData this.awardedData this.awardedData');


  }

  ngOnInit() {
  }

}
