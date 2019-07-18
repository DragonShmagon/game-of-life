import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html'
})
export class StartGameComponent {

  boardDimensions = new FormGroup({
    width: new FormControl(20, [Validators.required, Validators.max(100)]),
    height: new FormControl(20, [Validators.required, Validators.max(100)]),
  });

  constructor(private router: Router) { }

  startGame(): void {
    if (this.boardDimensions.valid) {
      this.router.navigate([
        'gameOfLife/game', this.boardDimensions.get('width').value, this.boardDimensions.get('height').value
      ]);
    }
  }
}
