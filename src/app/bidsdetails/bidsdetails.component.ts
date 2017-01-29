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
  constructor(public dataService: DataService, private router: Router) {
    // let that = this;
    // firebase.database().ref('/bids/').once('value')
    //   .then(function (snapshot) {
    //     that.bidsData = snapshot.val();
    //     console.log(that.bidsData);

    //   });
    this.currentBid = localStorage.getItem('bidsdetails');
    this.currentBid = JSON.parse(this.currentBid);
    console.log(this.currentBid, 'this.currentBidthis.currentBidthis.currentBid');

    firebase.database().ref('/bids').on('child_added', (data) => {
      // this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      if (obj.productId == this.currentBid.id) {
        this.bidsData.push(obj)
      }
      console.log(this.bidsData);




    })



  }

  ngOnInit() {
  }

}
