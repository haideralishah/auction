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
  selector: 'app-auctioneer',
  templateUrl: './auctioneer.component.html',
  styleUrls: ['./auctioneer.component.css']
})
export class AuctioneerComponent implements OnInit {
  startOptionTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',]
  endOptionTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',]

  userData: any;
  authData;
  constructor(public dataService: DataService, private router: Router) {
    let that = this;
    this.authData = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + this.authData).once('value')
      .then(function (snapshot) {
        that.userData = snapshot.val();
        console.log(that.userData);
        // ...
      });
  }

  ngOnInit() {
  }
  errorInformation;
  errorInformationMsg;
  warningPublish;
  auctioneerInformation: any = {};
  publishWarning(auction, product, description, startdate, starttime, enddate, endtime, firstbiddingamount) {
    console.log(auction, product, description, startdate, starttime, enddate, endtime, firstbiddingamount);

    let rightNow = new Date().getTime();
    let startdateInMilliSeconds = this.parseDate(startdate).getTime();
    let endDateInMilliSeconds = this.parseDate(enddate).getTime();
    starttime = starttime.slice(0, 2);
    let startTimeInMilliSeconds = (starttime * 60000 * 60) + startdateInMilliSeconds;
    let endTimeInMilliSeconds = (endtime * 60000 * 60) + endDateInMilliSeconds;
    if (!auction || !product || !description || !startdate || !starttime || !enddate || !endtime || !firstbiddingamount) {
      this.errorInformationMsg = 'All fields are required.'
      this.errorInformation = true;
    }
    else if (rightNow - startdateInMilliSeconds > 0 || rightNow - endDateInMilliSeconds > 0) {
      this.errorInformationMsg = 'You need to select future date.'
      this.errorInformation = true;
      setTimeout(() => {
        this.errorInformation = false;
        this.errorInformationMsg = ''
      }, 5000);
    }
    else if (endDateInMilliSeconds < startdateInMilliSeconds) {
      this.errorInformationMsg = 'Ending date and dime can not be before starting.'
      this.errorInformation = true;
      setTimeout(() => {
        this.errorInformation = false;
        this.errorInformationMsg = ''
      }, 5000);
    }
    else {
      // this.errorInformation = false;
      // this.warningPublish = true;
      // this.errorInformationMsg = 'Please varify your provided details going to be saved.'
      this.auctioneerInformation.email = this.userData.email;
      this.auctioneerInformation.mobNumber = this.userData.mobNumber;
      this.auctioneerInformation.userName = this.userData.userName;
      this.auctioneerInformation.userUid = this.userData.uid;
      this.auctioneerInformation.auction = auction;
      this.auctioneerInformation.product = product;
      this.auctioneerInformation.description = description;
      this.auctioneerInformation.startTimeInMilliSeconds = startTimeInMilliSeconds;
      this.auctioneerInformation.endTimeInMilliSeconds = endTimeInMilliSeconds;
      this.auctioneerInformation.firstbiddingamount = firstbiddingamount;
    }
    console.log(this.auctioneerInformation);

  }

  




  parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }
}
