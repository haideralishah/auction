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
  constructor(private route: ActivatedRoute, public dataService: DataService, private router: Router) {
    this.authData = firebase.auth().currentUser.uid;

    firebase.database().ref('/actioneeri').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.allAuctioneeries.push(obj)
      console.log(this.allAuctioneeries, 'this.allAuctioneeries');
    })

  }
  ngOnInit() {

  }


}
