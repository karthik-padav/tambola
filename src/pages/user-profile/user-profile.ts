import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { firebase } from '@firebase/app';
import { AlertController } from 'ionic-angular';


/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userData:any = "";
  constructor(public navCtrl: NavController,
    private toast: ToastController,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
    this.userData = firebase.auth().currentUser;
    if (this.userData != null) {
      console.log(this.userData);
    } else {
      console.log("No user info")
    }
  }

  toastMsg(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }
}
