import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserWaitingPage } from './user-waiting';

@NgModule({
  declarations: [
    UserWaitingPage,
  ],
  imports: [
    IonicPageModule.forChild(UserWaitingPage),
  ],
})
export class UserWaitingPageModule {}
