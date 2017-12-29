import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, LoadingController } from 'ionic-angular';
import * as firebase from 'firebase';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OpenuppagePage } from '../pages/openuppage/openuppage';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  userData:any = "";
  pages: Array<{title: string, component: any}>;
  loading:any;

  constructor(public platform: Platform,
    private afAuth: AngularFireAuth,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    private toast: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      // { title: 'Login', component: RegisterPage },
      // { title: 'Register', component: RegisterPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loader();
      firebase.auth().onAuthStateChanged((user)=>{
        if (user) {
          this.userData = user;
          // User is signed in.
          this.rootPage = HomePage;
          console.log(user);
          let updates = {};
          updates['/users/' + user.uid + '/providerData'] = user.providerData[0];
          updates['/users/' + user.uid + '/Uid'] = user.uid;
          updates['/users/' + user.uid + '/displayName'] = user.displayName;
          updates['/users/' + user.uid + '/emailVerified'] = user.emailVerified;
          updates['/users/' + user.uid + '/email'] = user.email;
          updates['/users/' + user.uid + '/photoURL'] = user.photoURL;
          firebase.database().ref().update(updates).then((result) => {
            console.log('success');
          }).catch((error) => {
            console.log(error);
          });

          this.loading.dismiss();
        } else {
          // No user is signed in.
          this.rootPage = OpenuppagePage;
          this.loading.dismiss();
        }
      });
      setTimeout(() => {
        this.loading.dismiss();
      }, 5000);


      // this.afAuth.authState.subscribe(data => {
      //   console.log('user status ');
      //   console.log(data);
      //   this.userData = data;
      //   if(data){
      //     // Update database
      //     let database = firebase.database();
      //         let updates = {};
      //         updates['/users/' + data.uid + '/providerData'] = data.providerData[0];
      //         updates['/users/' + data.uid + '/Uid'] = data.uid;
      //         updates['/users/' + data.uid + '/displayName'] = data.displayName;
      //         updates['/users/' + data.uid + '/emailVerified'] = data.emailVerified;
      //         updates['/users/' + data.uid + '/email'] = data.email;
      //         updates['/users/' + data.uid + '/photoURL'] = data.photoURL;
      //         firebase.database().ref().update(updates).then((result) => {
      //           console.log('success');
      //         }).catch((error) => {
      //           console.log(error);
      //         });
      //       console.log(this.userData);
      //     this.rootPage = HomePage;
      //     setTimeout(() => {
      //       this.toast.create({
      //         message: `Hi, ${data.displayName}`,
      //         duration: 3000
      //       }).present();
      //     }, 500);
      //   } else {
      //     this.rootPage = OpenuppagePage;
      //   }
      // });
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  signOut() {
    this.afAuth.auth.signOut().then(success => {
      this.toast.create({
        message: 'Signed Out',
        duration: 3000
      }).present();
    }, function (error) {
      this.toast.create({
        message: error,
        duration: 3000
      }).present();
    });
  }

  goToProfile(){
    console.log('asd');
    this.nav.setRoot(UserProfilePage);
  }

  loader() {
    this.loading = this.loadingCtrl.create({
      content: 'Loading...'
    });
  
    this.loading.present();
  
    // setTimeout(() => {
    //   this.loading.dismiss();
    // }, 5000);
  }

}
