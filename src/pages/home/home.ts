import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { firebase } from '@firebase/app';
import { UserWaitingPage } from '../user-waiting/user-waiting';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // tambolaTickets: any[] = [];
  // firstCol: any[] = [];
  // secondCol: any[] = [];
  // thirdCol: any[] = [];
  // fourthCol: any[] = [];
  // fifthCol: any[] = [];
  // sixthCol: any[] = [];
  // seventhCol: any[] = [];
  // eighthCol: any[] = [];
  // ninthCol: any[] = [];
  // numberPicked:any;

  // firstRow: any[];
  // secondRow: any[];
  // thirdRow: any[];

  // numberArray: any[]=[];

  constructor(public navCtrl: NavController,
    private toast: ToastController,) {
    this.init()
  }
  init() {
      // this.createTicketNumbers();
      // this.numberArrayCall();

  }
  createRoom(){
    let roomId = Math.floor(Math.random()*(999999 - 100000 + 1) + 100000);
    let database = firebase.database();
    database.ref('room/').once('value', ((snapshot) => {
      if(snapshot.hasChild(roomId.toString())){
        this.createRoom();
      } else {
        console.log('not exist');
        let users = {};
        let currentUser = firebase.auth().currentUser;
        users['room/' + roomId + '/users/' + currentUser.uid + '/name'] = currentUser.displayName;
        users['room/' + roomId + '/users/' + currentUser.uid + '/Uid'] = currentUser.uid;
        users['room/' + roomId + '/users/' + currentUser.uid + '/photoURL'] = currentUser.photoURL;
        users['room/' + roomId + '/users/' + currentUser.uid + '/admin'] = true;
        firebase.database().ref().update(users).then((result) => {
          this.navCtrl.setRoot(TabsPage,{RoomNumber:roomId});
        }).catch((error) => {
          this.toastMsg(error.message);
        })
      }
    }))
  }
  
  joinRoom(roomId){
    console.log(roomId);
    firebase.database().ref('room/').once('value', (snapshot) =>{
      if(snapshot.hasChild(roomId)){
        console.log('has child');
        let users = {};
        let currentUser = firebase.auth().currentUser;
        users['room/' + roomId + '/users/' + currentUser.uid + '/name'] = currentUser.displayName;
        users['room/' + roomId + '/users/' + currentUser.uid + '/Uid'] = currentUser.uid;
        users['room/' + roomId + '/users/' + currentUser.uid + '/photoURL'] = currentUser.photoURL;
        users['room/' + roomId + '/users/' + currentUser.uid + '/admin'] = false;
        firebase.database().ref().update(users).then((result) => {
          this.navCtrl.setRoot(TabsPage,{RoomNumber:roomId});
        }).catch((error) => {
          this.toastMsg(error.message);
        });
      } else {
        this.toastMsg('Invalid code');
      }
    })
  }


  toastMsg(msg) {
    this.toast.create({
      message: msg,
      duration: 3000
    }).present();
  }

  // reset(){
  //   this.init();
  // }

  // createTicketNumbers() {
  //   this.tambolaTickets = [];
  //   this.firstCol = [];
  //   this.secondCol = [];
  //   this.thirdCol = [];
  //   this.fourthCol = [];
  //   this.fifthCol = [];
  //   this.sixthCol = [];
  //   this.seventhCol = [];
  //   this.eighthCol = [];
  //   this.ninthCol = [];
  //   this.firstRow = ['', '', '', '', '', '', '', '', ''];
  //   this.secondRow = ['', '', '', '', '', '', '', '', ''];
  //   this.thirdRow = ['', '', '', '', '', '', '', '', ''];
  //   for (let i = 1; i < 90; i++) {
  //     if (i < 10) {
  //       this.firstCol.push(i);
  //     }
  //     else if (i > 9 && i < 20) {
  //       this.secondCol.push(i);
  //     }
  //     else if (i > 19 && i < 30) {
  //       this.thirdCol.push(i);
  //     }
  //     else if (i > 29 && i < 40) {
  //       this.fourthCol.push(i);
  //     }
  //     else if (i > 39 && i < 50) {
  //       this.fifthCol.push(i);
  //     }
  //     else if (i > 49 && i < 60) {
  //       this.sixthCol.push(i);
  //     }
  //     else if (i > 59 && i < 70) {
  //       this.seventhCol.push(i);
  //     }
  //     else if (i > 69 && i < 80) {
  //       this.eighthCol.push(i);
  //     }
  //     else if (i > 79 && i < 91) {
  //       this.ninthCol.push(i);
  //     }
  //   }
    
  //   for(let flag=0; flag<3; flag++){
  //     let num = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //     let randomFiveNumberRow: any[] = ['', '', '', '', '', '', '', '', ''];
  //     while (num.length > 4) {
  //       let random = Math.floor(Math.random() * (num.length - 1 + 1) + 1);
  //       randomFiveNumberRow[num[random - 1] - 1] = num[random - 1];
  //       num.splice(random - 1, 1);
  //     }
  //     console.log(randomFiveNumberRow);
  //     for (let i = 0; i < randomFiveNumberRow.length; i++) {
  //       if (randomFiveNumberRow[i] == 1) {
  //         let random = Math.floor(Math.random() * (this.firstCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[0] = this.firstCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[0] = this.firstCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[0] = this.firstCol[random];
  //         }
  //         this.firstCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 2) {
  //         let random = Math.floor(Math.random() * (this.secondCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[1] = this.secondCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[1] = this.secondCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[1] = this.secondCol[random];
  //         }
  //         this.secondCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 3) {
  //         let random = Math.floor(Math.random() * (this.thirdCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[2] = this.thirdCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[2] = this.thirdCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[2] = this.thirdCol[random];
  //         }
  //         this.thirdCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 4) {
  //         let random = Math.floor(Math.random() * (this.fourthCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[3] = this.fourthCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[3] = this.fourthCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[3] = this.fourthCol[random];
  //         }
  //         this.fourthCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 5) {
  //         let random = Math.floor(Math.random() * (this.fifthCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[4] = this.fifthCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[4] = this.fifthCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[4] = this.fifthCol[random];
  //         }
  //         this.fifthCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 6) {
  //         let random = Math.floor(Math.random() * (this.sixthCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[5] = this.sixthCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[5] = this.sixthCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[5] = this.sixthCol[random];
  //         }
  //         this.sixthCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 7) {
  //         let random = Math.floor(Math.random() * (this.seventhCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[6] = this.seventhCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[6] = this.seventhCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[6] = this.seventhCol[random];
  //         }
  //         this.seventhCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 8) {
  //         let random = Math.floor(Math.random() * (this.eighthCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[7] = this.eighthCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[7] = this.eighthCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[7] = this.eighthCol[random];
  //         }
  //         this.eighthCol.splice(random, 1);
  //       }
  //       else if (randomFiveNumberRow[i] == 9) {
  //         let random = Math.floor(Math.random() * (this.ninthCol.length - 1 + 1) + 1) - 1;
  //         if (flag == 0) {
  //           this.firstRow[8] = this.ninthCol[random];
  //         } else if (flag == 1) {
  //           this.secondRow[8] = this.ninthCol[random];
  //         } else if (flag == 2) {
  //           this.thirdRow[8] = this.ninthCol[random];
  //         }
  //         this.ninthCol.splice(random, 1);
  //       }
  //     }
  //     if (flag == 0) {
  //       this.tambolaTickets.push(this.firstRow);
  //     } else if (flag == 1) {
  //       this.tambolaTickets.push(this.secondRow);
  //     } else if (flag == 2) {
  //       this.tambolaTickets.push(this.thirdRow);
  //     }
  //   }
  // }

  // numberArrayCall(){
  //   this.numberArray = [];
  //   for(let i=1; i<91; i++){
  //     this.numberArray.push({'number':i,'done':false});
  //   }
  //   console.log(this.numberArray);
  // }

  // **************************
  // **************************
  // ********Start game********
  // **************************
  // **************************
  // startGame(){
  //   this.numberPicked = "";
  //   let count = 0;
  //   this.pickRandomNumber(count);
  // }

  // pickRandomNumber(count){
  //   let tempNum = Math.floor(Math.random() * ((this.numberArray.length - 1) - 0 + 1) + 0);
  //   if(!this.numberArray[tempNum].done){
  //     this.numberPicked = this.numberArray[tempNum].number;
  //     this.numberArray[tempNum].done = true;
  //     count = count + 1;
  //     if(count < this.numberArray.length){
  //       setTimeout(() => {
  //         this.pickRandomNumber(count);
  //       }, 1000);
  //     }else{
  //       console.log(this.numberArray);
  //     }
  //   } else {
  //     this.pickRandomNumber(count);
  //   }
  // }




}
