import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {resource_competencies, skills} from "../../../../../../../skills-matrix-be/src/db/models/ALL";
import {ResourceService} from "../../../../core/services/resource/resource.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CompetencyService} from "../../../../core/services/competency/competency.service";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Level} from "../../../forms/pages/position-editor/position-editor.component";
import {GetCompetenciesServiceResponse} from "../../../../core/models/competency/competency.model";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-resources-add-competencies',
  templateUrl: './resources-add-competencies.component.html',
  styleUrls: ['./resources-add-competencies.component.css']
})
export class ResourcesAddCompetenciesComponent implements OnInit {

  createForm: FormGroup;

  resourceId: string;
  competencies: resource_competencies[];
  skills: skills[];

  requiredLevels: Level[] = [
    {value: 1, displayValue: '1 - Information level'},
    {value: 2, displayValue: '2 - Not autonomous'},
    {value: 3, displayValue: '3 - Autonomous'},
    {value: 4, displayValue: '4 - Expert'}
  ];

  constructor(private resourceService: ResourceService, private competencyService: CompetencyService,
              private skillService: SkillService, private router: Router,
              private formBuilder: FormBuilder, private route: ActivatedRoute,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.resourceId = this.route.snapshot.paramMap.get('id');
    this.createForm = this.formBuilder.group({
        resource_id: ['', Validators.required],
        competency_id: ['', Validators.required],
        assessed_on: [Date, Validators.required],
        validation_date: [Date, Validators.required],
        validator_id: ['', Validators.required],
        is_validated: ['', Validators.required],
        is_pending_validation: ['', Validators.required],
      }
    );
    this.skillService.getSkills().subscribe((response: any) => {
      this.skills = response.data;
    });
  }

  addCompetency(skill_id, level, assessed_on, validation_date, validator_id,) {
    this.competencyService.getCompetenciesBySkill(skill_id, level).subscribe((res: GetCompetenciesServiceResponse) => {
      console.log(res.data[0].id);
      this.resourceService.createResourceCompetency(this.resourceId, res.data[0].id, assessed_on, validation_date, validator_id).subscribe( resp => {
        this.router.navigate([`/resources/${this.resourceId}`]);
        this.openSnackBar(JSON.stringify(resp));
      });
    });
  }

  openSnackBar(message) {
    this._snackBar.open(message, '', {duration: 2000});
  }


}
