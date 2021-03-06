import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController) {}

  ionViewCanEnter() {
    let env = this;
    NativeStorage.getItem('user')
    .then(function(data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
      env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  doFacebookLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response){
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('Hello UserPage Page');
  }

}
