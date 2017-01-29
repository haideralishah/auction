import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

import { ButtonsModule } from 'ng2-bootstrap';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './data.service';
import { AuctioneerComponent } from './auctioneer/auctioneer.component';
import { BidderComponent } from './bidder/bidder.component';
import { AuctionsComponent } from './auctions/auctions.component';
import { BiddingComponent } from './bidding/bidding.component';
import { GotobidComponent } from './gotobid/gotobid.component';
import { GotoassuranceComponent } from './gotoassurance/gotoassurance.component';
import { BidsdetailsComponent } from './bidsdetails/bidsdetails.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'auctionerr', component: AuctioneerComponent },
  { path: 'bidder', component: BidderComponent },
  { path: 'auctions/:category', component: AuctionsComponent },
  { path: 'bidding', component: BiddingComponent },
  { path: 'gotobid', component: GotobidComponent },
  { path: 'gotoassurancebid', component: GotoassuranceComponent },
  { path: 'bidsdetails', component: BidsdetailsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    AboutComponent,
    NavigationComponent,
    LoginComponent,
    AuctioneerComponent,
    BidderComponent,
    AuctionsComponent,
    BiddingComponent,
    GotobidComponent,
    GotoassuranceComponent,
    BidsdetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ButtonsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
