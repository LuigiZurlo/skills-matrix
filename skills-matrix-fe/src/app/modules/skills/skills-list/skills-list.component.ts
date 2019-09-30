import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {Skill, GetSkillsServiceResponse} from '../../../common/models/skill/skill.model';
import {SkillService} from '../../../services/skill/skill.service';

@Component({
  selector: 'app-skills-list',
  templateUrl: './skills-list.component.html',
  styleUrls: ['./skills-list.component.css']
})
export class SkillsListComponent implements OnInit {

  skills: any[];
  displayedColumns = ['id', 'name', 'display_name', 'actions'];

  constructor(private skillService: SkillService, private router: Router) {
  }

  ngOnInit() {
    this.fetchSkills();
  }

  fetchSkills() {
    this.skillService
      .getSkills()
      .subscribe((getSkillsServiceResponse: GetSkillsServiceResponse) => {
        this.skills = getSkillsServiceResponse.data;
      });
  }

  deleteSkill(id) {
    this.skillService
      .deleteSkill(id)
      .subscribe(() => {
        this.fetchSkills();
      });
  }

  async editSkill(id) {
    await this.router.navigate([`/skills-edit/${id}`]);
  }


  async viewSkill(id) {
    await this.router.navigate([`/skills/${id}`]);
  }

}
