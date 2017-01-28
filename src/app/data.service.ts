import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  constructor() {
    this.setNavBar('noAuth');
  }

  currentNavBar;
  setNavBar(val) {
    this.currentNavBar = val;
  }

  userID: any = '';
  setUserID(uid) {
    this.userID = uid;
  }

  selectedUserId: any = '';
  setSelectedUser(id) {
    this.selectedUserId = id

  }

}
