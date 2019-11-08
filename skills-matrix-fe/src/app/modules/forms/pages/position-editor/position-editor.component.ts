import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Observable} from "rxjs";
import {startWith, map} from "rxjs/operators";

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
  selector: 'app-position-editor',
  templateUrl: './position-editor.component.html',
  styleUrls: ['./position-editor.component.css']
})
export class PositionEditorComponent implements OnInit {

  positionForm: FormGroup;

  skills: Skill[];

  filteredOptions: Observable<any>;

  requiredLevels: Level[] = [
    {value: 0, displayValue: '0 - Skill not needed'},
    {value: 1, displayValue: '1 - Information level needed'},
    {value: 2, displayValue: '2 - Need for people that can do it with help'},
    {value: 3, displayValue: '3 - Need for autonomous people'},
    {value: 4, displayValue: '4 - Need for expert'}
  ];

  constructor(private _formBuilder: FormBuilder,
              private _skillService: SkillService) {
  }

  ngOnInit() {
    this._skillService.getSkills().subscribe( (response: any) => {this.skills = response.data} );
    this.filteredOptions = this.competencies.controls['skillName'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.skills.slice())
      );
    this.positionForm = this._formBuilder.group({
      positionDetails: this._formBuilder.group({
        positionName: "",
        positionId: "",
        projectId: ""
      }),
      competencyGroups: this._formBuilder.array([this.competencyGroups])
    });
  }

  private _filter(value: string): Skill[] {
    const filterValue = value.toLowerCase();
    return this.skills.filter(skill => skill.name.toLowerCase().indexOf(filterValue) === 0);
  }

  get competencyGroups(): FormGroup {
    return this._formBuilder.group({
      competencyGroupId: "",
      competencyGroupName: "",
      competencies: this._formBuilder.array([this.competencies])
    });
  }

  get competencies(): FormGroup {
    return this._formBuilder.group({
      competencyId: "",
      skillId: "",
      skillName: "",
      requiredLevel: ""
    })
  }

  fetchSkills() {
    this._skillService
      .getSkills()
      .subscribe( (response: any) => {
        this.skills = response.data;
      });
  }

  addCompetencyGroup() {
    (this.positionForm.get("competencyGroups") as FormArray).push(this.competencyGroups);
  }

  deleteCompetencyGroup(index) {
    (this.positionForm.get("competencyGroups") as FormArray).removeAt(index);
  }

  addCompetency(competencyGroup) {
    competencyGroup.get("competencies").push(this.competencies);
  }

  deleteCompetency(competencyGroup, index) {
    competencyGroup.get("competencies").removeAt(index);
  }

}
