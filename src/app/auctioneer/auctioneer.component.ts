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
  startOptionTime = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23',]
  endOptionTime = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',]
  minute = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59',]
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
      // this.allAuctioneeries = [];
      let obj: any = data.val();
      obj.id = data.key;
      obj.startTimeInMilliSeconds = new Date(obj.startTimeInMilliSeconds);
      obj.endTimeInMilliSeconds = new Date(obj.endTimeInMilliSeconds);
      this.allAuctioneeries.push(obj)
      console.log(this.allAuctioneeries, 'that.allAuctioneeries');
    })

  }

  ngOnInit() {
  }
  errorInformation;
  errorInformationMsg;
  warningPublish;
  auctioneerInformation: any = {};
  publishWarning(auction, product, description, startdate, starttime, enddate, endtime, firstbiddingamount, category, startminute, endminute) {
    console.log(auction, product, description, startdate, starttime, enddate, endtime, firstbiddingamount, category, startminute, endminute);

    let rightNow = new Date().getTime();
    let startdateInMilliSeconds = this.parseDate(startdate).getTime();
    let endDateInMilliSeconds = this.parseDate(enddate).getTime();
    starttime = starttime.slice(0, 2);
    endtime = endtime.slice(0, 2);
    let startTimeInMilliSeconds = (starttime * 60000 * 60) + startdateInMilliSeconds + (startminute * 60000);
    let endTimeInMilliSeconds = (endtime * 60000 * 60) + endDateInMilliSeconds + (endminute * 60000);
    console.log(startTimeInMilliSeconds, 'startTimeInMilliSeconds')
    console.log(endTimeInMilliSeconds, 'endTimeInMilliSeconds')

    if (!auction || !product || !description || !startdate || !starttime || !enddate || !endtime || !firstbiddingamount || !category || !startminute || !endminute) {
      this.errorInformationMsg = 'All fields are required.'
      this.errorInformation = true;
    }
    // else if (rightNow - startTimeInMilliSeconds > 0 || rightNow - endTimeInMilliSeconds > 0) {
    //   this.errorInformationMsg = 'You need to select future date.'
    //   this.errorInformation = true;
    //   setTimeout(() => {
    //     this.errorInformation = false;
    //     this.errorInformationMsg = ''
    //   }, 5000);
    // }
    else if (endTimeInMilliSeconds - startTimeInMilliSeconds < 0) {
      console.log(starttime,endtime,startminute,endminute)
      this.errorInformationMsg = 'You need to select future date, ending date and dime can not be before starting.'
      this.errorInformation = true;
      setTimeout(() => {
        this.errorInformation = false;
        this.errorInformationMsg = ''
      }, 5000);
    }
    else {
      this.errorInformation = false;
      this.warningPublish = true;
      this.errorInformationMsg = 'Please check your provided details, going to be saved.'
      this.auctioneerInformation.email = this.userData.email;
      this.auctioneerInformation.mobNumber = this.userData.mobNumber;
      this.auctioneerInformation.userName = this.userData.userName;
      this.auctioneerInformation.creatorId = this.authData;
      this.auctioneerInformation.auction = auction;
      this.auctioneerInformation.product = product;
      this.auctioneerInformation.description = description;
      this.auctioneerInformation.startTimeInMilliSeconds = startTimeInMilliSeconds;
      this.auctioneerInformation.endTimeInMilliSeconds = endTimeInMilliSeconds;
      this.auctioneerInformation.firstbiddingamount = firstbiddingamount;
      this.auctioneerInformation.category = category;

      // firebase.database().ref('/auctioneeree/').set(this.auctioneerInformation);
      // this.seveToDb(this.auctioneerInformation)
    }
    console.log(this.auctioneerInformation);
  }

  seveToDb(auctioneerInformation) {
    console.log(auctioneerInformation, 'auctioneerInformation');
    firebase.database().ref('auctioneeri/').push(this.auctioneerInformation)
      .then((v) => {

        this.auctioneerInformation = {};
        this.router.navigate(['./home']);
        console.log(v, '**************');
      })

  }

  cancel() {
    this.auctioneerInformation = {};
    this.router.navigate(['./home']);
  }





  parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }
}
