import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import * as firebase from 'firebase';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { FIREBASE_CONFIG } from './app.firebase.config';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { OpenuppagePage } from '../pages/openuppage/openuppage';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { UserWaitingPage } from '../pages/user-waiting/user-waiting';
import { TabsPage } from '../pages/tabs/tabs';
import { ChatPage } from '../pages/chat/chat';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    OpenuppagePage,
    UserProfilePage,
    UserWaitingPage,
    TabsPage,
    ChatPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    OpenuppagePage,
    UserProfilePage,
    UserWaitingPage,
    TabsPage,
    ChatPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
