import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { firebase } from '@firebase/app';


/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  message:any="";
  chatList:any[]=[];
  roomNumber:any="";
  currentUser:any="";
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.roomNumber = navParams.get('RoomNumber');
    console.log(this.roomNumber);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.message = "";

    firebase.database().ref('room/' + this.roomNumber + '/chats/').on('child_added', ((snapshot)=>{
      this.chatList.push(snapshot.val());
      console.log(this.chatList);
    }))
  }

  sendMessage(){
    console.log(this.message);
    let chat= {};
    this.currentUser = firebase.auth().currentUser;
    let newPostKey = firebase.database().ref().child('posts').push().key;
    chat['room/' + this.roomNumber + '/chats/' + newPostKey + '/msg'] = this.message;
    chat['room/' + this.roomNumber + '/chats/' + newPostKey + '/photoURL'] = this.currentUser.photoURL;
    chat['room/' + this.roomNumber + '/chats/' + newPostKey + '/displayName'] = this.currentUser.displayName;
    chat['room/' + this.roomNumber + '/chats/' + newPostKey + '/uid'] = this.currentUser.uid;
    firebase.database().ref().update(chat).then((result)=>{
      this.message = "";
    }).catch((error)=>{
      console.log(error);
    })
    console.log(this.chatList);
  }

  doInfinite(e){
    console.log(e);
  }

}
