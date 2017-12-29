import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
// import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';
import { firebase } from '@firebase/app';

/**
 * Generated class for the OpenuppagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openuppage',
  templateUrl: 'openuppage.html',
})
export class OpenuppagePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenuppePage');
  }

  // Facebook login
  loginAsFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        // this.navCtrl.setRoot(HomePage);
        console.log(result)
      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  }

  // Gmail login
  loginAsGmail(){
    let provider = new firebase.auth.GoogleAuthProvider();
    // firebase.auth().signInWithPopup(provider).then((result) => {
    //   console.log(result);
    // }).catch((error) =>{
    //   console.log(error);
    // })

    firebase.auth().signInWithRedirect(provider).then(() => {
      firebase.auth().getRedirectResult().then((result) => {
        // this.navCtrl.setRoot(HomePage);
        console.log(result)
      }).catch(function (error) {
        alert(JSON.stringify(error));
      });
    }).catch(function (error) {
      alert(JSON.stringify(error));
    });
  }

  toastMsg(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }

}
