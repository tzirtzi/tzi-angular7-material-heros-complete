import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Hero2Service } from '../hero-v2.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private hero2Service: Hero2Service, ) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.hero2Service.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
    
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/