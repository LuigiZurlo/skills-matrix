import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Skill, GetSkillsServiceResponse} from '../../models/skill/skill.model';
import {SkillService} from '../../services/skill/skill.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {

  skills: Skill[];
  displayedColumns = ['display_name', 'category', 'scope', 'actions'];

  constructor(private skillService: SkillService, private router: Router) { }

  ngOnInit() {
    this.fetchSkills();
  }

  fetchSkills() {
    this.skillService
      .getSkills()
      .subscribe((getSkillsServiceResponse: GetSkillsServiceResponse) => {
        this.skills = getSkillsServiceResponse.data;
        console.log('Data requested ...');
        console.log(this.skills);
      });
  }

  editSkill(id) {
    this.router.navigate([`/skills-edit/${id}`]);
  }

  deleteSkill(id) {
    this.skillService
      .deleteSkill(id)
      .subscribe(() => {
        this.fetchSkills();
      });
  }

  viewSkill(id) {
    this.router.navigate([`/skills/${id}`]);
  }

}
