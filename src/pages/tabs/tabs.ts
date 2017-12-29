import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserWaitingPage } from '../user-waiting/user-waiting';
import { ChatPage } from '../chat/chat';
/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = UserWaitingPage;
  tab2Root: any = ChatPage;
  tab1Params: any;
  tab2Params: any;
  roomNumber:any = "";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomNumber = this.navParams.get('RoomNumber');
    console.log(this.roomNumber);
    this.tab1Params = {RoomNumber : this.roomNumber};
    this.tab2Params = {RoomNumber : this.roomNumber};
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
