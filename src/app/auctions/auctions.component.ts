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
      obj.startTimeInMilliSeconds = new Date(obj.startTimeInMilliSeconds);
      obj.endTimeInMilliSeconds = new Date(obj.endTimeInMilliSeconds);

      if (obj.category == this.category && this.authData != obj.creatorId) {
        console.log(this.category, 'category');
        this.allAuctioneeries.push(obj)
        console.log(this.allAuctioneeries, 'that.allAuctioneeries');

      }
    })
  }
  ngOnInit() {

  }


}
