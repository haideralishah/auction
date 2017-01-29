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
  bids: any = [];
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {
    this.biddingData = localStorage.getItem("auctionDetails");
    this.biddingData = JSON.parse(this.biddingData);
    console.log(this.biddingData);
    // let email = firebase.auth().currentUser;
    // console.log(email, 'email');

    firebase.database().ref('/bids').on('child_added', (data) => {
      // this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      // obj.isoStartTime = new Date(obj.startTimeInMilliSeconds);
      // obj.isoEndTime = new Date(obj.endTimeInMilliSeconds);
      // let rightNow = new Date().getTime();

      // this.bids.push(obj)
      // console.log(this.bids, 'this.bids');

      if (obj.productId == this.biddingData.id) {

        this.bids.push(obj)
        console.log(this.bids, 'this.bids');

      }
    })



  }

  ngOnInit() {
  }
  bidamount: any = '';
  warning: any = {};
  bid: any = {};
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
    else if (this.bidamount <= biddingData.firstbiddingamount) {
      this.warning.status = true;
      this.warning.msg = 'You can not place bid lesser than' + biddingData.firstbiddingamount + '$'
      setTimeout(() => {
        this.warning.status = false;
        this.warning.message = ''
      }, 5000);
    }


    else {
      let rightNow = new Date().getTime();

      console.log(rightNow, 'rightNow');
      console.log(biddingData.endTimeInMilliSeconds, 'biddingData.endTimeInMilliSeconds')
      if (rightNow > biddingData.endTimeInMilliSeconds) {
        this.warning.status = true;
        this.warning.msg = 'Sorry the bidding time has ended and product awarded.'
        setTimeout(() => {
          this.warning.status = false;
          this.warning.message = ''
        }, 5000);
      } else {
        this.bid.creatorId = biddingData.creatorId;
        this.bid.productId = biddingData.id;
        this.bid.placerId = firebase.auth().currentUser.uid;
        this.bid.placerEmail = firebase.auth().currentUser.email;
        this.bid.amount = this.bidamount;


        console.log(this.bid, 'this.bid ***********************');

        console.log('amount bidded');


        biddingData.firstbiddingamount = this.bidamount;

        firebase.database().ref('auctioneeri/' + this.bid.productId).set(biddingData);



        firebase.database().ref('bids/').push(this.bid)
          .then((v) => {

            this.bid = {};
            console.log(v, '**************');
          })

      }






    }


  }



}
