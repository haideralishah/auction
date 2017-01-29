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
    let that = this;
    this.authData = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + this.authData).once('value')
      .then(function (snapshot) {
        that.userData = snapshot.val();
        console.log(that.userData);

      });
    firebase.database().ref('/auctioneeri').on('child_added', (data) => {
      this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      obj.startTimeInMilliSeconds = new Date(obj.startTimeInMilliSeconds);
      obj.endTimeInMilliSeconds = new Date(obj.endTimeInMilliSeconds);
      that.allAuctioneeries.push(obj)
      console.log(that.allAuctioneeries, 'that.allAuctioneeries');
    })

  }

  ngOnInit() {
  }

  moveToAuctions(category) {

    this.router.navigate(['/auctions', category]);

  }

}
