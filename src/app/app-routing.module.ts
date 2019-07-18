import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { GameOfLifeComponent } from './game-of-life/game-of-life.component';
import { GameComponent } from './game-of-life/game/game.component';
import { StartGameComponent } from './game-of-life/start-game/start-game.component';
import { WutComponent } from './wut/wut.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'gameOfLife', component: GameOfLifeComponent,
    children: [
      { path: '', component: StartGameComponent },
      { path: 'startGame', component: StartGameComponent },
      { path: 'game/:width/:height', component: GameComponent }
    ]
  },
  { path: '', component: HomeComponent },
  { path: '**', component: WutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
