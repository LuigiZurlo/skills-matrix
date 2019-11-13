import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Observable} from "rxjs";
import {Level, Skill} from "../../../forms/pages/position-editor/position-editor.component";
import {map, startWith} from "rxjs/operators";
import {CompetencyGroupService} from '../../../../core/services/competencyGroup/competency-group.service';


@Component({
  selector: 'app-positions-requirement',
  templateUrl: './positions-requirement.component.html',
  styleUrls: ['./positions-requirement.component.css']
})
export class PositionsRequirementComponent implements OnInit {

  positionForms: FormGroup;

  skills: Skill[];

  filteredOptions: Observable<any>;

  requiredLevels: Level[] = [
    {value: 0, displayValue: '0 - Skill not needed'},
    {value: 1, displayValue: '1 - Information level needed'},
    {value: 2, displayValue: '2 - Need for people that can do it with help'},
    {value: 3, displayValue: '3 - Need for autonomous people'},
    {value: 4, displayValue: '4 - Need for expert'}
  ];

  @Input() positionId: string;


  constructor(private _formBuilder: FormBuilder, private _skillService: SkillService, private compGroupService: CompetencyGroupService) {

    this.positionForms = this._formBuilder.group({
      positionName: ['',]
    });

    this._skillService.getSkills().subscribe((response: any) => {
      this.skills = response.data
    });
    this.filteredOptions = this.competencies.controls['skillName'].valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.skills.slice())
      );
    this.positionForms = this._formBuilder.group({
      positionDetails: this._formBuilder.group({
        positionName: '',
        positionId: this.positionId,
        projectId: ""
      }),
      competencyGroups: this._formBuilder.array([this.competencyGroups])
    });

  }

  ngOnInit() {
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
    });
  }

  fetchSkills() {
    this._skillService
      .getSkills()
      .subscribe((response: any) => {
        this.skills = response.data;
      });
  }

  addCompetencyGroup() {
    (this.positionForms.get("competencyGroups") as FormArray).push(this.competencyGroups);
  }

  deleteCompetencyGroup(index) {
    (this.positionForms.get("competencyGroups") as FormArray).removeAt(index);
  }

  addCompetency(competencyGroup) {
    competencyGroup.get("competencies").push(this.competencies);
  }

  deleteCompetency(competencyGroup, index) {
    competencyGroup.get("competencies").removeAt(index);
  }

  addAll(): void {
    const form = JSON.parse(JSON.stringify(this.positionForms.value.competencyGroups));
    const ll = this.compGroupService;
    form.forEach((obj) => {
      ll.createCompetencyGroup(this.positionId, obj.competencyGroupName).subscribe();
    });
  }

}
