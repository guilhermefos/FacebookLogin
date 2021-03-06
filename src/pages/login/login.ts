import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  FB_APP_ID: number = 370805299927580;

  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFacebookLogin() {
    let permissions = new Array();
    let navigationController = this.navCtrl;
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response) {
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function() {
          navigationController.push(UserPage);
        }, function(error) {
          console.log(error);
        })
      })
    }, function(error) {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    console.log('Hello LoginPage Page');
  }

}
