import { Component, OnInit } from '@angular/core';
import {PositionService} from "../../../../core/services/position/position.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";

export interface Skill {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface Level {
  value: number;
  displayValue: string;
}

@Component({
  selector: 'app-positions-view',
  templateUrl: './positions-view.component.html',
  styleUrls: ['./positions-view.component.css']
})
export class PositionsViewComponent implements OnInit {

  positionId: string;
  position: any;
  myControl = new FormControl();
  skills: Skill[];
  levels: Level[] = [
    {value: 0, displayValue: '0 - Skill not needed'},
    {value: 1, displayValue: '1 - Information level needed'},
    {value: 2, displayValue: '2 - Need for people that can do it with help'},
    {value: 3, displayValue: '3 - Need for autonomous people'},
    {value: 4, displayValue: '4 - Need for expert'}
  ];

  filteredOptions: Observable<Skill[]>;

  constructor(private positionService: PositionService,
              private skillService: SkillService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.positionId = this.activatedRoute.snapshot.paramMap.get('id');
    this.fetchPosition(this.positionId);
    this.fetchSkills();
    console.log(this.skills);
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.skills.slice())
      );
  }

  displayFn(skill?: Skill): string | undefined {
    return skill ? skill.name : undefined;
  }

  _filter(name: string): Skill[] {
    const filterValue = name.toLowerCase();
    return this.skills.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  fetchPosition(id: string): void {
    this.positionService
      .getPositionById(id)
      .subscribe( (response: any) => {
        this.position = response.data;
        console.log('Data requested: Position infos');
        console.log(this.position);
      });
  }

  fetchSkills(): Skill[] {
    this.skillService
      .getSkills()
      .subscribe( (response: any) => {
        this.skills = response.data;
        console.log('Data requested: skills');
        console.log(this.skills);
      });
    return this.skills;
  }

}
