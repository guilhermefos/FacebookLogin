import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { LoginPage } from '../pages/login.login';
import { UserPage } from '../pages/user/user';

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  
  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      let env = this;
      NativeStorage.getItem('user')
      .then( function(data) {
        env.nav.push(UserPage);
        Splashscreen.hide();
      }, function (error) {
        env.nav.push(LoginPage);
        Splashscreen.hide();
      });
      
      StatusBar.styleDefault();
    });
  }

}
