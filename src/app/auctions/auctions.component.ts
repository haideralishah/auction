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
  selector: 'app-auctions',
  templateUrl: './auctions.component.html',
  styleUrls: ['./auctions.component.css']
})
export class AuctionsComponent implements OnInit {
  allAuctioneeries: any = [];
  authData: any;
  category: any;
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {


    this.authData = firebase.auth().currentUser.uid;
    route.params.subscribe(params => { this.category = params['category']; });

    console.log('contrustu');
    firebase.database().ref('/auctioneeri').on('child_added', (data) => {
      // this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      obj.isoStartTime = new Date(obj.startTimeInMilliSeconds);
      obj.isoEndTime = new Date(obj.endTimeInMilliSeconds);
      let rightNow = new Date().getTime();
      if (obj.category == this.category && this.authData != obj.creatorId && rightNow < obj.endTimeInMilliSeconds) {
        console.log(this.category, 'category');
        this.allAuctioneeries.push(obj)
        console.log(this.allAuctioneeries, 'that.allAuctioneeries');

      }
    })
  }
  ngOnInit() {

  }

  warning: any = {};
  startBidding(auction) {
    let rightNow = new Date().getTime();
    if (rightNow > auction.startTimeInMilliSeconds && rightNow < auction.endTimeInMilliSeconds) {
      console.log(auction, 'auction started');
      localStorage.setItem('auctionDetails', JSON.stringify(auction));
      this.router.navigate(['./gotoassurancebid']);
    }
    else {

      this.warning.status = true;
      this.warning.msg = "Bidding has not started yet."

    }


  }

}
