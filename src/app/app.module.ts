import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { StartGameComponent } from './game-of-life/start-game/start-game.component';
import { GameComponent } from './game-of-life/game/game.component';
import { WutComponent } from './wut/wut.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      GameOfLifeComponent,
      StartGameComponent,
      GameComponent,
      WutComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      ReactiveFormsModule,
      FormsModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
