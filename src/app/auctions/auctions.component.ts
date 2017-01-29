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
  category: any;
  allAuctioneeries: any = [];
  authData: any;
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {
    let that = this;
    this.authData = firebase.auth().currentUser.uid;
    route.params.subscribe(params => {
      this.category = params['category'];
      let that = this;
      firebase.database().ref('/auctioneeri').on('child_added', (data) => {
        that.allAuctioneeries = [];
        let obj: any = data.val();
        obj.id = data.key;

        if (that.category == obj.category) {
          // let rightNow = new Date().getTime();
          // obj.startTimeInMilliSeconds = new Date(obj.startTimeInMilliSeconds);
          // obj.endTimeInMilliSeconds = new Date(obj.endTimeInMilliSeconds);

          // if (rightNow - obj.startTimeInMilliSeconds > 0 || rightNow - obj.endTimeInMilliSeconds > 0) {
          //   obj.biddingStart == true;
          // }
          // else {
          //   obj.biddingStart == false;
          // }



          that.allAuctioneeries.push(obj)
          console.log(that.allAuctioneeries, 'that.allAuctioneeries');
        }

      })

    });


  }
  ngOnInit() {

  }

  errorInformation: any;
  errorInformationMsg: any;
  goToBidding(ac) {
    console.log('from go to bidding', ac);
    let rightNow: any = new Date()
    console.log(rightNow);
    rightNow = rightNow.getTime();
    console.log(rightNow);
    let startTime: any = new Date(ac.startTimeInMilliSeconds);
    let endTime: any = new Date(ac.endTimeInMilliSeconds);
    console.log(rightNow - startTime > 0, 'rightNow - startTime > 0');
    console.log(rightNow - endTime > 0, 'rightNow - endTime > 0');
    if (rightNow - startTime > 0 || rightNow - endTime > 0) {
      console.log('go to bidding');
      localStorage.setItem('actiondetails', JSON.stringify(ac))
      this.router.navigate(['./gotoassurancebid']);
    }
    else {

      this.errorInformationMsg = 'Bidding is yet start.'
      this.errorInformation = true;
    }


  }
}
