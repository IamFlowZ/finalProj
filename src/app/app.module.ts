import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/lobby/lobby';
import { GamePage } from '../pages/game/game/game';
import { ScoringPage } from '../pages/game/scoring/scoring';
import { Login } from '../pages/home/login/login';
import { LobbyCreate } from '../pages/create/lobby/lobbyCreate';
import { UserCreate } from '../pages/create/user/userCreate';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GamePage,
    ScoringPage,
    Login,
    LobbyCreate,
    UserCreate
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GamePage,
    ScoringPage,
    Login,
    LobbyCreate,
    UserCreate
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DeviceMotion,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
