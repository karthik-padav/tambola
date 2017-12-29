import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { firebase } from '@firebase/app';

import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the UserWaitingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-waiting',
  templateUrl: 'user-waiting.html',
})
export class UserWaitingPage {
  roomNumber:any = "";
  userList:any[];
  ticket:any;
  constructor(public navCtrl: NavController,
    private http: Http,
    public navParams: NavParams) {
    // this.roomNumber = this.navParams.get('RoomNumber');
    this.roomNumber = navParams.get('RoomNumber');
    console.log(this.roomNumber);
  }

  ionViewDidLoad() {
    this.userList = [];
    console.log('ionViewDidLoad UserWaitingPage');
    firebase.database().ref('room/').once('value').then((snapshot)=>{
      if(snapshot.hasChild(this.roomNumber.toString())){
        firebase.database().ref('room/' + this.roomNumber + '/users').on('child_added', ((snapshot) => {
          console.log(snapshot.val());
            this.userList.push(snapshot.val());
        }))
      } else{
        console.log('Invalid roomId');
      }
    })
    console.log(this.userList);

    // Get ticket json
    this.http.get('assets/data/mydata.json')
      .map((res) => res.json())
      .subscribe(data => {
        this.ticket = data;
      }, (rej) => { console.error("Could not load local data", rej) });

  console.log(this.ticket);
  }

}
