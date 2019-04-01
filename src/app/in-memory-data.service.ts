import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const test2 =[
      { id: 1, name: 'xMr. Nice' },
      { id: 2, name: 'xNarco' },
      { id: 3, name: 'xBombasto' },
      { id: 4, name: 'xCeleritas' },
      { id: 5, name: 'xMagneta' },
      { id: 6, name: 'xRubberMan' },
      { id: 7, name: 'xDynama' },
    ]

    const heroDetails =[
      { id: 1, name: 'yMr. Nice', superpower: 'sdfds' },
      { id: 2, name: 'yNarco', superpower: 'sdfds' },
      { id: 3, name: 'yBombasto', superpower: 'sdfds' },
      { id: 4, name: 'yCeleritas', superpower: 'sdfds' },
      { id: 5, name: 'yMagneta', superpower: 'sdfds' },
      { id: 6, name: 'yRubberMan', superpower: 'sdfds' },
      { id: 7, name: 'yDynama', superpower: 'sdfds' },
    ]
    return {heroes, test2, heroDetails};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(items: any[]): number {
    return items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/