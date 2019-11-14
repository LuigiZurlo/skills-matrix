import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Router} from "@angular/router";
import {PreviousUrlService} from "../../../../core/services/util/previous-url.service";

@Component({
  selector: 'app-skills-create',
  templateUrl: './skills-create.component.html',
  styleUrls: ['./skills-create.component.css']
})
export class SkillsCreateComponent implements OnInit {

  createForm: FormGroup;
  previousUrl: any;

  constructor(private skillService: SkillService, private router: Router, private formBuilder: FormBuilder,
              private previousUrlService: PreviousUrlService) {
    this.createForm = this.formBuilder.group(
      {
        name: ['', Validators.required]
      }
    );
    this.previousUrl = this.previousUrlService.getPreviousUrl();
  }

  ngOnInit() {
  }

  addSkill(name) {
    this.skillService.addSkill(name).subscribe(() => {
      console.log('going to ... ' + this.previousUrlService.getPreviousUrl());
      this.router.navigate([this.previousUrlService.getPreviousUrl()]);
    });
  }
}
