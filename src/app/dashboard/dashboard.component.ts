import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  options: FormGroup;
  isReactiveView: boolean = false;

  constructor(
    private heroService: HeroService,
    private hero2Service: Hero2Service, 
    private fb: FormBuilder
    ) {
      this.options = fb.group({
      matView: '1'
    });
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.hero2Service.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  toggleReactiveView() {
    this.isReactiveView = !this.isReactiveView;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/