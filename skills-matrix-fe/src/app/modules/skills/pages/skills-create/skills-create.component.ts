import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SkillService} from "../../../../core/services/skill/skill.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-skills-create',
  templateUrl: './skills-create.component.html',
  styleUrls: ['./skills-create.component.css']
})
export class SkillsCreateComponent implements OnInit {

  createForm: FormGroup;

  constructor(private skillService: SkillService, private router: Router, private formBuilder: FormBuilder) {
    this.createForm = this.formBuilder.group(
      {
        name: ['', Validators.required]
      }
    );
  }

  ngOnInit() {
  }

  addSkill(name) {
    this.skillService.addSkill(name).subscribe(() => {
      this.router.navigate(['/skills']);
    });
  }
}
