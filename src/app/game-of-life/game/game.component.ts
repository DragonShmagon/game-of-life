import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cell } from './cell.interface';
import { State } from './state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html'
})
export class GameComponent implements OnInit {
  width: number;
  height: number;
  cells: Cell[][];
  autoPlayInterval: any;
  speed = 0;
  iterationPause: number;
  iterationCount = 0;
  speedMessage = 'play turn every {0} second';
  speedMessageDisplayed: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.width = +this.route.snapshot.paramMap.get('width');
    this.height = +this.route.snapshot.paramMap.get('height');
    this.createGrid();
    this.updateSpeedMessage();
  }

  private createGrid(): void {
    this.cells = [];
    for (let row = 0; row < this.height; row++) {
      this.cells[row] = [];
      for (let column = 0; column < this.width; column++) {
        this.cells[row][column] = {
          state: State.Dead,
          row,
          column
        };
      }
    }
  }

  toggleLife(cell: Cell): void {
    if (cell.state === State.Alive) {
      cell.state = State.Dead;
    } else {
      cell.state = State.Alive;
    }
  }

  isCellAlive(cell: Cell): boolean {
    return cell.state === State.Alive;
  }

  adjustSpeed() {
    clearInterval(this.autoPlayInterval);
    this.updateSpeedMessage();
    if (this.speed === 0) {
      return;
    }
    this.autoPlayInterval = setInterval((context) => this.playTurn(), 2000 - this.speed);
  }

  playTurn() {
    if (this.iterationPause === this.iterationCount) {
      clearInterval(this.autoPlayInterval);
      this.speed = 0;
      return;
    }
    const cellsThatWillDie: Cell[] = [];
    const cellsThatWillBeBorn: Cell[] = [];
    this.cells.forEach(row => {
      row.forEach(cell => {
        if (this.isCellAlive(cell)) {
          const livingNeighborCount = this.getLivingNeighborCountAtStartOfTurn(cell.row, cell.column);
          if (livingNeighborCount <= 1) {
            // die by solitude
            cellsThatWillDie.push(cell);
          } else if (livingNeighborCount >= 4) {
            // die by overpopulation
            cellsThatWillDie.push(cell);
          }
        } else {
          const livingNeighborCount = this.getLivingNeighborCountAtStartOfTurn(cell.row, cell.column);
          if (livingNeighborCount === 3) {
            // born
            cellsThatWillBeBorn.push(cell);
          }
        }
      });
    });
    this.endTurn(cellsThatWillBeBorn, cellsThatWillDie);
  }

  private updateSpeedMessage() {
    if (this.speed === 0) {
      this.speedMessageDisplayed = this.speedMessage.replace('{0}', '0');
    } else {
      this.speedMessageDisplayed = this.speedMessage.replace('{0}', '' + (2000 - this.speed) / 1000);
    }
  }

  private endTurn(cellsThatMustBeBorn: Cell[], cellsThatMustDie: Cell[]) {
    cellsThatMustBeBorn.forEach(cell => cell.state = State.Alive);
    cellsThatMustDie.forEach(cell => cell.state = State.Dead);
    this.iterationCount++;
  }

  private getLivingNeighborCountAtStartOfTurn(rowIndex: number, columnIndex: number) {
    return this.getNeighborsAtStartOfTurn(rowIndex, columnIndex).filter(cell => cell.state === State.Alive).length;
  }

  private getNeighborsAtStartOfTurn(rowIndex: number, columnIndex: number): Cell[] {
    const neighbors: Cell[] = [];
    const lessThanWorldLimits = columnIndex > 0;
    const greaterThanWorldLimits = columnIndex < this.width - 1;
    if (rowIndex > 0) {
      neighbors.push(this.cells[rowIndex - 1][columnIndex]);
      if (lessThanWorldLimits) {
        neighbors.push(this.cells[rowIndex - 1][columnIndex - 1]);
      }
      if (greaterThanWorldLimits) {
        neighbors.push(this.cells[rowIndex - 1][columnIndex + 1]);
      }
    }
    if (lessThanWorldLimits) {
      neighbors.push(this.cells[rowIndex][columnIndex - 1]);
    }
    if (greaterThanWorldLimits) {
      neighbors.push(this.cells[rowIndex][columnIndex + 1]);
    }
    if (rowIndex < this.height - 1) {
      neighbors.push(this.cells[rowIndex + 1][columnIndex]);
      if (lessThanWorldLimits) {
        neighbors.push(this.cells[rowIndex + 1][columnIndex - 1]);
      }
      if (greaterThanWorldLimits) {
        neighbors.push(this.cells[rowIndex + 1][columnIndex + 1]);
      }
    }
    return neighbors;
  }
}
